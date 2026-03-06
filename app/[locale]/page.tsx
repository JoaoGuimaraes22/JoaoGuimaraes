import { getDictionary } from "../../get-dictionary";
import { type Locale } from "../../i18n-config";
import Navbar from "./components/Navbar";
import ProfileSidebar from "./components/ProfileSidebar";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Experience from "./components/Experience";
import About from "./components/About";
import Contact from "./components/Contact";
import ScrollDownCue from "./components/ScrollDownCue";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const dict = await getDictionary(locale);

  return (
    <>
      <Navbar dict={dict} locale={locale} />

      {/* Below fixed navbar (h-14 = 56px) */}
      <div className="pt-14 md:flex md:min-h-screen xl:mx-auto xl:max-w-350">

        {/* Sticky sidebar — desktop only */}
        <aside className="hidden md:flex md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:w-88 md:shrink-0 md:items-center md:justify-center md:border-r md:border-white/5 md:px-8">
          <ProfileSidebar dict={dict} />
        </aside>

        {/* Scrollable right content */}
        <main className="min-w-0 flex-1">
          {/* Mobile: profile card fills first screen */}
          <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center overflow-hidden px-6 pb-8 pt-6 md:hidden">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl" />
            </div>

            {/* Card centered in remaining space */}
            <div className="flex flex-1 items-center">
              <ProfileSidebar dict={dict} />
            </div>

            <ScrollDownCue />
          </div>

          <div className="xl:max-w-4xl 2xl:max-w-5xl">
            <Hero dict={dict} />
            <Work dict={dict} />
            <Experience dict={dict} />
            <About dict={dict} />
            <Contact dict={dict} />
          </div>
        </main>

      </div>
    </>
  );
}
