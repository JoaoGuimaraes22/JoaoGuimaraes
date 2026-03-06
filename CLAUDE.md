# João Guimarães — Portfolio

Next.js 16.1.6 App Router · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## Stack & Config
- **Middleware file**: `proxy.ts` (NOT `middleware.ts` — this project's Next.js version uses `proxy.ts`)
- **i18n**: No external library. `i18n-config.ts` + `get-dictionary.ts` + `dictionaries/en.json` + `dictionaries/pt.json`
- **Locales**: `en` (default), `pt`
- **Routes**: `app/[locale]/page.tsx`, `app/[locale]/layout.tsx`
- **params type**: `params: Promise<{ locale: string }>` with `(await params) as { locale: Locale }` cast
- **Fonts**: Geist Sans (`--font-geist-sans`), Geist Mono (`--font-geist-mono`)
- **Background**: `#0f0f0f`, accent: `blue-500` (`#3b82f6`)
- **Site URL**: `https://joao-guimaraes.vercel.app`

## File Structure
```
proxy.ts                          Next.js middleware (locale redirect)
i18n-config.ts                    locales: ["en","pt"], defaultLocale: "en"
get-dictionary.ts                 lazy JSON loader
dictionaries/en.json              English strings
dictionaries/pt.json              Portuguese strings
app/
  page.tsx                        root redirect → /en
  robots.ts                       /robots.txt — allow all, points to sitemap
  sitemap.ts                      /sitemap.xml — one entry per locale
  layout.tsx                      minimal shell (html/body only)
  [locale]/
    layout.tsx                    lang attr, Geist fonts, bg-[#0f0f0f], generateMetadata (OG/Twitter/JSON-LD), ScrollProgress
    page.tsx                      sticky two-column layout
    components/
      Navbar.tsx                  fixed top, 3-col grid, logo | NavDropdown | LanguageSwitcher
      NavDropdown.tsx             client, IntersectionObserver section tracking, AnimatePresence label animation
      LanguageSwitcher.tsx        client, swaps locale prefix in pathname
      ProfileSidebar.tsx          white card, w-full max-w-xs, photo, name, bio, social icons, CTA
      ScrollProgress.tsx          client, fixed top blue bar, useScroll+useSpring, z-60
      ScrollDownCue.tsx           client, mobile-only scroll button, scrollIntoView #home
      Hero.tsx                    id="home", two-tone title, CountUp stats, blue glow bg
      Work.tsx                    id="projects", lifted inView stagger
      Experience.tsx              id="experience", timeline
      About.tsx                   id="about", staggered skill pills
      Contact.tsx                 id="contact", contact form + social links
public/
  profile.jpg                     profile photo
  og-image.png                    OG image 1200×630 (must be added manually)
```

## Layout Pattern
```tsx
// page.tsx — sticky sidebar left, scrollable content right
<Navbar />
<div className="pt-14 md:flex md:min-h-screen">
  <aside className="hidden md:flex md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-88 ...">
    <ProfileSidebar />
  </aside>
  <main className="min-w-0 flex-1">
    {/* Mobile: profile card + scroll cue as first full screen */}
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center overflow-hidden px-6 pb-8 pt-6 md:hidden">
      <div className="flex flex-1 items-center"><ProfileSidebar /></div>
      <ScrollDownCue />
    </div>
    <Hero /><Work /><Experience /><About /><Contact />
  </main>
</div>
```

## Design Patterns
- **Two-tone section title**: first line `text-white`, second line `text-zinc-800`, both `font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-[7rem]`, wrapped in `motion.div` with `leading-none mb-12`
- **Section padding**: `px-6 py-16 md:px-8 md:py-24`
- **Scroll animations**: `useInView` from framer-motion, `once: true, margin: "-80px"`
- **Stagger pattern**: lift `inView` to parent, pass down to children via prop; each child uses `delay: index * 0.12`
- **Section tracking**: IntersectionObserver only — no scroll handler. `rootMargin: "-10% 0px -60% 0px"`
- **Navbar sections**: `[{id:"home"},{id:"projects"},{id:"experience"},{id:"about"},{id:"contact"}]`
- **CountUp**: `animate()` from framer-motion with `onUpdate`, parses numeric prefix (e.g. "+6") — defined in Hero.tsx
- **ProfileSidebar mobile**: star icon `hidden md:flex`; card `w-full max-w-xs`; animation `y: 24, scale: 0.97` (not x)

## SEO / Metadata
- `generateMetadata` in `[locale]/layout.tsx` (not static `export const metadata`)
- OG image: `/og-image.png` (1200×630) — must be added to `/public/`
- JSON-LD Person schema injected via `<script type="application/ld+json">` in `<head>`
- Language alternates: `en` → `/en`, `pt` → `/pt`
- Update `sameAs` URLs in layout.tsx when real GitHub/LinkedIn URLs are set

## Tailwind v4 Notes

- Use `bg-white/3` not `bg-white/[0.03]`
- Use `bg-linear-to-br` not `bg-gradient-to-br`
- Use `min-w-20` not `min-w-[5rem]`
- Use `md:w-88` not `md:w-[22rem]`
- Use `h-128` not `h-[32rem]`, `w-lg` not `w-[32rem]`
- Use `z-60` not `z-[60]`

## Dictionary Shape

```json
{
  "nav": { "home", "work", "experience", "about", "contact" },
  "hero": { "name", "card_bio", "title_line1", "title_line2", "tagline", "stats": [{"value","label"}] },
  "work": { "title_line1", "title_line2", "projects": [{"title","description","tags","github","live"}] },
  "experience": { "title_line1", "title_line2", "items": [{"role","company","period","description"}] },
  "about": { "title_line1", "title_line2", "bio", "skills_heading", "skills": [] },
  "contact": { "title_line1", "title_line2", "body", "email_label", "form_name", "form_email", "form_message", "form_submit", "form_success", "email", "github", "linkedin" }
}
```

## Known Gotchas
- `params` must be `Promise<{ locale: string }>` (not `Locale`) to satisfy Next.js 16 generated types
- Framer Motion `ease` with variants causes type errors — use inline `initial/animate/transition` with `ease: [0.16, 1, 0.3, 1] as const`
- Navbar desktop scroll bug was caused by a scroll handler conflicting with IntersectionObserver — removed entirely
- `React.FormEvent` is deprecated in React 19 types — use `{ preventDefault(): void }` for form submit handlers
- ScrollProgress must be `z-60` (above Navbar's `z-50`) to be visible
- `app/page.tsx` must export a default (redirects to `/en`) or build fails with "is not a module"
