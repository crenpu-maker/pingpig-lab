"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const greetings = [
  "Hello, player.",
  "Welcome to PingPig Lab.",
  "你好，欢迎来到 PingPig Lab。",
  "こんにちは、PingPig Lab へ。",
  "Hola, bienvenido.",
  "Bonjour, bienvenue.",
  "안녕하세요, 환영합니다.",
];

export function StartPortal() {
  const [isActive, setIsActive] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const phaseStartRef = useRef(0);
  const phaseRef = useRef<"idle" | "burst" | "leaving">("idle");
  const speedRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setGreetingIndex(0);
      return;
    }

    const id = window.setInterval(() => {
      setGreetingIndex((current) => (current + 1) % greetings.length);
    }, 1300);

    return () => window.clearInterval(id);
  }, [isActive]);

  useEffect(() => {
    phaseRef.current = isActive ? "burst" : "leaving";
    phaseStartRef.current = performance.now();
    lastFrameRef.current = null;

    if (frameRef.current !== null) {
      return;
    }

    const maxSpeed = 980;
    const accelerationMs = 850;
    const settleMs = 1050;
    const leaveDeceleration = 1500;
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
    const easeInOutCubic = (value: number) =>
      value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2;

    const animate = (now: number) => {
      const previous = lastFrameRef.current ?? now;
      const deltaSeconds = Math.min((now - previous) / 1000, 0.05);
      lastFrameRef.current = now;

      if (phaseRef.current === "burst") {
        const elapsed = now - phaseStartRef.current;

        if (elapsed <= accelerationMs) {
          const progress = elapsed / accelerationMs;
          speedRef.current = easeOutCubic(progress) * maxSpeed;
        } else if (elapsed <= accelerationMs + settleMs) {
          const progress = (elapsed - accelerationMs) / settleMs;
          speedRef.current = (1 - easeInOutCubic(progress)) * maxSpeed;
        } else {
          speedRef.current = 0;
          phaseRef.current = "idle";
        }
      }

      if (phaseRef.current === "leaving") {
        speedRef.current = Math.max(
          0,
          speedRef.current - leaveDeceleration * deltaSeconds,
        );

        if (speedRef.current === 0) {
          phaseRef.current = "idle";
        }
      }

      if (speedRef.current > 0) {
        setRotation((current) => current + speedRef.current * deltaSeconds);
      }

      if (phaseRef.current === "idle" && speedRef.current === 0) {
        frameRef.current = null;
        lastFrameRef.current = null;
        return;
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isActive]);

  function enterSite() {
    document.getElementById("sections")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-[#030712] px-5 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(11,95,255,0.28),transparent_32%),radial-gradient(circle_at_65%_65%,rgba(249,168,212,0.16),transparent_26%),linear-gradient(180deg,#030712_0%,#07111f_48%,#020617_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-court-blue/5 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-court-blue to-transparent" />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
        <p className="rounded-md border border-court-blue/35 bg-court-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-sky-200">
          PingPig Lab
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Table Tennis Vision & Community
        </h1>

        <button
          type="button"
          onClick={enterSite}
          onPointerEnter={() => setIsActive(true)}
          onPointerLeave={() => setIsActive(false)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          className="group relative mt-14 flex flex-col items-center outline-none"
          aria-label="Enter PingPig Lab sections"
        >
          <span className="absolute top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-court-blue/0 blur-2xl transition duration-500 group-hover:bg-court-blue/25 group-focus-visible:bg-court-blue/25" />
          <span className="ping-ripple absolute top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-sky-300/0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" />
          <span className="ping-ripple ping-ripple-delay absolute top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-pig-pink/0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" />

          <span
            className="ping-ball relative flex h-56 w-56 items-center justify-center rounded-full border border-white/70 bg-[radial-gradient(circle_at_35%_25%,#ffffff_0%,#f8fbff_28%,#e3edf8_62%,#b9cadc_100%)] shadow-[0_24px_80px_rgba(56,189,248,0.28)] transition-[box-shadow] duration-500 group-hover:shadow-[0_28px_110px_rgba(96,165,250,0.55)] sm:h-64 sm:w-64"
            style={{
              transform: `rotate(${rotation}deg) scale(${isActive ? 1.05 : 1})`,
            }}
          >
            <span className="absolute left-8 top-8 h-16 w-16 rounded-full bg-white/80 blur-xl" />
            <span className="absolute inset-6 rounded-full border border-slate-300/60" />
            <span className="absolute h-[78%] w-px rotate-[24deg] rounded-full bg-slate-300/70" />
            <span className="relative grid h-28 w-28 place-items-center rounded-full bg-white/85 shadow-[0_12px_34px_rgba(15,23,42,0.22)] sm:h-32 sm:w-32">
              <Image
                src="/mascots/pig-blandmark.png"
                alt="PingPig company IP logo"
                width={140}
                height={140}
                className="h-24 w-24 object-contain sm:h-28 sm:w-28"
                priority
              />
            </span>
          </span>

          <span
            className={`mt-8 min-h-8 rounded-md border border-white/10 bg-white/10 px-5 py-2 text-sm font-bold text-white backdrop-blur transition duration-300 ${
              isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            {greetings[greetingIndex]}
          </span>
        </button>
      </div>
    </section>
  );
}
