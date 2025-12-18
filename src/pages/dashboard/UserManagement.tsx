import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaSpinner, FaSearch } from 'react-icons/fa';
import Loading from '../../components/Loading';
import ConfirmationModal from '../../components/ConfirmationModal';

interface User {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    name: string;
  } | null;
  isVerified: boolean;
}

interface Role {
  _id: string;
  name: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
      roleId: ""
  });
  const [actionLoading, setActionLoading] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [usersRes, rolesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/user/all`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/roles`, config)
      ]);

      setUsers(usersRes.data.users);
      setRoles(rolesRes.data.roles);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load users or roles");
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
      setUsers(users.filter(user => user._id !== userToDelete));
    } catch (error) {
       console.error("Error deleting user:", error);
       toast.error("Failed to delete user");
    } finally {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    }
  };

  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setFormData({ roleId: user.role?._id || "" });
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedUser) return;
      setActionLoading(true);

      try {
          const token = localStorage.getItem('token');
          await axios.put(`${import.meta.env.VITE_API_URL}/user/${selectedUser._id}/role`, { 
              roleId: formData.roleId 
          }, {
              headers: { Authorization: `Bearer ${token}` }
          });
          
          toast.success("User role updated successfully");
          setIsModalOpen(false);
          fetchData(); 
      } catch (error) {
          console.error("Error updating user:", error);
          toast.error("Failed to update user role. (Backend endpoint might be missing)");
      } finally {
          setActionLoading(false);
      }
  };


  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-sans">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800">User Management</h2>
                <p className="text-sm text-gray-500">Manage system users and their roles.</p>
            </div>
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search users..." 
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
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4 text-center">Verified</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {loading ? (
                         <tr><td colSpan={5} className="py-20 relative h-32"><Loading /></td></tr>
                    ) : filteredUsers.length === 0 ? (
                         <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No users found.</td></tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                        ${user.role?.name === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                          user.role?.name === 'doctor' ? 'bg-sky-100 text-sky-800' :
                                          user.role?.name === 'nurse' ? 'bg-pink-100 text-pink-800' :
                                          'bg-gray-100 text-gray-800'}`}>
                                        {user.role?.name || "No Role"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex h-2.5 w-2.5 rounded-full ${user.isVerified ? 'bg-green-500' : 'bg-gray-300'}`} title={user.isVerified ? 'Verified' : 'Pending'}></span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button 
                                        onClick={() => handleEditRole(user)}
                                        className="text-gray-400 hover:text-sky-600 transition-colors p-1" 
                                        title="Edit Role"
                                    >
                                        <FaEdit />
                                    </button>
                                     <button 
                                        onClick={() => handleDeleteClick(user._id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1" 
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

        {/* Edit Role Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all animate-fade-in-up">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Edit User Role</h3>
                    <p className="text-sm text-gray-500 mb-6">Assign a new role to <strong>{selectedUser?.name}</strong>.</p>
                    
                    <form onSubmit={handleUpdateUser}>
                         <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                            <select 
                                value={formData.roleId}
                                onChange={(e) => setFormData({ roleId: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                            >
                                <option value="" disabled>Select a role</option>
                                {roles.map(role => (
                                    <option key={role._id} value={role._id}>{role.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button 
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                                disabled={actionLoading}
                            >
                                Cancel
                            </button>
                             <button 
                                type="submit"
                                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                                disabled={actionLoading}
                            >
                                {actionLoading && <FaSpinner className="animate-spin" />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        {/* Confirmation Modal */}
        <ConfirmationModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Delete User"
            message="Are you sure you want to delete this user? This action cannot be undone and will permanently remove their access."
            confirmText="Delete User"
            type="danger"
        />
    </div>
  );
};

export default UserManagement;
