import { VisionMascotCard } from "@/components/VisionMascotCard";
import { VisionPreview } from "@/components/VisionPreview";
import { VisualizationLevels } from "@/components/VisualizationLevels";

export default function VisionPage() {
  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(11,95,255,0.2),transparent_32%),radial-gradient(circle_at_90%_15%,rgba(249,168,212,0.12),transparent_25%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
              Table Tennis Visualization Technology
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              卓球視覚化技術
            </h1>
            <p className="mt-3 text-lg font-semibold text-sky-100">
              Table Tennis Visualization Technology
            </p>

            <div className="mt-8 max-w-4xl rounded-lg border border-white/10 bg-white/[0.055] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
              <h2 className="text-2xl font-black tracking-tight text-white">
                卓球視覚化技術とは
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">
                卓球視覚化技術とは、卓球におけるコース・回転・打球判断・用具特性を段階的に視覚化し、技術理解と戦術学習を支援するためのシステムです。
              </p>
              <p className="mt-4 border-l-2 border-sky-300/70 pl-4 text-base font-semibold leading-8 text-sky-100">
                一球の軌道から、戦術の流れ、そして次の一手の予測までを、視覚的に理解することを目指します。
              </p>
            </div>
          </div>
          <VisionMascotCard />
        </div>

        <VisualizationLevels />

        <div className="mt-12">
          <VisionPreview />
        </div>
      </div>
    </section>
  );
}
