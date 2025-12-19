import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';
import { FaCalendarCheck, FaUser, FaClock, FaSearch } from 'react-icons/fa';

interface Appointment {
    _id: string;
    patient: {
        _id: string;
        name: string;
        email: string;
        phone?: string;
    };
    date: string;
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
    type: string;
    notes?: string;
}

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = appointments.filter(apt =>
                apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                apt.patient.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredAppointments(filtered);
        } else {
            setFilteredAppointments(appointments);
        }
    }, [searchTerm, appointments]);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointments/doctor`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(res.data.appointments || []);
            setFilteredAppointments(res.data.appointments || []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            toast.error("Failed to load appointments");
        } finally {
            setLoading(false);
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

    const StatusChip = ({ status }: { status: string }) => {
        const colors = {
            Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
            Confirmed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
            Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
            Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
        };
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
                {status}
            </span>
        );
    };

    if (loading) return <Loading />;

    return (
        <SidebarLayout>
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCalendarCheck className="text-sky-600 dark:text-sky-500" />
                            My Appointments
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">View and manage your patient appointments.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                    <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search patients..."
                                className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all w-full md:w-64 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredAppointments.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 dark:text-slate-400">
                            {searchTerm ? 'No appointments match your search.' : 'No appointments scheduled yet.'}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                                        <th className="px-6 py-4">Patient</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Time</th>
                                        <th className="px-6 py-4 text-center">Type</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4">Contact</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                                    {filteredAppointments.map(apt => (
                                        <tr key={apt._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center text-xs text-sky-600 dark:text-sky-400 font-bold">
                                                    <FaUser />
                                                </div>
                                                {apt.patient.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                                                {formatDate(apt.date)}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-slate-400 flex items-center gap-2">
                                                <FaClock className="text-gray-400 dark:text-slate-500" /> {formatTime(apt.date)}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                                    {apt.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusChip status={apt.status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-400">
                                                {apt.patient.phone || apt.patient.email}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default DoctorAppointments;
