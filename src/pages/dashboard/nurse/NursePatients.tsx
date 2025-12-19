import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserInjured, FaSearch, FaFileMedical } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

interface PatientUser {
  _id: string; 
  name: string;
  email: string;
  phone: string;
}

const NursePatients = () => {
  const [patients, setPatients] = useState<PatientUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      // Fetching patient list - Nurses can also view all patients
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/all?role=patient`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      setPatients(res.data.users || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarLayout>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden font-sans animate-fade-in-up transition-colors duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <FaUserInjured className="text-emerald-600 dark:text-emerald-500" />
                        Patient Care List
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Monitor and care for assigned patients.</p>
                </div>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search patients..." 
                        className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all w-full md:w-64 bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-700 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4 text-center">Ward</th>
                             <th className="px-6 py-4 text-center">Condition</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan={5} className="py-20 relative h-32"><Loading /></td></tr>
                        ) : filteredPatients.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 dark:text-slate-500">No patients found.</td></tr>
                        ) : (
                            filteredPatients.map(patient => (
                                <tr key={patient._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900 dark:text-white">{patient.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-slate-400">ID: {patient._id.slice(-6)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 dark:text-slate-200">{patient.email}</div>
                                        <div className="text-sm text-gray-500 dark:text-slate-400">{patient.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-slate-300">
                                        General Ward
                                    </td>
                                     <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                                            Stable
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-sm text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium flex items-center justify-end gap-1 ml-auto">
                                            <FaFileMedical /> Vitals
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </SidebarLayout>
  );
};

export default NursePatients;
