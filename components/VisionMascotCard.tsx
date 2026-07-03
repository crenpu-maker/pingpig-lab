import Image from "next/image";

export function VisionMascotCard() {
  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div
          className="relative flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.24),rgba(11,95,255,0.1))]"
          aria-label="Pig nose ping-pong paddle mascot"
        >
          <Image
            src="/mascots/pig-paddle.png"
            alt="PingPig Lab の卓球視覚化アイコン"
            width={200}
            height={200}
            className="h-40 w-40 object-contain"
            priority
          />
        </div>
        <div>
          <h3 className="font-bold text-white">
            卓球視覚化技術のシンボル
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-400">
            コース・落点・回転を見える化するための PingPig Lab オリジナルアイコン。
          </p>
        </div>
      </div>
    </aside>
  );
}
