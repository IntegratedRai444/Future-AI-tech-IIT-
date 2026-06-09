import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CARDS = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    topics: ["Neural Networks", "AGI", "Generative Models", "NLP"],
    color: "#00F5FF",
    desc: "Self-improving synthetic consciousness driving rapid problem solving."
  },
  {
    id: "quantum",
    title: "Quantum Computing",
    topics: ["Qubits", "Entanglement", "Cryptography", "Optimization"],
    color: "#7B61FF",
    desc: "Processing complex probabilities simultaneously across multiple states."
  },
  {
    id: "robotics",
    title: "Robotics & Automation",
    topics: ["Humanoids", "Swarm Tech", "Prosthetics", "Manufacturing"],
    color: "#3B82F6",
    desc: "Physical embodiment of intelligence operating in the physical world."
  },
  {
    id: "space",
    title: "Space Tech",
    topics: ["Colonization", "Propulsion", "Resource Mining", "Satellites"],
    color: "#4F46E5",
    desc: "Expanding humanity's footprint beyond the bounds of Earth."
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    topics: ["Zero Trust", "AI Defense", "Biometrics", "Decentralization"],
    color: "#00FFD5",
    desc: "Impenetrable digital shields protecting critical infrastructure."
  },
  {
    id: "smartcities",
    title: "Smart Cities",
    topics: ["IoT", "Green Energy", "Smart Grids", "Automated Transit"],
    color: "#10B981",
    desc: "Living urban ecosystems that adapt to human needs in real-time."
  }
];

function CardIcon({ id, color }: { id: string, color: string }) {
  if (id === "ai") {
    return (
      <div className="w-full h-[60px] relative mb-4">
        <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
          <motion.path d="M10 30 L40 10 L40 50 L70 10 L70 50 L90 30" 
            fill="none" stroke={color} strokeWidth="1.5" strokeOpacity="0.3" />
          <motion.path d="M10 30 L40 10 L40 50 L70 10 L70 50 L90 30" 
            fill="none" stroke={color} strokeWidth="2"
            strokeDasharray="200"
            animate={{ strokeDashoffset: [200, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {[ [10,30], [40,10], [40,50], [70,10], [70,50], [90,30] ].map((pos, i) => (
            <motion.circle key={i} cx={pos[0]} cy={pos[1]} r="3" fill={color} 
              animate={{ r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </div>
    );
  }
  if (id === "quantum") {
    return (
      <div className="w-full h-[60px] relative mb-4 flex items-center justify-center">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute border border-dashed rounded-full"
            style={{ width: i * 20, height: i * 20, borderColor: color, opacity: 0.5 }}
            animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
    );
  }
  if (id === "robotics") {
    return (
      <div className="w-full h-[60px] relative mb-4 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 50 50" className="w-12 h-12" fill="none" stroke={color} strokeWidth="3">
            <circle cx="25" cy="25" r="10" />
            <path d="M25 5 L25 10 M25 40 L25 45 M5 25 L10 25 M40 25 L45 25 M11 11 L14 14 M36 36 L39 39 M11 39 L14 36 M36 11 L39 14" />
          </svg>
        </motion.div>
      </div>
    );
  }
  if (id === "space") {
    return (
      <div className="w-full h-[60px] relative mb-4 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
        <motion.div
          className="absolute w-12 h-12 border rounded-full"
          style={{ borderColor: color, opacity: 0.3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
        </motion.div>
      </div>
    );
  }
  if (id === "cybersecurity") {
    return (
      <div className="w-full h-[60px] relative mb-4 flex items-center justify-center">
        <svg viewBox="0 0 50 50" className="w-10 h-10 overflow-visible" fill="none" stroke={color} strokeWidth="2">
          <path d="M25 5 L40 12 L40 25 C40 35 25 45 25 45 C25 45 10 35 10 25 L10 12 Z" />
          <motion.line x1="8" y1="5" x2="42" y2="5" stroke="white" strokeWidth="1"
            animate={{ y1: [5, 45, 5], y2: [5, 45, 5], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    );
  }
  if (id === "smartcities") {
    return (
      <div className="w-full h-[60px] relative mb-4 flex items-end justify-center gap-1">
        {[20, 40, 30, 50, 25].map((h, i) => (
          <div key={i} className="w-4 border-t border-l border-r" style={{ height: h, borderColor: color, opacity: 0.5 }}>
            <motion.div className="w-full h-1 mt-1 bg-white"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function DomainCard({ card, idx }: { card: any, idx: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      style={{ perspective: 1000 }}
      className="group relative h-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full flex flex-col glass-card rounded-2xl p-8 overflow-hidden transition-all duration-300 z-10"
      >
        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20"
          style={{ backgroundColor: card.color }}
        />

        <CardIcon id={card.id} color={card.color} />

        <h3 className="text-2xl font-bold mb-3 font-display" style={{ color: card.color }}>
          {card.title}
        </h3>
        <p className="text-muted-foreground mb-6 flex-grow">
          {card.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {card.topics.map((topic: string) => (
            <span
              key={topic}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechDomains() {
  return (
    <section id="domains" className="py-24 relative bg-[#030303]">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-6">
            Core <span className="text-gradient">Disciplines</span>
          </h2>
          <div className="h-px w-24 bg-white/30 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CARDS.map((card, idx) => (
            <DomainCard key={card.id} card={card} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}