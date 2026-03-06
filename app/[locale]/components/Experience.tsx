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
      heading: string;
      items: ExperienceItem[];
    };
  };
}

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
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
      {index < 2 && (
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
    <section id="experience" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-3xl font-bold text-white"
        >
          {dict.experience.heading}
        </motion.h2>

        <div>
          {dict.experience.items.map((item, index) => (
            <TimelineItem key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
