type MascotCardProps = {
  variant: "vision" | "forum";
  title: string;
  description: string;
};

export function MascotCard({ variant, title, description }: MascotCardProps) {
  const isVision = variant === "vision";

  return (
    <aside className="rounded-lg border border-court-line/70 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-4">
        <div
          className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-lg ${
            isVision ? "bg-court-ice" : "bg-pig-light"
          }`}
          aria-label={
            isVision
              ? "Pig nose ping-pong paddle icon placeholder"
              : "Raised-hoof pig mascot placeholder"
          }
        >
          {isVision ? <PigPaddleIcon /> : <RaisedHoofPigIcon />}
        </div>
        <div>
          <h3 className="font-bold text-court-navy">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </aside>
  );
}

function PigPaddleIcon() {
  return (
    <div className="relative h-16 w-14">
      <span className="absolute left-1 top-0 h-5 w-5 -rotate-12 rounded-full bg-pig-pink" />
      <span className="absolute right-1 top-0 h-5 w-5 rotate-12 rounded-full bg-pig-pink" />
      <span className="absolute left-2 top-3 h-12 w-12 rounded-full border-4 border-court-blue bg-white" />
      <span className="absolute left-4 top-7 flex h-6 w-8 items-center justify-center rounded-full bg-pig-pink">
        <span className="mr-1 h-2 w-2 rounded-full bg-court-navy/60" />
        <span className="h-2 w-2 rounded-full bg-court-navy/60" />
      </span>
      <span className="absolute bottom-0 left-6 h-7 w-3 rounded-full bg-court-navy" />
    </div>
  );
}

function RaisedHoofPigIcon() {
  return (
    <div className="relative h-16 w-16">
      <span className="absolute right-1 top-0 h-8 w-4 -rotate-12 rounded-full bg-pig-pink" />
      <span className="absolute left-2 top-3 h-12 w-12 rounded-full bg-pig-pink" />
      <span className="absolute left-4 top-2 h-4 w-4 rounded-full bg-pig-light" />
      <span className="absolute right-4 top-2 h-4 w-4 rounded-full bg-pig-light" />
      <span className="absolute left-5 top-8 h-2 w-2 rounded-full bg-court-navy" />
      <span className="absolute right-5 top-8 h-2 w-2 rounded-full bg-court-navy" />
      <span className="absolute left-5 top-10 flex h-5 w-7 items-center justify-center rounded-full bg-pig-light">
        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-court-navy/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-court-navy/60" />
      </span>
    </div>
  );
}
