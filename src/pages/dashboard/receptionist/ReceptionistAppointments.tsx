import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import { FaCalendarCheck, FaUser, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

interface AppointmentType {
    id: number;
    patientName: string;
    doctorName: string;
    time: string;
    type: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}

const ReceptionistAppointments = () => {
    // Static data for now as no appointments API exists
    const appointments: AppointmentType[] = [
        { id: 1, patientName: "John Doe", doctorName: "Dr. Smith", time: "09:00 AM", type: "Checkup", status: "Confirmed" },
        { id: 2, patientName: "Sarah Connor", doctorName: "Dr. Lee", time: "10:30 AM", type: "Consultation", status: "Pending" },
        { id: 3, patientName: "Mike Ross", doctorName: "Dr. Smith", time: "11:00 AM", type: "Follow-up", status: "Pending" },
        { id: 4, patientName: "Rachel Green", doctorName: "Dr. Brown", time: "02:00 PM", type: "Emergency", status: "Pending" },
    ];

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
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4 text-center">Type</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                                {appointments.map(apt => (
                                    <tr key={apt.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-xs text-gray-500 dark:text-slate-300 font-bold">
                                                <FaUser />
                                            </div>
                                            {apt.patientName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                                            {apt.doctorName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-slate-400 flex items-center gap-2">
                                           <FaClock className="text-gray-400 dark:text-slate-500" /> {apt.time}
                                        </td>
                                         <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30">
                                                {apt.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                apt.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                                                apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300' :
                                                'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                                            }`}>
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded transition-colors" title="Confirm">
                                                    <FaCheck />
                                                </button>
                                                <button className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors" title="Cancel">
                                                    <FaTimes />
                                                </button>
                                            </div>
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

export default ReceptionistAppointments;
