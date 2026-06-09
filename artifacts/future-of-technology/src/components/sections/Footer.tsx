import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/8 bg-[#030303] overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="container relative z-10 px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold font-display">
            TECH<span className="text-white">FEST</span> <span className="text-muted-foreground font-light text-xl">IIT BOMBAY</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            The Future of Technology Exhibition
          </p>
        </div>

        <div className="flex items-center gap-4">
          {['X', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ y: -3 }}
              className="text-muted-foreground hover:text-white text-sm font-medium transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground/50">
        &copy; {new Date().getFullYear()} Techfest IIT Bombay. All digital rights reserved. System V.3.1.4
      </div>
    </footer>
  );
}
