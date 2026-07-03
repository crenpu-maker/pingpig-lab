import { MascotCard } from "@/components/MascotCard";

const highlights = [
  "乒乓球教学：把复杂技术拆成可理解、可训练、可复盘的步骤。",
  "运动员经验：从真实训练和比赛情境出发，关注动作质量与战术选择。",
  "研究背景：用分析视角整理线路、旋转、节奏和决策之间的关系。",
  "可视化目标：把乒乓球技术、战术和学习过程做成更直观的视觉系统。",
];

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(11,95,255,0.18),transparent_32%),radial-gradient(circle_at_86%_20%,rgba(249,168,212,0.12),transparent_24%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            About PingPig Lab
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
            About
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
            PingPig Lab 是一个面向乒乓球学习者的教学与可视化实验网站。第一版会先建立清晰的内容结构与专业界面，之后逐步加入真实 3D 战术展示、训练复盘和社区能力。
          </p>

          <div className="mt-10 grid gap-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur"
              >
                <p className="leading-7 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <MascotCard
            variant="forum"
            title="PingPig IP 预留"
            description="这里后续可替换为正式原创猪 IP 图片，保持品牌识别但不影响专业教学感。"
          />
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
            <h2 className="text-lg font-bold text-white">Mission</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              用视觉化方法连接技术理解、战术判断和训练执行，让乒乓球学习更清楚、更可复盘。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
