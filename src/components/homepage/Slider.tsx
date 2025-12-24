import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { consultantImg1, hosp1, hosp2, surgeryImg } from "../../constants/images";



const slides = [
    { 
        img: hosp1, 
        title: "World-Class Facilities", 
        subtitle: "Experience healthcare reimagined in our state-of-the-art environment designed for your comfort and healing." 
    },
    { 
        img: surgeryImg, 
        title: "Advanced Surgical Care", 
        subtitle: "Precision and safety driven by our expert surgical teams and cutting-edge robotic technology." 
    },
    { 
        img: consultantImg1, 
        title: "Expert Consultants", 
        subtitle: "Connect with internationally renowned specialists dedicated to your personalized treatment plan." 
    },
    { 
        img: hosp2, 
        title: "Compassionate Nursing", 
        subtitle: "Round-the-clock care provided by our empathetic and highly skilled nursing professionals." 
    },
];

function ProfessionalSlider() {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    waitForAnimate: false,
    arrows:false,
    customPaging: () => (
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/30 hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-sm backdrop-blur-sm ring-1 ring-white/10"></div>
    )
  };

  return (
    <div className="slider-container rounded-3xl overflow-hidden shadow-2xl relative group bg-slate-900 h-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
            <div key={index} className="outline-none relative h-full">
                <div className="relative h-[450px] md:h-[550px] w-full overflow-hidden">
                    {/* Dark Gradient Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Image with Ken Burns Effect */}
                    <img 
                        src={slide.img} 
                        alt={slide.title} 
                        className="w-full h-full object-cover animate-subtle-zoom"
                        style={{
                            animation: `kenBurns 20s infinite alternate`
                        }}
                    />

                     {/* Custom Keyframe for Ken Burns (inline for simplicity or use global CSS) */}
                    <style>{`
                        @keyframes kenBurns {
                            0% { transform: scale(1); }
                            100% { transform: scale(1.15); }
                        }
                    `}</style>


                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 w-full z-20 p-8 md:p-12 text-white/90">
                        <div className="animate-fade-in-up">
                            <h3 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight text-white drop-shadow-lg">
                                {slide.title}
                            </h3>
                            <div className="h-1 w-20 bg-sky-500 rounded-full mb-4 shadow-lg shadow-sky-500/30"></div>
                            <p className="text-slate-200 text-base md:text-lg max-w-xl leading-relaxed font-light drop-shadow-md opacity-90">
                                {slide.subtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProfessionalSlider;
