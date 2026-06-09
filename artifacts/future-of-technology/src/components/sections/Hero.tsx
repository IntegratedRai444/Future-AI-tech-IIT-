import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const AICore = React.lazy(() => import('../three/AICore'));

const TECHNOLOGIES = [
  "Artificial Intelligence",
  "Quantum Computing",
  "Cybersecurity",
  "Space Technology",
  "Robotics",
  "Smart Cities"
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = TECHNOLOGIES[wordIndex];

    const handleType = () => {
      setDisplayedText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });

      if (!isDeleting && displayedText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TECHNOLOGIES.length);
      } else {
        const speed = isDeleting ? 30 : 70;
        timer = setTimeout(handleType, speed);
      }
    };

    timer = setTimeout(handleType, isDeleting ? 30 : 70);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex]);

  const scrollToExplore = () => {
    document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#00F5FF" />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7B61FF" />

            <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />

            <group position={[0, 0, -2]}>
              <AICore scale={1.5} color="#00F5FF" />
            </group>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Foreground Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center text-center px-4 mt-16 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          System Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">FUTURE OF</span>
          <br />
          <span className="text-white drop-shadow-[0_0_30px_rgba(0,245,255,0.2)]">TECHNOLOGY</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-xl md:text-2xl mb-4 font-mono"
        >
          <span className="text-muted-foreground">Powered by </span>
          <span className="text-primary font-semibold">{displayedText}</span>
          <span className="inline-block w-2 h-6 bg-primary ml-1 animate-pulse align-middle"></span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 font-light"
        >
          Enter a living digital universe. Explore the convergence of Artificial Intelligence, Quantum Computing, and Robotics shaping human destiny.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button
            onClick={scrollToExplore}
            size="lg"
            className="h-14 px-8 bg-white text-black hover:bg-white/90 text-lg font-semibold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] transition-all duration-300 w-full sm:w-auto"
          >
            Begin Journey
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToExplore}
            className="h-14 px-8 border-primary/50 text-primary hover:bg-primary/10 text-lg font-semibold rounded-full glass w-full sm:w-auto neon-border"
          >
            Explore Technologies
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-muted-foreground z-10"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-mono text-primary/70">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}