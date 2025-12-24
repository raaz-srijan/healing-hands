import { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes, FaUserMd, FaHospital, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import consultData from '../../constants/consultData';
import departmentData from '../../constants/departmentData';

interface SearchResult {
    type: 'Doctor' | 'Department' | 'Location';
    title: string;
    subtitle?: string;
    link: string;
    icon: any;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const locations = [
       { name: "Healing Care Main Campus", address: "123 Healing Way, Orlando, FL" },
       { name: "Northside Medical Center", address: "456 North Blvd, Orlando, FL" },
       { name: "South Pediatric Clinic", address: "789 South St, Kissimmee, FL" }
    ];

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const newResults: SearchResult[] = [];

        consultData.forEach(doc => {
            if (doc.name.toLowerCase().includes(lowerQuery) || doc.depart.toLowerCase().includes(lowerQuery)) {
                newResults.push({
                    type: 'Doctor',
                    title: doc.name,
                    subtitle: doc.depart,
                    link: '/doctors',
                    icon: FaUserMd
                });
            }
        });

        departmentData.forEach(dept => {
             if (dept.name.toLowerCase().includes(lowerQuery) || dept.description.toLowerCase().includes(lowerQuery)) {
                newResults.push({
                    type: 'Department',
                    title: dept.name,
                    subtitle: 'Medical Department',
                    link: '/services',
                    icon: dept.icon 
                });
            }
        });

         locations.forEach(loc => {
            if (loc.name.toLowerCase().includes(lowerQuery) || loc.address.toLowerCase().includes(lowerQuery)) {
               newResults.push({
                   type: 'Location',
                   title: loc.name,
                   subtitle: loc.address,
                   link: '/locations',
                   icon: FaHospital
               });
           }
       });

        setResults(newResults);
    }, [query]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm transition-all" onClick={onClose}>
            <div 
                className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative border-b border-gray-100 dark:border-gray-700">
                    <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search doctors, departments, or locations..."
                        className="w-full pl-16 pr-16 py-6 text-xl bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                     <button 
                        onClick={onClose}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {query && results.length === 0 ? (
                        <div className="p-12 text-center text-gray-500 dark:text-gray-400">
                            No results found for "{query}"
                        </div>
                    ) : results.length > 0 ? (
                        <div className="py-2">
                             {results.map((result, idx) => (
                                 <NavLink
                                    key={idx}
                                    to={result.link}
                                    onClick={onClose}
                                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group border-b border-gray-50 dark:border-gray-700 last:border-0 cursor-pointer"
                                 >
                                     <div className="w-10 h-10 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-lg flex items-center justify-center text-lg shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                         <result.icon />
                                     </div>
                                     <div className="flex-grow">
                                         <h4 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">{result.title}</h4>
                                         {result.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{result.subtitle}</p>}
                                     </div>
                                     <FaChevronRight className="text-gray-300 group-hover:text-sky-500 transition-colors text-sm" />
                                 </NavLink>
                             ))}
                        </div>
                    ) : (
                        <div className="p-8">
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Links</h4>
                            <div className="flex flex-wrap gap-3">
                                {['Find a Doctor', 'Cardiology', 'Emergency', 'Pay Bill', 'Careers'].map(tag => (
                                    <button 
                                        key={tag}
                                        onClick={() => setQuery(tag)}
                                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400 rounded-lg text-sm font-medium transition-colors text-gray-700 dark:text-gray-300"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
