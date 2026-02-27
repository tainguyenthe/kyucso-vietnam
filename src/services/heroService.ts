import { supabase } from '@/lib/supabase'
import type { Hero } from '@/types/database'

export interface HeroSearchParams {
  query?: string
  era?: string
  page?: number
  limit?: number
}

export async function searchHeroes({ query, era, page = 1, limit = 12 }: HeroSearchParams) {
  let q = supabase
    .from('heroes')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('full_name', { ascending: true })

  if (query) {
    q = q.or(`full_name.ilike.%${query}%,birth_place.ilike.%${query}%,unit.ilike.%${query}%,rank.ilike.%${query}%`)
  }
  if (era) {
    q = q.eq('era', era)
  }

  const from = (page - 1) * limit
  q = q.range(from, from + limit - 1)

  const { data, count, error } = await q
  if (error) throw error
  return { heroes: data as Hero[], total: count ?? 0 }
}

export async function getHero(id: string) {
  const { data, error } = await supabase
    .from('heroes')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Hero
}

export async function createHero(hero: Omit<Hero, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('heroes')
    .insert(hero)
    .select()
    .single()
  if (error) throw error
  return data as Hero
}

export async function updateHero(id: string, updates: Partial<Hero>) {
  const { data, error } = await supabase
    .from('heroes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Hero
}

export async function deleteHero(id: string) {
  const { error } = await supabase.from('heroes').delete().eq('id', id)
  if (error) throw error
}

export async function getAllHeroes(page = 1, limit = 20) {
  const from = (page - 1) * limit
  const { data, count, error } = await supabase
    .from('heroes')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1)
  if (error) throw error
  return { heroes: data as Hero[], total: count ?? 0 }
}
