import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FaUsers, 
  FaUserMd, 
  FaCalendarCheck, 
  FaProcedures 
} from "react-icons/fa";
import StatCard from "../../components/dashboard/StatCard";
import { AppointmentsChart, PatientFlowChart } from "../../components/dashboard/Charts";
import SidebarLayout from "../../components/dashboard/SidebarLayout";
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState<{
        patients: number;
        medicalStaff: number;
        appointments: number;
        admissions: number;
        charts?: {
            appointments: Record<string, number>;
            patientFlow: { month: string; newPatients: number; discharged: number }[];
        };
    }>({
        patients: 0,
        medicalStaff: 0,
        appointments: 0,
        admissions: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats/admin`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setStats(res.data.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
                toast.error("Failed to load dashboard statistics");
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Monitor hospital performance and statistics.</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Patients" 
            value={loading ? "..." : stats.patients.toString()} 
            icon={<FaUsers />} 
            trend="+12% from last month" 
            trendUp={true} 
            color="bg-sky-500"
          />
          <StatCard 
            title="Medical Staff" 
            value={loading ? "..." : stats.medicalStaff.toString()} 
            icon={<FaUserMd />} 
            trend="Doctors, Nurses & Support" 
            trendUp={true} 
            color="bg-purple-500"
          />
          <StatCard 
            title="Today's Appointments" 
            value={loading ? "..." : stats.appointments.toString()} 
            icon={<FaCalendarCheck />} 
            trend="5 Pending Confirmation" 
            trendUp={true} 
            color="bg-emerald-500"
          />
           <StatCard 
            title="Active Admissions" 
            value={loading ? "..." : stats.admissions.toString()} 
            icon={<FaProcedures />} 
            trend="8 Discharges pending" 
            trendUp={false} 
            color="bg-orange-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 h-96 transition-colors duration-300">
            <AppointmentsChart data={stats.charts?.appointments} />
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 h-96 transition-colors duration-300">
            <PatientFlowChart data={stats.charts?.patientFlow} />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default AdminDashboard;
