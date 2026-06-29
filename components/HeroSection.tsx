import Link from "next/link";
import { MascotCard } from "@/components/MascotCard";

export function HeroSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 inline-flex rounded-md border border-court-line bg-court-ice px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-court-blue">
            PingPig Lab MVP
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-court-navy sm:text-5xl lg:text-6xl">
            Table Tennis Vision & Community
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            用 3D 可视化理解乒乓球战术、线路与旋转，并与球友一起讨论训练问题。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/vision"
              className="rounded-md bg-court-blue px-5 py-3 text-center text-sm font-bold text-white shadow-soft transition hover:bg-blue-700"
            >
              进入乒乓球视觉
            </Link>
            <Link
              href="/forum"
              className="rounded-md border border-court-line bg-white px-5 py-3 text-center text-sm font-bold text-court-navy transition hover:bg-court-ice"
            >
              进入论坛
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-court-line bg-gradient-to-br from-court-blue via-blue-500 to-court-navy p-6 text-white shadow-soft">
            <div className="grid aspect-[4/3] place-items-center rounded-md border border-white/25 bg-white/10">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-28 rounded-md border-4 border-white/80" />
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                  3D Court Space
                </p>
              </div>
            </div>
          </div>
          <MascotCard
            variant="forum"
            title="原创猪 IP 占位"
            description="预留给后续 mascot/icon 图片替换，用于建立专业但有记忆点的网站识别。"
          />
        </div>
      </div>
    </section>
  );
}
