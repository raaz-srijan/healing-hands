import Hero from '../components/homepage/Hero';
import Departments from '../components/homepage/Departments';
import Consultant from '../components/homepage/Consultant';
import { FaMapMarkerAlt, FaNotesMedical, FaHeartbeat } from 'react-icons/fa';

const LandingPage = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Hero />

            {/* Quick Actions Strip */}
            <div className="relative z-10 -mt-20 max-w-7xl mx-auto px-4 md:px-8 w-full mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
                        <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                            <FaMapMarkerAlt />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Find Location</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Nearest centers to you</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
                         <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <FaNotesMedical />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Patient Portal</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Access your records</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
                         <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <FaHeartbeat />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Urgent Care</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Wait times & check-in</p>
                    </div>
                </div>
            </div>

            {/* Departments Section */}
            <Departments />

            {/* Consultants Section */}
            <Consultant />

             {/* Why Choose Us / Stats */}
             <section className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-sky-100 dark:bg-sky-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-teal-100 dark:bg-teal-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2906&auto=format&fit=crop" 
                                alt="Doctors discussing" 
                                className="relative rounded-2xl shadow-2xl z-10 w-full object-cover h-[500px]"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl z-20 max-w-xs border border-gray-50 dark:border-gray-700">
                                <p className="text-lg font-bold text-gray-800 dark:text-white mb-1">Top Rated Hospital</p>
                                <p className="text-gray-500 dark:text-gray-300 text-sm">Consistently ranked #1 for patient safety and quality care in the region.</p>
                            </div>
                        </div>
                        <div>
                             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Advancing Healthcare,<br/>Transforming Lives.</h2>
                             <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                                 Combining state-of-the-art medical technology with a human touch. Our commitment to excellence ensures that you receive the best possible care, tailored to your unique needs.
                             </p>
                             
                             <div className="grid grid-cols-2 gap-8 mb-8">
                                 {[
                                     { val: '50+', label: 'Years of Service' },
                                     { val: '1200+', label: 'Expert Doctors' },
                                     { val: '24/7', label: 'Emergency Care' },
                                     { val: '15k+', label: 'Happy Patients' },
                                 ].map((stat, i) => (
                                     <div key={i}>
                                         <p className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-1">{stat.val}</p>
                                         <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
