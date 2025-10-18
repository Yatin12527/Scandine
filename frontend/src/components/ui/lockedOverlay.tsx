import { CiLock } from "react-icons/ci";

const Locked = () => {
  return (
    <div>
      {/* Locked Overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px] z-20 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300">
        <div className="flex flex-col items-center justify-center text-center px-6 py-4">
          <CiLock className="text-amber-400 text-7xl drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] mb-3" />
          <h4 className="text-white font-bold text-2xl mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            Coming Soon
          </h4>
          <p className="text-white text-sm font-semibold drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
            This template will be available shortly
          </p>
        </div>
      </div>
    </div>
  );
};

export default Locked;
