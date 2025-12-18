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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: false,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-white/50 hover:bg-white/80 transition-all cursor-pointer mt-8" />
    )
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gray-900">
      <Slider {...settings} className="h-full">
        {sliderData.map((slide) => (
          <div key={slide.id} className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] outline-none">
            {/* Background Image */}
            <div className="absolute inset-0">
               <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" /> 
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center lg:justify-start lg:pl-20 px-4">
              <div className="max-w-4xl text-white">
                {/* Icon Badge */}
                <div className="inline-flex items-center gap-2 bg-sky-600/30 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 mb-6 slide-up-fade">
                  <MdLocalHospital className="text-xl text-sky-400" />
                  <span className="text-sm font-bold tracking-widest uppercase">{import.meta.env.VITE_APP_NAME?.split(" ").slice(0, 2).join(" ")}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg tracking-tight slide-up-fade" style={{animationDelay: '0.1s'}}>
                  {slide.title}
                </h1>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sky-300 mb-6 drop-shadow-md slide-up-fade" style={{animationDelay: '0.2s'}}>
                  {slide.subtitle}
                </h2>

                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mb-8 drop-shadow-sm slide-up-fade" style={{animationDelay: '0.3s'}}>
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4 slide-up-fade" style={{animationDelay: '0.4s'}}>
                    <Link to="/services" className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-sky-900/20">
                        Explore Services
                    </Link>
                    <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105">
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
            bottom: 30px;
            z-index: 30;
        }
        .slick-dots li {
            margin: 0 4px;
        }
        .slick-dots li.slick-active div {
            background-color: white;
            transform: scale(1.2);
        }
        
        @keyframes slideUpFade {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .slide-up-fade {
            opacity: 0;
            animation: slideUpFade 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}