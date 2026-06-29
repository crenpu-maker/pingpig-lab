import { ForumPostCard } from "@/components/ForumPostCard";
import { MascotCard } from "@/components/MascotCard";
import { categories, forumPosts } from "@/data/forumPosts";

export default function ForumPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-court-blue">
            Community
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-court-navy sm:text-5xl">
            Table Tennis Forum
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            讨论战术、训练、器材和比赛复盘。
          </p>
        </div>
        <MascotCard
          variant="forum"
          title="举起一个蹄子的小猪"
          description="预留论坛欢迎 mascot 区域，用于表达欢迎讨论、提问、交流战术。"
        />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {categories.map((category) => (
          <span
            key={category}
            className="rounded-md border border-court-line bg-white px-4 py-2 text-sm font-bold text-court-navy shadow-sm"
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
    </section>
  );
}
