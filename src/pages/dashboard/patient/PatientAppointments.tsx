import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';
import { FaCalendarAlt, FaUserMd, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface Appointment {
    _id: string;
    doctorDetails: {
        name: string;
        email: string;
        specialization: string;
        department: string;
    };
    date: string;
    status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
    type: string;
    notes?: string;
}

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/patient`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(res.data.appointments || []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelAppointment = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this appointment?")) return;

        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/appointments/${id}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Appointment cancelled successfully");
            fetchAppointments(); // Refresh the list
        } catch (error: any) {
            console.error("Error cancelling appointment:", error);
            toast.error(error.response?.data?.message || "Failed to cancel appointment");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <Loading />;

    return (
        <SidebarLayout>
             <div className="max-w-5xl mx-auto space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCalendarAlt className="text-sky-600 dark:text-sky-500" />
                            My Appointments
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Track your past and upcoming visits.</p>
                    </div>
                </div>

                {appointments.length === 0 ? (
                    <div className="bg-white dark:bg-slate-800 p-12 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
                        <p className="text-gray-500 dark:text-slate-400">No appointments found. Book your first appointment!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {appointments.map(apt => (
                            <div key={apt._id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400">
                                        <FaUserMd className="text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">{apt.doctorDetails.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">{apt.doctorDetails.department}</p>
                                        <div className="max-md:mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-slate-500 mt-1">
                                            <span className="flex items-center gap-1"><FaCalendarAlt /> {formatDate(apt.date)}</span>
                                            <span className="flex items-center gap-1"><FaClock /> {formatTime(apt.date)}</span>
                                        </div>
                                         <div className="text-sm text-gray-400 dark:text-slate-500 mt-1 flex items-center gap-1">
                                            <FaMapMarkerAlt /> {apt.type}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                                        apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300' :
                                        apt.status === 'Completed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                                        'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                    }`}>
                                        {apt.status}
                                    </span>
                                    {(apt.status === 'Confirmed' || apt.status === 'Pending') && (
                                        <button 
                                            onClick={() => handleCancelAppointment(apt._id)}
                                            className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium transition-colors"
                                        >
                                            Cancel Appointment
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
};

export default PatientAppointments;

