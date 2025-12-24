import  { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

const Countup = () => {
  const [isInView, setIsInView] = useState(false);
  
  const countupRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
          }
        });
      },
      {
        threshold: 0.5, 
      }
    );

    if (countupRef.current) {
      observer.observe(countupRef.current);
    }

    return () => {
      if (countupRef.current) {
        observer.unobserve(countupRef.current);
      }
    };
  }, []);

  return (
    <div ref={countupRef} className="grid grid-cols-2 gap-8 mb-8">
      {[
        { val: 50, label: "Years of Service" },
        { val: 1200, label: "Expert Doctors" },
        { val: 24, label: "Emergency Care" },
        { val: 15000, label: "Happy Patients" },
      ].map((stat, i) => (
        <div key={i}>
          <p className="text-3xl font-bold text-sky-600 dark:text-sky-400 mb-1">
            {isInView && (
              <CountUp
                start={0}
                end={stat.val}
                duration={1.5}
                separator=","
                suffix={stat.val === 24 ? "+" : ""}
              />
            )}
          </p>
          <p className="text-gray-600 dark:text-slate-400 font-medium">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Countup;
