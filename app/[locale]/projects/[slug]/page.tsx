import { getDictionary } from "../../../../get-dictionary";
import { i18n, type Locale } from "../../../../i18n-config";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of i18n.locales) {
    const dict = await getDictionary(locale);
    for (const project of dict.work.projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const dict = await getDictionary(locale);

  const project = dict.work.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      <div className="min-h-screen pt-14">
        <div className="mx-auto max-w-3xl px-6 py-12 md:px-8 md:py-20">
          {/* Back link */}
          <Link
            href={`/${locale}#projects`}
            className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 transition-colors hover:text-white"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            {locale === "pt" ? "Voltar" : "Back"}
          </Link>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl">
            {project.title}
          </h1>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 font-mono text-xs text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.github || project.live) && (
            <div className="mb-10 flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm text-zinc-300 transition-all duration-150 hover:border-white/20 hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2 text-sm text-zinc-300 transition-all duration-150 hover:border-white/20 hover:text-white"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {locale === "pt" ? "Ver site" : "Live site"}
                </a>
              )}
            </div>
          )}

          {/* Hero image */}
          {project.image && (
            <div className="relative mb-10 h-64 overflow-hidden rounded-2xl border border-white/5 sm:h-80 md:h-96">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Long description */}
          <div className="mb-12 space-y-4">
            {project.long_description.split("\n\n").map((para, i) => (
              <p key={i} className="leading-relaxed text-zinc-400">
                {para}
              </p>
            ))}
          </div>

          {/* Images grid */}
          {project.images.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {project.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/5"
                >
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
