type FeatureCardProps = {
  title: string;
  description: string;
  index: string;
};

export function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.3)] backdrop-blur transition hover:-translate-y-1 hover:border-sky-300/50">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-court-blue/15 text-sm font-black text-sky-300">
        {index}
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </article>
  );
}
