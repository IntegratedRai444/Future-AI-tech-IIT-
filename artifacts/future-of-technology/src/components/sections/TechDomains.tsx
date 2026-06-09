import React from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    title: "Artificial Intelligence",
    topics: ["Neural Networks", "AGI", "Generative Models", "NLP"],
    color: "#ffffff",
    desc: "Self-improving synthetic consciousness driving rapid problem solving."
  },
  {
    title: "Quantum Computing",
    topics: ["Qubits", "Entanglement", "Cryptography", "Optimization"],
    color: "#cccccc",
    desc: "Processing complex probabilities simultaneously across multiple states."
  },
  {
    title: "Robotics & Automation",
    topics: ["Humanoids", "Swarm Tech", "Prosthetics", "Manufacturing"],
    color: "#aaaaaa",
    desc: "Physical embodiment of intelligence operating in the physical world."
  },
  {
    title: "Space Tech",
    topics: ["Colonization", "Propulsion", "Resource Mining", "Satellites"],
    color: "#888888",
    desc: "Expanding humanity's footprint beyond the bounds of Earth."
  },
  {
    title: "Cybersecurity",
    topics: ["Zero Trust", "AI Defense", "Biometrics", "Decentralization"],
    color: "#dddddd",
    desc: "Impenetrable digital shields protecting critical infrastructure."
  },
  {
    title: "Smart Cities",
    topics: ["IoT", "Green Energy", "Smart Grids", "Automated Transit"],
    color: "#bbbbbb",
    desc: "Living urban ecosystems that adapt to human needs in real-time."
  }
];

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
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group relative h-full"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ backgroundColor: card.color + '18' }}
              />
              <div className="relative h-full flex flex-col glass-card rounded-2xl p-8 overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-300 z-10">
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-20"
                  style={{ backgroundColor: card.color }}
                />

                <h3 className="text-2xl font-bold mb-3 font-display" style={{ color: card.color }}>
                  {card.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {card.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {card.topics.map(topic => (
                    <span
                      key={topic}
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
