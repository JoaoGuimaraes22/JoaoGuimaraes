import type { Locale } from "../../../i18n-config";
import LanguageSwitcher from "./LanguageSwitcher";
import NavDropdown from "./NavDropdown";

interface NavbarProps {
  dict: {
    nav: {
      home: string;
      work: string;
      experience: string;
      about: string;
      contact: string;
    };
  };
  locale: Locale;
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const sections = [
    { id: "home", label: dict.nav.home },
    { id: "projects", label: dict.nav.work },
    { id: "experience", label: dict.nav.experience },
    { id: "about", label: dict.nav.about },
    { id: "contact", label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0f0f0f]/80 backdrop-blur-md">
      <nav className="grid grid-cols-3 items-center px-6 py-4">
        {/* Left: logo */}
        <a
          href={`/${locale}`}
          className="font-mono text-sm font-medium text-zinc-300 transition-colors hover:text-white"
        >
          JG
        </a>

        {/* Center: section dropdown */}
        <div className="flex justify-center">
          <NavDropdown sections={sections} />
        </div>

        {/* Right: language switcher */}
        <div className="flex justify-end">
          <LanguageSwitcher currentLocale={locale} />
        </div>
      </nav>
    </header>
  );
}
