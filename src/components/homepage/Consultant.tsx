import consultData from "../../constants/consultData";
import Slider from "react-slick";

function ConsultantSlider() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
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
    <Slider {...settings}>
      {consultData.map((data) => (
        <div key={data.id} className="px-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
            
            <div className="relative h-72 overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={data.img}
                alt={data.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {data.name}
              </h3>

              <span className="w-fit mb-4 inline-block bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1 rounded-full">
                {data.depart}
              </span>

              {data.desc && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-auto">
                  {data.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default function Consultant() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our Expert Consultants
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Meet our team of highly qualified medical professionals committed to
            delivering trusted and compassionate healthcare across specialties.
          </p>
        </div>

        <ConsultantSlider />
      </div>
    </section>
  );
}
