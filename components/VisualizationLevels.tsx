"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function VisualizationLevels() {
  const { t } = useLanguage();
  const [openLevel, setOpenLevel] = useState<number | null>(1);

  return (
    <section aria-labelledby="tactics-levels-title" className="mt-12">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            {t.tactics.levelsEyebrow}
          </p>
          <h2
            id="tactics-levels-title"
            className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl"
          >
            {t.tactics.levelsTitle}
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          {t.tactics.levelsSubtitle}
        </p>
      </div>

      <div className="grid gap-4">
        {t.tactics.levels.slice(0, 1).map((level, index) => {
          const id = index + 1;
          const isOpen = openLevel === id;

          return (
            <article
              key={level.title}
              className={`rounded-lg border bg-gradient-to-br p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur transition duration-300 ${
                isOpen
                  ? "border-sky-300/[0.55] from-sky-400/[0.16] via-white/[0.075] to-blue-950/[0.45]"
                  : "border-white/10 from-white/[0.07] via-white/[0.045] to-blue-950/20 hover:border-sky-300/[0.45] hover:from-sky-400/[0.12]"
              }`}
            >
              <button
                type="button"
                className="flex w-full flex-col text-left"
                aria-expanded={isOpen}
                aria-controls={`tactics-level-${id}`}
                onClick={() => setOpenLevel(isOpen ? null : id)}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-sky-200/25 bg-sky-400/[0.12] text-2xl font-black text-sky-100 shadow-[0_0_30px_rgba(56,189,248,0.16)]">
                    {id}
                  </span>
                  <span
                    className={`mt-1 rounded-full border px-3 py-1 text-sm font-black transition ${
                      isOpen
                        ? "border-sky-200/50 bg-sky-300/15 text-sky-100"
                        : "border-white/10 bg-black/25 text-slate-300"
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </span>

                <span className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                  Level {id}
                </span>
                <span className="mt-2 text-xl font-black tracking-tight text-white">
                  {level.title}
                </span>
                <span className="mt-1 text-sm font-semibold text-slate-400">
                  {level.englishTitle}
                </span>
                <span className="mt-4 text-sm leading-7 text-slate-300">
                  {level.summary}
                </span>
                {id > 1 ? (
                  <span className="mt-4 inline-flex w-fit rounded-full border border-sky-200/25 bg-sky-300/10 px-3 py-1 text-xs font-black text-sky-100">
                    {t.tactics.inDevelopment}
                  </span>
                ) : null}
              </button>

              <div
                id={`tactics-level-${id}`}
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "mt-5 max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm leading-7 text-slate-300">
                    {level.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {level.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-sky-200/20 bg-sky-300/10 px-3 py-1 text-xs font-bold text-sky-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {id === 1 ? (
                    <Link
                      href="/vision/board"
                      className="mt-5 inline-flex rounded-md border border-sky-300/50 bg-sky-300/15 px-4 py-3 text-sm font-black text-sky-50 transition hover:border-sky-200 hover:bg-sky-300/25"
                    >
                      {t.tactics.openBoard}
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
