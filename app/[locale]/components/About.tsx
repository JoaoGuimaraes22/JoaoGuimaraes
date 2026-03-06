"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AboutProps {
  dict: {
    about: {
      title_line1: string;
      title_line2: string;
      bio: string;
      skills_heading: string;
      skills: string[];
    };
  };
}

export default function About({ dict }: AboutProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { about } = dict;

  return (
    <section id="about" className="px-6 py-16 md:px-8 md:py-24">
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

      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {about.bio.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mb-4 text-base leading-relaxed text-zinc-400 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <h3 className="mb-4 font-mono text-sm text-zinc-500">
            {about.skills_heading}
          </h3>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
                className="rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 font-mono text-sm text-blue-300 transition-colors duration-150 hover:border-blue-500/40 hover:bg-blue-500/10"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
