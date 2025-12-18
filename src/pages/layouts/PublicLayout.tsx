import { useState } from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import SearchModal from '../../components/homepage/SearchModal';
import { useSelector } from 'react-redux';
import { 
  FaMoon, 
  FaSun, 
  FaUserMd, 
  FaHospital, 
  FaPhoneAlt, 
  FaSearch, 
  FaBars, 
  FaTimes, 
  FaChevronRight, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram 
} from 'react-icons/fa';

const PublicLayout = () => {
  const { isDark, toggleTheme } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { _id, role } = useSelector((state: any) => state.user);

  const getDashboardLink = () => {
      switch(role?.toLowerCase()) {
          case 'admin': return '/dashboard/admin';
          case 'doctor': return '/dashboard/doctor';
          case 'nurse': return '/dashboard/nurse';
          case 'receptionist': return '/dashboard/receptionist';
          case 'patient': return '/dashboard/patient';
          default: return '/auth/login';
      }
  };

  const navLinks = [
    { name: 'Find a Doctor', path: '/doctors' },
    { name: 'Our Services', path: '/services' },
    { name: 'Locations', path: '/locations' },
    { name: 'Patients & Visitors', path: '/patients' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
            <Link
              to={_id ? getDashboardLink() : "/auth/login"}
              className="hidden sm:flex bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 hover:-translate-y-0.5 items-center gap-2"
            >
              <FaUserMd />
              <span>{_id ? 'Dashboard' : 'Portal'}</span>
            </Link>

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Search Modal Overlay */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Top Bar */}
      <div className="bg-sky-700 dark:bg-sky-900 text-white text-sm py-2 px-4 md:px-8 flex justify-between items-center transition-colors duration-300 z-50 relative">
        <div className="flex gap-6 hidden sm:flex">
          <Link to="/about" className="hover:text-sky-200 transition-colors">About Us</Link>
          <Link to="/careers" className="hover:text-sky-200 transition-colors">Careers</Link>
          <Link to="/news" className="hover:text-sky-200 transition-colors">News</Link>
        </div>
        <div className="flex gap-6 w-full sm:w-auto justify-between sm:justify-start">
          <span className="flex items-center gap-2">
            <FaPhoneAlt className="text-sky-300" />
            <a href={`tel:${import.meta.env.VITE_APP_PHONE || '1-800-HEALING'}`} className="hover:text-sky-200 transition-colors font-medium">
              {import.meta.env.VITE_APP_PHONE || '1-800-HEALING'}
            </a>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white/90 dark:bg-gray-800/95 backdrop-blur-md shadow-sm sticky top-0 z-40 transition-all duration-300 border-b border-gray-100 dark:border-gray-700`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-sky-700 dark:text-sky-400 group"
          >
            <div className="p-2.5 bg-linear-to-br from-sky-500 to-sky-600 dark:from-sky-600 dark:to-sky-800 rounded-xl text-white shadow-lg group-hover:shadow-sky-500/30 transition-all duration-300">
              <FaHospital className="text-2xl" />
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight leading-none group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                {import.meta.env.VITE_APP_NAME?.split(" ").slice(0, 2).join(" ") || "Healing Care"}
                </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-gray-50 dark:bg-gray-700/50 p-1.5 rounded-full border border-gray-100 dark:border-gray-600">
            {navLinks.slice(0, 4).map((link) => (
               <NavLink
               key={link.path}
               to={link.path}
               className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive ? 'bg-white dark:bg-gray-600 text-sky-600 dark:text-sky-300 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-gray-100/50 dark:hover:bg-gray-600/50'}`}
             >
               {link.name}
             </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                title="Search"
            >
              <FaSearch className="text-lg" />
            </button>

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

            <Link
              to="/auth/login"
              className="hidden sm:flex bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md shadow-sky-600/20 hover:shadow-lg hover:shadow-sky-600/30 hover:-translate-y-0.5 items-center gap-2"
            >
              <FaUserMd />
              <span>Portal</span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
            >
                {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-white dark:bg-gray-900 pt-24 px-4 animate-fade-in-up">
            <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => `p-4 rounded-xl text-lg font-semibold flex justify-between items-center ${isActive ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400' : 'text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-700'}`}
                    >
                        {link.name}
                        <FaChevronRight className="text-sm opacity-50"/>
                    </NavLink>
                ))}
                 <Link
                    to="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 bg-sky-600 text-white p-4 rounded-xl text-lg font-bold text-center shadow-lg"
                 >
                    Patient Portal Login
                 </Link>
            </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 text-white mb-6">
                 <div className="p-2 bg-sky-600 rounded-lg">
                    <FaHospital className="text-xl" />
                </div>
              <span className="text-2xl font-bold tracking-tight">
                {import.meta.env.VITE_APP_NAME?.split(" ").slice(0, 2).join(" ") || "Healing Care"}
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed pr-4">
              Providing world-class healthcare with a personal touch. specialized care driven by compassion and medical excellence.
            </p>
            <div className="flex gap-4">
               {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all duration-300">
                    <Icon />
                 </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-sky-600 inline-block pb-2">
              Patient Care
            </h4>
            <ul className="space-y-4">
              <li><Link to="/doctors" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Find a Doctor</Link></li>
              <li><Link to="/services" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Our Services</Link></li>
              <li><Link to="/appointments" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Book Appointment</Link></li>
              <li><Link to="/auth/login" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Patient Portal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-sky-600 inline-block pb-2">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> About Us</Link></li>
              <li><Link to="/careers" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Careers <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded ml-2">Hiring</span></Link></li>
              <li><Link to="/news" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> News & Blog</Link></li>
              <li><Link to="/contact" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Contact Us</Link></li>
              <li><Link to="/locations" className="hover:text-sky-400 transition-colors flex items-center gap-2"><FaChevronRight className="text-xs text-sky-600" /> Locations</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-sky-600 inline-block pb-2">Newsletter</h4>
            <p className="text-gray-400 mb-6 text-sm">
              Subscribe to our newsletter for health tips, updates, and hospital news directly to your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 border border-gray-700 transition-all placeholder:text-gray-500"
              />
              <button className="bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-sky-900/50">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME || "Healing Care Hospital System"}. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
                    <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
                    <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
