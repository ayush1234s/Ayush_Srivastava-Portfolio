import { useState, useEffect } from 'react';

const DayNightSky = ({ onModeChange }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  // Automatically calculate mode strictly based on real system hour:
  // Day: 6 AM to 5 PM (6 to 17)
  // Sunset: 5 PM to 8 PM (17 to 20)
  // Night: 8 PM to 6 AM (20 to 6)
  const getCalculatedMode = () => {
    if (currentHour >= 6 && currentHour < 17) return 'day';
    if (currentHour >= 17 && currentHour < 20) return 'sunset';
    return 'night';
  };

  const activeMode = getCalculatedMode();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (onModeChange) onModeChange(activeMode);
  }, [activeMode, onModeChange]);

  return (
    <div className="relative w-full z-10">
      {/* Dynamic Sky Ambient Background Glow */}
      {activeMode === 'day' && (
        <div className="fixed top-0 right-0 w-[500px] sm:w-[700px] h-[450px] bg-gradient-to-b from-amber-400/20 via-yellow-500/10 to-transparent rounded-full blur-[140px] pointer-events-none transition-all duration-1000 animate-pulse-glow" />
      )}
      {activeMode === 'sunset' && (
        <div className="fixed top-0 right-0 w-[500px] sm:w-[700px] h-[450px] bg-gradient-to-b from-orange-600/30 via-pink-600/20 to-transparent rounded-full blur-[140px] pointer-events-none transition-all duration-1000" />
      )}
      {activeMode === 'night' && (
        <div className="fixed top-0 right-0 w-[500px] sm:w-[700px] h-[450px] bg-gradient-to-b from-indigo-600/25 via-purple-900/20 to-transparent rounded-full blur-[160px] pointer-events-none transition-all duration-1000 animate-pulse-glow" />
      )}

      {/* Twinkling Stars (Night Mode - Visible on All Responsive Devices) */}
      {activeMode === 'night' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-16 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-80" style={{ animationDuration: '2.5s' }} />
          <div className="absolute top-36 right-1/4 w-1.5 h-1.5 bg-purple-200 rounded-full animate-ping opacity-70" style={{ animationDuration: '3.8s' }} />
          <div className="absolute top-14 right-8 w-2 h-2 bg-cyan-200 rounded-full animate-ping opacity-90" style={{ animationDuration: '2s' }} />
          <div className="absolute top-48 left-6 w-1.5 h-1.5 bg-pink-200 rounded-full animate-ping opacity-60" style={{ animationDuration: '4.2s' }} />
          <div className="absolute top-28 left-2/3 w-2 h-2 bg-indigo-200 rounded-full animate-ping opacity-75" style={{ animationDuration: '3.1s' }} />
        </div>
      )}

      {/* Top Banner Status & Responsive 3D Celestial Body Display */}
      <div className="flex items-center justify-between gap-4 pt-2 pb-2">
        {/* Real-time Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono backdrop-blur-md shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-slate-300">Local Time:</span>
          <span className="text-purple-400 font-bold">{currentHour}:00</span>
          <span className="text-slate-500">•</span>
          <span className="text-pink-400 font-bold uppercase">
            {activeMode === 'day' ? '☀️ Day Mode' : activeMode === 'sunset' ? '🌇 Sunset Twilight' : '🌙 Night Sky'}
          </span>
        </div>

        {/* 3D Celestial Body Sphere — VISIBLE ON ALL RESPONSIVE DEVICES */}
        <div className="flex items-center justify-center pointer-events-none z-20">
          {/* DAY MODE: Glowing 3D Sun */}
          {activeMode === 'day' && (
            <div className="relative flex items-center justify-center animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full border-2 border-dashed border-amber-400/50 animate-spin" style={{ animationDuration: '16s' }} />
              <div className="absolute w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300 blur-xl opacity-70 animate-pulse" />
              <div className="relative w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-400 border-2 border-yellow-100 shadow-[0_0_40px_rgba(245,158,11,0.9)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent_60%)]" />
                <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">☀️</span>
              </div>
            </div>
          )}

          {/* SUNSET MODE: Setting 3D Twilight Sun */}
          {activeMode === 'sunset' && (
            <div className="relative flex items-center justify-center">
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 blur-xl opacity-80 animate-pulse" />
              <div className="relative w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-gradient-to-t from-red-600 via-orange-500 to-amber-300 border-2 border-orange-200 shadow-[0_0_40px_rgba(249,115,22,0.9)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.7),transparent_60%)]" />
                <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">🌇</span>
              </div>
            </div>
          )}

          {/* NIGHT MODE: Glowing 3D Silver/Purple Moon */}
          {activeMode === 'night' && (
            <div className="relative flex items-center justify-center animate-bounce" style={{ animationDuration: '7s' }}>
              <div className="absolute w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl opacity-75 animate-pulse" />
              <div className="absolute w-20 sm:w-28 h-20 sm:h-28 rounded-full border border-purple-400/30 animate-spin" style={{ animationDuration: '20s' }} />

              <div className="relative w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-gradient-to-tr from-slate-300 via-purple-100 to-slate-100 border-2 border-white/80 shadow-[0_0_45px_rgba(168,85,247,0.9)] flex items-center justify-center overflow-hidden">
                <div className="absolute top-2 left-3 w-2.5 h-2.5 rounded-full bg-slate-300/60 border border-slate-400/30" />
                <div className="absolute bottom-3 right-4 w-3 h-3 rounded-full bg-slate-300/50 border border-slate-400/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),transparent_65%)]" />
                <span className="text-2xl sm:text-3xl relative z-10 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]">🌙</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayNightSky;
