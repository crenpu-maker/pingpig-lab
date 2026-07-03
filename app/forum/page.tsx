import { ForumPostCard } from "@/components/ForumPostCard";
import { MascotCard } from "@/components/MascotCard";
import { categories, forumPosts } from "@/data/forumPosts";

export default function ForumPage() {
  return (
    <section className="relative overflow-hidden bg-[#030712] px-5 py-12 lg:px-8 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(11,95,255,0.18),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(249,168,212,0.16),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
              Community
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Table Tennis Forum
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              讨论战术、训练、器材和比赛复盘。
            </p>
          </div>
          <MascotCard
            variant="forum"
            title="举起一个蹄子的小猪"
            description="论坛欢迎区 mascot，用于表达欢迎讨论、提问和交流战术。"
            imageSrc="/mascots/pig-wave.png"
            imageAlt="举起一个蹄子的小猪 mascot"
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:justify-start">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-md border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          {forumPosts.map((post) => (
            <ForumPostCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
