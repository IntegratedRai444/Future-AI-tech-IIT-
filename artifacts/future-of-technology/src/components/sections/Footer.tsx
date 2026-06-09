import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10 bg-[#020617] overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at center, #00F5FF 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      <div className="container relative z-10 px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold font-display">
            TECH<span className="text-primary">FEST</span> <span className="text-muted-foreground font-light text-xl">IIT BOMBAY</span>
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
              whileHover={{ y: -3, color: '#00F5FF' }}
              className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </div>
      </div>
      
      <div className="container relative z-10 px-4 mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground/60">
        &copy; {new Date().getFullYear()} Techfest IIT Bombay. All digital rights reserved. System V.3.1.4
      </div>
    </footer>
  );
}
