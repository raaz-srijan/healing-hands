import { FaCheckCircle, FaHospital, FaUsers, FaAward } from 'react-icons/fa';
import ProfessionalSlider from '../../components/homepage/Slider';

const About = () => {
    return (
        <div className="animate-fade-in-up">
            <section className="bg-sky-900 text-white chat-bg-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Us</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto">Dedicated to providing compassionate care and advanced medical services to our community for over 50 years.</p>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            To extend the healing ministry of Christ to all patients and their families. We are committed to providing the highest quality healthcare with compassion, respect, and integrity.
                        </p>
                        
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Vision</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            To be the premier healthcare provider in the region, recognized for clinical excellence, patient safety, and a personalized patient experience.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                         <ProfessionalSlider/>
                    </div>
                </div>
            </section>

             {/* Values */}
             <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                         <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
                         <p className="text-gray-600 dark:text-gray-400">The principles that guide our every action.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: FaHospital, title: 'Excellence', desc: 'Striving for the highest standards in everything we do.' },
                            { icon: FaUsers, title: 'Compassion', desc: 'Treating every person with kindness and empathy.' },
                            { icon: FaAward, title: 'Integrity', desc: 'Acting with honesty and strong moral principles.' },
                            { icon: FaCheckCircle, title: 'Safety', desc: 'Prioritizing the well-being of our patients and staff.' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:-translate-y-2 transition-transform">
                                <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                                    <item.icon />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
