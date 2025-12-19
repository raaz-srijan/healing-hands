import SidebarLayout from "../../components/dashboard/SidebarLayout";
import StatCard from "../../components/dashboard/StatCard";
import { FaUserPlus, FaCalendarCheck, FaPhone, FaClock } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';

const ReceptionistDashboard = () => {
    const [stats, setStats] = useState({
        newRegistrations: 0,
        todayAppointments: 0,
        callsInQueue: 0,
        doctorAvailability: "0 active"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats/receptionist`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStats(res.data.data);
            } catch (error) {
                console.error("Error fetching receptionist stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

  return (
    <SidebarLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Front Desk Overview</h2>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Manage patient flow and appointments.</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="New Registrations" 
            value={loading ? "..." : stats.newRegistrations.toString()} 
            icon={<FaUserPlus />} 
            trend="+3 from yesterday" 
            trendUp={true} 
            color="bg-emerald-500"
          />
          <StatCard 
            title="Today's Appointments" 
            value={loading ? "..." : stats.todayAppointments.toString()} 
            icon={<FaCalendarCheck />} 
            trend="12 checked in" 
            trendUp={true} 
             color="bg-blue-500"
          />
          <StatCard 
            title="Calls in Queue" 
            value={loading ? "..." : stats.callsInQueue.toString()} 
            icon={<FaPhone />} 
            trend="Avg hold: 2m" 
            trendUp={false} 
             color="bg-purple-500"
          />
           <StatCard 
            title="Dr. Availability" 
            value={loading ? "..." : stats.doctorAvailability} 
            icon={<FaClock />} 
            trend="On duty now" 
            trendUp={true} 
             color="bg-orange-500"
          />
        </div>

        {/* Quick Actions Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-4">Patient Check-In Queue</h3>
                <div className="space-y-3">
                   {["John Doe - 09:00 AM", "Sarah Smith - 09:15 AM", "Mike Brown - 09:30 AM"].map((p, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors">
                           <span className="text-gray-700 dark:text-slate-200 font-medium">{p}</span>
                           <button className="text-xs bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700 transition-colors">Check In</button>
                       </div>
                   ))}
                </div>
            </div>
             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-4">Recent Calls</h3>
                <div className="space-y-3">
                   {[
                       {name: "Alice Williams", type: "Inquiry", time: "5m ago"},
                       {name: "Bob Jones", type: "Appointment", time: "12m ago"},
                       {name: "Unknown", type: "Emergency", time: "25m ago"}
                   ].map((c, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700/30 rounded-lg transition-colors">
                           <div>
                               <p className="text-gray-800 dark:text-slate-200 font-medium">{c.name}</p>
                               <p className="text-xs text-gray-500 dark:text-slate-400">{c.type}</p>
                           </div>
                           <span className="text-xs text-gray-400 dark:text-slate-500">{c.time}</span>
                       </div>
                   ))}
                </div>
            </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ReceptionistDashboard;
