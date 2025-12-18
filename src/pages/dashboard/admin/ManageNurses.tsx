import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserNurse, FaSearch, FaTrash } from 'react-icons/fa';
import Loading from '../../../components/Loading';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Pagination from '../../../components/Pagination';

interface Nurse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

const ManageNurses = () => {
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [nurseToDelete, setNurseToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchNurses();
  }, []);

  const fetchNurses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/all`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      const allUsers = res.data.users || [];
      const nurseUsers = allUsers.filter((u: any) => u.role?.name === 'nurse');
      setNurses(nurseUsers);
    } catch (error) {
      console.error("Error fetching nurses:", error);
      toast.error("Failed to load nurses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
      setNurseToDelete(id);
      setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!nurseToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/${nurseToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Nurse deleted successfully");
      setNurses(nurses.filter(n => n._id !== nurseToDelete));
    } catch (error) {
       console.error("Error deleting nurse:", error);
       toast.error("Failed to delete nurse");
    } finally {
        setIsDeleteModalOpen(false);
        setNurseToDelete(null);
    }
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredNurses = nurses.filter(n => 
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Apply Pagination
  const totalPages = Math.ceil(filteredNurses.length / itemsPerPage);
  const displayedNurses = filteredNurses.slice(
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
                    <FaUserNurse className="text-pink-600 dark:text-pink-500" />
                    Manage Nurses
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">View and manage registered nurses.</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                <input 
                    type="text" 
                    placeholder="Search nurses..." 
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
                         <tr><td colSpan={4} className="py-20 relative h-32"><Loading /></td></tr>
                    ) : displayedNurses.length === 0 ? (
                         <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400 dark:text-slate-500">No nurses found.</td></tr>
                    ) : (
                        displayedNurses.map(nurse => (
                            <tr key={nurse._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-slate-100">{nurse.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900 dark:text-slate-100">{nurse.email}</div>
                                    <div className="text-sm text-gray-500 dark:text-slate-400">{nurse.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${nurse.isVerified ? 'bg-green-500' : 'bg-gray-300 dark:bg-slate-600'}`} title={nurse.isVerified ? 'Verified' : 'Pending'}></span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                     <button 
                                        onClick={() => handleDeleteClick(nurse._id)}
                                        className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1" 
                                        title="Delete Nurse"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>

        {/* Pagination */}
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
            title="Delete Nurse"
            message="Are you sure you want to delete this nurse? This will remove their user account permanently."
            confirmText="Delete Nurse"
            type="danger"
        />
    </div>
  );
};

export default ManageNurses;
