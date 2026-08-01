import { PointReviewBoard } from "@/components/PointReviewBoard";

export default function VisionBoardPage() {
  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(14,165,233,0.2),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(11,95,255,0.18),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            Descriptive Visualization Technology
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            ポイントレビュー・ボード
          </h1>
          <p className="mt-3 text-lg font-semibold text-sky-100">
            Point Review Board
          </p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            コース・落点・打球選択を視覚的に整理し、一点ごとの戦術理解を支援します。
          </p>
        </div>

        <PointReviewBoard />
      </div>
    </section>
  );
}
