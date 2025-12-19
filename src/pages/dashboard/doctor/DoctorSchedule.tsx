import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaClock, FaSave, FaSpinner } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

const DoctorSchedule = () => {
    const [schedule, setSchedule] = useState({
        day: "Monday",
        startTime: "09:00",
        endTime: "17:00"
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
            if (doctor && doctor.shift) {
                // Handle both single object shift and array shift just in case, though Schema says object for Doctor
                const shift = Array.isArray(doctor.shift) ? doctor.shift[0] : doctor.shift;
                if(shift) {
                   setSchedule({
                       day: shift.day,
                       startTime: shift.startTime,
                       endTime: shift.endTime
                   });
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // Don't toast error here aggressively, as maybe profile doesn't exist yet
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/doctors/shift`, schedule, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Schedule updated successfully");
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            toast.error(error.response?.data?.message || "Failed to update schedule");
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
                            <FaCalendarAlt className="text-sky-600 dark:text-sky-500" />
                            Manage Schedule
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Update your weekly availability and shift timings.</p>
                    </div>
                    
                    {loading ? (
                        <div className="p-12"><Loading /></div>
                    ) : (
                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Available Day</label>
                                    <select 
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                        value={schedule.day}
                                        onChange={(e) => setSchedule({...schedule, day: e.target.value})}
                                    >
                                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <FaClock className="text-gray-400 dark:text-slate-500" /> Start Time
                                        </label>
                                        <input 
                                            type="time" 
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                            value={schedule.startTime}
                                            onChange={(e) => setSchedule({...schedule, startTime: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                                            <FaClock className="text-gray-400 dark:text-slate-500" /> End Time
                                        </label>
                                        <input 
                                            type="time" 
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-600 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                                            value={schedule.endTime}
                                            onChange={(e) => setSchedule({...schedule, endTime: e.target.value})}
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
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default DoctorSchedule;
