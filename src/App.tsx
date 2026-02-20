import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout'
import { LandingPage } from './pages/LandingPage'
import { VoucherClaimPage } from './pages/VoucherClaimPage'
import { VoucherStatusPage } from './pages/VoucherStatusPage'
import { AdminLayout } from './layouts/AdminLayout'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminTeamsPage } from './pages/admin/AdminTeamsPage'
import { AdminKpisPage } from './pages/admin/AdminKpisPage'
import { AdminFaqPage } from './pages/admin/AdminFaqPage'
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage'
import { AdminVouchersPage } from './pages/admin/AdminVouchersPage'

function App() {
  return (
    <div className="layout-root">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/vouchers/claim" element={<VoucherClaimPage />} />
          <Route path="/vouchers/status" element={<VoucherStatusPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="teams" element={<AdminTeamsPage />} />
          <Route path="kpis" element={<AdminKpisPage />} />
          <Route path="faqs" element={<AdminFaqPage />} />
          <Route path="gallery" element={<AdminGalleryPage />} />
          <Route path="vouchers" element={<AdminVouchersPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

