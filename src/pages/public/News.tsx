import { FaRegNewspaper, FaCalendarAlt } from 'react-icons/fa';

const News = () => {
    const newsItems = [
        {
            title: "Healing Care Ranked #1 in Patient Safety",
            date: "October 24, 2023",
            excerpt: "We are proud to announce that our main campus has received the top grade for patient safety from the Hospital Safety Association.",
            image: "https://images.unsplash.com/photo-1579684385186-278297b98544?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "New Cardiac Wing Opens This Fall",
            date: "September 15, 2023",
            excerpt: "Expanding our cardiovascular capabilities with a new state-of-the-art wing dedicated to advanced heart care and specialized surgeries.",
            image: "https://images.unsplash.com/photo-1516574187841-693083f69802?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Community Health Fair 2023",
            date: "August 5, 2023",
            excerpt: "Join us for free screenings, health education, and family fun at our annual community health fair in Downtown Park.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
        }
    ];

    return (
        <div className="animate-fade-in-up">
            <section className="bg-sky-900 text-white chat-bg-gradient py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">News & Media</h1>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto">Latest updates, press releases, and events from Healing Care.</p>
                </div>
            </section>

             <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {newsItems.map((item, idx) => (
                             <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 flex flex-col hover:-translate-y-2">
                                 <div className="h-56 overflow-hidden">
                                     <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                 </div>
                                 <div className="p-6 flex flex-col flex-grow">
                                     <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-sm font-semibold mb-3">
                                         <FaCalendarAlt />
                                         <span>{item.date}</span>
                                     </div>
                                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-sky-600 transition-colors cursor-pointer">{item.title}</h3>
                                     <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow">{item.excerpt}</p>
                                     <button className="text-sky-600 dark:text-sky-400 font-bold self-start hover:underline">Read Full Story →</button>
                                 </div>
                             </div>
                        ))}
                     </div>
                </div>
             </section>
        </div>
    );
};

export default News;
