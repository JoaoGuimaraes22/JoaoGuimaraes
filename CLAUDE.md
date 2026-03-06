# João Guimarães — Portfolio

Next.js 16.1.6 App Router · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## Stack & Config

- **Middleware**: `proxy.ts` (NOT `middleware.ts`)
- **i18n**: `i18n-config.ts` + `get-dictionary.ts` + `dictionaries/en.json` + `dictionaries/pt.json`. Locales: `en` (default), `pt`. Export: `i18n.locales`, not `locales`.
- **params type**: `params: Promise<{ locale: string }>` with `(await params) as { locale: Locale }` cast
- **Fonts**: Geist Sans / Geist Mono · **BG**: `#0f0f0f` · **Accent**: `blue-500`
- **Site URL**: `https://joao-guimaraes.vercel.app`
- **Real contacts**: email `Jssgmrs22@gmail.com`, GitHub `JoaoGuimaraes22`, LinkedIn `joão-sebastião-guimarães-4abaa7197`

## File Structure

```files
proxy.ts                      middleware (locale redirect)
i18n-config.ts                locales + Locale type
get-dictionary.ts             lazy JSON loader
dictionaries/en.json / pt.json
app/
  page.tsx                    redirects → /en
  robots.ts / sitemap.ts
  layout.tsx                  minimal shell
  [locale]/
    layout.tsx                generateMetadata (OG/Twitter/JSON-LD), ScrollProgress
    page.tsx                  sticky two-column layout (xl:mx-auto xl:max-w-350)
    projects/[slug]/page.tsx  project detail page (generateStaticParams from dict)
    components/
      Navbar.tsx              fixed top, logo | NavDropdown | LanguageSwitcher
      NavDropdown.tsx         IntersectionObserver section tracking
      LanguageSwitcher.tsx    swaps locale prefix in pathname
      ProfileSidebar.tsx      sticky card: photo, name, card_bio, social icons
      ScrollProgress.tsx      fixed top blue bar, z-60
      ScrollDownCue.tsx       mobile-only scroll button
      Hero.tsx                id="home", bg image (/hero-img.jpg), CountUp stats
      Work.tsx                id="projects", requires locale prop, card click → /[locale]/projects/[slug]
      Experience.tsx          id="experience", timeline
      TechStack.tsx           id="skills", category rows with colored pills
      About.tsx               id="about", multi-paragraph bio + fun fact cards
      Contact.tsx             id="contact", form + social links
public/
  profile.jpg                 profile photo
  hero-img.jpg                hero background (opacity-25, object-top)
  og-image.png                OG image 1200×630
```

## Layout (page.tsx)

```tsx
<div className="pt-14 md:flex md:min-h-screen xl:mx-auto xl:max-w-350">
  <aside className="hidden md:flex md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-88 ...">
    <ProfileSidebar />
  </aside>
  <main className="min-w-0 flex-1">
    {/* mobile: full-screen profile card */}
    <div className="xl:max-w-4xl 2xl:max-w-5xl">
      <Hero />
      <Work locale={locale} />
      <Experience />
      <TechStack />
      <About />
      <Contact />
    </div>
  </main>
</div>
```

## Design Patterns

- **Two-tone title**: line1 `text-white`, line2 `text-zinc-800`, both `font-black uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-[7rem]`, in `motion.div leading-none mb-12`
- **Section padding**: `px-6 py-16 md:px-8 md:py-24 xl:px-16 xl:py-32`
- **Scroll animations**: `useInView(ref, { once: true, margin: "-80px" })`
- **Stagger**: lift `inView` to parent, pass as prop; children use `delay: index * 0.12`
- **Section nav tracking**: IntersectionObserver only, `rootMargin: "-10% 0px -60% 0px"`. Sections: `home, projects, experience, about, contact`. TechStack (`id="skills"`) not in nav.
- **Card colors**: `CARD_COLORS` array (blue/violet/emerald/amber/rose/cyan) indexed by `% length`
- **Project cards**: click navigates via `useRouter().push()`, inner links use `e.stopPropagation()`
- **About bio**: multi-paragraph, split on `\n\n` in component

## Dictionary Shape

```json
{
  "nav": { "home", "work", "experience", "about", "contact" },
  "hero": { "name", "card_bio", "title_line1", "title_line2", "tagline", "stats": [{"value","label"}] },
  "work": { "title_line1", "title_line2", "github_cta", "projects": [{"slug","title","description","long_description","image","images","tags","github","live"}] },
  "experience": { "title_line1", "title_line2", "items": [{"role","company","period","description"}] },
  "techstack": { "title_line1", "title_line2", "categories": [{"name","items":[]}] },
  "about": { "title_line1", "title_line2", "bio", "fun_facts": [{"emoji","text"}] },
  "contact": { "title_line1", "title_line2", "body", "form_name", "form_email", "form_message", "form_name_placeholder", "form_email_placeholder", "form_message_placeholder", "form_submit", "form_success", "email_label", "email", "github", "linkedin" }
}
```

## SEO

- `generateMetadata` in `[locale]/layout.tsx`
- JSON-LD Person schema in `<head>` — update `sameAs` with real GitHub/LinkedIn
- Language alternates: `en` → `/en`, `pt` → `/pt`

## Tailwind v4

- `bg-linear-to-br` not `bg-gradient-to-br`
- `bg-white/3` not `bg-white/[0.03]`
- `md:w-88`, `z-60`, `max-w-350` (no arbitrary values)

## Known Gotchas

- `params` must be `Promise<{ locale: string }>`, not `Locale` directly
- Framer Motion ease with variants → type errors; use `ease: [0.16, 1, 0.3, 1] as const` inline
- `React.FormEvent` deprecated in React 19 — use `{ preventDefault(): void }`
- ScrollProgress `z-60` (above Navbar `z-50`)
- `app/page.tsx` must export a default or build fails
