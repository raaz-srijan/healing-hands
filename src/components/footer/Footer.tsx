import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaChevronRight, FaFacebook, FaHospital, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    
    setLoading(true);
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/web/subscribe`, { email });
        toast.success("Subscribed successfully!");
        setEmail('');
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to subscribe");
    } finally {
        setLoading(false);
    }
  };

  const socialMedia = [
    {icon: FaFacebook, href: "/fb.com",},
    {icon: FaInstagram, href: "/instagram.com",},
    {icon: FaTwitter, href: "/twitter.com",},
    {icon: FaYoutube, href: "/youtube.com",},

  ]
  return (
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
  {socialMedia.map((social, i) => (
    <a 
      key={i} 
      href={social.href} 
      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all duration-300"
      target="_blank" 
      rel="noopener noreferrer" 
    >
      <social.icon />
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
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-gray-800 text-white px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600 border border-gray-700 transition-all placeholder:text-gray-500"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-linear-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-sky-900/50 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
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
  )
}

export default Footer
