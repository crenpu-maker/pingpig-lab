type FeatureCardProps = {
  title: string;
  description: string;
  index: string;
};

export function FeatureCard({ title, description, index }: FeatureCardProps) {
  return (
    <article className="rounded-lg border border-court-line/70 bg-white p-6 shadow-soft">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-court-ice text-sm font-black text-court-blue">
        {index}
      </div>
      <h3 className="text-lg font-bold text-court-navy">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
