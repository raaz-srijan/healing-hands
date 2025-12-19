import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../redux/userSlice";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMars,
  FaHospital,
} from "react-icons/fa";
import Loading from "../components/Loading";
import InputField from "../components/InputField";

interface AuthFormData {
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other" | "";
  password: string;
  confirmPassword: string;
}

type AuthProps = {
  type: "login" | "register";
};

const Auth: React.FC<AuthProps> = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loginData, setLoginData] = useState<{
    email: string;
    hash: string;
    phone: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, ""); 
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login/verify-otp`,
        {
          email: loginData?.email,
          hash: loginData?.hash,
          phone: loginData?.phone,
          otp,
        }
      );

      localStorage.setItem("token", res.data.token);
      dispatch(login({ ...res.data.user, token: res.data.token }));
      toast.success("Login successful");

      const role = res.data.user.role?.name || res.data.user.role;
      const roleName = typeof role === "string" ? role : role?.name;

      switch (roleName?.toLowerCase()) {
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "doctor":
          navigate("/dashboard/doctor");
          break;
        case "nurse":
          navigate("/dashboard/nurse");
          break;
        case "receptionist":
          navigate("/dashboard/receptionist");
          break;
        case "patient":
          navigate("/dashboard/patient");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(error);
      toast.error(err.response?.data?.message || err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "register" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const endpoint = type === "login" ? "/user/login" : "/user/register";

      const payload =
        type === "login"
          ? { email: formData.email, password: formData.password }
          : {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              gender: formData.gender,
              password: formData.password,
            };

      const res = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, payload);

      if (type === "login") {
        if (res.data.otpSent) {
          setOtpSent(true);
          setLoginData({
            email: res.data.email,
            hash: res.data.hash,
            phone: res.data.phone,
          });
          toast.success(res.data.message);
        } else {
          localStorage.setItem("token", res.data.token);
          dispatch(login({ ...res.data.user, token: res.data.token }));
          toast.success("Login successful");

          const role = res.data.user.role?.name || res.data.user.role;
          const roleName = typeof role === "string" ? role : role?.name;
          switch (roleName?.toLowerCase()) {
            case "admin":
              navigate("/dashboard/admin");
              break;
            case "doctor":
              navigate("/dashboard/doctor");
              break;
            case "nurse":
              navigate("/dashboard/nurse");
              break;
            case "receptionist":
              navigate("/dashboard/receptionist");
              break;
            case "patient":
              navigate("/dashboard/patient");
              break;
            default:
              navigate("/");
          }
        }
      } else {
        toast.success(res.data.message || "Registration successful. Please verify your email.");
        navigate("/auth/verification");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(error);
      toast.error(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 font-sans transition-colors duration-300">
      {loading && <Loading />}

      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        <img
          src="/auth-bg.png"
          alt="Hospital Background"
          className="w-full h-full object-cover opacity-50 absolute inset-0"
        />
        <div className="relative z-10 flex flex-col justify-center items-center w-full h-full text-white p-12 text-center bg-gradient-to-t from-gray-900 via-transparent to-transparent">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-full mb-8 border border-white/20 shadow-2xl">
            <FaHospital className="text-6xl text-sky-400" />
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            Welcome to <br />
            <span className="text-sky-400">{import.meta.env.VITE_APP_NAME}</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-md leading-relaxed">
            {import.meta.env.VITE_APP_TAGLINE}
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 lg:px-20 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="lg:hidden flex justify-center mb-6">
            <FaHospital className="text-5xl text-sky-600" />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
            {type === "login" ? "Sign In" : "Get Started"}
          </h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-8">
            {type === "login"
              ? "Access your dashboard and manage your tasks."
              : "Create your account to join the network."}
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {otpSent ? (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <InputField
                label="Enter OTP"
                name="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                icon={FaLock}
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-sm text-sky-600 hover:text-sky-500 dark:text-sky-400"
              >
                Back to Login
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {type === "register" && (
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  icon={FaUser}
                  disabled={loading}
                  required
                />
              )}

              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                icon={FaEnvelope}
                disabled={loading}
                required
              />

              {type === "register" && (
                <>
                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    icon={FaPhone}
                    disabled={loading}
                    required
                  />

                  <InputField
                    label="Gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    icon={FaMars}
                    disabled={loading}
                    required
                    as="select"
                    options={[
                      { label: "Select Gender", value: "" },
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                </>
              )}

              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                icon={FaLock}
                disabled={loading}
                required
              />

              {type === "register" && (
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  icon={FaLock}
                  disabled={loading}
                  required
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all duration-200 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading
                  ? "Processing..."
                  : type === "login"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400">
                  {type === "login" ? "New here?" : "Already joined?"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                to={type === "login" ? "/auth/register" : "/auth/login"}
                className="font-medium text-sky-600 hover:text-sky-500 dark:text-sky-400 dark:hover:text-sky-300 transition-colors"
              >
                {type === "login"
                  ? "Create an account"
                  : "Sign in to your account"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
