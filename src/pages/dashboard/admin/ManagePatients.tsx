import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserInjured, FaSearch, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Pagination from '../../../components/Pagination';

interface Patient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

const ManagePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/all?role=patient`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      const patientUsers = res.data.users || [];
      setPatients(patientUsers);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
      setPatientToDelete(id);
      setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!patientToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/${patientToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Patient deleted successfully");
      setPatients(patients.filter(p => p._id !== patientToDelete));
    } catch (error) {
       console.error("Error deleting patient:", error);
       toast.error("Failed to delete patient");
    } finally {
        setIsDeleteModalOpen(false);
        setPatientToDelete(null);
    }
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Apply Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const displayedPatients = filteredPatients.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // Reset page on search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden font-sans">
         <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                    <FaUserInjured className="text-emerald-600 dark:text-emerald-500" />
                    Manage Patients
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">View and manage registered patients.</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search patients..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:focus:border-sky-500 transition-all w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4 text-center">Verified</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                    {loading ? (
                        // Professional Skeleton Loader
                        [...Array(5)].map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                <td className="px-6 py-4">
                                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-32 mb-2"></div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-40 mb-2"></div>
                                    <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-24"></div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="h-3 w-3 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto"></div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="h-8 w-8 bg-gray-100 dark:bg-slate-800 rounded-lg ml-auto"></div>
                                </td>
                            </tr>
                        ))
                    ) : displayedPatients.length === 0 ? (
                        // Rich Empty State
                         <tr>
                            <td colSpan={4} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-3">
                                        <FaUserInjured className="text-gray-300 dark:text-slate-600 text-2xl" />
                                    </div>
                                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">No patients found</h3>
                                    <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                        {searchTerm ? `No results found for "${searchTerm}".` : "Get started by adding a new patient to the system."}
                                    </p>
                                    {searchTerm && (
                                        <button 
                                            onClick={() => setSearchTerm('')} 
                                            className="mt-4 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-sm font-medium hover:underline"
                                        >
                                            Clear Search
                                        </button>
                                    )}
                                </div>
                            </td>
                         </tr>
                    ) : (
                        displayedPatients.map(patient => (
                            <tr key={patient._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/80 transition-all duration-200 group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{patient.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900 dark:text-slate-200">{patient.email}</div>
                                    <div className="text-sm text-gray-500 dark:text-slate-400">{patient.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            patient.isVerified 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                                        }`}
                                    >
                                        {patient.isVerified ? 'Verified' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                     <button 
                                        onClick={() => handleDeleteClick(patient._id)}
                                        className="text-gray-400 cursor-pointer dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all transform hover:scale-105" 
                                        title="Delete Patient"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

        {/* Pagination footer */}
        {!loading && totalPages > 1 && (
             <div className="p-6 border-t border-gray-100 dark:border-slate-800 flex justify-center">
                 <Pagination 
                     currentPage={currentPage}
                     totalPages={totalPages}
                     onPageChange={setCurrentPage}
                 />
             </div>
        )}

        <ConfirmationModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete Patient"
            message="Are you sure you want to delete this patient? This will remove their user account permanently."
            confirmText="Delete Patient"
            type="danger"
        />
    </div>
  );
};

export default ManagePatients;
