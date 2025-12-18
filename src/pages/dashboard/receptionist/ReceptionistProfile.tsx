import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaConciergeBell, FaBuilding, FaSpinner, FaSave } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

const ReceptionistProfile = () => {
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
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/receptionists/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const receptionist = res.data.receptionist;
            if (receptionist) {
                setProfileData({
                    department: receptionist.department || ''
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/receptionists/profile`, profileData, {
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaConciergeBell className="text-sky-600" />
                            Receptionist Profile
                        </h2>
                        <p className="text-sm text-gray-500">Manage your professional details and desk assignment.</p>
                    </div>

                    {loading ? (
                        <div className="p-12"><Loading /></div>
                    ) : (
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Department / Desk</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaBuilding className="text-gray-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                                            placeholder="e.g. Front Desk, ER Reception, Outpatient"
                                            value={profileData.department}
                                            onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Enter the department or desk you are currently assigned to.</p>
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

export default ReceptionistProfile;
