import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const MESSAGES = [
  "Initializing Future Technology Network",
  "Connecting Neural Systems",
  "Loading AI Core",
  "Establishing Quantum Channels",
  "Preparing Interactive Experience",
  "Welcome"
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const msg = MESSAGES[currentMsgIndex];
    let i = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (i <= msg.length) {
        setDisplayedText(msg.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentMsgIndex]);

  useEffect(() => {
    let currentProgress = 0;
    const duration = 4000;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    const progressIncrement = 100 / steps;
    const messageInterval = 100 / (MESSAGES.length - 1);

    const timer = setInterval(() => {
      currentProgress += progressIncrement;

      if (currentProgress >= 100) {
        setProgress(100);
        setCurrentMsgIndex(MESSAGES.length - 1);
        clearInterval(timer);

        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
              onComplete
            });
          } else {
            onComplete();
          }
        }, 800);
      } else {
        setProgress(currentProgress);
        const newMsgIndex = Math.min(
          Math.floor(currentProgress / messageInterval),
          MESSAGES.length - 2
        );
        if (newMsgIndex !== currentMsgIndex) {
          setCurrentMsgIndex(newMsgIndex);
        }
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Spinner */}
        <div className="relative w-24 h-24 mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-white/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white/20"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.6)]"></div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="w-full font-mono text-sm sm:text-base h-8 flex items-center text-white mb-8 tracking-wider">
          <span className="mr-2 text-white/40">&gt;</span>
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1 inline-block w-2 h-5 bg-white"
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full relative">
          <div className="h-px w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-white/40 via-white to-white/60"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>

          <div className="absolute top-4 right-0 font-mono text-xs text-white/30">
            {Math.round(progress)}%
          </div>

          {/* Scanning line */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
          />
        </div>
      </div>
    </div>
  );
}
