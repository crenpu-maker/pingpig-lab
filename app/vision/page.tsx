import { MascotCard } from "@/components/MascotCard";
import { VisionPreview } from "@/components/VisionPreview";

export default function VisionPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-court-blue">
            Visual Training
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-court-navy sm:text-5xl">
            Table Tennis Vision
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            通过可视化方式理解乒乓球线路、落点、旋转和战术组合。
          </p>
        </div>
        <MascotCard
          variant="vision"
          title="猪鼻子乒乓球拍 Icon"
          description="预留 icon 区域：乒乓球拍上有猪鼻子，球拍顶部有猪耳朵。"
        />
      </div>

      <div className="mt-10">
        <VisionPreview />
      </div>
    </section>
  );
}
