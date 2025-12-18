import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { FaUserPlus, FaUser, FaEnvelope, FaPhone, FaMars, FaSpinner, FaSave } from 'react-icons/fa';
import SidebarLayout from '../../../components/dashboard/SidebarLayout';

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other" | "";
  password: string;
  confirmPassword: string;
}

const ReceptionistRegister = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        name: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Use the staff-specific endpoint which handles credential emailing and auto-verification
            await axios.post(`${import.meta.env.VITE_API_URL}/user/register-patient`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender,
                password: formData.password
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            toast.success("Patient registered successfully.");
            setFormData({
                name: "",
                email: "",
                phone: "",
                gender: "",
                password: "",
                confirmPassword: ""
            });

        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            console.error("Registration error:", error);
            toast.error(err.response?.data?.message || "Failed to register patient");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SidebarLayout>
             <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <FaUserPlus className="text-sky-600" />
                            Register New Patient
                        </h2>
                        <p className="text-sm text-gray-500">Create a new patient account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="text-gray-400" />
                                    </div>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                                        placeholder="Enter patient full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="text-gray-400" />
                                    </div>
                                    <input 
                                        type="email" 
                                        name="email"
                                        required
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                                        placeholder="patient@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaPhone className="text-gray-400" />
                                    </div>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        required
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                                        placeholder="000-000-0000"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaMars className="text-gray-400" />
                                    </div>
                                    <select 
                                        name="gender"
                                        required
                                        className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all bg-white"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Empty div for grid alignment */}
                             <div className="hidden md:block"></div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                                    placeholder="Temp Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                             {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
                                    placeholder="Confirm Temp Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 active:bg-sky-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-sm"
                            >
                                {loading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                                Register Patient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </SidebarLayout>
    );
};

export default ReceptionistRegister;
