"use client";

export default function ScrollDownCue() {
  function handleClick() {
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to content"
      className="mt-5 flex flex-col items-center gap-1.5 text-zinc-500 transition-colors hover:text-zinc-300"
    >
      <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
      <div className="animate-bounce">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </button>
  );
}
