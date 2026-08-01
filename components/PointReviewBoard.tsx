"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";

type PlayerSide = "self" | "opponent";
type SpinLabel = "上回転" | "下回転" | "横回転" | "ナックル";

type Coordinate = {
  x: number;
  y: number;
};

type BouncePoint = Coordinate & {
  label: string;
};

type EditTarget = `bounce-${number}`;

type Shot = {
  id: string;
  order: number;
  player: PlayerSide;
  shotType: string;
  start: Coordinate;
  end: Coordinate;
  bouncePoints: BouncePoint[];
  spinLabel: SpinLabel;
  note: string;
};

type TacticalPreset = {
  id: string;
  title: string;
  theme: string;
  aim: string;
  commonMistake: string;
  improvement: string;
  shots: Shot[];
};

const customPresetId = "custom-point-review-board";
const customPresetStorageKey = "pingpig-point-review-custom-v2";

const presets: TacticalPreset[] = [
  {
    id: "short-serve-third-ball",
    title: "短い下回転サーブから三球目攻撃",
    theme: "短い下回転サーブで前後の判断を作り、三球目で主導権を取る。",
    aim: "相手を台上処理に誘導し、浮いた返球をフォア側またはミドルへ攻撃する。",
    commonMistake:
      "サーブ後の戻りが遅く、三球目の打点が落ちて攻撃が弱くなる。",
    improvement:
      "サーブ後すぐに重心を戻し、返球の高さと長さを見て早い打点で打球する。",
    shots: [
      {
        id: "s1-serve",
        order: 1,
        player: "self",
        shotType: "サーブ",
        start: { x: 38, y: 94 },
        end: { x: 42, y: 44 },
        bouncePoints: [
          { x: 34, y: 74, label: "1st" },
          { x: 42, y: 44, label: "Short" },
        ],
        spinLabel: "下回転",
        note: "短く低い下回転で相手を前に誘導する。",
      },
      {
        id: "s1-receive",
        order: 2,
        player: "opponent",
        shotType: "レシーブ",
        start: { x: 42, y: 44 },
        end: { x: 55, y: 68 },
        bouncePoints: [{ x: 55, y: 68, label: "Receive" }],
        spinLabel: "下回転",
        note: "短いツッツキ返球を想定し、三球目の準備を作る。",
      },
      {
        id: "s1-attack",
        order: 3,
        player: "self",
        shotType: "三球目攻撃",
        start: { x: 55, y: 68 },
        end: { x: 72, y: 22 },
        bouncePoints: [{ x: 72, y: 22, label: "Attack" }],
        spinLabel: "上回転",
        note: "浮いた返球を早い打点でフォア側へ攻撃する。",
      },
      {
        id: "s1-block",
        order: 4,
        player: "opponent",
        shotType: "ブロック",
        start: { x: 72, y: 22 },
        end: { x: 48, y: 74 },
        bouncePoints: [{ x: 48, y: 74, label: "Block" }],
        spinLabel: "ナックル",
        note: "相手のブロック返球を想定し、次球の連続攻撃へ接続する。",
      },
    ],
  },
  {
    id: "long-service-backhand",
    title: "反手側へのロングサービス",
    theme: "バック側への深いサービスで相手の初動を制限する。",
    aim: "長いサービスで相手を詰まらせ、返球コースをバック側またはミドルに限定する。",
    commonMistake:
      "サービスが浅くなり、相手に先手の強打を許してしまう。",
    improvement:
      "第一バウンドを自陣深めに置き、相手コートのエンドライン付近へ伸ばす意識を持つ。",
    shots: [
      {
        id: "s2-serve",
        order: 1,
        player: "self",
        shotType: "ロングサービス",
        start: { x: 70, y: 94 },
        end: { x: 22, y: 12 },
        bouncePoints: [
          { x: 66, y: 76, label: "1st" },
          { x: 22, y: 12, label: "Deep BH" },
        ],
        spinLabel: "横回転",
        note: "バック深くへ伸ばし、相手の体勢を遅らせる。",
      },
      {
        id: "s2-receive",
        order: 2,
        player: "opponent",
        shotType: "レシーブ",
        start: { x: 22, y: 12 },
        end: { x: 48, y: 70 },
        bouncePoints: [{ x: 48, y: 70, label: "Return" }],
        spinLabel: "上回転",
        note: "詰まった返球がミドル寄りに集まる展開を想定する。",
      },
      {
        id: "s2-drive",
        order: 3,
        player: "self",
        shotType: "バックドライブ",
        start: { x: 48, y: 70 },
        end: { x: 26, y: 20 },
        bouncePoints: [{ x: 26, y: 20, label: "Drive" }],
        spinLabel: "上回転",
        note: "バック側から深いコースへもう一度圧力をかける。",
      },
      {
        id: "s2-block",
        order: 4,
        player: "opponent",
        shotType: "ブロック",
        start: { x: 26, y: 20 },
        end: { x: 63, y: 75 },
        bouncePoints: [{ x: 63, y: 75, label: "Block" }],
        spinLabel: "ナックル",
        note: "相手の守備返球を見てフォア展開へ移る。",
      },
    ],
  },
  {
    id: "fore-short-stop",
    title: "フォア前へのストップ展開",
    theme: "フォア前の短いボールで相手を前に引き出し、次の展開を作る。",
    aim: "相手の移動距離を増やし、次球で深いコースやミドル攻めへ接続する。",
    commonMistake:
      "ストップが高くなり、相手にフリックや強いチキータを許す。",
    improvement:
      "ラケット角度を安定させ、低い弧線でネット際に止める位置を明確にする。",
    shots: [
      {
        id: "s3-short",
        order: 1,
        player: "opponent",
        shotType: "フォア前",
        start: { x: 70, y: 14 },
        end: { x: 72, y: 56 },
        bouncePoints: [{ x: 72, y: 56, label: "Short FH" }],
        spinLabel: "下回転",
        note: "フォア前に短く落ちるボールを想定する。",
      },
      {
        id: "s3-stop",
        order: 2,
        player: "self",
        shotType: "ストップ",
        start: { x: 72, y: 56 },
        end: { x: 37, y: 44 },
        bouncePoints: [{ x: 37, y: 44, label: "Stop" }],
        spinLabel: "下回転",
        note: "ネット際へ低く止め、相手を前に引き出す。",
      },
      {
        id: "s3-push",
        order: 3,
        player: "opponent",
        shotType: "ツッツキ",
        start: { x: 37, y: 44 },
        end: { x: 50, y: 70 },
        bouncePoints: [{ x: 50, y: 70, label: "Push" }],
        spinLabel: "下回転",
        note: "浅い返球を想定し、深い次球への準備を作る。",
      },
      {
        id: "s3-next",
        order: 4,
        player: "self",
        shotType: "深い展開",
        start: { x: 50, y: 70 },
        end: { x: 78, y: 16 },
        bouncePoints: [{ x: 78, y: 16, label: "Next" }],
        spinLabel: "上回転",
        note: "フォアワイドへ展開し、相手の移動を大きくする。",
      },
    ],
  },
  {
    id: "middle-to-both-hands",
    title: "ミドル攻めから両ハンド展開",
    theme: "ミドルへの配球で相手の判断を揺らし、両ハンドの連続攻撃へ移行する。",
    aim: "相手のフォア・バック判断を遅らせ、返球の質を下げて広角に展開する。",
    commonMistake:
      "ミドル攻めが甘く、相手に余裕を持って回り込まれる。",
    improvement:
      "相手の体の正面を基準に狙い、次球はバック深くかフォアワイドへ早く展開する。",
    shots: [
      {
        id: "s4-middle",
        order: 1,
        player: "self",
        shotType: "ミドル攻め",
        start: { x: 50, y: 92 },
        end: { x: 52, y: 26 },
        bouncePoints: [{ x: 52, y: 26, label: "Middle" }],
        spinLabel: "上回転",
        note: "相手の体の正面へ送り、判断を遅らせる。",
      },
      {
        id: "s4-block",
        order: 2,
        player: "opponent",
        shotType: "ブロック",
        start: { x: 52, y: 26 },
        end: { x: 44, y: 70 },
        bouncePoints: [{ x: 44, y: 70, label: "Block" }],
        spinLabel: "ナックル",
        note: "ミドルからの弱い返球を想定する。",
      },
      {
        id: "s4-backhand",
        order: 3,
        player: "self",
        shotType: "バック攻撃",
        start: { x: 44, y: 70 },
        end: { x: 24, y: 20 },
        bouncePoints: [{ x: 24, y: 20, label: "BH Wide" }],
        spinLabel: "上回転",
        note: "バック側へ角度をつけ、相手を片側へ寄せる。",
      },
      {
        id: "s4-forehand",
        order: 4,
        player: "self",
        shotType: "フォア展開",
        start: { x: 24, y: 72 },
        end: { x: 80, y: 20 },
        bouncePoints: [{ x: 80, y: 20, label: "FH Wide" }],
        spinLabel: "上回転",
        note: "反対側へ大きく展開し、両ハンド連続攻撃につなげる。",
      },
    ],
  },
];

const markerNumbers = ["①", "②", "③", "④", "⑤", "⑥"];

function isServeShot(shot: Shot) {
  return (
    shot.order === 1 && shot.player === "self" && shot.bouncePoints.length > 1
  );
}

function getVisibleBouncePoints(shot: Shot) {
  if (isServeShot(shot)) {
    return shot.bouncePoints;
  }

  const landingPoint = shot.bouncePoints[shot.bouncePoints.length - 1];
  return landingPoint ? [landingPoint] : [];
}

function getBouncePointName(shot: Shot, point: BouncePoint, pointIndex: number) {
  if (isServeShot(shot)) {
    return pointIndex === 0 ? "自分側バウンド" : "相手側バウンド";
  }

  return point.y >= 50 ? "自分側バウンド" : "相手側バウンド";
}

function getShotSegments(shot: Shot) {
  if (isServeShot(shot) && shot.bouncePoints.length >= 2) {
    const [firstBounce, secondBounce] = shot.bouncePoints;

    return [{ start: firstBounce, end: secondBounce }];
  }

  return [{ start: shot.start, end: shot.end }];
}

function getShotColor(isSelected: boolean) {
  if (isSelected) {
    return "#f8fafc";
  }

  return "#38bdf8";
}

function getShotActorLabel(shot: Shot) {
  if (shot.player === "opponent") {
    return "相手の返球予想";
  }

  return shot.order === 1 ? "自分のサーブ" : "自分の打球計画";
}

function getShotTypeInputLabel(shot: Shot) {
  if (shot.player === "opponent") {
    return "相手の撃球方式";
  }

  return shot.order === 1 ? "サーブ内容" : "自分の技術";
}

function clonePresetForEditing(preset: TacticalPreset): TacticalPreset {
  return {
    ...preset,
    id: customPresetId,
    title:
      preset.id === customPresetId
        ? preset.title
        : `My Board / ${preset.title}`,
    shots: preset.shots.map((shot) => ({
      ...shot,
      bouncePoints: shot.bouncePoints.map((point) => ({ ...point })),
      end: { ...shot.end },
      start: { ...shot.start },
    })),
  };
}

function normalizeShotContinuity(preset: TacticalPreset): TacticalPreset {
  const shots = preset.shots.map((shot, index, currentShots) => {
    if (index === 0) {
      return shot;
    }

    return {
      ...shot,
      start: { ...currentShots[index - 1].end },
    };
  });

  return {
    ...preset,
    shots,
  };
}

function createBlankPreset(): TacticalPreset {
  return {
    id: customPresetId,
    title: "My Rally Board",
    theme: "",
    aim: "",
    commonMistake: "",
    improvement: "",
    shots: [],
  };
}

function createBlankShot(order: number, previousShot?: Shot): Shot {
  const isSelf = order % 2 === 1;
  const player: PlayerSide = isSelf ? "self" : "opponent";
  const start =
    previousShot
      ? { ...previousShot.end }
      : order === 1
      ? { x: 50, y: 92 }
      : isSelf
        ? { x: 50, y: 72 }
        : { x: 50, y: 28 };
  const bouncePoints =
    order === 1
      ? [
          { x: 50, y: 76, label: "self-bounce" },
          { x: 50, y: 34, label: "opponent-bounce" },
        ]
      : [
          {
            x: 50,
            y: isSelf ? 28 : 72,
            label: "bounce",
          },
        ];
  const end = bouncePoints[bouncePoints.length - 1];

  return {
    id: `custom-shot-${Date.now()}-${order}`,
    order,
    player,
    shotType: "",
    start,
    end: { x: end.x, y: end.y },
    bouncePoints,
    spinLabel: "下回転",
    note: "",
  };
}

function clampPercent(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

export function PointReviewBoard() {
  const [customPreset, setCustomPreset] = useState<TacticalPreset | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeEditTarget, setActiveEditTarget] =
    useState<EditTarget>("bounce-0");
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const reviewPresets = useMemo(
    () => (customPreset ? [customPreset, ...presets] : presets),
    [customPreset],
  );
  const selectedPreset = useMemo(
    () =>
      reviewPresets.find((preset) => preset.id === selectedPresetId) ??
      reviewPresets[0],
    [reviewPresets, selectedPresetId],
  );
  const [selectedShotId, setSelectedShotId] = useState(
    selectedPreset.shots[0]?.id ?? "",
  );
  const selectedShot =
    selectedPreset.shots.find((shot) => shot.id === selectedShotId) ??
    selectedPreset.shots[0] ??
    null;
  const canEditSelectedPreset = selectedPreset.id === customPresetId;

  useEffect(() => {
    try {
      const storedPreset = window.localStorage.getItem(customPresetStorageKey);

      if (!storedPreset) {
        return;
      }

      const parsedPreset = JSON.parse(storedPreset) as TacticalPreset;

      if (!Array.isArray(parsedPreset.shots)) {
        return;
      }

      const nextPreset = normalizeShotContinuity(
        clonePresetForEditing(parsedPreset),
      );
      setCustomPreset(nextPreset);
      setSelectedPresetId(nextPreset.id);
      setSelectedShotId(nextPreset.shots[0]?.id ?? "");
    } catch {
      window.localStorage.removeItem(customPresetStorageKey);
    }
  }, []);

  useEffect(() => {
    if (!customPreset) {
      return;
    }

    window.localStorage.setItem(
      customPresetStorageKey,
      JSON.stringify(customPreset),
    );
  }, [customPreset]);

  function selectPreset(preset: TacticalPreset) {
    setSelectedPresetId(preset.id);
    setSelectedShotId(preset.shots[0]?.id ?? "");
    setActiveEditTarget("bounce-0");
  }

  function startEditMode() {
    const nextPreset = customPreset ?? createBlankPreset();

    setCustomPreset(nextPreset);
    setSelectedPresetId(nextPreset.id);
    setSelectedShotId(nextPreset.shots[0]?.id ?? "");
    setActiveEditTarget("bounce-0");
    setIsEditMode(true);
  }

  function resetCustomBoard() {
    const shouldReset = window.confirm(
      "現在の編集内容をすべて削除しますか？",
    );

    if (!shouldReset) {
      return;
    }

    const nextPreset = createBlankPreset();

    setCustomPreset(nextPreset);
    setIsEditMode(true);
    setSelectedPresetId(nextPreset.id);
    setSelectedShotId("");
    setActiveEditTarget("bounce-0");
    window.localStorage.removeItem(customPresetStorageKey);
  }

  function updateCustomPreset(updater: (preset: TacticalPreset) => TacticalPreset) {
    setCustomPreset((currentPreset) => {
      if (!currentPreset) {
        return currentPreset;
      }

      return updater(currentPreset);
    });
  }

  function updateSelectedShot(updater: (shot: Shot) => Shot) {
    if (!selectedShot) {
      return;
    }

    updateCustomPreset((preset) => ({
      ...preset,
      shots: preset.shots.map((shot) =>
        shot.id === selectedShot.id ? updater(shot) : shot,
      ),
    }));
  }

  function updateSelectedShotAndNextStart(updater: (shot: Shot) => Shot) {
    if (!selectedShot) {
      return;
    }

    updateCustomPreset((preset) => {
      const selectedIndex = preset.shots.findIndex(
        (shot) => shot.id === selectedShot.id,
      );

      if (selectedIndex === -1) {
        return preset;
      }

      const nextShots = [...preset.shots];
      const nextSelectedShot = updater(nextShots[selectedIndex]);
      nextShots[selectedIndex] = nextSelectedShot;

      if (nextShots[selectedIndex + 1]) {
        nextShots[selectedIndex + 1] = {
          ...nextShots[selectedIndex + 1],
          start: { ...nextSelectedShot.end },
        };
      }

      return {
        ...preset,
        shots: nextShots,
      };
    });
  }

  function addBlankShot() {
    if (!canEditSelectedPreset) {
      return;
    }

    const nextOrder = selectedPreset.shots.length + 1;
    const previousShot = selectedPreset.shots[selectedPreset.shots.length - 1];
    const nextShot = createBlankShot(nextOrder, previousShot);

    updateCustomPreset((preset) => ({
      ...preset,
      shots: [...preset.shots, nextShot],
    }));
    setSelectedShotId(nextShot.id);
    setActiveEditTarget("bounce-0");
  }

  function deleteShot(shotId: string) {
    if (!canEditSelectedPreset) {
      return;
    }

    const deletedIndex = selectedPreset.shots.findIndex(
      (shot) => shot.id === shotId,
    );
    const isLastShot = deletedIndex === selectedPreset.shots.length - 1;

    if (deletedIndex === -1 || !isLastShot) {
      return;
    }

    const fallbackShot = selectedPreset.shots[deletedIndex - 1];

    updateCustomPreset((preset) => {
      const nextShots = preset.shots
        .filter((shot) => shot.id !== shotId)
        .map((shot, index) => ({
          ...shot,
          order: index + 1,
          player: (index % 2 === 0 ? "self" : "opponent") as PlayerSide,
        }));

      return normalizeShotContinuity({
        ...preset,
        shots: nextShots,
      });
    });

    setSelectedShotId(fallbackShot?.id ?? "");
    setActiveEditTarget("bounce-0");
  }

  function updateShotField(field: "note" | "shotType", value: string) {
    updateSelectedShot((shot) => ({ ...shot, [field]: value }));
  }

  function updateShotSpin(spinLabel: SpinLabel) {
    updateSelectedShot((shot) => ({ ...shot, spinLabel }));
  }

  function updateBouncePoint(
    pointIndex: number,
    axis: keyof Coordinate,
    value: number,
  ) {
    updateSelectedShotAndNextStart((shot) => {
      const nextBouncePoints = shot.bouncePoints.map((point, index) =>
        index === pointIndex
          ? { ...point, [axis]: clampPercent(value) }
          : point,
      );
      const lastPoint = nextBouncePoints[nextBouncePoints.length - 1];

      return {
        ...shot,
        bouncePoints: nextBouncePoints,
        end: lastPoint ? { x: lastPoint.x, y: lastPoint.y } : shot.end,
      };
    });
  }

  function updateBouncePointCoordinate(
    pointIndex: number,
    coordinate: Coordinate,
  ) {
    updateSelectedShotAndNextStart((shot) => {
      const nextBouncePoints = shot.bouncePoints.map((point, index) =>
        index === pointIndex
          ? {
              ...point,
              x: clampPercent(coordinate.x),
              y: clampPercent(coordinate.y),
            }
          : point,
      );
      const lastPoint = nextBouncePoints[nextBouncePoints.length - 1];

      return {
        ...shot,
        bouncePoints: nextBouncePoints,
        end: lastPoint ? { x: lastPoint.x, y: lastPoint.y } : shot.end,
      };
    });
  }

  function moveActivePoint(coordinate: Coordinate) {
    if (!isEditMode || !canEditSelectedPreset || !selectedShot) {
      return;
    }

    const pointIndex = Number(activeEditTarget.replace("bounce-", ""));

    if (Number.isNaN(pointIndex)) {
      return;
    }

    updateBouncePointCoordinate(pointIndex, coordinate);

    if (pointIndex < selectedShot.bouncePoints.length - 1) {
      setActiveEditTarget(`bounce-${pointIndex + 1}`);
    }
  }

  function handleBoardClick(event: MouseEvent<HTMLButtonElement>) {
    const boardRect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - boardRect.left) / boardRect.width) * 100;
    const y = ((event.clientY - boardRect.top) / boardRect.height) * 100;

    moveActivePoint({ x, y });
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:items-start">
      <section
        aria-label="Tactical table visualization"
        className="rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur"
      >
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
              Standard Coordinate Board
            </p>
            <h2 className="mt-1 text-xl font-black tracking-tight text-white">
              記述的コース・マップ
            </h2>
          </div>
          <p className="text-sm leading-6 text-slate-400">
            x=0-100 は幅方向、y=0 は相手側、y=100 は自分側。y=50 がネット位置です。
          </p>
        </div>

        <div
          className="relative mx-auto w-full max-w-[410px] overflow-hidden rounded-lg border border-sky-200/25 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.16),transparent_36%),linear-gradient(145deg,#07111f,#0b5fff_55%,#08203f)] p-4 shadow-[inset_0_0_42px_rgba(2,6,23,0.55)] sm:max-w-[430px]"
          style={{ aspectRatio: "152.5 / 274" }}
        >
          <div className="absolute inset-4 rounded-md border-2 border-white/55" />
          <div className="absolute left-4 right-4 top-1/2 h-2 -translate-y-1/2 bg-slate-950/70 shadow-[0_0_24px_rgba(15,23,42,0.9)]" />
          <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-white/70" />
          <div className="absolute bottom-4 left-1/2 top-4 w-px bg-white/20" />
          <div className="absolute inset-x-4 top-1/4 h-px bg-white/[0.08]" />
          <div className="absolute inset-x-4 top-3/4 h-px bg-white/[0.08]" />

          <svg
            className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]"
            viewBox="0 0 100 100"
            role="img"
            aria-label={`${selectedPreset.title} の戦術ライン`}
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="board-arrow-selected"
                markerHeight="7"
                markerUnits="strokeWidth"
                markerWidth="7"
                orient="auto"
                refX="6"
                refY="3.5"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#f8fafc" />
              </marker>
              <marker
                id="board-arrow-muted"
                markerHeight="7"
                markerUnits="strokeWidth"
                markerWidth="7"
                orient="auto"
                refX="6"
                refY="3.5"
              >
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#38bdf8" fillOpacity="0.45" />
              </marker>
            </defs>

            {selectedPreset.shots.map((shot) => {
              const isSelected = selectedShot ? shot.id === selectedShot.id : false;
              const shotColor = getShotColor(isSelected);
              const shotSegments = getShotSegments(shot);

              return (
                <g key={shot.id}>
                  {shotSegments.map((segment, segmentIndex) => (
                    <line
                      key={`${shot.id}-segment-${segmentIndex}`}
                      markerEnd={
                        isSelected
                          ? "url(#board-arrow-selected)"
                          : "url(#board-arrow-muted)"
                      }
                      opacity={isSelected ? 1 : 0.34}
                      stroke={shotColor}
                      strokeLinecap="round"
                      strokeWidth={isSelected ? 4.4 : 2.4}
                      vectorEffect="non-scaling-stroke"
                      x1={segment.start.x}
                      x2={segment.end.x}
                      y1={segment.start.y}
                      y2={segment.end.y}
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-4 z-10">
            {selectedPreset.shots.map((shot) => {
              const isSelected = selectedShot ? shot.id === selectedShot.id : false;
              const visibleBouncePoints = getVisibleBouncePoints(shot);

              return visibleBouncePoints.map((point, pointIndex) => {
                const isActivePoint =
                  isEditMode &&
                  canEditSelectedPreset &&
                  isSelected &&
                  activeEditTarget === `bounce-${pointIndex}`;

                return (
                <div
                  key={`${shot.id}-${point.label}`}
                  className="absolute"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={
                      isSelected
                        ? `grid h-9 w-9 place-items-center rounded-full border-2 border-sky-300 bg-white text-base font-black leading-none text-slate-950 shadow-[0_0_0_4px_rgba(14,165,233,0.16),0_12px_24px_rgba(2,6,23,0.35)] ${
                            isActivePoint
                              ? "outline outline-2 outline-offset-4 outline-sky-200"
                              : ""
                          }`
                        : "grid h-6 w-6 place-items-center rounded-full border border-sky-200/70 bg-sky-400/70 text-xs font-black leading-none text-slate-950 shadow-[0_8px_18px_rgba(2,132,199,0.25)]"
                    }
                  >
                    {markerNumbers[shot.order - 1] ?? shot.order}
                  </div>
                  {isSelected && visibleBouncePoints.length === 1 ? (
                    <div
                      className={`absolute top-[-1.65rem] whitespace-nowrap rounded-full border border-sky-200/20 bg-slate-950/80 px-2 py-0.5 text-[10px] font-black text-sky-100 shadow-[0_8px_18px_rgba(2,6,23,0.35)] ${
                        point.x > 72 ? "right-8" : "left-8"
                      }`}
                    >
                      {point.label}
                    </div>
                  ) : null}
                </div>
                );
              });
            })}
          </div>

          {isEditMode && canEditSelectedPreset && selectedShot ? (
            <button
              type="button"
              aria-label="球台をクリックして選択中の点を配置"
              className="absolute inset-4 z-20 cursor-crosshair rounded-md border border-dashed border-sky-200/45 bg-transparent text-left transition hover:border-sky-100/80"
              onClick={handleBoardClick}
            >
              <span className="absolute right-3 top-3 rounded-full border border-sky-200/25 bg-slate-950/70 px-3 py-1 text-[11px] font-black text-sky-100 backdrop-blur">
                クリックで配置
              </span>
            </button>
          ) : null}

          <div className="absolute bottom-7 left-7 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur">
            自分側
          </div>
          <div className="absolute left-7 top-7 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-bold text-slate-200 backdrop-blur">
            相手側
          </div>
          <div className="absolute bottom-16 left-7 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-bold text-slate-300 backdrop-blur">
            BH Wide
          </div>
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-bold text-slate-300 backdrop-blur">
            Middle
          </div>
          <div className="absolute bottom-16 right-7 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-bold text-slate-300 backdrop-blur">
            FH Wide
          </div>
        </div>

        <div className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-black/25 p-3 text-xs font-bold text-slate-300 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-white" />
            <span>白線：選択中のショット</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-8 rounded-full bg-sky-400/60" />
            <span>青線：その他のショット</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-sky-300 bg-sky-400 text-[10px] font-black text-slate-950">
              ①
            </span>
            <span>番号付き円：その一板の落点</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base leading-none text-sky-200">→</span>
            <span>矢印：直前の落点からの打球方向</span>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <span className="grid h-5 w-5 place-items-center rounded-full border border-sky-300 bg-white text-[10px] font-black text-slate-950">
              ①
            </span>
            <span>サーブ：自分側と相手側の2つの落点を表示</span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-lg border border-white/10 bg-black/25 p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-black text-white">ボードメモ</h3>
              <span className="rounded-full border border-sky-200/20 bg-sky-300/10 px-3 py-1 text-xs font-bold text-sky-100">
                V1 Descriptive
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              このボードは飛行軌道や高さを示すものではなく、打球方向、落点、連続する戦術選択を記述的に整理するためのものです。
            </p>
            <div className="mt-4 grid gap-2 text-xs font-bold text-slate-400">
              <p>選択中: 白い太線と白い落点</p>
              <p>非選択: 低透明度の補助ライン</p>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/25 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-black text-white">ラリータイムライン</h3>
              {isEditMode && canEditSelectedPreset ? (
                <button
                  type="button"
                  className="rounded-md border border-sky-300/45 bg-sky-300/10 px-3 py-2 text-xs font-black text-sky-100 transition hover:border-sky-200"
                  onClick={addBlankShot}
                >
                  ショットを追加
                </button>
              ) : null}
            </div>
            <div className="mt-4 grid gap-2">
              {selectedPreset.shots.length === 0 ? (
                <div className="rounded-md border border-dashed border-sky-200/25 bg-sky-300/5 px-3 py-5 text-sm font-bold leading-7 text-slate-400">
                  まだショットはありません。編集モードで「ショットを追加」からラリーを作成します。
                </div>
              ) : (
                selectedPreset.shots.map((shot) => {
                  const isSelected = selectedShot
                    ? shot.id === selectedShot.id
                    : false;
                  const isLastShot =
                    shot.id ===
                    selectedPreset.shots[selectedPreset.shots.length - 1]?.id;

                  return (
                    <div
                      key={shot.id}
                      className={`grid grid-cols-[1fr_auto] items-stretch gap-2 rounded-md border p-1 transition ${
                        isSelected
                          ? "border-sky-200/70 bg-sky-300/15 text-white"
                          : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-sky-300/45"
                      }`}
                    >
                      <button
                        type="button"
                        className="min-w-0 rounded px-2 py-1.5 text-left transition hover:bg-white/[0.04]"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedShotId(shot.id)}
                      >
                      <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.14em] text-sky-200/80">
                        {getShotActorLabel(shot)}
                      </span>
                      <span className="text-sm font-black">
                        {shot.order}. {shot.shotType || "未設定"}
                      </span>
                      <span className="ml-2 text-xs font-bold text-sky-200">
                        {shot.spinLabel}
                      </span>
                      </button>
                      {isEditMode && canEditSelectedPreset && isLastShot ? (
                        <button
                          type="button"
                          className="self-center rounded-md border border-rose-300/30 bg-rose-400/10 px-2.5 py-1.5 text-xs font-black text-rose-100 transition hover:border-rose-200 hover:bg-rose-400/15"
                          aria-label={`${shot.order} を削除`}
                          onClick={() => deleteShot(shot.id)}
                        >
                          削除
                        </button>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      <aside className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.32)] backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-300">
          {isEditMode ? "Rally Editor" : "Review Presets"}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          {isEditMode ? "自分のラリーを作成" : "戦術ラインを選択"}
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            className={`rounded-md border px-4 py-2 text-sm font-black transition ${
              isEditMode
                ? "border-sky-200/70 bg-white text-slate-950"
                : "border-sky-300/35 bg-sky-300/10 text-sky-100 hover:border-sky-200/70"
            }`}
            onClick={startEditMode}
          >
            {isEditMode ? "編集中" : "自分用に編集"}
          </button>
          <button
            type="button"
            className={`rounded-md border px-4 py-2 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-45 ${
              isEditMode
                ? "border-rose-300/25 bg-rose-400/10 text-rose-100 hover:border-rose-200/70"
                : "hidden border-white/10 bg-black/25 text-slate-300"
            }`}
            disabled={!isEditMode || !customPreset}
            onClick={resetCustomBoard}
          >
            初期化
          </button>
        </div>
        <p className="mt-3 text-xs font-bold leading-6 text-slate-500">
          編集内容はこのブラウザに保存されます。ログインやデータベースはまだ使いません。
        </p>

        {!isEditMode ? (
          <div className="mt-5 grid gap-3">
            {reviewPresets.map((preset) => {
              const isSelected = preset.id === selectedPreset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`rounded-md border px-4 py-3 text-left transition duration-200 ${
                    isSelected
                      ? "border-sky-300/70 bg-sky-300/15 text-white shadow-[0_0_24px_rgba(56,189,248,0.15)]"
                      : "border-white/10 bg-black/25 text-slate-300 hover:border-sky-300/45 hover:bg-sky-400/[0.08]"
                  }`}
                  aria-pressed={isSelected}
                  onClick={() => selectPreset(preset)}
                >
                  <span className="block text-sm font-black leading-6">
                    {preset.title}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="mt-6 border-t border-white/10 pt-6">
          {!isEditMode ? (
            <>
              <p className="text-sm font-bold text-sky-300">戦術テーマ</p>
              <h3 className="mt-2 text-xl font-black leading-8 text-white">
                {selectedPreset.theme}
              </h3>
            </>
          ) : null}

          {selectedShot ? (
            <div className="mt-5 rounded-lg border border-sky-200/15 bg-sky-300/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                {getShotActorLabel(selectedShot)}
              </p>
              <p className="mt-2 text-lg font-black text-white">
                {selectedShot.order}. {selectedShot.shotType || "未設定"}
              </p>
              {selectedShot.note ? (
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {selectedShot.note}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-slate-200">
                  {selectedShot.player === "self" ? "自分側" : "相手側"}
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-slate-200">
                  {selectedShot.spinLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs font-bold text-slate-200">
                  矢印 +  numbered marker
                </span>
              </div>
              <p className="mt-3 text-xs font-bold leading-6 text-slate-400">
                この情報は、直前の落点からこの番号付き落点へ向かう一板を表します。
              </p>
            </div>
          ) : (
            <div className="mt-5 rounded-lg border border-dashed border-sky-200/25 bg-sky-300/5 p-5">
              <p className="text-sm font-bold leading-7 text-slate-400">
                空白のボードです。ショットを追加して、サーブから順番にラリーを作成します。
              </p>
              <button
                type="button"
                className="mt-4 rounded-md border border-sky-300/45 bg-sky-300/10 px-4 py-2 text-sm font-black text-sky-100 transition hover:border-sky-200"
                onClick={addBlankShot}
              >
                最初のショットを追加
              </button>
            </div>
          )}

          {isEditMode ? (
            <div className="mt-5 rounded-lg border border-sky-200/20 bg-black/30 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">
                    Edit Mode
                  </p>
                  <h3 className="mt-1 text-lg font-black text-white">
                    自分の視覚化を編集
                  </h3>
                </div>
                {!canEditSelectedPreset ? (
                  <button
                    type="button"
                    className="rounded-md border border-sky-300/45 bg-sky-300/10 px-3 py-2 text-xs font-black text-sky-100 transition hover:border-sky-200"
                    onClick={startEditMode}
                  >
                    このラインをコピー
                  </button>
                ) : null}
              </div>

              {canEditSelectedPreset && selectedShot ? (
                <div className="mt-4 grid gap-4">
                  <div className="rounded-md border border-sky-200/20 bg-sky-300/10 p-3">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-sky-200">
                      Click Edit
                    </p>
                    <p className="mt-2 text-xs font-bold leading-6 text-slate-400">
                      編集したいバウンドを選び、左の球台をクリックすると位置とラインが更新されます。番号はラリー順に自動表示されます。
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedShot.bouncePoints.map((point, pointIndex) => (
                        <button
                          key={`${selectedShot.id}-${point.label}-target`}
                          type="button"
                          className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${
                            activeEditTarget === `bounce-${pointIndex}`
                              ? "border-white bg-white text-slate-950"
                              : "border-white/10 bg-black/25 text-slate-300 hover:border-sky-300/50"
                          }`}
                          onClick={() =>
                            setActiveEditTarget(`bounce-${pointIndex}`)
                          }
                        >
                          {getBouncePointName(selectedShot, point, pointIndex)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="grid gap-2 text-xs font-black text-slate-400">
                    {getShotTypeInputLabel(selectedShot)}
                    <input
                      className="rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-bold text-white outline-none transition focus:border-sky-300/70"
                      value={selectedShot.shotType}
                      onChange={(event) =>
                        updateShotField("shotType", event.target.value)
                      }
                    />
                  </label>

                  <label className="grid gap-2 text-xs font-black text-slate-400">
                    回転
                    <select
                      className="rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-bold text-white outline-none transition focus:border-sky-300/70"
                      value={selectedShot.spinLabel}
                      onChange={(event) =>
                        updateShotSpin(event.target.value as SpinLabel)
                      }
                    >
                      <option value="上回転">上回転</option>
                      <option value="下回転">下回転</option>
                      <option value="横回転">横回転</option>
                      <option value="ナックル">ナックル</option>
                    </select>
                  </label>

                  <label className="grid gap-2 text-xs font-black text-slate-400">
                    {selectedShot.player === "opponent"
                      ? "相手返球メモ"
                      : "自分の狙いメモ"}
                    <textarea
                      className="min-h-24 rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-sm font-bold leading-6 text-white outline-none transition focus:border-sky-300/70"
                      value={selectedShot.note}
                      onChange={(event) =>
                        updateShotField("note", event.target.value)
                      }
                    />
                  </label>

                  <details className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                    <summary className="cursor-pointer text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      バウンド位置を細かく調整
                    </summary>
                    <div className="mt-4 grid gap-4">
                      <div className="rounded-md border border-white/10 bg-black/20 p-3">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                          Bounce Points
                        </p>
                        <div className="mt-3 grid gap-4">
                          {selectedShot.bouncePoints.map((point, pointIndex) => (
                            <div
                              key={`${selectedShot.id}-${point.label}`}
                              className="rounded-md border border-white/10 bg-black/25 p-3"
                            >
                              <p className="text-xs font-black text-sky-100">
                                {getBouncePointName(
                                  selectedShot,
                                  point,
                                  pointIndex,
                                )}
                              </p>
                              <div className="mt-3 grid gap-3">
                                {(["x", "y"] as const).map((axis) => (
                                  <label
                                    key={`${point.label}-${axis}`}
                                    className="grid gap-2 text-xs font-bold text-slate-400"
                                  >
                                    {axis.toUpperCase()} {point[axis]}
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      value={point[axis]}
                                      onChange={(event) =>
                                        updateBouncePoint(
                                          pointIndex,
                                          axis,
                                          Number(event.target.value),
                                        )
                                      }
                                    />
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs font-bold leading-6 text-slate-500">
                        座標はすべて 0-100 の割合です。番号はラリー順に自動表示されます。
                      </p>
                    </div>
                  </details>
                </div>
              ) : canEditSelectedPreset ? (
                <div className="mt-4 rounded-md border border-dashed border-sky-200/25 bg-sky-300/5 p-4">
                  <p className="text-sm font-bold leading-7 text-slate-400">
                    まだ編集するショットはありません。時間線にショットを追加してください。
                  </p>
                  <button
                    type="button"
                    className="mt-3 rounded-md border border-sky-300/45 bg-sky-300/10 px-4 py-2 text-sm font-black text-sky-100 transition hover:border-sky-200"
                    onClick={addBlankShot}
                  >
                    ショットを追加
                  </button>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-7 text-slate-400">
                  プリセットを直接変更せず、コピーしてから自分用ボードとして編集します。
                </p>
              )}
            </div>
          ) : null}

          {!isEditMode ? (
            <dl className="mt-6 grid gap-5">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  狙い
                </dt>
                <dd className="mt-2 text-sm leading-7 text-slate-300">
                  {selectedPreset.aim}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  よくあるミス
                </dt>
                <dd className="mt-2 text-sm leading-7 text-slate-300">
                  {selectedPreset.commonMistake}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  改善ポイント
                </dt>
                <dd className="mt-2 text-sm leading-7 text-slate-300">
                  {selectedPreset.improvement}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
