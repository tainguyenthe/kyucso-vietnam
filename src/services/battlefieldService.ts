import { supabase } from '@/lib/supabase'
import type { Battlefield } from '@/types/database'

export async function getBattlefields(category?: string) {
  let q = supabase
    .from('battlefields')
    .select('*')
    .eq('status', 'published')
    .order('name', { ascending: true })

  if (category) {
    q = q.eq('category', category)
  }

  const { data, error } = await q
  if (error) throw error
  return data as Battlefield[]
}

export async function getBattlefield(id: string) {
  const { data, error } = await supabase
    .from('battlefields')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Battlefield
}

export async function createBattlefield(bf: Omit<Battlefield, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('battlefields')
    .insert(bf)
    .select()
    .single()
  if (error) throw error
  return data as Battlefield
}

export async function updateBattlefield(id: string, updates: Partial<Battlefield>) {
  const { data, error } = await supabase
    .from('battlefields')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Battlefield
}
