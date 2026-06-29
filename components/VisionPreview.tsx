const tactics = ["发球抢攻", "正手斜线", "反手直线", "侧旋发球"];

export function VisionPreview() {
  return (
    <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="rounded-lg border border-court-line/70 bg-white p-5 shadow-soft">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-court-blue">
          Tactical Presets
        </h2>
        <div className="mt-5 grid gap-3">
          {tactics.map((tactic) => (
            <button
              key={tactic}
              type="button"
              className="rounded-md border border-court-line bg-white px-4 py-3 text-left text-sm font-bold text-court-navy transition hover:border-court-blue hover:bg-court-ice"
            >
              {tactic}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-court-line/70 bg-white p-4 shadow-soft">
        <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-md bg-gradient-to-br from-court-navy via-court-blue to-sky-300">
          <div className="absolute inset-x-8 top-1/2 h-px bg-white/30" />
          <div className="absolute left-1/2 top-10 h-[calc(100%-5rem)] w-px bg-white/25" />
          <div className="absolute h-48 w-72 rounded-md border-2 border-white/45 sm:h-60 sm:w-[32rem]" />
          <div className="relative z-10 rounded-md border border-white/30 bg-white/15 px-6 py-5 text-center backdrop-blur">
            <p className="text-xl font-black text-white sm:text-2xl">
              3D Table Preview Coming Soon
            </p>
            <p className="mt-2 text-sm text-white/80">
              Reserved area for future Three.js or React Three Fiber integration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
