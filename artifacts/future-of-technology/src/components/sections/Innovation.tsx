import { motion } from 'framer-motion';

const TIMELINE_ENTRIES = [
  { year: "2025", title: "AI Agents Go Autonomous",      desc: "Artificial General Intelligence transitions from tool to collaborator.",                                    color: "#ffffff" },
  { year: "2030", title: "Smart Cities Fully Online",    desc: "Urban infrastructure achieves full sensor integration and autonomous management.",                        color: "#cccccc" },
  { year: "2035", title: "Quantum Internet Deployed",    desc: "Global quantum-encrypted communication replaces classical networks.",                                      color: "#aaaaaa" },
  { year: "2040", title: "Human-AI Synthesis Networks",  desc: "Neural interfaces achieve seamless bidirectional human-machine communication.",                           color: "#888888" },
  { year: "2050", title: "Interplanetary Civilization",  desc: "Self-sustaining Mars colonies mark humanity's transition to multi-planetary species.",                    color: "#666666" },
];

export default function Innovation() {
  return (
    <section id="innovation" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient">Future</span> Timeline
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the latest breakthroughs redefining the boundaries of what is possible.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/40 via-white/20 to-white/05 -translate-x-1/2 rounded-full" />

          {TIMELINE_ENTRIES.map((entry, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={entry.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col md:flex-row items-center mb-16 last:mb-0"
              >
                {/* Mobile dot */}
                <div className="absolute left-[20px] top-[24px] md:hidden w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 z-10 bg-white/60"
                  style={{ boxShadow: `0 0 10px rgba(255,255,255,0.4)` }} />

                {/* Card */}
                <div className={`w-full pl-10 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-14' : 'md:order-2 md:pl-14'}`}>
                  <div className="p-6 rounded-xl glass-card border border-white/8 hover:border-white/20 transition-colors duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-white" />
                    {/* Year badge — mobile only */}
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 font-mono tracking-wider text-black md:hidden"
                      style={{ backgroundColor: entry.color }}>
                      {entry.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{entry.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{entry.desc}</p>
                  </div>
                </div>

                {/* Desktop year badge */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
                  <div className="w-20 h-9 rounded-full flex items-center justify-center font-bold text-sm tracking-wider border border-white/20 backdrop-blur-md transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: entry.color, color: idx < 2 ? '#000' : '#000', boxShadow: `0 0 16px rgba(255,255,255,0.12)` }}>
                    {entry.year}
                  </div>
                </div>

                <div className={`hidden md:block w-1/2 ${isEven ? 'md:order-2' : ''}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
