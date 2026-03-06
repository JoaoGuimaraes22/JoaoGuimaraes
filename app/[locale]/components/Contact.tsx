"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface ContactProps {
  dict: {
    contact: {
      title_line1: string;
      title_line2: string;
      body: string;
      form_name: string;
      form_email: string;
      form_message: string;
      form_submit: string;
      form_success: string;
      email_label: string;
      email: string;
      github: string;
      linkedin: string;
    };
  };
}

export default function Contact({ dict }: ContactProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { contact } = dict;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="px-6 py-16 md:px-8 md:py-24">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        className="mb-8 leading-none"
      >
        <div className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[7rem]">
          {contact.title_line1}
        </div>
        <div className="text-4xl font-black uppercase tracking-tight text-zinc-800 sm:text-5xl md:text-6xl xl:text-[7rem]">
          {contact.title_line2}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="mb-12 max-w-md text-base leading-relaxed text-zinc-400"
      >
        {contact.body}
      </motion.p>

      <div className="grid gap-8 md:grid-cols-[1fr_auto]">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          {submitted ? (
            <div className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-6 py-8">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-blue-400"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <p className="text-base text-white">{contact.form_success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-zinc-500">
                    {contact.form_name}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-xs text-zinc-500">
                    {contact.form_email}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-xs text-zinc-500">
                  {contact.form_message}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-blue-500/50"
                />
              </div>
              <button
                type="submit"
                className="rounded-full bg-blue-500 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400"
              >
                {contact.form_submit}
              </button>
            </form>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col gap-3 md:min-w-48"
        >
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-all duration-150 hover:translate-x-1 hover:border-white/20 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {contact.email_label}
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-all duration-150 hover:translate-x-1 hover:border-white/20 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-300 transition-all duration-150 hover:translate-x-1 hover:border-white/20 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </motion.div>
      </div>

      <p className="mt-24 font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} João Guimarães
      </p>
    </section>
  );
}
