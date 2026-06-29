import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";

const features = [
  {
    title: "3D 战术可视化",
    description:
      "用空间视角拆解线路、站位和连续板衔接，为之后接入真实 3D 展示做好界面准备。",
  },
  {
    title: "旋转与落点理解",
    description:
      "把旋转、弧线、落点和击球选择放在同一套学习语言里，帮助训练更有方向。",
  },
  {
    title: "论坛讨论与训练复盘",
    description:
      "围绕技术、战术、器材和比赛复盘沉淀问题，让球友交流变得更结构化。",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-court-blue">
            Core Modules
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-court-navy">
            从看懂一板球开始，建立完整训练理解
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              index={`0${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
