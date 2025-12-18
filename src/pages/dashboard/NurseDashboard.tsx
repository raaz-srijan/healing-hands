import SidebarLayout from "../../components/dashboard/SidebarLayout";
import StatCard from "../../components/dashboard/StatCard";
import { FaUserInjured, FaClipboardList, FaProcedures, FaBell } from "react-icons/fa";

const NurseDashboard = () => {
  return (
    <SidebarLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Manage assigned patients and daily tasks.</p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Assigned Patients" 
            value="12" 
            icon={<FaUserInjured />} 
            trend="+2 New Admissions" 
            trendUp={true} 
            color="bg-emerald-500"
          />
          <StatCard 
            title="Pending Tasks" 
            value="5" 
            icon={<FaClipboardList />} 
            trend="Due within 2h" 
            trendUp={false} 
             color="bg-orange-500"
          />
          <StatCard 
            title="Ward Occupancy" 
            value="85%" 
            icon={<FaProcedures />} 
            trend="General Ward A" 
            trendUp={true} 
             color="bg-blue-500"
          />
           <StatCard 
            title="Notifications" 
            value="3" 
            icon={<FaBell />} 
            trend="New Alerts" 
            trendUp={true} 
             color="bg-purple-500"
          />
        </div>

        {/* Recent Activity / Simple List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-4">Current Shift Status</h3>
           <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <p className="font-medium text-gray-700">Shift Started: 08:00 AM</p>
                  </div>
                  <span className="text-sm text-gray-500">8h remaining</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                  <p className="font-medium text-gray-700">Next Vitals Check</p>
                  <span className="text-sm text-blue-600 font-semibold">10:00 AM</span>
              </div>
           </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NurseDashboard;
