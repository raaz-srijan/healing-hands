import consultData from "../../constants/consultData";
import { FaMapMarkerAlt,  FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import BookingModal from "../../components/booking/BookingModal";

const Doctors = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  return (
    <div className="animate-fade-in-up">
      {/* Page Header */}
      <section className="bg-sky-900 text-white chat-bg-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Find a Doctor
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Connect with our team of board-certified specialists.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Filter Placeholder */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-12 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, condition, or specialty..."
              className="flex-grow px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700 placeholder-gray-400 dark:text-white dark:placeholder-slate-400"
            />
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
              Search
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultData.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-2 group"
              >
                <div className="relative h-80 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sky-600 dark:text-sky-400 text-xs font-bold tracking-wider uppercase mb-2 block">
                    {doc.depart}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {doc.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {doc.desc ||
                      "Specialist with over 15 years of experience in patient care."}
                  </p>

                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <FaMapMarkerAlt className="text-sky-500" /> Main Campus,
                      Building A
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                      <FaPhoneAlt className="text-sky-500" /> Available Mon-Fri
                    </div>
                  </div>

                  <button onClick={() => { setSelectedDoctor(doc); setBookingOpen(true); }} className="cursor-pointer w-full mt-6 bg-sky-50 dark:bg-sky-900/30 hover:bg-sky-600 hover:text-white text-sky-700 dark:text-sky-300 py-3 rounded-xl font-bold transition-all duration-300 border border-sky-100 dark:border-sky-800 hover:border-sky-600">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>

          <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} doctor={selectedDoctor} />
        </div>
      </section>
    </div>
  );
};

export default Doctors;
