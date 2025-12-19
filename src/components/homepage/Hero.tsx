import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdLocalHospital } from "react-icons/md";
import sliderData from "../../constants/sliderData";
import { Link } from "react-router-dom";

export default function Hero() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/30 hover:bg-white/80 transition-all cursor-pointer mt-8" />
    ),
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-900">
      <Slider {...settings} className="h-full">
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] outline-none"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start lg:pl-20 px-4">
              <div className="max-w-3xl text-white space-y-6">
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 bg-sky-600/30 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                  <MdLocalHospital className="text-xl text-sky-400" />
                  <span className="text-sm font-semibold tracking-widest uppercase">
                    {import.meta.env.VITE_APP_NAME?.split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </span>
                </div>

                {/* Headings */}
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg tracking-tight slide-up-fade"
                  style={{ animationDelay: "0.1s" }}
                >
                  {slide.title}
                </h1>

                <h2
                  className="text-lg sm:text-xl md:text-2xl font-semibold text-sky-300 drop-shadow-md slide-up-fade"
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.subtitle}
                </h2>

                <p
                  className="text-base md:text-lg text-gray-200 leading-relaxed drop-shadow-sm slide-up-fade"
                  style={{ animationDelay: "0.3s" }}
                >
                  {slide.description}
                </p>

                {/* Call-to-Action */}
                <div
                  className="flex flex-wrap gap-4 slide-up-fade"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Link
                    to="/services"
                    className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-sky-900/20"
                  >
                    Explore Services
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .slick-dots {
          bottom: 25px;
          z-index: 30;
        }
        .slick-dots li {
          margin: 0 6px;
        }
        .slick-dots li.slick-active div {
          background-color: white;
          transform: scale(1.3);
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-up-fade {
          opacity: 0;
          animation: slideUpFade 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
