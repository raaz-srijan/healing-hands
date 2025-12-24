import { useState, useEffect } from 'react';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import { FaCalendarCheck, FaUser, FaClock, FaCheck,  FaBan } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading';

interface UserType {
    _id: string;
    name: string;
    email: string;
    phone?: string;
}

interface AppointmentType {
    _id: string;
    patient: UserType;
    doctor: UserType;
    date: string;
    type: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
    notes?: string;
}

const ReceptionistAppointments = () => {
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector((state: any) => state.user);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointments`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(res.data.appointments);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load appointments");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [token]);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/appointments/${id}/status`,
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Appointment ${newStatus}`);
            // Optimistic update or refetch
            setAppointments(prev => prev.map(apt => 
                apt._id === id ? { ...apt, status: newStatus as any } : apt
            ));
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    if (loading) return <Loading />;

    return (
        <SidebarLayout>
             <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCalendarCheck className="text-sky-600 dark:text-sky-500" />
                            Appointment Management
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">View and manage daily appointments.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                                    <th className="px-6 py-4">Patient</th>
                                    <th className="px-6 py-4">Doctor</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4 text-center">Type</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                                {appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-slate-400">
                                            No appointments found.
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map(apt => {
                                        const { date, time } = formatDate(apt.date);
                                        return (
                                            <tr key={apt._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs text-gray-500 dark:text-slate-300 font-bold shrink-0">
                                                        <FaUser />
                                                    </div>
                                                    <div>
                                                        <div>{apt.patient?.name || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-400 font-normal">{apt.patient?.phone}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                                                    {apt.doctor?.name || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600 dark:text-slate-400">
                                                   <div className="flex items-center gap-2">
                                                        <FaClock className="text-gray-400 dark:text-slate-500 shrink-0" />
                                                        <div className="flex flex-col text-sm">
                                                            <span>{date}</span>
                                                            <span className="text-xs text-gray-400">{time}</span>
                                                        </div>
                                                   </div>
                                                </td>
                                                 <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30">
                                                        {apt.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                                                        apt.status === 'Completed' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300' :
                                                        apt.status === 'Cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' :
                                                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300'
                                                    }`}>
                                                        {apt.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {apt.status !== 'Confirmed' && apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                                                            <button 
                                                                onClick={() => handleStatusUpdate(apt._id, 'Confirmed')}
                                                                className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors" 
                                                                title="Confirm"
                                                            >
                                                                <FaCheck />
                                                            </button>
                                                        )}
                                                        {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                                                            <button 
                                                                onClick={() => handleStatusUpdate(apt._id, 'Cancelled')}
                                                                className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" 
                                                                title="Cancel"
                                                            >
                                                                <FaBan />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                     </div>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default ReceptionistAppointments;
