"use client";

import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat {
  value: string;
  label: string;
}

interface HeroProps {
  dict: {
    hero: {
      title_line1: string;
      title_line2: string;
      tagline: string;
      stats: Stat[];
    };
  };
}

function CountUp({ value, inView }: { value: string; inView: boolean }) {
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
  const number = parseInt(value.replace(/\D/g, ""), 10);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, number, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return controls.stop;
  }, [inView, number]);

  return <>{prefix}{display}</>;
}

export default function Hero({ dict }: HeroProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { hero } = dict;

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center overflow-hidden px-6 py-14 md:min-h-[calc(100vh-3.5rem)] md:px-8 md:py-16"
    >
      {/* Subtle blue glow */}
      <div className="pointer-events-none absolute -top-40 -left-20 h-128 w-lg rounded-full bg-blue-500/5 blur-3xl" />

      {/* Two-tone title */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-8 leading-none"
      >
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {hero.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {hero.title_line2}
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-12 max-w-md text-base leading-relaxed text-zinc-400"
      >
        {hero.tagline}
      </motion.p>

      {/* Stats — individually staggered, counting up */}
      <div className="flex flex-wrap gap-12">
        {hero.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: "easeOut" }}
          >
            <div className="text-4xl font-black text-white sm:text-5xl">
              <CountUp value={stat.value} inView={inView} />
            </div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
