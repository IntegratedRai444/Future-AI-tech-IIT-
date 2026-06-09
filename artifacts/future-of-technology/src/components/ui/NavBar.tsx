import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Home',       href: '#home' },
  { label: 'Network',    href: '#network' },
  { label: 'Domains',    href: '#domains' },
  { label: 'Metrics',    href: '#metrics' },
  { label: 'Innovation', href: '#innovation' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = LINKS.map(l => l.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4 glass border-b border-white/6 shadow-lg' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('#home')}>
          <div className="w-8 h-8 rounded bg-white shadow-[0_0_12px_rgba(255,255,255,0.25)] flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-black rotate-45" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white hidden sm:block">
            TECH<span className="text-white/50">FEST</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full px-2 py-2 border border-white/6 shadow-inner">
          {LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeSection === link.href.substring(1) ? 'text-white' : 'text-white/35 hover:text-white/75'
              }`}
            >
              {link.label}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/8 rounded-full border border-white/20 -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center">
          <button className="md:hidden p-2 text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <button className="hidden md:block px-5 py-2 text-sm font-semibold rounded-full border border-white/20 text-white/60 hover:text-white hover:bg-white/8 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </motion.header>
  );
}
