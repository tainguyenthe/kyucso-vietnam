export interface Database {
  public: {
    Tables: {
      heroes: {
        Row: Hero
        Insert: Omit<Hero, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Hero, 'id' | 'created_at'>>
      }
      battlefields: {
        Row: Battlefield
        Insert: Omit<Battlefield, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Battlefield, 'id' | 'created_at'>>
      }
      stories: {
        Row: Story
        Insert: Omit<Story, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Story, 'id' | 'created_at'>>
      }
      ai_matches: {
        Row: AiMatch
        Insert: Omit<AiMatch, 'id' | 'created_at'>
        Update: Partial<Omit<AiMatch, 'id' | 'created_at'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
    }
  }
}

export interface Hero {
  id: string
  full_name: string
  birth_year: number | null
  death_year: number | null
  birth_place: string | null
  era: string
  rank: string | null
  unit: string | null
  achievements: string | null
  biography: string | null
  portrait_url: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface Battlefield {
  id: string
  name: string
  description: string | null
  location: string | null
  era: string
  latitude: number | null
  longitude: number | null
  panorama_url: string | null
  thumbnail_url: string | null
  markers: BattlefieldMarker[] | null
  category: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface BattlefieldMarker {
  id: string
  longitude: number
  latitude: number
  tooltip: string
  description?: string
  image_url?: string
}

export interface Story {
  id: string
  title: string
  content: string
  excerpt: string | null
  cover_image_url: string | null
  author_id: string
  era: string | null
  location: string | null
  characters: string[] | null
  audio_url: string | null
  entities: StoryEntity[] | null
  status: 'draft' | 'pending_review' | 'published' | 'rejected'
  created_at: string
  updated_at: string
  author?: Profile
}

export interface StoryEntity {
  type: 'person' | 'place' | 'date' | 'unit' | 'event'
  value: string
  confidence: number
}

export interface AiMatch {
  id: string
  source_type: 'story' | 'hero'
  source_id: string
  target_type: 'story' | 'hero'
  target_id: string
  similarity_score: number
  matched_entities: string[] | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}
