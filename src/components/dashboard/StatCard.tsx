import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string; 
}

const StatCard = ({ title, value, icon, trend, trendUp, color = "bg-sky-500" }: StatCardProps) => {
    
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trendUp ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg text-white text-2xl shadow-lg border border-white/20 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
