import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserShield, FaEdit, FaTrash, FaPlus, FaSpinner, FaKey, FaLayerGroup } from 'react-icons/fa';
import Loading from '../../../components/Loading';
import ConfirmationModal from '../../../components/ConfirmationModal';
import Pagination from '../../../components/Pagination';

interface Permission {
    _id: string;
    name: string;
    group: string;
}

interface Role {
  _id: string;
  name: string;
  permissions: Permission[]; 
}

const RoleManagement = () => {
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Role Modal State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleModalMode, setRoleModalMode] = useState<'create' | 'edit'>('create');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleFormData, setRoleFormData] = useState({ name: '', selectedPermissionIds: [] as string[] });

  // Permission Modal State
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [permissionFormData, setPermissionFormData] = useState({ name: '', group: '' });

  const [actionLoading, setActionLoading] = useState(false);

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<'role' | 'permission'>('role');

  // Pagination for Roles
  const [currentRolePage, setCurrentRolePage] = useState(1);
  const rolesPerPage = 5; 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const [rolesRes, permissionsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/roles`, config),
          axios.get(`${import.meta.env.VITE_API_URL}/permissions`, config) 
      ]);

      setRoles(rolesRes.data.roles || []);
      setPermissions(permissionsRes.data.permissions || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // --- Role Handlers ---

  const handleCreateRoleClick = () => {
      setRoleModalMode('create');
      setRoleFormData({ name: '', selectedPermissionIds: [] });
      setSelectedRole(null);
      setIsRoleModalOpen(true);
  };

  const handleEditRoleClick = (role: Role) => {
      setRoleModalMode('edit');
      setRoleFormData({ 
          name: role.name, 
          selectedPermissionIds: role.permissions.map(p => p._id) 
      });
      setSelectedRole(role);
      setIsRoleModalOpen(true);
  };

  const submitRole = async (e: React.FormEvent) => {
      e.preventDefault();
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      try {
          const payload = {
              name: roleFormData.name,
              permissions: roleFormData.selectedPermissionIds,
              profileModel: 'PatientProfile' 
          };

          if (roleModalMode === 'create') {
              await axios.post(`${import.meta.env.VITE_API_URL}/roles`, payload, { headers: { Authorization: `Bearer ${token}` } });
              toast.success("Role created successfully");
          } else {
             if (selectedRole) {
                  await axios.put(`${import.meta.env.VITE_API_URL}/roles/${selectedRole._id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
                  toast.success("Role updated successfully");
             }
          }
          setIsRoleModalOpen(false);
          fetchData();
      } catch (error: any) {
          console.error("Error saving role:", error);
          toast.error(error.response?.data?.message || "Failed to save role");
      } finally {
          setActionLoading(false);
      }
  };

  const togglePermissionSelection = (permissionId: string) => {
      setRoleFormData(prev => {
          const isSelected = prev.selectedPermissionIds.includes(permissionId);
          if (isSelected) {
              return { ...prev, selectedPermissionIds: prev.selectedPermissionIds.filter(id => id !== permissionId) };
          } else {
              return { ...prev, selectedPermissionIds: [...prev.selectedPermissionIds, permissionId] };
          }
      });
  };

  // Slice logic for Roles
  const totalRolePages = Math.ceil(roles.length / rolesPerPage);
  const displayedRoles = roles.slice(
      (currentRolePage - 1) * rolesPerPage,
      currentRolePage * rolesPerPage
  );


  const handleCreatePermissionClick = () => {
      setPermissionFormData({ name: '', group: '' });
      setIsPermissionModalOpen(true);
  };

  const submitPermission = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    const token = localStorage.getItem('token');
    
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/permissions`, permissionFormData, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Permission created successfully");
        setIsPermissionModalOpen(false);
        fetchData();
    } catch (error: any) {
        console.error("Error saving permission:", error);
        toast.error(error.response?.data?.message || "Failed to create permission");
    } finally {
        setActionLoading(false);
    }
  };

  // --- Delete Handlers ---

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
        const token = localStorage.getItem('token');
        const endpoint = deleteType === 'role' ? 'roles' : 'permissions';
        
        await axios.delete(`${import.meta.env.VITE_API_URL}/${endpoint}/${deleteId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(`${deleteType === 'role' ? 'Role' : 'Permission'} deleted successfully`);
        fetchData();
    } catch (error: any) {
        console.error("Error deleting item:", error);
        toast.error(error.response?.data?.message || "Failed to delete item");
    } finally {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
    }
};


  // Helper to group permissions
  const groupedPermissions = permissions.reduce((acc, perm) => {
      if (!acc[perm.group]) acc[perm.group] = [];
      acc[perm.group].push(perm);
      return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden font-sans min-h-[600px] flex flex-col">
        {/* Header Tabs */}
        <div className="flex border-b border-gray-100 dark:border-slate-800">
             <button
                onClick={() => setActiveTab('roles')}
                className={`flex-1 py-4 text-center cursor-pointer font-medium text-sm border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'roles' ? 'border-sky-600 text-sky-600 dark:text-sky-500 bg-sky-50/50 dark:bg-sky-900/20' : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                }`}
             >
                <FaUserShield /> Roles
             </button>
             <button
                onClick={() => setActiveTab('permissions')}
                className={`cursor-pointer flex-1 py-4 text-center font-medium text-sm border-b-2 transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'permissions' ? 'border-sky-600 text-sky-600 dark:text-sky-500 bg-sky-50/50 dark:bg-sky-900/20' : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/50'
                }`}
             >
                <FaKey /> Permissions
             </button>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 capitalize">{activeTab} Management</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Manage your system {activeTab}.</p>
                </div>
                {activeTab === 'roles' ? (
                     <button onClick={handleCreateRoleClick} className="btn-primary flex items-center gap-2">
                        <FaPlus /> Create Role
                     </button>
                ) : (
                    <button onClick={handleCreatePermissionClick} className="btn-secondary flex items-center gap-2 text-sky-600 border-sky-200 hover:bg-sky-50 dark:text-sky-500 dark:border-sky-700 dark:hover:bg-sky-900/20">
                        <FaPlus /> Create Permission
                    </button>
                )}
            </div>

            {loading ? (
                <div className="py-20 flex justify-center"><Loading /></div>
            ) : (
                <>
                    {/* Roles View */}
                    {activeTab === 'roles' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedRoles.length === 0 ? <p className="text-gray-400 dark:text-slate-500">No roles found.</p> : displayedRoles.map(role => (
                                    <div key={role._id} className="border border-gray-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-slate-800/30 relative group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                                                <FaUserShield className="text-sky-600 dark:text-sky-500 text-xl" />
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEditRoleClick(role)} className="text-gray-400 dark:text-slate-500 hover:text-sky-600 cursor-pointer dark:hover:text-sky-400 p-1"><FaEdit /></button>
                                                <button onClick={() => { setDeleteType('role'); setDeleteId(role._id); setIsDeleteModalOpen(true); }} className="text-gray-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 p-1 cursor-pointer"><FaTrash /></button>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 capitalize mb-1">{role.name}</h3>
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {role.permissions && role.permissions.length > 0 ? role.permissions.slice(0, 3).map((p, i) => (
                                                <span key={i} className="text-xs px-2 py-1 bg-white dark:bg-slate-700 border border-gray-100 dark:border-slate-600 rounded text-gray-500 dark:text-slate-300">{p.name || "Perm"}</span>
                                            )) : <span className="text-xs text-gray-400 dark:text-slate-500">No permissions</span>}
                                            {role.permissions && role.permissions.length > 3 && <span className="text-xs px-2 py-1 text-gray-400 dark:text-slate-500">+{role.permissions.length - 3} more</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Role Pagination Footer */}
                            {!loading && totalRolePages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <Pagination 
                                        currentPage={currentRolePage}
                                        totalPages={totalRolePages}
                                        onPageChange={setCurrentRolePage}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {/* Permissions View */}
                    {activeTab === 'permissions' && (
                        <div className="space-y-6">
                            {Object.keys(groupedPermissions).length === 0 ? <p className="text-gray-400 dark:text-slate-500">No permissions found.</p> : 
                            Object.entries(groupedPermissions).map(([group, groupPerms]) => (
                                <div key={group} className="bg-gray-50/50 dark:bg-slate-800/30 rounded-xl border border-gray-100 dark:border-slate-700 p-4">
                                    <h3 className="font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                                        <FaLayerGroup className="text-sky-500" /> {group}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {groupPerms.map(perm => (
                                            <div key={perm._id} className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-slate-700 flex justify-between items-center group">
                                                <div className="text-sm font-medium text-gray-600 dark:text-slate-300">{perm.name}</div>
                                                <button 
                                                    onClick={() => { setDeleteType('permission'); setDeleteId(perm._id); setIsDeleteModalOpen(true); }}
                                                    className="text-gray-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>

        {/* Role Modal */}
        {isRoleModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
                    <div className="p-6 border-b border-gray-100 dark:border-slate-800">
                         <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100">
                            {roleModalMode === 'create' ? 'Create New Role' : 'Edit Role'}
                        </h3>
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-1">
                         <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Role Name</label>
                            <input 
                                type="text"
                                value={roleFormData.name}
                                onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                                className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-colors"
                                placeholder="e.g. Lab Technician"
                            />
                        </div>

                        <div className="mb-2">
                             <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Assign Permissions</label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(groupedPermissions).map(([group, groupPerms]) => (
                                    <div key={group} className="border border-gray-100 dark:border-slate-700 rounded-lg p-3 bg-gray-50/30 dark:bg-slate-800/30">
                                         <h4 className="font-semibold text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">{group}</h4>
                                         <div className="space-y-2">
                                            {groupPerms.map(perm => (
                                                <label key={perm._id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-1 rounded transition-colors">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={roleFormData.selectedPermissionIds.includes(perm._id)}
                                                        onChange={() => togglePermissionSelection(perm._id)}
                                                        className="rounded text-sky-600 focus:ring-sky-500 border-gray-300 dark:border-slate-600 dark:bg-slate-700"
                                                    />
                                                    <span className="text-sm text-gray-700 dark:text-slate-300">{perm.name}</span>
                                                </label>
                                            ))}
                                         </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-slate-800 flex justify-end gap-3 bg-gray-50 dark:bg-slate-900/50">
                        <button onClick={() => setIsRoleModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                        <button onClick={submitRole} disabled={actionLoading} className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm font-medium flex items-center gap-2 transition-colors">
                           {actionLoading && <FaSpinner className="animate-spin" />} Save Role
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Permission Modal */}
        {isPermissionModalOpen && (
             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-sm p-6 animate-fade-in-up">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-4">Create New Permission</h3>
                    <form onSubmit={submitPermission}>
                         <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Permission Name</label>
                            <input 
                                type="text"
                                value={permissionFormData.name}
                                onChange={(e) => setPermissionFormData({ ...permissionFormData, name: e.target.value })}
                                className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 outline-none focus:border-sky-500 transition-colors"
                                placeholder="e.g. create_user"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Group</label>
                            <input 
                                type="text"
                                value={permissionFormData.group}
                                onChange={(e) => setPermissionFormData({ ...permissionFormData, group: e.target.value })}
                                className="w-full border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 outline-none focus:border-sky-500 transition-colors"
                                placeholder="e.g. User Management"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setIsPermissionModalOpen(false)} className="px-4 py-2 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg text-sm transition-colors">Cancel</button>
                            <button type="submit" disabled={actionLoading} className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm flex items-center gap-2 transition-colors">
                                {actionLoading && <FaSpinner className="animate-spin" />} Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        <ConfirmationModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title={`Delete ${deleteType === 'role' ? 'Role' : 'Permission'}`}
            message={`Are you sure you want to delete this ${deleteType}? usage of this ${deleteType} might break system functionality.`}
            confirmText="Delete"
            type="danger"
        />
    </div>
  );
};

export default RoleManagement;
