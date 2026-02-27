// Supabase Edge Function: AI Comrade Matching
// Compares entities across stories & heroes using pg_trgm similarity

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    })
  }

  try {
    const { source_type, source_id, entities } = await req.json()
    if (!source_type || !source_id || !entities?.length) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const personEntities = entities
      .filter((e: { type: string }) => e.type === 'person')
      .map((e: { value: string }) => e.value)

    const placeEntities = entities
      .filter((e: { type: string }) => e.type === 'place')
      .map((e: { value: string }) => e.value)

    const matches: Array<{
      target_type: string
      target_id: string
      similarity_score: number
      matched_entities: string[]
    }> = []

    // Match against heroes
    for (const name of personEntities) {
      const { data: heroMatches } = await supabase
        .from('heroes')
        .select('id, full_name')
        .or(`full_name.ilike.%${name}%`)
        .eq('status', 'published')
        .limit(5)

      if (heroMatches) {
        for (const hero of heroMatches) {
          matches.push({
            target_type: 'hero',
            target_id: hero.id,
            similarity_score: hero.full_name.toLowerCase().includes(name.toLowerCase()) ? 0.9 : 0.6,
            matched_entities: [name],
          })
        }
      }
    }

    // Match against stories
    for (const name of [...personEntities, ...placeEntities]) {
      const { data: storyMatches } = await supabase
        .from('stories')
        .select('id, title, characters')
        .eq('status', 'published')
        .neq('id', source_id)
        .limit(5)

      if (storyMatches) {
        for (const story of storyMatches) {
          if (story.characters?.some((c: string) => c.toLowerCase().includes(name.toLowerCase()))) {
            matches.push({
              target_type: 'story',
              target_id: story.id,
              similarity_score: 0.7,
              matched_entities: [name],
            })
          }
        }
      }
    }

    // Save matches to database
    if (matches.length > 0) {
      const records = matches.map((m) => ({
        source_type,
        source_id,
        ...m,
      }))
      await supabase.from('ai_matches').insert(records)
    }

    return new Response(JSON.stringify({ matches }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
