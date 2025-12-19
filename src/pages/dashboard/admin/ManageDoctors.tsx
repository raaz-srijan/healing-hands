import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserMd, FaSearch, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Pagination from '../../../components/Pagination';

interface Doctor {
  _id: string; 
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  profile?: {
      specialization?: string;
  }
}

const ManageDoctors = () => {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/all?role=doctor`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      const doctorUsers = res.data.users || [];
      setDoctors(doctorUsers);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
      setDoctorToDelete(id);
      setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!doctorToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/${doctorToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Doctor deleted successfully");
      setDoctors(doctors.filter(d => d._id !== doctorToDelete));
    } catch (error) {
       console.error("Error deleting doctor:", error);
       toast.error("Failed to delete doctor");
    } finally {
        setIsDeleteModalOpen(false);
        setDoctorToDelete(null);
    }
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const displayedDoctors = filteredDoctors.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden font-sans transition-colors duration-300">
         {/* Header */}
         <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                    <FaUserMd className="text-sky-600 dark:text-sky-500" />
                    Manage Doctors
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">View and manage registered doctors.</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search doctors..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:focus:border-sky-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 transition-all w-full md:w-64 placeholder-gray-400 dark:placeholder-slate-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

         {/* Table */}
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
                                    <div className="h-3 bg-gray-100 dark:bg-slate-800 rounded w-20"></div>
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
                    ) : displayedDoctors.length === 0 ? (
                        // Rich Empty State
                         <tr>
                            <td colSpan={4} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-slate-700">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-3">
                                        <FaUserMd className="text-gray-300 dark:text-slate-600 text-2xl" />
                                    </div>
                                    <h3 className="text-gray-900 dark:text-white font-medium mb-1">No doctors found</h3>
                                    <p className="text-gray-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
                                        {searchTerm ? `No results found for "${searchTerm}". Try different keywords.` : "Get started by adding a new doctor to the system."}
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
                        displayedDoctors.map(doctor => (
                            <tr key={doctor._id} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/80 transition-all duration-200 group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">{doctor.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-slate-400 font-mono">ID: {doctor._id.slice(-6)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-700 dark:text-slate-200">{doctor.email}</div>
                                    <div className="text-sm text-gray-400 dark:text-slate-400 mt-0.5">{doctor.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span 
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            doctor.isVerified 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' 
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'
                                        }`}
                                    >
                                        {doctor.isVerified ? 'Verified' : 'Pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                     <button 
                                        onClick={() => handleDeleteClick(doctor._id)}
                                        className="text-gray-400 cursor-pointer hover:text-red-600 dark:text-slate-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-all transform hover:scale-105" 
                                        title="Delete Doctor"
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

        {/* Pagination Footer */}
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
            title="Delete Doctor"
            message="Are you sure you want to delete this doctor? This will remove their user account permanently."
            confirmText="Delete Doctor"
            type="danger"
        />
    </div>
  );
};

export default ManageDoctors;
