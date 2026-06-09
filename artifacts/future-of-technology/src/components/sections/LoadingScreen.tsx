import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface LoadingScreenProps { onComplete: () => void; }

const MESSAGES = [
  "Initializing Future Technology Network",
  "Connecting Neural Systems",
  "Loading AI Core",
  "Establishing Quantum Channels",
  "Preparing Interactive Experience",
  "Welcome"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress]           = useState(0);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const msg = MESSAGES[currentMsgIndex];
    let i = 0;
    setDisplayedText("");
    const t = setInterval(() => {
      if (i <= msg.length) { setDisplayedText(msg.slice(0, i)); i++; }
      else clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, [currentMsgIndex]);

  useEffect(() => {
    let cur = 0;
    const steps = 4000 / 50;
    const inc   = 100 / steps;
    const msgStep = 100 / (MESSAGES.length - 1);

    const timer = setInterval(() => {
      cur += inc;
      if (cur >= 100) {
        setProgress(100);
        setCurrentMsgIndex(MESSAGES.length - 1);
        clearInterval(timer);
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, { opacity: 0, duration: 1, ease: "power2.inOut", onComplete });
          } else onComplete();
        }, 800);
      } else {
        setProgress(cur);
        const idx = Math.min(Math.floor(cur / msgStep), MESSAGES.length - 2);
        setCurrentMsgIndex(idx);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mb-12">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/50" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
          </div>
        </div>

        {/* Terminal */}
        <div className="w-full font-mono text-sm sm:text-base h-8 flex items-center text-white mb-8 tracking-wider">
          <span className="mr-2 text-white/30">&gt;</span>
          {displayedText}
          <motion.span animate={{ opacity: [1,0] }} transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1 inline-block w-2 h-5 bg-white" />
        </div>

        {/* Progress bar */}
        <div className="w-full relative">
          <div className="h-px w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-white/40 via-white to-white/50"
              style={{ width: `${progress}%` }} layout />
          </div>
          <div className="absolute top-4 right-0 font-mono text-xs text-white/25">{Math.round(progress)}%</div>
          <motion.div animate={{ x: ["-100%","200%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
        </div>
      </div>
    </div>
  );
}
