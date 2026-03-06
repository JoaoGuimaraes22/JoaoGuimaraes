"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceProps {
  dict: {
    experience: {
      title_line1: string;
      title_line2: string;
      items: ExperienceItem[];
    };
  };
}

function TimelineItem({ item, index, total }: { item: ExperienceItem; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8"
    >
      <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
      {index < total - 1 && (
        <div className="absolute left-[4.5px] top-4 h-full w-px bg-white/5" />
      )}

      <div className="pb-10">
        <div className="mb-1 flex flex-wrap items-baseline gap-2">
          <h3 className="text-base font-semibold text-white">{item.role}</h3>
          <span className="text-sm text-blue-400">{item.company}</span>
        </div>
        <p className="mb-2 font-mono text-xs text-zinc-500">{item.period}</p>
        <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Experience({ dict }: ExperienceProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="px-6 py-16 md:px-8 md:py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-12 leading-none"
      >
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {dict.experience.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {dict.experience.title_line2}
        </div>
      </motion.div>

      <div>
        {dict.experience.items.map((item, index) => (
          <TimelineItem
            key={item.company}
            item={item}
            index={index}
            total={dict.experience.items.length}
          />
        ))}
      </div>
    </section>
  );
}
