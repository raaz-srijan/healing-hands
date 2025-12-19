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

        </Routes>
      </AuthInitializer>
    </DarkModeProvider>
  )
}


export default App
