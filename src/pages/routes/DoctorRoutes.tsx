import { Routes, Route } from 'react-router-dom';
import DoctorDashboard from '../dashboard/DoctorDashboard';
import DoctorPatients from '../dashboard/doctor/DoctorPatients';
import DoctorAppointments from '../dashboard/doctor/DoctorAppointments';
import DoctorSchedule from '../dashboard/doctor/DoctorSchedule';
import DoctorReports from '../dashboard/doctor/DoctorReports';
import DoctorProfile from '../dashboard/doctor/DoctorProfile';

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DoctorDashboard />} />
      <Route path="patients" element={<DoctorPatients />} />
      <Route path="appointments" element={<DoctorAppointments />} />
      <Route path="schedule" element={<DoctorSchedule />} />
      <Route path="reports" element={<DoctorReports />} />
      <Route path="profile" element={<DoctorProfile />} />
    </Routes>
  );
};

export default DoctorRoutes;
