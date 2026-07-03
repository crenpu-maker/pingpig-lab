"use client";

import { useState } from "react";

type VisualizationLevel = {
  id: number;
  japaneseTitle: string;
  englishTitle: string;
  summary: string;
  detail: string;
  tags: string[];
};

const levels: VisualizationLevel[] = [
  {
    id: 1,
    japaneseTitle: "記述的視覚化技術",
    englishTitle: "Descriptive Visualization Technology",
    summary:
      "物理計算に依存せず、コース・落点・立ち位置・戦術の流れを記述的に視覚化する段階。",
    detail:
      "この段階では、ボールの実際の物理挙動を厳密に再現するのではなく、コース、落点、選手の立ち位置、移動方向、連続する戦術パターンを視覚的に整理します。初心者や学生が「なぜそのコースを選ぶのか」「次の一手につながるのか」を理解するための基礎的な可視化です。",
    tags: ["MVP", "Low Complexity", "Tactical Diagram"],
  },
  {
    id: 2,
    japaneseTitle: "物理情報型視覚化技術",
    englishTitle: "Physics-informed Visualization Technology",
    summary:
      "回転・速度・打球角度・ラバー特性などの物理的要因を取り入れ、打球結果の変化を近似的に視覚化する段階。",
    detail:
      "この段階では、上回転、下回転、横回転、球速、打球角度、ラバーの硬度、摩擦特性、スポンジの反発などを考慮し、打球結果がどのように変化するのかを近似的に表現します。完全な物理シミュレーションではなく、卓球特有の感覚や現象を理解しやすくするための物理情報を含んだ可視化です。",
    tags: ["Physics Model", "Medium Complexity", "Spin & Rubber"],
  },
  {
    id: 3,
    japaneseTitle: "予測適応型視覚化技術",
    englishTitle: "Predictive and Adaptive Visualization Technology",
    summary:
      "プレーの履歴・相手の傾向・戦術選択・練習データをもとに、次の一手や練習課題を予測的に視覚化する段階。",
    detail:
      "この段階では、過去のプレー、相手の返球傾向、戦術選択、練習記録、試合データなどをもとに、次に起こりうる展開や有効な選択肢を視覚的に提示します。将来的には、AIやデータ分析を組み合わせ、選手や指導者が次の一手、練習課題、戦術改善を考えるための支援を目指します。",
    tags: ["Future Vision", "High Complexity", "AI & Data"],
  },
];

export function VisualizationLevels() {
  const [openLevel, setOpenLevel] = useState<number | null>(1);

  return (
    <section aria-labelledby="visualization-levels-title" className="mt-12">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
            Technology Levels
          </p>
          <h2
            id="visualization-levels-title"
            className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl"
          >
            卓球視覚化技術の三段階
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          記述的な戦術図から、物理情報、予測適応型の分析へと発展する技術設計です。
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {levels.map((level) => {
          const isOpen = openLevel === level.id;

          return (
            <article
              key={level.id}
              className={`rounded-lg border bg-gradient-to-br p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur transition duration-300 ${
                isOpen
                  ? "border-sky-300/[0.55] from-sky-400/[0.16] via-white/[0.075] to-blue-950/[0.45]"
                  : "border-white/10 from-white/[0.07] via-white/[0.045] to-blue-950/20 hover:border-sky-300/[0.45] hover:from-sky-400/[0.12]"
              }`}
            >
              <button
                type="button"
                className="flex w-full flex-col text-left"
                aria-expanded={isOpen}
                aria-controls={`visualization-level-${level.id}`}
                onClick={() => setOpenLevel(isOpen ? null : level.id)}
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-sky-200/25 bg-sky-400/[0.12] text-2xl font-black text-sky-100 shadow-[0_0_30px_rgba(56,189,248,0.16)]">
                    {level.id}
                  </span>
                  <span
                    className={`mt-1 rounded-full border px-3 py-1 text-sm font-black transition ${
                      isOpen
                        ? "border-sky-200/50 bg-sky-300/15 text-sky-100"
                        : "border-white/10 bg-black/25 text-slate-300"
                    }`}
                    aria-hidden="true"
                  >
                    {isOpen ? "-" : "+"}
                  </span>
                </span>

                <span className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
                  Level {level.id}
                </span>
                <span className="mt-2 text-xl font-black tracking-tight text-white">
                  {level.japaneseTitle}
                </span>
                <span className="mt-1 text-sm font-semibold text-slate-400">
                  {level.englishTitle}
                </span>
                <span className="mt-4 text-sm leading-7 text-slate-300">
                  {level.summary}
                </span>
              </button>

              <div
                id={`visualization-level-${level.id}`}
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  isOpen ? "mt-5 max-h-[520px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm leading-7 text-slate-300">
                    {level.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {level.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-sky-200/20 bg-sky-300/10 px-3 py-1 text-xs font-bold text-sky-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
