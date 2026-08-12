import { useEffect, useRef, useState } from 'react';

const SkillBar = ({ name, percentage }) => {
  const [width, setWidth] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);
  const ref = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          setTimeout(() => setWidth(percentage), 100);

          let start = 0;
          const duration = 1400;
          const step = Math.max((duration / percentage) * 0.5, 10);
          const timer = setInterval(() => {
            start += 1;
            setDisplayNum(start);
            if (start >= percentage) {
              clearInterval(timer);
              setDisplayNum(percentage);
            }
          }, step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div className="mb-5 group" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-200 group-hover:text-purple-300 transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
          {displayNum}%
        </span>
      </div>
      <div
        className="h-2.5 bg-slate-900/80 rounded-full overflow-hidden p-0.5 border border-white/10"
        role="progressbar"
        aria-valuenow={width}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_12px_rgba(168,85,247,0.6)]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
