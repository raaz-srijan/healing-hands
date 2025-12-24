import consultData from "../../constants/consultData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ConsultantSlider() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {consultData.map((data) => (
          <div key={data.id} className="px-2 sm:px-3 h-full">
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full flex flex-col w-full min-w-0">
              {/* Image */}
              <div className="relative h-56 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={data.img}
                  alt={`Dr. ${data.name} - ${data.depart}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 truncate">
                  {data.name}
                </h3>

                <span className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-900/40 rounded-full border border-sky-200 dark:border-sky-800 truncate">
                  {data.depart}
                </span>

                {data.desc && (
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mt-auto line-clamp-3">
                    {data.desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default function Consultant() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
            Our Expert Consultants
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
            Meet our distinguished team of board-certified specialists dedicated
            to providing exceptional, patient-centered care.
          </p>
        </div>

        <ConsultantSlider />
      </div>
    </section>
  );
}
