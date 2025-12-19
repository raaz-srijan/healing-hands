import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserNurse, FaBuilding, FaSpinner, FaSave } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

const NurseProfile = () => {
    const [profileData, setProfileData] = useState({
        department: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/nurses/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const nurse = res.data.nurse;
            if (nurse) {
                setProfileData({
                    department: nurse.department || ''
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // If 404, it means profile doesn't exist yet
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            // Check controller: createOrUpdateNurseProfile expects { department, shifts }
            // We'll just send department here. If shifts are required by schema but optional in update...
            // Controller: if (!department) return 400.
            // So we just send department.
            
            await axios.post(`${import.meta.env.VITE_API_URL}/nurses/profile`, profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Profile updated successfully");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    return (
        <SidebarLayout>
             <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                    <div className="p-6 border-b border-gray-100 dark:border-slate-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <FaUserNurse className="text-pink-600 dark:text-pink-500" />
                            Nurse Profile
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Manage your professional details and department.</p>
                    </div>

                    {loading ? (
                        <div className="p-12"><Loading /></div>
                    ) : (
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Department</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBuilding className="text-gray-400 dark:text-slate-500" />
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
                                            placeholder="e.g. ICU, Pediatrics, Emergency"
                                            value={profileData.department}
                                            onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-2">Enter the department you are currently assigned to.</p>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 active:bg-sky-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-sm"
                                >
                                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                    Save Profile
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default NurseProfile;
