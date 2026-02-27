// Supabase Edge Function: Speech-to-Text (Vietnamese)
// Proxies audio to Google Cloud Speech-to-Text API

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_CLOUD_API_KEY') ?? ''

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
    const formData = await req.formData()
    const audioFile = formData.get('audio') as File
    if (!audioFile) {
      return new Response(JSON.stringify({ error: 'No audio file provided' }), { status: 400 })
    }

    const audioBytes = await audioFile.arrayBuffer()
    const audioContent = btoa(String.fromCharCode(...new Uint8Array(audioBytes)))

    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: {
            encoding: 'WEBM_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'vi-VN',
            enableAutomaticPunctuation: true,
            model: 'latest_long',
          },
          audio: { content: audioContent },
        }),
      }
    )

    const data = await response.json()
    const transcript = data.results
      ?.map((r: { alternatives: { transcript: string }[] }) => r.alternatives[0]?.transcript)
      .filter(Boolean)
      .join(' ') ?? ''

    return new Response(JSON.stringify({ transcript }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }
})
