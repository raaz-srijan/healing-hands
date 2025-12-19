import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 p-4 transition-colors duration-300">
            <div className="text-center max-w-md">
                <FaExclamationTriangle className="text-6xl text-amber-500 mx-auto mb-6" />
                <h1 className="text-8xl font-black text-gray-200 dark:text-slate-800 mb-4 select-none">404</h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-slate-400 mb-8">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-sky-900/20"
                >
                    <FaHome /> Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
