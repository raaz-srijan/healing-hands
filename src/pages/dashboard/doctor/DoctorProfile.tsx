import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUserMd, FaIdCard, FaSpinner, FaSave } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

const DoctorProfile = () => {
    const [profileData, setProfileData] = useState({
        specialization: '',
        licenseNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const doctor = res.data.doctor;
            if (doctor) {
                setProfileData({
                    specialization: doctor.specialization || '',
                    licenseNumber: doctor.licenseNumber || ''
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // If 404, it means profile doesn't exist yet, which is fine for "Create"
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            // We use the same shift from existing profile or defaults if creating
            // But createOrUpdateDoctorProfile requires shift fields if creating new
            // For update, we can just send partial if backend allowed, but backend controller creates defaults if missing on create
            // Let's send what we have.
            
            await axios.post(`${import.meta.env.VITE_API_URL}/doctors/profile`, profileData, {
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
                            <FaUserMd className="text-sky-600 dark:text-sky-500" />
                            Doctor Profile
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Manage your professional details and license information.</p>
                    </div>

                    {loading ? (
                        <div className="p-12"><Loading /></div>
                    ) : (
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Specialization</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUserMd className="text-gray-400 dark:text-slate-500" />
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
                                            placeholder="e.g. Cardiology, Neurology"
                                            value={profileData.specialization}
                                            onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">License Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaIdCard className="text-gray-400 dark:text-slate-500" />
                                        </div>
                                        <input 
                                            type="text" 
                                            required
                                            className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400"
                                            placeholder="e.g. LIC-12345678"
                                            value={profileData.licenseNumber}
                                            onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})}
                                        />
                                    </div>
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

export default DoctorProfile;
