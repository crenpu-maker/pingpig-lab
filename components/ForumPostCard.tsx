export type ForumPost = {
  title: string;
  category: string;
  replies: number;
  views: number;
  time: string;
};

type ForumPostCardProps = {
  post: ForumPost;
};

export function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur transition hover:-translate-y-0.5 hover:border-sky-300/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex rounded-md bg-court-blue/15 px-3 py-1 text-xs font-bold text-sky-300">
            {post.category}
          </span>
          <h3 className="mt-3 text-lg font-bold text-white">{post.title}</h3>
          <p className="mt-2 text-sm text-slate-500">{post.time}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center sm:w-36">
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-2">
            <p className="text-base font-black text-white">{post.replies}</p>
            <p className="text-xs text-slate-500">回复</p>
          </div>
          <div className="rounded-md border border-white/10 bg-black/25 px-3 py-2">
            <p className="text-base font-black text-white">{post.views}</p>
            <p className="text-xs text-slate-500">浏览</p>
          </div>
        </div>
      </div>
    </article>
  );
}
