import consultData from "../../constants/consultData";

export default function Consultant() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
               Our Expert Consultants
            </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Meet our team of highly qualified medical professionals dedicated to
            providing exceptional healthcare services across multiple specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultData.map((data) => (
            <div
              key={data.id}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={data.img}
                  alt={data.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {data.name}
                </h3>

                <div className="mb-4">
                    <span className="inline-block bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1 rounded-full">
                        {data.depart}
                    </span>
                </div>

                {data.desc && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-auto">
                    {data.desc}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
