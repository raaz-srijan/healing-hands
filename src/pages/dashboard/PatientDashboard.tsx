import SidebarLayout from "../../components/dashboard/SidebarLayout";
import StatCard from "../../components/dashboard/StatCard";
import { FaCalendarAlt, FaFileMedical, FaUserMd, FaPills } from "react-icons/fa";

const PatientDashboard = () => {
  return (
    <SidebarLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Health Dashboard</h2>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Access your records and upcoming appointments.</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Next Appointment" 
            value="Oct 24" 
            icon={<FaCalendarAlt />} 
            trend="09:00 AM" 
            trendUp={true} 
            color="bg-sky-500"
          />
          <StatCard 
            title="Lab Reports" 
            value="2 New" 
            icon={<FaFileMedical />} 
            trend="Available now" 
            trendUp={true} 
             color="bg-emerald-500"
          />
          <StatCard 
            title="Prescriptions" 
            value="Active" 
            icon={<FaPills />} 
            trend="Refill in 5 days" 
            trendUp={true} 
             color="bg-orange-500"
          />
           <StatCard 
            title="My Doctor" 
            value="Dr. Smith" 
            icon={<FaUserMd />} 
            trend="Cardiology" 
            trendUp={true} 
             color="bg-purple-500"
          />
        </div>

        {/* Upcoming Appointments Container */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
           <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Upcoming Appointments</h3>
           <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                   <thead>
                        <tr className="bg-gray-50/50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Doctor</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                       <tr className="border-b border-gray-50 dark:border-slate-700 hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                           <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Oct 24, 2024 - 09:00 AM</td>
                           <td className="px-6 py-4 text-gray-600 dark:text-slate-300">Dr. John Smith</td>
                           <td className="px-6 py-4 text-gray-600 dark:text-slate-300">Cardiology</td>
                           <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded text-xs border border-green-200 dark:border-green-800/30">Confirmed</span></td>
                       </tr>
                       <tr className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                           <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Nov 12, 2024 - 10:30 AM</td>
                           <td className="px-6 py-4 text-gray-600 dark:text-slate-300">Dr. Sarah Lee</td>
                           <td className="px-6 py-4 text-gray-600 dark:text-slate-300">Dermatology</td>
                           <td className="px-6 py-4 text-center"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs border border-yellow-200 dark:border-yellow-800/30">Pending</span></td>
                       </tr>
                   </tbody>
               </table>
           </div>
         </div>
      </div>
    </SidebarLayout>
  );
};

export default PatientDashboard;
