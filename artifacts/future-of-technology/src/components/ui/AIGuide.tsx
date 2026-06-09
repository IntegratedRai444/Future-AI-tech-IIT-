import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function AIGuide() {
  const [message, setMessage] = useState("Welcome to Future of Technology");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = window.innerHeight;

      if (scrollY < h) setMessage("Initializing Core Experience...");
      else if (scrollY < h * 2) setMessage("Analyzing Technology Network...");
      else if (scrollY < h * 3) setMessage("Accessing Domain Databanks...");
      else if (scrollY < h * 4) setMessage("Calculating Future Metrics...");
      else setMessage("Displaying Innovation Showcase.");
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (i <= message.length) {
        setDisplayedText(message.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [message]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* Tooltip Message */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass border border-primary/30 rounded-lg p-3 pr-4 shadow-[0_0_15px_rgba(0,245,255,0.15)] flex items-center gap-3 bg-black/60 backdrop-blur-xl"
        >
          <div className="w-1 h-8 bg-primary rounded-full"></div>
          <p className="text-sm font-mono text-white/90 max-w-[200px] break-words h-[40px] flex items-center">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1 inline-block w-1.5 h-3 bg-primary"
            />
          </p>
        </motion.div>
      </AnimatePresence>

      {/* AI Orb */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-black flex items-center justify-center pointer-events-auto cursor-pointer border border-primary/30"
      >
        <div className="absolute inset-0 rounded-full border border-primary/50 animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute inset-1 rounded-full border border-accent/60 animate-[spin_3s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-[8px] animate-pulse"></div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_15px_rgba(0,245,255,0.6)]"></div>
      </motion.button>
    </div>
  );
}