import { Routes, Route } from 'react-router-dom';
import NurseDashboard from '../dashboard/NurseDashboard';
import NursePatients from '../dashboard/nurse/NursePatients';
import NurseAssignments from '../dashboard/nurse/NurseAssignments';
import NurseProfile from '../dashboard/nurse/NurseProfile';
import NurseSchedule from '../dashboard/nurse/NurseSchedule';

const NurseRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<NurseDashboard />} />
            <Route path="patients" element={<NursePatients />} />
            <Route path="assignments" element={<NurseAssignments />} />
            <Route path="schedule" element={<NurseSchedule />} />
            <Route path="profile" element={<NurseProfile />} />
        </Routes>
    );
};

export default NurseRoutes;
