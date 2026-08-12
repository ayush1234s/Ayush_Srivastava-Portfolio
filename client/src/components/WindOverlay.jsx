import { FiWind } from 'react-icons/fi';

const WindOverlay = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Gust Line 1 */}
      <div
        className="absolute top-16 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-wind-sweep"
        style={{ animationDelay: '0s', animationDuration: '4.5s' }}
      />

      {/* Dynamic Gust Line 2 */}
      <div
        className="absolute top-1/3 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent animate-wind-sweep"
        style={{ animationDelay: '1.8s', animationDuration: '3.8s' }}
      />

      {/* Dynamic Gust Line 3 */}
      <div
        className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent animate-wind-sweep"
        style={{ animationDelay: '3.2s', animationDuration: '5.2s' }}
      />

      {/* Dynamic Gust Line 4 */}
      <div
        className="absolute bottom-20 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-purple-300/40 to-transparent animate-wind-sweep"
        style={{ animationDelay: '2.5s', animationDuration: '4s' }}
      />

      {/* Floating Wind Badges */}
      <div className="absolute top-12 right-6 text-purple-400/25 animate-bounce">
        <FiWind size={36} />
      </div>
      <div className="absolute bottom-24 left-8 text-pink-400/20 animate-pulse">
        <FiWind size={42} />
      </div>
    </div>
  );
};

export default WindOverlay;
