"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileSidebarProps {
  dict: {
    hero: {
      name: string;
      card_bio: string;
    };
    nav: {
      contact: string;
    };
    contact: {
      email: string;
      github: string;
      linkedin: string;
    };
  };
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function ProfileSidebar({ dict }: ProfileSidebarProps) {
  const { hero, nav, contact } = dict;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      className="relative"
    >
      {/* Dashed border decoration */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl"
        style={{ border: "2px dashed rgba(59,130,246,0.25)" }}
      />

      <div className="relative z-10 flex w-72 flex-col items-center rounded-2xl bg-white px-7 py-9 text-center shadow-2xl">
        {/* Photo */}
        <div className="relative mb-5 h-52 w-full overflow-hidden rounded-xl">
          <Image
            src="/profile.jpg"
            alt={hero.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Name */}
        <p className="mb-2 text-lg font-bold text-zinc-900">{hero.name}</p>

        {/* Blue accent icon */}
        <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>

        {/* Card bio */}
        <p className="mb-7 text-sm leading-relaxed text-zinc-500">{hero.card_bio}</p>

        {/* Social icons */}
        <div className="mb-5 flex items-center gap-5">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-zinc-800"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 transition-colors hover:text-zinc-800"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-zinc-400 transition-colors hover:text-zinc-800"
            aria-label="Email"
          >
            <EmailIcon />
          </a>
        </div>

        {/* Contact CTA */}
        <a
          href="#contact"
          className="w-full rounded-full bg-blue-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-400"
        >
          {nav.contact}
        </a>
      </div>
    </motion.div>
  );
}
