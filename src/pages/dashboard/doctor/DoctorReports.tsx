import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import { FaFileMedical, FaDownload, FaEye, FaSearch } from 'react-icons/fa';

const DoctorReports = () => {
    // Static Data for Reports
    const reports = [
        { id: 1, text: "Blood Test - CBC", patient: "Alice Johnson", date: "2024-10-22", type: "Lab Report", status: "Ready" },
        { id: 2, text: "X-Ray Chest", patient: "Bob Smith", date: "2024-10-23", type: "Radiology", status: "Ready" },
        { id: 3, text: "MRI Scan Brain", patient: "Charlie Brown", date: "2024-10-21", type: "Radiology", status: "Processing" },
        { id: 4, text: "Urine Analysis", patient: "Alice Johnson", date: "2024-10-20", type: "Lab Report", status: "Ready" },
    ];

    return (
        <SidebarLayout>
             <div className="space-y-6 animate-fade-in-up">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaFileMedical className="text-purple-600 dark:text-purple-500" />
                            Medical Reports
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Access and download patient medical reports.</p>
                    </div>
                     <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search reports..." 
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all w-full md:w-64 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reports.map((report) => (
                        <div key={report.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-lg ${report.type === 'Lab Report' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300'}`}>
                                    <FaFileMedical className="text-xl" />
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${report.status === 'Ready' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                                    {report.status}
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-gray-800 dark:text-white mb-1">{report.text}</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Patient: <span className="text-gray-700 dark:text-slate-200 font-medium">{report.patient}</span></p>
                            
                            <div className="pt-4 border-t border-gray-50 dark:border-slate-700 flex justify-between items-center text-sm">
                                <span className="text-gray-400 dark:text-slate-500">{report.date}</span>
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors" title="View"><FaEye /></button>
                                    <button className="p-2 text-gray-400 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors" title="Download"><FaDownload /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default DoctorReports;
