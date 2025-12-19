import SidebarLayout from "../../components/dashboard/SidebarLayout";
import StatCard from "../../components/dashboard/StatCard";
import { FaUserInjured, FaCalendarCheck, FaClipboardList, FaClock } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
    // Dynamic Data for Doctor Dashboard
    const [stats, setStats] = useState({
        totalPatients: 0,
        appointmentsToday: 0,
        pendingReports: 0,
        avgWaitTime: "0m"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats/doctor`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStats(res.data.data);
            } catch (error) {
                console.error("Error fetching doctor stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statConfig = [
        { title: "Total Patients", value: stats.totalPatients.toString(), icon: <FaUserInjured />, color: "bg-emerald-500" },
        { title: "Appointments Today", value: stats.appointmentsToday.toString(), icon: <FaCalendarCheck />, color: "bg-blue-500" },
        { title: "Pending Reports", value: stats.pendingReports.toString(), icon: <FaClipboardList />, color: "bg-orange-500" },
        { title: "Avg. Wait Time", value: stats.avgWaitTime, icon: <FaClock />, color: "bg-purple-500" },
    ];

    const upcomingAppointments = [
        { id: 1, patient: "Alice Johnson", time: "09:00 AM", type: "Check-up", status: "Confirmed" },
        { id: 2, patient: "Bob Smith", time: "10:30 AM", type: "Consultation", status: "Pending" },
        { id: 3, patient: "Charlie Brown", time: "11:45 AM", type: "Follow-up", status: "Confirmed" },
        { id: 4, patient: "David Lee", time: "02:15 PM", type: "Emergency", status: "In Progress" },
    ];
 
  return (
    <SidebarLayout>
        <div className="space-y-6 animate-fade-in-up">
            {/* Stats Row */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statConfig.map((stat, index) => (
                    <StatCard 
                        key={index}
                        title={stat.title}
                        value={loading ? "..." : stat.value}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Upcoming Appointments Table */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">Upcoming Appointments</h3>
                        <button className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-xs uppercase text-gray-500 dark:text-slate-400 font-semibold">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Patient</th>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3 rounded-r-lg text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                                {upcomingAppointments.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-800 dark:text-slate-100">{app.patient}</td>
                                        <td className="px-4 py-3 text-gray-600 dark:text-slate-300">{app.time}</td>
                                        <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{app.type}</td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold 
                                                ${app.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 
                                                  app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Schedule Preview */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 transition-colors duration-300">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-4">Today's Schedule</h3>
                    <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50 flex gap-3">
                            <div className="text-center min-w-[3rem]">
                                <div className="text-xs text-sky-600 dark:text-sky-400 font-bold uppercase">Oct</div>
                                <div className="text-xl font-bold text-sky-800 dark:text-sky-300">24</div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-slate-100 text-sm">General Ward Rounds</h4>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">08:00 AM - 10:00 AM</p>
                            </div>
                        </div>
                         <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/50 flex gap-3">
                            <div className="text-center min-w-[3rem]">
                                <div className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase">Oct</div>
                                <div className="text-xl font-bold text-orange-800 dark:text-orange-300">24</div>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-slate-100 text-sm">Staff Meeting</h4>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">01:00 PM - 02:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </SidebarLayout>
  );
};

export default DoctorDashboard;
