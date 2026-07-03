const tactics = ["发球抢攻", "正手斜线", "反手直线", "侧旋发球"];

export function VisionPreview() {
  return (
    <section className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.3)] backdrop-blur">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
          Tactical Presets
        </h2>
        <div className="mt-5 grid gap-3">
          {tactics.map((tactic) => (
            <button
              key={tactic}
              type="button"
              className="rounded-md border border-white/10 bg-black/25 px-4 py-3 text-left text-sm font-bold text-slate-100 transition hover:border-sky-300/60 hover:bg-court-blue/15"
            >
              {tactic}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.3)] backdrop-blur">
        <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-md bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.28),transparent_35%),linear-gradient(135deg,#030712,#0b5fff_55%,#0f172a)]">
          <div className="absolute inset-x-8 top-1/2 h-px bg-white/25" />
          <div className="absolute left-1/2 top-10 h-[calc(100%-5rem)] w-px bg-white/20" />
          <div className="absolute h-48 w-72 rounded-md border-2 border-white/40 shadow-[0_0_50px_rgba(56,189,248,0.22)] sm:h-60 sm:w-[32rem]" />
          <div className="relative z-10 rounded-md border border-white/20 bg-black/25 px-6 py-5 text-center backdrop-blur">
            <p className="text-xl font-black text-white sm:text-2xl">
              3D Table Preview Coming Soon
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Reserved area for future Three.js or React Three Fiber integration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
