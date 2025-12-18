import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaUser, FaNotesMedical, FaPhone, FaTint, FaAllergies, FaPills, FaSpinner, FaSave } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';
import Loading from '../../../components/Loading';

interface PatientProfileData {
    personalInfo: {
        DOB: string;
        Gender: string;
        BloodGroup: string;
    };
    medicalInfo: {
        Allergies: string;
        Medications: string[];
    }[];
    emergencyInfo: {
        contact: string;
        relation: string;
    }[];
}

const PatientProfile = () => {
    const [profile, setProfile] = useState<PatientProfileData>({
        personalInfo: { DOB: '', Gender: '', BloodGroup: '' },
        medicalInfo: [{ Allergies: '', Medications: [] }],
        emergencyInfo: [{ contact: '', relation: '' }]
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/patients/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const p = res.data.patient;
            if (p) {
                setProfile({
                    personalInfo: {
                        DOB: p.personalInfo?.DOB ? new Date(p.personalInfo.DOB).toISOString().split('T')[0] : '',
                        Gender: p.personalInfo?.Gender || '',
                        BloodGroup: p.personalInfo?.BloodGroup || ''
                    },
                    medicalInfo: p.medicalInfo?.length > 0 ? p.medicalInfo : [{ Allergies: '', Medications: [] }],
                    emergencyInfo: p.emergencyInfo?.length > 0 ? p.emergencyInfo : [{ contact: '', relation: '' }],
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // 404 is expected if profile not created yet
        } finally {
            setLoading(false);
        }
    };

    const handlePersonalSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            // This endpoint creates or updates basic profile
            await axios.post(`${import.meta.env.VITE_API_URL}/patients/profile`, {
                DOB: profile.personalInfo.DOB,
                Gender: profile.personalInfo.Gender,
                BloodGroup: profile.personalInfo.BloodGroup
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Personal info updated");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update");
        } finally {
            setSaving(false);
        }
    };

    const handleMedicalSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            // Assuming first entry usage for simplification
            const meds = typeof profile.medicalInfo[0].Medications === 'string' 
                ? (profile.medicalInfo[0].Medications as string).split(',').map((s: string) => s.trim()) 
                : profile.medicalInfo[0].Medications;

            await axios.put(`${import.meta.env.VITE_API_URL}/patients/medical-info`, {
                Allergies: profile.medicalInfo[0].Allergies,
                Medications: meds
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Medical info updated");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update");
        } finally {
            setSaving(false);
        }
    };

    const handleEmergencySave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${import.meta.env.VITE_API_URL}/patients/emergency-contact`, {
                contact: profile.emergencyInfo[0].contact,
                relation: profile.emergencyInfo[0].relation
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Emergency contact updated");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <SidebarLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-10">
                
                {/* Personal Info Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaUser className="text-sky-600" />
                            Personal Information
                        </h2>
                    </div>
                    <form onSubmit={handlePersonalSave} className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input 
                                type="date" 
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                value={profile.personalInfo.DOB}
                                onChange={e => setProfile({...profile, personalInfo: {...profile.personalInfo, DOB: e.target.value}})}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select 
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                value={profile.personalInfo.Gender}
                                onChange={e => setProfile({...profile, personalInfo: {...profile.personalInfo, Gender: e.target.value}})}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaTint className="text-red-500"/> Blood Group</label>
                            <select 
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                value={profile.personalInfo.BloodGroup}
                                onChange={e => setProfile({...profile, personalInfo: {...profile.personalInfo, BloodGroup: e.target.value}})}
                            >
                                <option value="">Select</option>
                                {["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <button disabled={saving} className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 flex items-center gap-2">
                                {saving ? <FaSpinner className="animate-spin"/> : <FaSave />} Save Personal Info
                            </button>
                        </div>
                    </form>
                </div>

                {/* Medical Info Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaNotesMedical className="text-emerald-600" />
                            Medical History
                        </h2>
                    </div>
                    <form onSubmit={handleMedicalSave} className="p-6 grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaAllergies className="text-orange-500"/> Allergies</label>
                            <textarea 
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                placeholder="List any known allergies..."
                                rows={2}
                                value={profile.medicalInfo[0].Allergies}
                                onChange={e => {
                                    const newMed = [...profile.medicalInfo];
                                    newMed[0].Allergies = e.target.value;
                                    setProfile({...profile, medicalInfo: newMed});
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaPills className="text-blue-500"/> Current Medications</label>
                             <textarea 
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                placeholder="List medications separated by commas..."
                                rows={2}
                                value={profile.medicalInfo[0].Medications}
                                onChange={e => {
                                    const newMed = [...profile.medicalInfo];
                                    // Store as string temporarily for editing, split on save
                                    // @ts-ignore
                                    newMed[0].Medications = e.target.value; 
                                    setProfile({...profile, medicalInfo: newMed});
                                }}
                            />
                        </div>
                         <div className="flex justify-end">
                            <button disabled={saving} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2">
                                {saving ? <FaSpinner className="animate-spin"/> : <FaSave />} Save Medical Info
                            </button>
                        </div>
                    </form>
                </div>

                {/* Emergency Contact Section */}
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaPhone className="text-red-600" />
                            Emergency Contact
                        </h2>
                    </div>
                    <form onSubmit={handleEmergencySave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                            <input 
                                type="tel" 
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                placeholder="Emergency phone number"
                                value={profile.emergencyInfo[0].contact}
                                onChange={e => {
                                    const newEmer = [...profile.emergencyInfo];
                                    newEmer[0].contact = e.target.value;
                                    setProfile({...profile, emergencyInfo: newEmer});
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                            <input 
                                type="text" 
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                                placeholder="e.g. Spouse, Parent"
                                value={profile.emergencyInfo[0].relation}
                                onChange={e => {
                                    const newEmer = [...profile.emergencyInfo];
                                    newEmer[0].relation = e.target.value;
                                    setProfile({...profile, emergencyInfo: newEmer});
                                }}
                            />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <button disabled={saving} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                                {saving ? <FaSpinner className="animate-spin"/> : <FaSave />} Save Emergency Contact
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </SidebarLayout>
    );
};

export default PatientProfile;
