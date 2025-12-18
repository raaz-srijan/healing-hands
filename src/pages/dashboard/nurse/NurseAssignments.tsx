import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import { FaClipboardList, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const NurseAssignments = () => {
    // Static Data
    const assignments = [
        { id: 1, task: "Morning Vitals Check - Ward A", time: "08:00 AM", priority: "High", status: "Completed" },
        { id: 2, task: "Medication Administration - Room 102", time: "09:00 AM", priority: "High", status: "Pending" },
        { id: 3, task: "Patient Transfer - Room 105", time: "10:30 AM", priority: "Medium", status: "Pending" },
        { id: 4, task: "Wound Dressing - Room 104", time: "12:00 PM", priority: "Medium", status: "Pending" },
        { id: 5, task: "Update Patient Charts", time: "02:00 PM", priority: "Low", status: "Pending" },
    ];

    return (
        <SidebarLayout>
            <div className="space-y-6 animate-fade-in-up">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaClipboardList className="text-sky-600" />
                            Daily Assignments
                        </h2>
                        <p className="text-sm text-gray-500">Track and manage your daily nursing tasks.</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="px-6 py-4">Task</th>
                                    <th className="px-6 py-4">Time</th>
                                    <th className="px-6 py-4 text-center">Priority</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {assignments.map(task => (
                                    <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            {task.task}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                            <FaClock className="text-gray-400" /> {task.time}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {task.status === 'Completed' ? (
                                                <span className="flex items-center justify-center gap-1 text-emerald-600 font-medium text-sm">
                                                    <FaCheckCircle /> Done
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-1 text-orange-500 font-medium text-sm">
                                                    <FaExclamationCircle /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {task.status !== 'Completed' && (
                                                <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                                                    Mark Done
                                                </button>
                                            )}
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

export default NurseAssignments;
