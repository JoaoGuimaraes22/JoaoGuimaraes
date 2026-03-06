"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AboutProps {
  dict: {
    about: {
      heading: string;
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
    <section id="about" className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 text-3xl font-bold text-white"
        >
          {about.heading}
        </motion.h2>

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
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 font-mono text-sm text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
