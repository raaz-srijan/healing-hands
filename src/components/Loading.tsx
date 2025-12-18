import { FaCircleNotch } from "react-icons/fa";


const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white">
      
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl bg-cyan-500/30 animate-pulse" />
        <FaCircleNotch
          className="relative z-10 text-cyan-400 animate-spin"
          size={48}
        />
      </div>
      <p className="mt-6 text-sm tracking-widest uppercase text-white font-semibold shadow-black drop-shadow-md">
        Please wait...
      </p>
    </div>
  );
};

export default Loading;
