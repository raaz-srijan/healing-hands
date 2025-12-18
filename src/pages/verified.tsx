import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Loading from "../components/Loading";

const Verified = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const { token } = useParams();
  const [searchParams] = useSearchParams();
  const queryToken = searchParams.get("token");

  useEffect(() => {
    const tokenToVerify = token || queryToken;

    if (!tokenToVerify) {
      setStatus("success");
      return;
    }

    const verifyEmail = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/user/verify/${tokenToVerify}`);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, queryToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center transition-all duration-300">
        
        {status === "loading" && <Loading />}

        {status === "success" && (
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <FaCheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-8">
              Your email has been successfully verified. <br/> You can now access your account.
            </p>
            <Link
              to="/auth/login"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              Proceed to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-fade-in-up">
            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <FaTimesCircle className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-8">
              The verification link is invalid or has expired. <br/> Please try registering again or contact support.
            </p>
            <Link
              to="/auth/register"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              Back to Registration
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verified;
