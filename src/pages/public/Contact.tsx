import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/web/contact`, formData);
            toast.success("Message sent successfully! We'll be in touch soon.");
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
         <div className="animate-fade-in-up">
            {/* Page Header */}
            <section className="bg-sky-900 text-white chat-bg-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto">We are here to help. Reach out to us for any inquiries or assistance.</p>
                </div>
            </section>

            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get in Touch</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                     <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-lg flex items-center justify-center text-xl shrink-0">
                                        <FaPhoneAlt />
                                     </div>
                                     <div>
                                         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Phone</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Main: {import.meta.env.VITE_APP_PHONE}</p>
                                         <p className="text-gray-600 dark:text-gray-300">Emergency: 911</p>
                                         <p className="text-gray-600 dark:text-gray-300">Appointments: 1-800-BOOK-NOW</p>
                                     </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-lg flex items-center justify-center text-xl shrink-0">
                                        <FaEnvelope />
                                     </div>
                                     <div>
                                         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Email</h3>
                                         <p className="text-gray-600 dark:text-gray-300">info@healingcare.com</p>
                                         <p className="text-gray-600 dark:text-gray-300">support@healingcare.com</p>
                                     </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center text-xl shrink-0">
                                        <FaMapMarkerAlt />
                                     </div>
                                     <div>
                                         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Location</h3>
                                         <p className="text-gray-600 dark:text-gray-300">123 Healing Way, Medical District</p>
                                         <p className="text-gray-600 dark:text-gray-300">Orlando, FL 32801</p>
                                     </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-xl shrink-0">
                                        <FaClock />
                                     </div>
                                     <div>
                                         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Hours</h3>
                                         <p className="text-gray-600 dark:text-gray-300">Emergency: 24/7</p>
                                         <p className="text-gray-600 dark:text-gray-300">Outpatient: Mon-Fri 8am - 6pm</p>
                                     </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
                             <form className="space-y-6" onSubmit={handleSubmit}>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                         <input 
                                            type="text" 
                                            required
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
                                        />
                                     </div>
                                     <div className="space-y-2">
                                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                         <input 
                                            type="text" 
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
                                        />
                                     </div>
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                     <input 
                                        type="email" 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
                                    />
                                 </div>
                                 <div className="space-y-2">
                                     <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                     <textarea 
                                        rows={4} 
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"
                                     ></textarea>
                                 </div>
                                 <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3.5 rounded-lg font-bold shadow-lg shadow-sky-600/20 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                                 >
                                     {loading ? 'Sending...' : 'Send Message'}
                                 </button>
                             </form>
                        </div>
                     </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
