export const APP_NAME = 'KÍ ỨC SỐ LỊCH SỬ VIỆT NAM'
export const APP_DESCRIPTION = 'Nền tảng số hóa ký ức chiến tranh Việt Nam'

export const ERAS = [
  { value: 'chong-phap', label: 'Kháng chiến chống Pháp (1945-1954)' },
  { value: 'chong-my', label: 'Kháng chiến chống Mỹ (1954-1975)' },
  { value: 'bien-gioi', label: 'Chiến tranh biên giới (1979)' },
  { value: 'khac', label: 'Khác' },
] as const

export const HERO_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
} as const

export const STORY_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending_review',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
} as const

export const ROUTES = {
  HOME: '/',
  SEARCH: '/tra-cuu',
  HERO_DETAIL: '/tra-cuu/:id',
  BATTLEFIELDS: '/khong-gian-3d',
  BATTLEFIELD_DETAIL: '/khong-gian-3d/:id',
  MEMORIES: '/chia-se-ky-uc',
  MEMORY_CREATE: '/chia-se-ky-uc/tao-moi',
  MEMORY_DETAIL: '/chia-se-ky-uc/:id',
  LOGIN: '/dang-nhap',
  REGISTER: '/dang-ky',
  ADMIN: '/admin',
  ADMIN_HEROES: '/admin/anh-hung',
  ADMIN_HERO_CREATE: '/admin/anh-hung/tao-moi',
  ADMIN_HERO_EDIT: '/admin/anh-hung/:id/chinh-sua',
  ADMIN_STORIES: '/admin/ky-uc',
  ADMIN_BATTLEFIELDS: '/admin/chien-truong',
  ADMIN_USERS: '/admin/nguoi-dung',
} as const
