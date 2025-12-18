import { Link } from 'react-router-dom';
import { FaLock, FaArrowLeft } from 'react-icons/fa';

const Unauth = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <div className="text-center max-w-lg">
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaLock className="text-4xl text-red-500 dark:text-red-400" />
                </div>
                <h1 className="text-4xl font-black mb-4">Access Denied</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                    You do not have permission to access this page. Please contact your administrator if you believe this is a mistake.
                </p>
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-bold transition-all"
                    >
                        <FaArrowLeft /> Go Back
                    </button>
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-sky-900/20"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Unauth;
