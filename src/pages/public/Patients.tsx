import { Link } from 'react-router-dom';
import { FaFileInvoiceDollar, FaNotesMedical, FaUserCircle } from 'react-icons/fa';

const Patients = () => {
    return (
        <div className="animate-fade-in-up">
            <section className="bg-sky-900 text-white chat-bg-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Patients & Visitors</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto">Resources to manage your health and visit.</p>
                </div>
            </section>

             <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <Link to="/auth/login" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                             <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center text-3xl mb-6">
                                 <FaUserCircle />
                             </div>
                             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600">Patient Portal</h3>
                             <p className="text-gray-500 dark:text-gray-400 mb-6">View records, book appointments, and message your doctor securely.</p>
                             <span className="text-sky-600 dark:text-sky-400 font-bold">Login →</span>
                        </Link>
                         <Link to="/records" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group hover:-translate-y-2">
                             <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center text-3xl mb-6">
                                 <FaNotesMedical />
                             </div>
                             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600">Medical Records</h3>
                             <p className="text-gray-500 dark:text-gray-400 mb-6">Request access to your medical history and test results.</p>
                             <span className="text-purple-600 dark:text-purple-400 font-bold">Request Access →</span>
                        </Link>
                     </div>

                     <div className="bg-sky-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12">
                         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Visitor Information</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                             <div>
                                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Visiting Hours</h3>
                                 <p className="text-gray-600 dark:text-gray-400 mb-6">General Wards: 10:00 AM - 8:00 PM<br/>ICU: 11:00 AM - 12:00 PM & 5:00 PM - 6:00 PM</p>
                                 
                                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Parking</h3>
                                 <p className="text-gray-600 dark:text-gray-400">Visitor parking is available in Garage A and B. Valet service is available at the main entrance.</p>
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Guidelines</h3>
                                 <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                                     <li>Masks are recommended in clinical areas.</li>
                                     <li>Two visitors per patient at a time.</li>
                                     <li>Please wash hands before and after visiting.</li>
                                     <li>Children under 12 may visit with adult supervision.</li>
                                 </ul>
                             </div>
                         </div>
                     </div>
                </div>
             </section>
        </div>
    );
};

export default Patients;
