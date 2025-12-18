import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthRoutes from './pages/routes/AuthRoutes'
import AdminRoutes from './pages/routes/AdminRoutes'
import DoctorRoutes from './pages/routes/DoctorRoutes'
import NurseRoutes from './pages/routes/NurseRoutes'
import ReceptionistRoutes from './pages/routes/ReceptionistRoutes'
import PatientRoutes from './pages/routes/PatientRoutes'
import PublicRoutes from './pages/routes/PublicRoutes'
import AuthInitializer from './components/AuthInitializer'
import { DarkModeProvider } from './context/DarkModeContext'

import ScrollToTop from './components/ScrollToTop'

import PublicOnlyRoute from './components/PublicOnlyRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Unauth from './pages/Unauth'

function App() {
  return (
    <DarkModeProvider>
      <AuthInitializer>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />
          
          {/* Auth Routes (Login/Register) - Only accessible if NOT logged in */}
          <Route element={<PublicOnlyRoute />}>
             <Route path="auth/*" element={<AuthRoutes />} />
          </Route>

          <Route path="unauth" element={<Unauth />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="dashboard/admin/*" element={<AdminRoutes />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Doctor']} />}>
            <Route path="dashboard/doctor/*" element={<DoctorRoutes />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Nurse']} />}>
            <Route path="dashboard/nurse/*" element={<NurseRoutes />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Receptionist']} />}>
            <Route path="dashboard/receptionist/*" element={<ReceptionistRoutes />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Patient']} />}>
            <Route path="dashboard/patient/*" element={<PatientRoutes />} />
          </Route>

          {/* 404 Catch-all - typically needs to be last, but since PublicRoutes catches /*, we might need to adjust PublicRoutes to not match everything or put this inside PublicRoutes. 
             Actually, PublicRoutes has index and specific paths. If PublicRoutes uses /* in App.tsx, it matches everything.
             Better approach: PublicRoutes should probably NOT be mapped to /* at the top level if we want a global 404.
             However, since PublicLayout has an Outlet, the 404 for public pages should be inside PublicRoutes.
          */}
        </Routes>
      </AuthInitializer>
    </DarkModeProvider>
  )
}


export default App
