"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const heroButtonClass =
  "flex h-14 w-full items-center justify-center rounded-md border border-sky-300/25 bg-court-blue px-6 text-center text-sm font-bold text-white shadow-[0_18px_45px_rgba(11,95,255,0.32)] transition hover:border-sky-200/60 hover:bg-blue-500 sm:w-56";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#030712]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(11,95,255,0.22),transparent_34%),radial-gradient(circle_at_88%_20%,rgba(249,168,212,0.12),transparent_25%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:px-8 lg:py-24">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <p className="inline-flex rounded-md border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-sky-200">
              {t.hero.eyebrow}
            </p>
            <p className="inline-flex rounded-md border border-pink-200/25 bg-pink-200/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-pink-100">
              Tokyo
            </p>
          </div>
          <h1 className="max-w-5xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/forum" className={heroButtonClass}>
              {t.hero.forumButton}
            </Link>
            <Link href="/vision" className={heroButtonClass}>
              {t.hero.tacticsButton}
            </Link>
          </div>
        </div>

        <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-6 text-center shadow-[0_22px_70px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="mx-auto grid h-44 w-44 place-items-center rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(249,168,212,0.18),rgba(11,95,255,0.12)_58%,rgba(2,6,23,0.2))]">
            <Image
              src="/mascots/pig-blandmark.png"
              alt={t.hero.brandAlt}
              width={160}
              height={160}
              className="h-32 w-32 object-contain"
            />
          </div>
          <h2 className="mt-6 text-2xl font-black tracking-tight text-white">
            {t.hero.brandTitle}
          </h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {t.hero.brandLines.map((line) => (
              <p
                key={line}
                className="flex min-h-11 items-center justify-center rounded-md border border-white/10 bg-black/20 px-2 text-center text-[11px] font-bold leading-4 text-slate-200"
              >
                {line}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
