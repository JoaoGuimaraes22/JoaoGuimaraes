"use client";

import { motion } from "framer-motion";

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

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export default function Hero({ dict }: HeroProps) {
  const { hero } = dict;

  return (
    <section id="home" className="flex flex-col justify-center px-6 py-14 md:min-h-[calc(100vh-3.5rem)] md:px-8 md:py-16">
      {/* Two-tone title */}
      <motion.div {...fadeUp(0.05)} className="mb-8 leading-none">
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {hero.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {hero.title_line2}
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        {...fadeUp(0.15)}
        className="mb-12 max-w-md text-base leading-relaxed text-zinc-400"
      >
        {hero.tagline}
      </motion.p>

      {/* Stats */}
      <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-12">
        {hero.stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-4xl font-black text-white sm:text-5xl">{stat.value}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
