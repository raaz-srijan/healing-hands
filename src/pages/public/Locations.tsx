import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaDirections,
} from "react-icons/fa";
import { hosp1, hosp2 } from "../../constants/images";

const Locations = () => {
  const locations = [
    {
      id: 1,
      name: "Healing Care Main Campus",
      address: "123 Healing Way, Orlando, FL 32801",
      phone: "(407) 555-0101",
      hours: "24/7 Emergency | Mon-Fri 8am-8pm",
      image: hosp1,
      href: "https://maps.google.com",
    },
    {
      id: 2,
      name: "Northside Medical Center",
      address: "456 North Blvd, Orlando, FL 32808",
      phone: "(407) 555-0102",
      hours: "Mon-Sat 8am-6pm",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
      href: "https://maps.google.com",
    },
    {
      id: 3,
      name: "South Pediatric Clinic",
      address: "789 South St, Kissimmee, FL 34741",
      phone: "(407) 555-0103",
      hours: "Mon-Fri 9am-5pm",
      image: hosp2,
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <section className="bg-sky-900 text-white chat-bg-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our Locations
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Find a Healing Care facility near you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {loc.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="text-sky-500 mt-1" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <FaPhoneAlt className="text-sky-500" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <FaClock className="text-sky-500" />
                      <span>{loc.hours}</span>
                    </div>
                  </div>
                  <a
                    href={loc.href}
                    target="_blank"
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border-2 border-sky-600 text-sky-600 dark:text-sky-400 py-3 rounded-xl font-bold hover:bg-sky-600 hover:text-white transition-all"
                  >
                    <FaDirections /> Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
