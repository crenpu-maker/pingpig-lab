"use client";

import { EventSubmissionHub } from "@/components/EventSubmissionHub";
import { useLanguage } from "@/components/LanguageProvider";
import { MascotCard } from "@/components/MascotCard";

export default function ForumPage() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(11,95,255,0.18),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(249,168,212,0.16),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
              {t.forum.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {t.forum.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              {t.forum.subtitle}
            </p>
          </div>
          <MascotCard
            variant="forum"
            title=""
            description=""
            imageSrc="/mascots/pig-wave.png"
            imageAlt={t.forum.mascotAlt}
          />
        </div>

        <EventSubmissionHub />
      </div>
    </section>
  );
}
