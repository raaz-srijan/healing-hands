import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserMd, FaSearch, FaTrash } from 'react-icons/fa';
import Loading from '../../../components/Loading';
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
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/all`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      
      const allUsers = res.data.users || [];
      const doctorUsers = allUsers.filter((u: any) => u.role?.name === 'doctor');
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

  // Apply Pagination to Filtered Results
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const displayedDoctors = filteredDoctors.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  // Reset to page 1 if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans">
         {/* Header */}
         <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUserMd className="text-sky-600" />
                    Manage Doctors
                </h2>
                <p className="text-sm text-gray-500">View and manage registered doctors.</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search doctors..." 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all w-full md:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4 text-center">Verified</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {loading ? (
                         <tr><td colSpan={4} className="py-20 relative h-32"><Loading /></td></tr>
                    ) : displayedDoctors.length === 0 ? (
                         <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400">No doctors found.</td></tr>
                    ) : (
                        displayedDoctors.map(doctor => (
                            <tr key={doctor._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{doctor.name}</div>
                                    <div className="text-xs text-gray-500">ID: {doctor._id.slice(-6)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900">{doctor.email}</div>
                                    <div className="text-sm text-gray-500">{doctor.phone}</div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${doctor.isVerified ? 'bg-green-500' : 'bg-gray-300'}`} title={doctor.isVerified ? 'Verified' : 'Pending'}></span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                     <button 
                                        onClick={() => handleDeleteClick(doctor._id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1" 
                                        title="Delete Doctor"
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

        {/* Pagination Footer */}
        {!loading && totalPages > 1 && (
             <div className="p-6 border-t border-gray-100 flex justify-center">
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
