import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicOnlyRoute = () => {
    const user = useSelector((state: any) => state.user);
    const userId = user?._id;
    const userRole = user?.role;

    if (userId) {
        // Redirect to their respective dashboard based on role case-insensitively
        const normalizedRole = userRole?.toLowerCase();
        
        switch (normalizedRole) {
            case 'admin': return <Navigate to="/dashboard/admin" replace />;
            case 'doctor': return <Navigate to="/dashboard/doctor" replace />;
            case 'nurse': return <Navigate to="/dashboard/nurse" replace />;
            case 'receptionist': return <Navigate to="/dashboard/receptionist" replace />;
            case 'patient': return <Navigate to="/dashboard/patient" replace />;
            default: return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};

export default PublicOnlyRoute;
