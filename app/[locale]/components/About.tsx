"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FUN_FACT_COLORS = [
  { card: "border-amber-500/20 bg-amber-500/5", emoji: "text-amber-400" },
  { card: "border-violet-500/20 bg-violet-500/5", emoji: "text-violet-400" },
  { card: "border-blue-500/20 bg-blue-500/5", emoji: "text-blue-400" },
  { card: "border-emerald-500/20 bg-emerald-500/5", emoji: "text-emerald-400" },
];

interface FunFact {
  emoji: string;
  text: string;
}

interface AboutProps {
  dict: {
    about: {
      title_line1: string;
      title_line2: string;
      bio: string;
      fun_facts: FunFact[];
    };
  };
}

export default function About({ dict }: AboutProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { about } = dict;

  return (
    <section id="about" className="px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-12 leading-none"
      >
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {about.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {about.title_line2}
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mb-10 max-w-2xl space-y-4 text-base leading-relaxed text-zinc-400 xl:text-lg"
      >
        {about.bio.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </motion.div>

      {/* Fun facts */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {about.fun_facts.map((fact, i) => {
          const color = FUN_FACT_COLORS[i % FUN_FACT_COLORS.length];
          return (
            <motion.div
              key={fact.text}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              className={`flex flex-col gap-3 rounded-2xl border p-5 ${color.card}`}
            >
              <span className={`text-2xl leading-none ${color.emoji}`}>{fact.emoji}</span>
              <p className="text-xs leading-relaxed text-zinc-400">{fact.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
