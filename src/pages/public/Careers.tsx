import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';


interface Job {
    title: string;
    type: string;
    location: string;
    department?: string;
}

const Careers = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`);
                setJobs(res.data.jobs || []);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="animate-fade-in-up">
            <section className="bg-sky-900 text-white chat-bg-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Join Our Team</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto">Build a rewarding career with Healing Care.</p>
                </div>
            </section>

            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Work With Us?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center text-center p-4">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3 text-xl"><FaBriefcase/></div>
                                <h3 className="font-bold mb-2 dark:text-gray-200">Great Benefits</h3>
                                <p className="text-sm text-gray-500">Comprehensive health, dental, and vision coverage.</p>
                            </div>
                             <div className="flex flex-col items-center text-center p-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 text-xl"><FaGraduationCap/></div>
                                <h3 className="font-bold mb-2 dark:text-gray-200">Growth</h3>
                                <p className="text-sm text-gray-500">Tuition reimbursement and ongoing training.</p>
                            </div>
                             <div className="flex flex-col items-center text-center p-4">
                                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3 text-xl"><FaBriefcase/></div>
                                <h3 className="font-bold mb-2 dark:text-gray-200">Culture</h3>
                                <p className="text-sm text-gray-500">A supportive and inclusive work environment.</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Open Positions</h2>
                    {loading ? (
                         <div className="py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 flex justify-center items-center">
                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                         </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-gray-500 dark:text-gray-400">There are currently no open positions. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center hover:shadow-md transition-shadow">
                                    <div className="mb-4 sm:mb-0">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{job.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">{job.location} • {job.type} {job.department ? `• ${job.department}` : ''}</p>
                                    </div>
                                    <button className="bg-sky-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-sky-700 transition-colors">Apply Now</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Careers;
