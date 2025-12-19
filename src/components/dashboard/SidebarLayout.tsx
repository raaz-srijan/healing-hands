import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import {
  FaUserShield,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsersCog,
  FaBars,
  FaUserMd,
  FaUserNurse,
  FaConciergeBell,
  FaUserInjured,
  FaLock,
  FaTimes,
  FaCalendarAlt,
  FaClipboardList,
  FaStethoscope,
  FaFileMedical,
  FaSun,
  FaMoon,
  FaQuestionCircle
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import ConfirmationModal from "../../components/ConfirmationModal";

interface SidebarProps {
  children: React.ReactNode;
}

const SidebarLayout = ({ children }: SidebarProps) => {
    const { isDark, toggleTheme } = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const user = useSelector((state) => state.user);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && !isSidebarOpen) {
        setIsSidebarOpen(true); 
      } else if (mobile && isSidebarOpen) {
        setIsSidebarOpen(false); 
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/auth/login");
    setIsLogoutModalOpen(false);
  };

  // Define Navigation Groups
  const adminNavItems = [
    { name: "Dashboard", path: "/dashboard/admin", icon: <FaTachometerAlt /> },
    { name: "Doctors", path: "/dashboard/admin/doctors", icon: <FaUserMd /> },
    { name: "Nurses", path: "/dashboard/admin/nurses", icon: <FaUserNurse /> },
    { name: "Receptionists", path: "/dashboard/admin/receptionists", icon: <FaConciergeBell /> },
    { name: "Patients", path: "/dashboard/admin/patients", icon: <FaUserInjured /> },
    {name: "FAQs", path: "/dashboard/admin/faqs", icon:<FaQuestionCircle /> },
    { name: "User Management", path: "/dashboard/admin/users", icon: <FaUsersCog /> },
    { name: "Roles & Permissions", path: "/dashboard/admin/roles", icon: <FaLock /> },
  ];

  const doctorNavItems = [
    { name: "Dashboard", path: "/dashboard/doctor", icon: <FaTachometerAlt /> },
    { name: "Appointments", path: "/dashboard/doctor/appointments", icon: <FaCalendarAlt /> },
    { name: "My Patients", path: "/dashboard/doctor/patients", icon: <FaUserInjured /> },
    { name: "Schedule", path: "/dashboard/doctor/schedule", icon: <FaClipboardList /> },
    { name: "Reports", path: "/dashboard/doctor/reports", icon: <FaFileMedical /> },
    { name: "My Profile", path: "/dashboard/doctor/profile", icon: <FaUserMd /> },
  ];

    const nurseNavItems = [
    { name: "Dashboard", path: "/dashboard/nurse", icon: <FaTachometerAlt /> },
    { name: "Assignments", path: "/dashboard/nurse/assignments", icon: <FaClipboardList /> },
    { name: "Patients", path: "/dashboard/nurse/patients", icon: <FaUserInjured /> },
    { name: "Schedule", path: "/dashboard/nurse/schedule", icon: <FaCalendarAlt /> },
    { name: "My Profile", path: "/dashboard/nurse/profile", icon: <FaUserMd /> },
  ];

  const receptionistNavItems = [
    { name: "Dashboard", path: "/dashboard/receptionist", icon: <FaTachometerAlt /> },
    { name: "Appointments", path: "/dashboard/receptionist/appointments", icon: <FaCalendarAlt /> },
    { name: "Register Patient", path: "/dashboard/receptionist/register", icon: <FaUserInjured /> },
    { name: "Schedule", path: "/dashboard/receptionist/schedule", icon: <FaCalendarAlt /> },
    { name: "My Profile", path: "/dashboard/receptionist/profile", icon: <FaUserMd /> },
  ];

  const patientNavItems = [
    { name: "Dashboard", path: "/dashboard/patient", icon: <FaTachometerAlt /> },
    { name: "My Appointments", path: "/dashboard/patient/appointments", icon: <FaCalendarAlt /> },
    { name: "Medical Records", path: "/dashboard/patient/records", icon: <FaFileMedical /> },
    { name: "My Profile", path: "/dashboard/patient/profile", icon: <FaUserMd /> },
  ];

  let currentNavItems = adminNavItems;
  let panelTitle = "Admin Panel";
  let userLabel = "Admin";
  let HeaderIcon = FaUserShield;

  if (location.pathname.startsWith("/dashboard/doctor")) {
      currentNavItems = doctorNavItems;
      panelTitle = "Doctor Portal";
      userLabel = "Doctor";
      HeaderIcon = FaStethoscope;
  } else if (location.pathname.startsWith("/dashboard/nurse")) {
      currentNavItems = nurseNavItems;
      panelTitle = "Nurse Portal";
      userLabel = "Nurse";
      HeaderIcon = FaUserNurse;
  } else if (location.pathname.startsWith("/dashboard/receptionist")) {
      currentNavItems = receptionistNavItems;
      panelTitle = "Reception Desk";
      userLabel = "Receptionist";
      HeaderIcon = FaConciergeBell;
  } else if (location.pathname.startsWith("/dashboard/patient")) {
      currentNavItems = patientNavItems;
      panelTitle = "Patient Portal";
      userLabel = "Patient";
      HeaderIcon = FaUserInjured;
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex font-sans overflow-hidden relative transition-colors duration-300">
      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white dark:bg-gray-800 shadow-xl fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out flex flex-col ${
          isSidebarOpen
            ? "w-64 translate-x-0"
            : `${isMobile ? "-translate-x-full" : "w-20 translate-x-0"}`
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700 min-h-[4rem]">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="p-1.5 bg-sky-100 dark:bg-sky-900/50 rounded-lg">
                <HeaderIcon className="text-sky-600 dark:text-sky-400 text-lg" />
              </div>
              <h1 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight whitespace-nowrap">
                  {panelTitle}
              </h1>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <HeaderIcon className="text-sky-600 dark:text-sky-400 text-2xl" />
            </div>
          )}
        

          {/* Close Button for Mobile */}
          {isMobile && isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-red-500 dark:text-gray-400"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
          {currentNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
                title={!isSidebarOpen ? item.name : ""}
              >
                <span
                  className={`text-xl shrink-0 ${
                    isActive
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  }`}
                >
                  {item.icon}
                </span>
                {isSidebarOpen && (
                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis animate-fade-in">
                    {item.name}
                  </span>
                )}
                {!isSidebarOpen && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogoutClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 group cursor-pointer relative`}
            title="Logout"
          >
            <FaSignOutAlt className="text-xl shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400" />
            {isSidebarOpen && (
              <span className="font-medium text-sm whitespace-nowrap animate-fade-in">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full w-0 transition-all duration-300">
        {/* Mobile Header */}
        <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4 lg:hidden z-30 sticky top-0 border-b border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600 dark:text-gray-200 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <FaBars className="text-xl" />
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">{panelTitle}</h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </header>

        {/* Desktop Header / Breadcrumbs placeholder */}
        <div className="hidden lg:flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-sky-600 transition-colors p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FaBars />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
              {currentNavItems.find((item) => item.path === location.pathname)?.name ||
                "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-3">
              <button
                        onClick={toggleTheme}
                        className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                        title="Toggle Dark Mode"
                      >
                        {isDark ? (
                          <FaSun className="text-white text-xl animate-spin-slow" />
                        ) : (
                          <FaMoon className="text-sky-600 text-xl" />
                        )}
                      </button>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                (typeof user?.role === 'string' ? user.role : user?.role?.name) === 'admin' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
            }`}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col">
                 <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{user?.name || userLabel}</span>
                 <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {typeof user?.role === 'string' ? user.role : user?.role?.name || userLabel}
                 </span>
            </div>
          </div>
        </div>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {children}
        </main>
      </div>

      <ConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of your account?"
        confirmText="Logout"
        type="danger"
      />
    </div>
  );
}; 

export default SidebarLayout;
