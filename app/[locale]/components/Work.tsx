"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Project {
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image: string | null;
  images: string[];
  tags: string[];
  github: string | null;
  live: string | null;
}

interface WorkProps {
  locale: string;
  dict: {
    work: {
      title_line1: string;
      title_line2: string;
      github_cta: string;
      projects: Project[];
    };
    contact: {
      github: string;
    };
  };
}

const CARD_COLORS = [
  {
    card: "border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40",
    tag: "border-blue-500/20 bg-blue-500/5 text-blue-300",
    gradient: "from-blue-500/30 to-blue-950/40",
    overlay: "bg-blue-950/60",
  },
  {
    card: "border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40",
    tag: "border-violet-500/20 bg-violet-500/5 text-violet-300",
    gradient: "from-violet-500/30 to-violet-950/40",
    overlay: "bg-violet-950/60",
  },
  {
    card: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40",
    tag: "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
    gradient: "from-emerald-500/30 to-emerald-950/40",
    overlay: "bg-emerald-950/60",
  },
  {
    card: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40",
    tag: "border-amber-500/20 bg-amber-500/5 text-amber-300",
    gradient: "from-amber-500/30 to-amber-950/40",
    overlay: "bg-amber-950/60",
  },
  {
    card: "border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40",
    tag: "border-rose-500/20 bg-rose-500/5 text-rose-300",
    gradient: "from-rose-500/30 to-rose-950/40",
    overlay: "bg-rose-950/60",
  },
  {
    card: "border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40",
    tag: "border-cyan-500/20 bg-cyan-500/5 text-cyan-300",
    gradient: "from-cyan-500/30 to-cyan-950/40",
    overlay: "bg-cyan-950/60",
  },
];

function ProjectCard({
  project,
  index,
  inView,
  locale,
}: {
  project: Project;
  index: number;
  inView: boolean;
  locale: string;
}) {
  const color = CARD_COLORS[index % CARD_COLORS.length];
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      onClick={() => router.push(`/${locale}/projects/${project.slug}`)}
      className={`group cursor-pointer rounded-2xl border p-0 transition-all duration-200 hover:-translate-y-1 overflow-hidden ${color.card}`}
    >
      {/* Image / placeholder area */}
      <div className="relative h-44 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-linear-to-br ${color.gradient}`} />
        )}

        {/* Screenshots strip on hover (when images exist) */}
        {project.images.length > 1 && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {project.images.slice(0, 4).map((img, i) => (
              <div key={i} className="relative h-10 flex-1 overflow-hidden rounded-md border border-white/10">
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${color.overlay} backdrop-blur-sm`}>
          <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white">
            View Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <div className="flex shrink-0 gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 transition-colors hover:text-white"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-500 transition-colors hover:text-white"
                aria-label="Live site"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full border px-3 py-1 font-mono text-xs ${color.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Work({ dict, locale }: WorkProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-12 leading-none"
      >
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {dict.work.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {dict.work.title_line2}
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dict.work.projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            inView={inView}
            locale={locale}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: dict.work.projects.length * 0.12 + 0.1, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <a
          href={dict.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-400 transition-all duration-150 hover:border-white/20 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {dict.work.github_cta}
        </a>
      </motion.div>
    </section>
  );
}
