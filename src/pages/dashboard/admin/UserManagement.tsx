import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUsers, FaSearch, FaTrash, FaFilter } from 'react-icons/fa';
import Loading from '../../../components/Loading';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Pagination from '../../../components/Pagination';

interface Role {
  _id: string;
  name: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: Role | string; // Could be populated object or ID string
  isVerified: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("All"); // Filter state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleUpdateData, setRoleUpdateData] = useState<{ userId: string, newRoleId: string, userName: string, newRoleName: string } | null>(null);

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  const fetchUsersAndRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      const [usersRes, rolesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/user/all`, {
           headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/roles`, {
            headers: { Authorization: `Bearer ${token}` }
         })
      ]);
      
      setUsers(usersRes.data.users || []);
      setRoles(rolesRes.data.roles || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load users data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
      setUserToDelete(id);
      setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/${userToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("User deleted successfully");
      setUsers(users.filter(u => u._id !== userToDelete));
    } catch (error) {
       console.error("Error deleting user:", error);
       toast.error("Failed to delete user");
    } finally {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    }
  };

  const handleRoleChange = (userId: string, newRoleId: string, userName: string) => {
      const selectedRole = roles.find(r => r._id === newRoleId);
      if (!selectedRole) return;
      
      setRoleUpdateData({
          userId,
          newRoleId,
          userName,
          newRoleName: selectedRole.name
      });
      setIsRoleModalOpen(true);
  };

  const confirmRoleUpdate = async () => {
      if (!roleUpdateData) return;
      
      try {
          const token = localStorage.getItem('token');
          await axios.put(`${import.meta.env.VITE_API_URL}/user/${roleUpdateData.userId}/role`, 
              { roleId: roleUpdateData.newRoleId },
              { headers: { Authorization: `Bearer ${token}` } }
          );
          
          toast.success(`Role updated to ${roleUpdateData.newRoleName}`);
          
          // Update local state
          setUsers(users.map(u => {
              if (u._id === roleUpdateData.userId) {
                  const newRole = roles.find(r => r._id === roleUpdateData.newRoleId);
                  // @ts-ignore
                  return { ...u, role: newRole || u.role }; 
              }
              return u;
          }));

      } catch (error) {
          console.error("Error updating role:", error);
          toast.error("Failed to update role");
      } finally {
          setIsRoleModalOpen(false);
          setRoleUpdateData(null);
      }
  };

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Filter Logic:
  // 1. Search by name or email
  // 2. Filter by Role (if not "All")
  const filteredUsers = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const userRoleName = typeof user.role === 'object' ? user.role?.name : 'unknown';
      const matchesRole = selectedRole === "All" || userRoleName?.toLowerCase() === selectedRole.toLowerCase();

      return matchesSearch && matchesRole;
  });
  
  // Apply Pagination to Filtered Results
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );
  
  // Reset to page 1 if filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden font-sans">
         {/* Header */}
         <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                    <FaUsers className="text-sky-600 dark:text-sky-500" />
                    User Management
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">View and manage all system users.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Role Filter Dropdown */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaFilter className="text-gray-400 dark:text-slate-500 text-xs" />
                    </div>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="pl-9 pr-10 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:focus:border-sky-500 transition-all text-sm bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 bg-no-repeat bg-right"
                    >
                        <option value="All">All Roles</option>
                        {roles.map(role => (
                            <option key={role._id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select> 
                </div>

                {/* Search Input */}
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input 
                        type="text" 
                        placeholder="Search users..." 
                        className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 dark:focus:border-sky-500 transition-all w-full sm:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>

         {/* Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800 text-xs uppercase tracking-wider text-gray-500 dark:text-slate-400 font-semibold">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Change Role</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                    {loading ? (
                         <tr><td colSpan={5} className="py-20 relative h-32"><Loading /></td></tr>
                    ) : displayedUsers.length === 0 ? (
                         <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400 dark:text-slate-500">No users found matching your criteria.</td></tr>
                    ) : (
                        displayedUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900 dark:text-slate-100">{user.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-slate-400">ID: {user._id.slice(-6)}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-gray-900 dark:text-slate-100">{user.email}</div>
                                    <div className="text-sm text-gray-500 dark:text-slate-400">{user.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                     <select
                                        value={typeof user.role === 'object' ? user.role._id : ''}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value, user.name)}
                                        className="block w-full max-w-[140px] px-2 py-1.5 text-xs rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                                     >
                                         {roles.map(role => (
                                             <option key={role._id} value={role._id}>
                                                 {role.name}
                                             </option>
                                         ))}
                                     </select>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                     <button 
                                        onClick={() => handleDeleteClick(user._id)}
                                        className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1" 
                                        title="Delete User"
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
            title="Delete User"
            message="Are you sure you want to delete this user? This action cannot be undone."
            confirmText="Delete User"
            type="danger"
        />

        <ConfirmationModal 
            isOpen={isRoleModalOpen}
            onClose={() => {
                setIsRoleModalOpen(false);
                setRoleUpdateData(null);
            }}
            onConfirm={confirmRoleUpdate}
            title="Update User Role"
            message={`Are you sure you want to change ${roleUpdateData?.userName}'s role to "${roleUpdateData?.newRoleName}"? This may affect their access permissions.`}
            confirmText="Update Role"
            type="warning"
        />
    </div>
  );
};

export default UserManagement;
