import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricProps {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}

function Counter({ label, value, suffix, prefix = "", decimals = 0, duration = 2 }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(easeProgress * value);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl relative overflow-hidden group border border-white/10">
      <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      <div className="font-mono text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter flex items-center relative z-10">
        {prefix && <span className="text-primary mr-1">{prefix}</span>}
        {displayValue.toFixed(decimals)}
        <span className="text-accent ml-1">{suffix}</span>
      </div>
      <div className="text-sm md:text-base text-muted-foreground uppercase tracking-widest font-semibold text-center relative z-10">
        {label}
      </div>
    </div>
  );
}

export default function Metrics() {
  const stats = [
    { label: "AI Processing Capacity", value: 847, suffix: " ExaFLOPS", decimals: 0 },
    { label: "Global Connectivity", value: 8.9, suffix: "B Nodes", decimals: 1 },
    { label: "Renewable Integration", value: 73, suffix: "%", decimals: 0 },
    { label: "Automation Adoption", value: 62, suffix: "%", decimals: 0 },
    { label: "Research Acceleration", value: 340, prefix: "x", suffix: "", decimals: 0 },
  ];

  return (
    <section id="metrics" className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Future <span className="text-gradient-teal">Global Metrics</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time projection data analyzing the exponential growth of technological integration across global infrastructures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Counter {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}