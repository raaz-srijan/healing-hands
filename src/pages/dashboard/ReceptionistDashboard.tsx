import SidebarLayout from "../../components/dashboard/SidebarLayout";
import StatCard from "../../components/dashboard/StatCard";
import { FaUserPlus, FaCalendarCheck, FaPhone, FaClock } from "react-icons/fa";

const ReceptionistDashboard = () => {
  return (
    <SidebarLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Front Desk Overview</h2>
          <p className="text-gray-500 mt-1">Manage patient flow and appointments.</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="New Registrations" 
            value="8" 
            icon={<FaUserPlus />} 
            trend="+3 from yesterday" 
            trendUp={true} 
            color="bg-emerald-500"
          />
          <StatCard 
            title="Today's Appointments" 
            value="34" 
            icon={<FaCalendarCheck />} 
            trend="12 checked in" 
            trendUp={true} 
             color="bg-blue-500"
          />
          <StatCard 
            title="Calls in Queue" 
            value="2" 
            icon={<FaPhone />} 
            trend="Avg hold: 2m" 
            trendUp={false} 
             color="bg-purple-500"
          />
           <StatCard 
            title="Dr. Availability" 
            value="15/18" 
            icon={<FaClock />} 
            trend="On duty now" 
            trendUp={true} 
             color="bg-orange-500"
          />
        </div>

        {/* Quick Actions Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Patient Check-In Queue</h3>
                <div className="space-y-3">
                   {["John Doe - 09:00 AM", "Sarah Smith - 09:15 AM", "Mike Brown - 09:30 AM"].map((p, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                           <span className="text-gray-700 font-medium">{p}</span>
                           <button className="text-xs bg-sky-600 text-white px-3 py-1 rounded hover:bg-sky-700">Check In</button>
                       </div>
                   ))}
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Calls</h3>
                <div className="space-y-3">
                   {[
                       {name: "Alice Williams", type: "Inquiry", time: "5m ago"},
                       {name: "Bob Jones", type: "Appointment", time: "12m ago"},
                       {name: "Unknown", type: "Emergency", time: "25m ago"}
                   ].map((c, i) => (
                       <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                           <div>
                               <p className="text-gray-800 font-medium">{c.name}</p>
                               <p className="text-xs text-gray-500">{c.type}</p>
                           </div>
                           <span className="text-xs text-gray-400">{c.time}</span>
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
