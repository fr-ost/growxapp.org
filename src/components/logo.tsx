import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="GrowX home">
      <Image
        src="/logo.svg"
        alt="GrowX logo"
        width={34}
        height={34}
        // Above the fold but tiny: load it eagerly without a preload, so only the hero screenshot is preloaded (A8).
        loading="eager"
        className="rounded-[10px] shadow-[var(--shadow-red)] transition-[rotate,scale] duration-300 ease-glide group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className={`font-display text-xl font-extrabold tracking-tight ${tone === "light" ? "text-white" : "text-text"}`}>
        Grow<span className={tone === "light" ? "text-accent-on-ink" : "text-accent"}>X</span>
      </span>
    </Link>
  );
}
