import { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';
import { FaFileMedical, FaDownload, FaAllergies, FaPills } from 'react-icons/fa';

const PatientRecords = () => {
    const [medicalInfo, setMedicalInfo] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/patients/profile`, {
                     headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.patient?.medicalInfo) {
                    setMedicalInfo(res.data.patient.medicalInfo);
                }
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecords();
    }, []);

    // Static lab reports for demo
    const reports = [
        { id: 1, name: "Blood Test - CBC", date: "2024-10-01", doctor: "Dr. Smith" },
        { id: 2, name: "X-Ray Chest", date: "2024-09-15", doctor: "Dr. Adams" },
    ];

    if (loading) return <Loading />;

    return (
        <SidebarLayout>
             <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
                 <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FaFileMedical className="text-sky-600 dark:text-sky-500" />
                        Medical Records
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">View your medical history and test reports.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Medical Summary Card */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-50 dark:border-slate-700">Health Summary</h3>
                        {medicalInfo.length > 0 ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                                        <FaAllergies className="text-orange-500"/> Known Allergies
                                    </p>
                                    <p className="text-gray-800 dark:text-slate-200 font-medium pl-6">{medicalInfo[0].Allergies || "None recorded"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                                        <FaPills className="text-blue-500"/> Current Medications
                                    </p>
                                    <div className="pl-6 flex flex-wrap gap-2">
                                        {medicalInfo[0].Medications && medicalInfo[0].Medications.length > 0 ? (
                                             Array.isArray(medicalInfo[0].Medications) ? medicalInfo[0].Medications.map((m: string, i: number) => (
                                                <span key={i} className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800/30">{m}</span>
                                             )) : <span className="text-gray-800 dark:text-white">{medicalInfo[0].Medications}</span>
                                        ) : (
                                            <p className="text-gray-400 dark:text-slate-500 italic text-sm">No active medications</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-slate-500 italic">No medical history found. Please update your profile.</p>
                        )}
                    </div>

                    {/* Lab Reports Card */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-50 dark:border-slate-700">Lab Reports & Documents</h3>
                        <div className="space-y-3">
                            {reports.map((report) => (
                                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group border border-transparent dark:border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-300 rounded text-lg">
                                            <FaFileMedical />
                                        </div>
                                        <div>
                                            <p className="text-gray-800 dark:text-slate-200 font-medium text-sm group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{report.name}</p>
                                            <p className="text-xs text-gray-400 dark:text-slate-500">{report.date} • {report.doctor}</p>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 p-2">
                                        <FaDownload />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </SidebarLayout>
    );
};

export default PatientRecords;
