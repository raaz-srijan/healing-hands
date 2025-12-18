import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { role, _id } = useSelector((state: any) => state.user); 
    if (!_id) {
        return <Navigate to="/auth/login" replace />;
    }

    const normalizedUserRole = role?.toLowerCase();
    const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());

    if (normalizedUserRole && !normalizedAllowedRoles.includes(normalizedUserRole)) {
        return <Navigate to="/unauth" replace />;
    }

    if (!normalizedUserRole) {
         return <Navigate to="/unauth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
