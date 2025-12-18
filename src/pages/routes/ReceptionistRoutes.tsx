import { Routes, Route } from 'react-router-dom';
import ReceptionistDashboard from '../dashboard/ReceptionistDashboard';
import ReceptionistAppointments from '../dashboard/receptionist/ReceptionistAppointments';
import ReceptionistRegister from '../dashboard/receptionist/ReceptionistRegister';
import ReceptionistProfile from '../dashboard/receptionist/ReceptionistProfile';
import ReceptionistSchedule from '../dashboard/receptionist/ReceptionistSchedule';

const ReceptionistRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ReceptionistDashboard />} />
            <Route path="appointments" element={<ReceptionistAppointments />} />
            <Route path="register" element={<ReceptionistRegister />} />
            <Route path="schedule" element={<ReceptionistSchedule />} />
            <Route path="profile" element={<ReceptionistProfile />} />
        </Routes>
    );
};

export default ReceptionistRoutes;
