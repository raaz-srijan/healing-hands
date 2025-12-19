import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import { FaCalendarCheck, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

const DoctorAppointments = () => {
    // Static Data Placeholder
    const appointments = [
        { id: 1, patient: "Alice Johnson", age: 32, time: "09:00 AM", type: "Regular Check-up", status: "Confirmed", date: "2024-10-24" },
        { id: 2, patient: "Bob Smith", age: 45, time: "10:30 AM", type: "Cardiology Consult", status: "Pending", date: "2024-10-24" },
        { id: 3, patient: "Charlie Brown", age: 28, time: "11:45 AM", type: "Follow-up", status: "Confirmed", date: "2024-10-24" },
        { id: 4, patient: "Diana Ross", age: 24, time: "02:15 PM", type: "General Inquiry", status: "Cancelled", date: "2024-10-24" },
        { id: 5, patient: "Evan Wright", age: 50, time: "03:30 PM", type: "Emergency", status: "Completed", date: "2024-10-23" },
    ];

    const getStatusChip = (status: string) => {
        switch(status) {
            case 'Confirmed': return <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/30"><FaCheckCircle /> Confirmed</span>;
            case 'Pending': return <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/30"><FaHourglassHalf /> Pending</span>;
            case 'Cancelled': return <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800/30"><FaTimesCircle /> Cancelled</span>;
            case 'Completed': return <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600"><FaCheckCircle /> Completed</span>;
            default: return null;
        }
    };

    return (
        <SidebarLayout>
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaCalendarCheck className="text-sky-600 dark:text-sky-400" />
                            Appointments
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Manage your upcoming and past appointments.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Patient</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                                {appointments.map(app => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white">
                                                <FaClock className="text-gray-400 dark:text-slate-500" /> {app.time}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-slate-400 ml-6">{app.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                                                    {app.patient.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{app.patient}</div>
                                                    <div className="text-xs text-gray-500 dark:text-slate-400">{app.age} yrs, Male</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300 font-medium">
                                            {app.type}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center">
                                                {getStatusChip(app.status)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium transition-colors">
                                                Reschedule
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default DoctorAppointments;
