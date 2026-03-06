"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Category {
  name: string;
  items: string[];
}

interface TechStackProps {
  dict: {
    techstack: {
      title_line1: string;
      title_line2: string;
      categories: Category[];
    };
  };
}

const CATEGORY_COLORS = [
  { label: "text-blue-400", pill: "border-blue-500/20 bg-blue-500/5 text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/10" },
  { label: "text-emerald-400", pill: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/10" },
  { label: "text-violet-400", pill: "border-violet-500/20 bg-violet-500/5 text-violet-300 hover:border-violet-500/40 hover:bg-violet-500/10" },
  { label: "text-amber-400", pill: "border-amber-500/20 bg-amber-500/5 text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/10" },
  { label: "text-rose-400", pill: "border-rose-500/20 bg-rose-500/5 text-rose-300 hover:border-rose-500/40 hover:bg-rose-500/10" },
];

export default function TechStack({ dict }: TechStackProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { techstack } = dict;

  return (
    <section id="skills" className="px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-12 leading-none"
      >
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {techstack.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {techstack.title_line2}
        </div>
      </motion.div>

      <div className="flex flex-col gap-8">
        {techstack.categories.map((category, catIdx) => {
          const color = CATEGORY_COLORS[catIdx % CATEGORY_COLORS.length];
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.12, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <span className={`w-24 shrink-0 font-mono text-xs uppercase tracking-widest ${color.label}`}>
                {category.name}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIdx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIdx * 0.12 + itemIdx * 0.06 }}
                    className={`rounded-full border px-4 py-1.5 font-mono text-sm transition-colors duration-150 ${color.pill}`}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
