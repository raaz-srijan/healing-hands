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

const ReceptionistSchedule = () => {
    const [shifts, setShifts] = useState<Shift[]>([]);
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
            if (receptionist && receptionist.shift) {
                setShifts(receptionist.shift);
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
            await axios.put(`${import.meta.env.VITE_API_URL}/receptionists/shifts`, { shifts }, {
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
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <FaCalendarAlt className="text-sky-600" />
                                Manage Schedule
                            </h2>
                            <p className="text-sm text-gray-500">Set your weekly shift timings.</p>
                        </div>
                        <button 
                            onClick={addShift} 
                            className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-100 transition-colors font-medium text-sm"
                        >
                            <FaPlus /> Add Shift
                        </button>
                    </div>
                    
                    {loading ? (
                        <div className="p-12"><Loading /></div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {shifts.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                                    No shifts assigned. Click "Add Shift" to start.
                                </div>
                            ) : (
                                shifts.map((shift, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-4 items-end md:items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Day</label>
                                            <select 
                                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                                value={shift.day}
                                                onChange={(e) => updateShift(index, 'day', e.target.value)}
                                            >
                                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Start Time</label>
                                            <input 
                                                type="time" 
                                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                                value={shift.startTime}
                                                onChange={(e) => updateShift(index, 'startTime', e.target.value)}
                                            />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <label className="block text-xs font-medium text-gray-500 mb-1">End Time</label>
                                            <input 
                                                type="time" 
                                                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                                value={shift.endTime}
                                                onChange={(e) => updateShift(index, 'endTime', e.target.value)}
                                            />
                                        </div>
                                        <button 
                                            onClick={() => removeShift(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                            title="Remove Shift"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                            )}

                            <div className="pt-4 flex justify-end border-t border-gray-100 mt-6">
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

export default ReceptionistSchedule;
