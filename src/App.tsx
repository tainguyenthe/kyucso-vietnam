import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { useAuthStore } from '@/store/authStore'

// Eager-loaded pages (critical path)
import { HomePage } from '@/pages/HomePage'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'

// Lazy-loaded pages
const HeroSearchPage = lazy(() => import('@/pages/HeroSearchPage').then(m => ({ default: m.HeroSearchPage })))
const HeroDetailPage = lazy(() => import('@/pages/HeroDetailPage').then(m => ({ default: m.HeroDetailPage })))
const BattlefieldListPage = lazy(() => import('@/pages/BattlefieldListPage').then(m => ({ default: m.BattlefieldListPage })))
const BattlefieldDetailPage = lazy(() => import('@/pages/BattlefieldDetailPage').then(m => ({ default: m.BattlefieldDetailPage })))
const MemoryListPage = lazy(() => import('@/pages/MemoryListPage').then(m => ({ default: m.MemoryListPage })))
const MemoryDetailPage = lazy(() => import('@/pages/MemoryDetailPage').then(m => ({ default: m.MemoryDetailPage })))
const MemoryCreatePage = lazy(() => import('@/pages/MemoryCreatePage').then(m => ({ default: m.MemoryCreatePage })))

// Admin pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminHeroList = lazy(() => import('@/pages/admin/AdminHeroList').then(m => ({ default: m.AdminHeroList })))
const AdminHeroForm = lazy(() => import('@/pages/admin/AdminHeroForm').then(m => ({ default: m.AdminHeroForm })))
const AdminStoryList = lazy(() => import('@/pages/admin/AdminStoryList').then(m => ({ default: m.AdminStoryList })))
const AdminBattlefieldList = lazy(() => import('@/pages/admin/AdminBattlefieldList').then(m => ({ default: m.AdminBattlefieldList })))
const AdminUserList = lazy(() => import('@/pages/admin/AdminUserList').then(m => ({ default: m.AdminUserList })))

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-maroon-300 border-t-maroon-700 rounded-full" />
    </div>
  )
}

export default function App() {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#fff', color: '#8B1A1A', border: '1px solid #f9cccc' },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tra-cuu" element={<HeroSearchPage />} />
            <Route path="tra-cuu/:id" element={<HeroDetailPage />} />
            <Route path="khong-gian-3d" element={<BattlefieldListPage />} />
            <Route path="khong-gian-3d/:id" element={<BattlefieldDetailPage />} />
            <Route path="chia-se-ky-uc" element={<MemoryListPage />} />
            <Route path="chia-se-ky-uc/tao-moi" element={<MemoryCreatePage />} />
            <Route path="chia-se-ky-uc/:id" element={<MemoryDetailPage />} />
            <Route path="dang-nhap" element={<LoginPage />} />
            <Route path="dang-ky" element={<RegisterPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="anh-hung" element={<AdminHeroList />} />
            <Route path="anh-hung/tao-moi" element={<AdminHeroForm />} />
            <Route path="anh-hung/:id/chinh-sua" element={<AdminHeroForm />} />
            <Route path="ky-uc" element={<AdminStoryList />} />
            <Route path="chien-truong" element={<AdminBattlefieldList />} />
            <Route path="nguoi-dung" element={<AdminUserList />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
