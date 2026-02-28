import { supabase } from '@/lib/supabase'
import type { Story } from '@/types/database'

export async function getPublishedStories(page = 1, limit = 12) {
  const from = (page - 1) * limit
  const { data, count, error } = await supabase
    .from('stories')
    .select('*, author:profiles!author_id(id, full_name, avatar_url)', { count: 'exact' })
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1)
  if (error) throw error
  return { stories: data as Story[], total: count ?? 0 }
}

export async function getStory(id: string) {
  const { data, error } = await supabase
    .from('stories')
    .select('*, author:profiles!author_id(id, full_name, avatar_url)')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Story
}

export async function createStory(story: Omit<Story, 'id' | 'created_at' | 'updated_at' | 'author'>) {
  const { data, error } = await supabase
    .from('stories')
    .insert(story)
    .select()
    .single()
  if (error) throw error
  return data as Story
}

export async function updateStory(id: string, updates: Partial<Story>) {
  const { data, error } = await supabase
    .from('stories')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Story
}

export async function getUserStories(userId: string) {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('author_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Story[]
}

export async function getAllStories(page = 1, limit = 20) {
  const from = (page - 1) * limit
  const { data, count, error } = await supabase
    .from('stories')
    .select('*, author:profiles!author_id(id, full_name, avatar_url)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1)
  if (error) throw error
  return { stories: data as Story[], total: count ?? 0 }
}

export async function deleteStory(id: string) {
  const { error } = await supabase.from('stories').delete().eq('id', id)
  if (error) throw error
}
