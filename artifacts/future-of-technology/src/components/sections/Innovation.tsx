import React from 'react';
import { motion } from 'framer-motion';

export default function Innovation() {
  return (
    <section id="innovation" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">Innovation</span> Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the latest breakthroughs redefining the boundaries of what is possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Neural Link Integration", tag: "Breakthrough", img: "bg-gradient-to-br from-neutral-800 to-neutral-900" },
            { title: "Fusion Reactor Scaled", tag: "Energy", img: "bg-gradient-to-br from-zinc-800 to-stone-900" },
            { title: "Autonomous Swarm Construction", tag: "Robotics", img: "bg-gradient-to-br from-slate-800 to-gray-900" },
            { title: "Mars Base Alpha Complete", tag: "Space", img: "bg-gradient-to-br from-gray-700 to-neutral-900" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer rounded-2xl overflow-hidden relative aspect-video"
            >
              <div className={`absolute inset-0 ${item.img} opacity-70 group-hover:scale-105 transition-transform duration-700`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-overlay"></div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-8 flex flex-col justify-end">
                <div className="mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-white/80 border border-white/20 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-white/70 transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
