"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { VisionMascotCard } from "@/components/VisionMascotCard";
import { VisualizationLevels } from "@/components/VisualizationLevels";

export default function VisionPage() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(11,95,255,0.2),transparent_32%),radial-gradient(circle_at_90%_15%,rgba(249,168,212,0.12),transparent_25%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
              {t.tactics.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {t.tactics.title}
            </h1>
            {t.tactics.subtitle ? (
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                {t.tactics.subtitle}
              </p>
            ) : null}

            <div className="mt-8 max-w-4xl rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
              <h2 className="text-2xl font-black tracking-tight text-white">
                {t.tactics.introTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {t.tactics.introBody}
              </p>
              <p className="mt-4 border-l-2 border-sky-300/70 pl-4 text-base font-semibold leading-8 text-sky-100">
                {t.tactics.introNote}
              </p>
            </div>
          </div>
          <VisionMascotCard />
        </div>

        <VisualizationLevels />
      </div>
    </section>
  );
}
