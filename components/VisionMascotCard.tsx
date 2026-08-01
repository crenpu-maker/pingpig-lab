"use client";

import Image from "next/image";

export function VisionMascotCard() {
  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur">
      <div className="flex min-h-56 items-center justify-center">
        <div
          className="relative flex h-52 w-52 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.24),rgba(11,95,255,0.1))]"
          aria-label="Tactics board icon"
        >
          <Image
            src="/mascots/pig-paddle.png"
            alt="Tactics board icon"
            width={200}
            height={200}
            className="h-44 w-44 object-contain"
            priority
          />
        </div>
      </div>
    </aside>
  );
}
