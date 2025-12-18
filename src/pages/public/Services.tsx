import departmentData from "../../constants/departmentData";

const Services = () => {
    return (
        <div className="animate-fade-in-up">
            {/* Page Header */}
            <section className="bg-sky-900 text-white chat-bg-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Medical Services</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto">Comprehensive care ensuring the best outcomes for every patient.</p>
                </div>
            </section>

             <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departmentData.map((dept) => {
                             const Icon = dept.icon;
                             return (
                                 <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group cursor-pointer hover:-translate-y-2">
                                     <div 
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-colors duration-300"
                                        style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                                     >
                                         <Icon />
                                     </div>
                                     <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                                         {dept.name}
                                     </h3>
                                     <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">
                                         {dept.description}
                                     </p>
                                     <span className="text-sky-600 dark:text-sky-400 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                         Learn More <span className="text-lg">→</span>
                                     </span>
                                 </div>
                             );
                        })}
                     </div>
                </div>
             </section>
        </div>
    );
};

export default Services;
