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
    <article className="rounded-lg border border-court-line/70 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-court-blue">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-flex rounded-md bg-court-ice px-3 py-1 text-xs font-bold text-court-blue">
            {post.category}
          </span>
          <h3 className="mt-3 text-lg font-bold text-court-navy">{post.title}</h3>
          <p className="mt-2 text-sm text-slate-500">{post.time}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center sm:w-36">
          <div className="rounded-md bg-slate-50 px-3 py-2">
            <p className="text-base font-black text-court-navy">{post.replies}</p>
            <p className="text-xs text-slate-500">回复</p>
          </div>
          <div className="rounded-md bg-slate-50 px-3 py-2">
            <p className="text-base font-black text-court-navy">{post.views}</p>
            <p className="text-xs text-slate-500">浏览</p>
          </div>
        </div>
      </div>
    </article>
  );
}
