"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/vision", label: "Vision" },
  { href: "/forum", label: "Forum" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [showHomeNav, setShowHomeNav] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setShowHomeNav(true);
      return;
    }

    const updateVisibility = () => {
      const sections = document.getElementById("sections");
      if (!sections) {
        setShowHomeNav(false);
        return;
      }

      setShowHomeNav(sections.getBoundingClientRect().top <= 240);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [isHome]);

  if (isHome && !showHomeNav) {
    return null;
  }

  return (
    <header
      className={`top-0 z-50 border-b border-white/10 bg-[#030712]/88 backdrop-blur-xl ${
        isHome ? "fixed inset-x-0" : "sticky"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-court-blue text-sm font-black text-white shadow-[0_0_30px_rgba(11,95,255,0.45)]">
            PP
          </span>
          <span className="text-lg font-bold tracking-tight text-white">
            PingPig Lab
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-court-blue text-white shadow-[0_0_24px_rgba(11,95,255,0.36)]"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
