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

## File Structure
```
proxy.ts                          Next.js middleware (locale redirect)
i18n-config.ts                    locales: ["en","pt"], defaultLocale: "en"
get-dictionary.ts                 lazy JSON loader
dictionaries/en.json              English strings
dictionaries/pt.json              Portuguese strings
app/
  layout.tsx                      minimal shell (html/body only)
  [locale]/
    layout.tsx                    sets lang attr, Geist fonts, bg-[#0f0f0f]
    page.tsx                      sticky two-column layout
    components/
      Navbar.tsx                  fixed top, 3-col grid, logo | NavDropdown | LanguageSwitcher
      NavDropdown.tsx             client, IntersectionObserver section tracking, AnimatePresence label animation
      LanguageSwitcher.tsx        client, swaps locale prefix in pathname
      ProfileSidebar.tsx          white card, photo (/public/profile.jpg), name, bio, social icons, CTA
      Hero.tsx                    id="home", two-tone title, tagline, stats
      Work.tsx                    id="projects"
      Experience.tsx              id="experience"
      About.tsx                   id="about"
      Contact.tsx                 id="contact"
public/
  profile.jpg                     profile photo
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
    {/* Mobile: profile card as first full screen */}
    <div className="flex min-h-[calc(100vh-3.5rem)] ... md:hidden"><ProfileSidebar /></div>
    <Hero /><Work /><Experience /><About /><Contact />
  </main>
</div>
```

## Design Patterns
- **Two-tone section title** (Hero style): first line `text-white`, second line `text-zinc-800`, both `font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-[7rem]`
- **Section padding**: `px-6 py-16 md:px-8 md:py-24`
- **Scroll animations**: `useInView` from framer-motion, `once: true, margin: "-80px"`
- **Section tracking**: IntersectionObserver only — no scroll handler (caused desktop bug where Projects didn't activate). `rootMargin: "-10% 0px -60% 0px"`
- **Navbar sections**: `[{id:"home"},{id:"projects"},{id:"experience"},{id:"about"},{id:"contact"}]`

## Tailwind v4 Notes
- Use `bg-white/3` not `bg-white/[0.03]`
- Use `bg-linear-to-br` not `bg-gradient-to-br`
- Use `min-w-20` not `min-w-[5rem]`
- Use `md:w-88` not `md:w-[22rem]`

## Dictionary Shape
```json
{
  "nav": { "home", "work", "experience", "about", "contact" },
  "hero": { "name", "card_bio", "title_line1", "title_line2", "tagline", "stats": [{"value","label"}] },
  "work": { "heading", "title_line1", "title_line2", "projects": [{"title","description","tags","github","live"}] },
  "experience": { "heading", "title_line1", "title_line2", "items": [{"role","company","period","description"}] },
  "about": { "heading", "title_line1", "title_line2", "bio", "skills_heading", "skills": [] },
  "contact": { "heading", "title_line1", "title_line2", "body", "email_label", "form_name", "form_email", "form_message", "form_submit", "form_success", "email", "github", "linkedin" }
}
```

## Known Gotchas
- `params` must be `Promise<{ locale: string }>` (not `Locale`) to satisfy Next.js 16 generated types
- Framer Motion `ease` with variants causes type errors — use inline `initial/animate/transition` with `ease: [0.16, 1, 0.3, 1] as const`
- Navbar desktop scroll bug was caused by a scroll handler conflicting with IntersectionObserver — removed entirely
