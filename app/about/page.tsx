"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageProvider";

type AboutCopy = ReturnType<typeof useLanguage>["t"]["about"];

function TrainingLocationCard({ about }: { about: AboutCopy }) {
  return (
    <div className="grid gap-4 rounded-lg border border-sky-300/25 bg-sky-300/[0.08] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
      <div
        className="relative min-h-72 overflow-hidden rounded-md border border-white/10 bg-[#07111f]"
        role="img"
        aria-label={about.locationMapLabel}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_50%,rgba(14,165,233,0.22),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[length:36px_36px]" />
        <svg
          viewBox="0 0 640 360"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="walkRoute" x1="136" x2="360" y1="288" y2="176">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id="softPinGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect
            x="342"
            y="118"
            width="128"
            height="104"
            rx="12"
            fill="rgba(14,165,233,0.16)"
            stroke="rgba(125,211,252,0.42)"
            strokeWidth="2"
          />
          <rect
            x="356"
            y="132"
            width="100"
            height="76"
            rx="8"
            fill="rgba(15,23,42,0.72)"
            stroke="rgba(255,255,255,0.2)"
          />

          <path
            d="M26 302 C132 280 196 278 300 238 C410 196 498 126 612 76"
            fill="none"
            stroke="rgba(148,163,184,0.22)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M26 302 C132 280 196 278 300 238 C410 196 498 126 612 76"
            fill="none"
            stroke="rgba(15,23,42,0.82)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M40 92 H584"
            fill="none"
            stroke="rgba(148,163,184,0.22)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M40 92 H584"
            fill="none"
            stroke="rgba(15,23,42,0.8)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M92 40 V326"
            fill="none"
            stroke="rgba(148,163,184,0.2)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M92 40 V326"
            fill="none"
            stroke="rgba(15,23,42,0.78)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M536 42 V320"
            fill="none"
            stroke="rgba(148,163,184,0.16)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M536 42 V320"
            fill="none"
            stroke="rgba(15,23,42,0.72)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M126 314 C164 290 220 266 264 236 C300 212 326 190 366 172"
            fill="none"
            stroke="url(#walkRoute)"
            strokeWidth="5"
            strokeDasharray="10 9"
            strokeLinecap="round"
          />
          <path
            d="M520 90 C482 112 448 132 412 156"
            fill="none"
            stroke="rgba(56,189,248,0.82)"
            strokeWidth="5"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />

          <path
            d="M124 28 V334"
            fill="none"
            stroke="rgba(56,189,248,0.65)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M146 28 V334"
            fill="none"
            stroke="rgba(56,189,248,0.65)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M126 54 H144 M126 84 H144 M126 114 H144 M126 144 H144 M126 174 H144 M126 204 H144 M126 234 H144 M126 264 H144 M126 294 H144"
            stroke="rgba(125,211,252,0.58)"
            strokeWidth="2"
          />

          <circle cx="128" cy="304" r="15" fill="#f8fafc" />
          <circle cx="128" cy="304" r="7" fill="#0f172a" />
          <circle cx="520" cy="90" r="15" fill="#f8fafc" />
          <circle cx="520" cy="90" r="7" fill="#0f172a" />

          <circle cx="406" cy="170" r="58" fill="rgba(14,165,233,0.12)" />
          <path
            d="M406 98 C372 98 345 124 345 158 C345 205 406 270 406 270 C406 270 467 205 467 158 C467 124 440 98 406 98Z"
            fill="#38bdf8"
            stroke="rgba(255,255,255,0.88)"
            strokeWidth="5"
            filter="url(#softPinGlow)"
          />
          <circle cx="406" cy="158" r="20" fill="#020617" />
          <circle cx="406" cy="158" r="8" fill="#e0f2fe" />

          <text x="360" y="152" fill="#e0f2fe" fontSize="12" fontWeight="800">
            Minato Park
          </text>
          <text x="370" y="169" fill="#e0f2fe" fontSize="12" fontWeight="800">
            Shibaura
          </text>
          <text x="76" y="278" fill="#e2e8f0" fontSize="13" fontWeight="800">
            Tamachi
          </text>
          <text x="82" y="294" fill="#94a3b8" fontSize="11" fontWeight="700">
            JR Yamanote
          </text>
          <text x="476" y="66" fill="#e2e8f0" fontSize="13" fontWeight="800">
            Mita
          </text>
          <text x="456" y="82" fill="#94a3b8" fontSize="11" fontWeight="700">
            Toei Subway
          </text>
          <text x="182" y="248" fill="#7dd3fc" fontSize="11" fontWeight="800">
            {about.mapWalkFive}
          </text>
          <text x="458" y="134" fill="#7dd3fc" fontSize="11" fontWeight="800">
            {about.mapWalkSix}
          </text>
          <text x="34" y="86" fill="rgba(226,232,240,0.48)" fontSize="11" fontWeight="700">
            Daiichi Keihin
          </text>
          <text x="480" y="238" fill="rgba(226,232,240,0.42)" fontSize="11" fontWeight="700">
            Shibaura area
          </text>

          <path d="M584 38 L596 70 L572 70 Z" fill="rgba(226,232,240,0.8)" />
          <text x="578" y="86" fill="#cbd5e1" fontSize="11" fontWeight="900">
            N
          </text>
          <path d="M38 328 H118" stroke="rgba(226,232,240,0.52)" strokeWidth="3" />
          <text x="38" y="318" fill="#94a3b8" fontSize="10" fontWeight="700">
            {about.mapSchematic}
          </text>
        </svg>
        <div className="absolute left-4 top-4 rounded-full border border-sky-200/30 bg-black/35 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-sky-100">
          {about.locationBadge}
        </div>
        <div className="absolute left-5 bottom-5 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-xs font-bold text-slate-200">
          Tamachi Sta.
        </div>
        <div className="absolute right-5 top-14 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-xs font-bold text-slate-200">
          Mita Sta.
        </div>
        <div className="absolute left-[63%] top-[43%] -translate-x-1/2 rounded-md border border-sky-200/40 bg-sky-950/80 px-3 py-2 text-center text-xs font-black text-white shadow-[0_0_24px_rgba(56,189,248,0.28)]">
          Minato City
          <br />
          Sports Center
        </div>
        <div className="absolute right-4 bottom-4 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-slate-300">
          <span className="rounded-full border border-sky-200/20 bg-black/45 px-2 py-1">
            {about.mapRailLegend}
          </span>
          <span className="rounded-full border border-sky-200/20 bg-black/45 px-2 py-1">
            {about.mapWalkLegend}
          </span>
          <span className="rounded-full border border-sky-200/20 bg-black/45 px-2 py-1">
            {about.mapVenueLegend}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
          {about.locationEyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          {about.locationTitle}
        </h2>
        <p className="mt-4 text-sm font-bold leading-7 text-slate-300">
          {about.locationAddress}
        </p>
        <div className="mt-5 grid gap-3 text-sm text-slate-300">
          <div className="rounded-md border border-white/10 bg-black/25 p-3">
            <p className="font-black text-white">{about.nearestStationTitle}</p>
            <p className="mt-1 leading-6">
              {about.nearestStationBody}
            </p>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 p-3">
            <p className="font-black text-white">{about.subwayAccessTitle}</p>
            <p className="mt-1 leading-6">
              {about.subwayAccessBody}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TournamentBibsCard({ about }: { about: AboutCopy }) {
  const bibs = [
    {
      src: "/about/competition-bib-1.jpg",
      alt: `${about.tournamentTitle} 1`,
    },
    {
      src: "/about/competition-bib-2.jpg",
      alt: `${about.tournamentTitle} 2`,
    },
  ];

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">
            {about.tournamentEyebrow}
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-white">
            {about.tournamentTitle}
          </h2>
        </div>
        <p className="text-sm font-bold text-slate-400">
          {about.tournamentDescription}
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {bibs.map((bib, index) => (
          <div
            key={bib.src}
            className="group overflow-hidden rounded-md border border-sky-200/18 bg-black/25 p-2 transition hover:border-sky-200/45"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded bg-slate-950">
              <Image
                src={bib.src}
                alt={bib.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition duration-500 group-hover:scale-[1.025]"
              />
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-sky-200">
              {about.bibLabel} {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(11,95,255,0.18),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(249,168,212,0.12),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            {t.about.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            {t.about.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            {t.about.body}
          </p>

          <div className="mt-10 grid gap-4">
            {t.about.highlights.map((item, index) => (
              <div key={item} className="grid gap-4">
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
                  <p className="leading-7 text-slate-300">{item}</p>
                </div>
                {index === 0 ? <TrainingLocationCard about={t.about} /> : null}
                {index === 1 ? <TournamentBibsCard about={t.about} /> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
            <h2 className="text-lg font-bold text-white">
              {t.about.missionTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              {t.about.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
