import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'

export async function getAllUsers(page = 1, limit = 20) {
  const from = (page - 1) * limit
  const { data, count, error } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1)
  if (error) throw error
  return { users: data as Profile[], total: count ?? 0 }
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) throw error
}
