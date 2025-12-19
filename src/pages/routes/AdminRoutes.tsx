import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../dashboard/AdminDashboard';
import UserManagement from '../dashboard/admin/UserManagement';
import ManageDoctors from '../dashboard/admin/ManageDoctors';
import ManageNurses from '../dashboard/admin/ManageNurses';
import ManageReceptionists from '../dashboard/admin/ManageReceptionists';
import ManagePatients from '../dashboard/admin/ManagePatients';
import RoleManagement from '../dashboard/admin/RoleManagement';
import ManageChatbot from '../dashboard/admin/ManageChatbot';
import SidebarLayout from '../../components/dashboard/SidebarLayout';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="users" element={<SidebarLayout><UserManagement /></SidebarLayout>} />
      <Route path="doctors" element={<SidebarLayout><ManageDoctors /></SidebarLayout>} />
      <Route path="nurses" element={<SidebarLayout><ManageNurses /></SidebarLayout>} />
      <Route path="receptionists" element={<SidebarLayout><ManageReceptionists /></SidebarLayout>} />
      <Route path="patients" element={<SidebarLayout><ManagePatients /></SidebarLayout>} />
      <Route path="roles" element={<SidebarLayout><RoleManagement /></SidebarLayout>} />
      <Route path="chatbot" element={<SidebarLayout><ManageChatbot /></SidebarLayout>} />
      <Route path="faqs" element={<SidebarLayout><ManageChatbot /></SidebarLayout>} />
    </Routes>
  );
};

export default AdminRoutes;

