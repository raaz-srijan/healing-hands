import { useState } from "react";
import departmentData from "../../constants/departmentData";

export default function Departments() {
  const [showAll, setShowAll] = useState(false);

  const visibleDepartments = showAll
    ? departmentData
    : departmentData.slice(0, 8);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Departments
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            ApexCare offers a comprehensive range of medical departments staffed by expert healthcare professionals
            using state-of-the-art technology to provide exceptional patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDepartments.map((department) => {
            const IconComponent = department.icon;
            return (
              <div
                key={department.id}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6"
                  style={{
                    backgroundColor: `${department.color}20`,
                    color: department.color,
                  }}
                >
                  <IconComponent />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {department.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
                  {department.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Toggle Button */}
        {departmentData.length > 7 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-8 py-3 rounded-full cursor-pointer border border-sky-600 text-sky-600 dark:text-sky-400 dark:border-sky-400
                         hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 transition-all duration-300 font-semibold"
            >
              {showAll ? "View Less" : "View All"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
