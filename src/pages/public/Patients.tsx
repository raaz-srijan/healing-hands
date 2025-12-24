import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaCalendarPlus,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Patients = () => {
  return (
    <div className="animate-fade-in-up">
      <section className="bg-sky-900 text-white chat-bg-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Patients & Visitors
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Resources to manage your health and visit.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Link
              to="/auth/login"
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center text-3xl mb-6">
                <FaUserCircle />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600">
                Patient Portal
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                View records, book appointments, and message your doctor
                securely.
              </p>
              <span className="text-sky-600 dark:text-sky-400 font-bold">
                Login →
              </span>
            </Link>
            
          </div>

          <div className="bg-sky-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Visitor Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Visiting Hours
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  General Wards: 10:00 AM - 8:00 PM
                  <br />
                  ICU: 11:00 AM - 12:00 PM & 5:00 PM - 6:00 PM
                </p>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Parking
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Visitor parking is available in Garage A and B. Valet service
                  is available at the main entrance.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  Guidelines
                </h3>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Masks are recommended in clinical areas.</li>
                  <li>Two visitors per patient at a time.</li>
                  <li>Please wash hands before and after visiting.</li>
                  <li>Children under 12 may visit with adult supervision.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Resources */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Resources</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              <Link to="/doctors" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-full flex items-center justify-center text-xl mb-4">
                  <FaMapMarkerAlt />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Find a Doctor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Browse specialists and make informed choices.</p>
              </Link>

              <Link to="/doctors" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center text-xl mb-4">
                  <FaCalendarPlus />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Book Appointment</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Request appointments with our clinicians.</p>
              </Link>

              <Link to="/contact" className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-300 rounded-full flex items-center justify-center text-xl mb-4">
                  <FaPhone />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">Contact & Support</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Call or message for help and directions.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Patients;
