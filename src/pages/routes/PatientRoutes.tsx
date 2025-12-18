import { Routes, Route } from 'react-router-dom';
import PatientDashboard from '../dashboard/PatientDashboard';
import PatientAppointments from '../dashboard/patient/PatientAppointments';
import PatientRecords from '../dashboard/patient/PatientRecords';
import PatientProfile from '../dashboard/patient/PatientProfile';

const PatientRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PatientDashboard />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="records" element={<PatientRecords />} />
            <Route path="profile" element={<PatientProfile />} />
        </Routes>
    );
};

export default PatientRoutes;
