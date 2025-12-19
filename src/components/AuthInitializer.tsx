import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login, logout } from '../redux/userSlice';
import Loading from './Loading';

interface AuthInitializerProps {
    children: React.ReactNode;
}   

const AuthInitializer = ({ children }: AuthInitializerProps) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.success && res.data.user) {
                    dispatch(login({ ...res.data.user, token }));
                } else {
                    dispatch(logout());
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error("Auth initialization failed:", error);
                dispatch(logout());
                localStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, [dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    return <>{children}</>;
};

export default AuthInitializer;
