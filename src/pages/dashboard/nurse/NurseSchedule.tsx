import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaSave, FaSpinner, FaPlus, FaTrash } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

interface Shift {
    day: string;
    startTime: string;
    endTime: string;
    _id?: string;
}

const NurseSchedule = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
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
            if (nurse && nurse.shift) {
                setShifts(nurse.shift);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            // Using PUT /shifts endpoint which calls updateNurseShifts
            await axios.put(`${import.meta.env.VITE_API_URL}/nurses/shifts`, { shifts }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Shifts updated successfully");
        } catch (error: any) {
            console.error("Error updating shifts:", error);
            toast.error(error.response?.data?.message || "Failed to update shifts");
        } finally {
            setSaving(false);
        }
    };

    const addShift = () => {
        setShifts([...shifts, { day: "Monday", startTime: "08:00", endTime: "16:00" }]);
    };

    const removeShift = (index: number) => {
        const newShifts = [...shifts];
        newShifts.splice(index, 1);
        setShifts(newShifts);
    };

    const updateShift = (index: number, field: keyof Shift, value: string) => {
        const newShifts = [...shifts];
        newShifts[index] = { ...newShifts[index], [field]: value };
        setShifts(newShifts);
    };

    return (
        <SidebarLayout>
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300">
                    <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <FaCalendarAlt className="text-pink-600 dark:text-pink-500" />
                                Manage Schedule
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Set your weekly shift timings.</p>
                        </div>
                        <button 
                            onClick={addShift} 
                            className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors font-medium text-sm"
                        >
                            <FaPlus /> Add Shift
                        </button>
                    </div>
                    
                    {loading ? (
                        <div className="p-12"><Loading /></div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {shifts.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 dark:text-slate-500 border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-lg">
                                    No shifts assigned. Click "Add Shift" to start.
                                </div>
                            ) : (
                                shifts.map((shift, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg border border-gray-200 dark:border-slate-600 transition-colors duration-300">
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">Day</label>
                                            <select 
                                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                                value={shift.day}
                                                onChange={(e) => updateShift(index, 'day', e.target.value)}
                                            >
                                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">Start Time</label>
                                            <input 
                                                type="time" 
                                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                                value={shift.startTime}
                                                onChange={(e) => updateShift(index, 'startTime', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-1">End Time</label>
                                            <input 
                                                type="time" 
                                                className="w-full px-3 py-2 rounded border border-gray-300 dark:border-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 bg-white dark:bg-slate-600 text-gray-900 dark:text-white"
                                                value={shift.endTime}
                                                onChange={(e) => updateShift(index, 'endTime', e.target.value)}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => removeShift(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
                                            title="Remove Shift"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                            )}

                            <div className="pt-4 flex justify-end border-t border-gray-100 dark:border-slate-700 mt-6">
                                <button 
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 active:bg-sky-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-sm"
                                >
                                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
};

export default NurseSchedule;
