import { Link } from "react-router-dom";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Verification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center transform transition-all duration-300 hover:shadow-3xl">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-sky-50 mb-6 animate-pulse">
          <FaEnvelopeOpenText className="h-12 w-12 text-sky-600" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Check Your Email
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">
          We have sent a confirmation email to the address you registered with. <br/> Please follow the link to verify your account.
        </p>
        
        <div className="flex flex-col space-y-4">
            <Link 
              to="/auth/login" 
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200"
            >
              Return to Login
            </Link>
            
             <p className="text-sm text-gray-400">
                Check your spam folder if you don't see the email.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;
