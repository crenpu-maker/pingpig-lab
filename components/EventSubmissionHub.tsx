"use client";

import { useEffect, useState, type ClipboardEvent } from "react";

type VoteStatus =
  | "join"
  | "considering"
  | "partner"
  | "teamMembers";

type MatchPost = {
  id: string;
  title: string;
  eventDate: string;
  venue: string;
  region: string;
  eventType: string;
  eventDetail: string;
  eligibility: string;
  level: string;
  officialUrl: string;
  lookingFor: string;
  note: string;
  photoPreview?: string;
  createdAt: string;
  votes: Record<VoteStatus, number>;
  userVote?: VoteStatus;
};

type MatchForm = {
  title: string;
  eventDate: string;
  venue: string;
  region: string;
  eventType: string;
  eventDetail: string;
  eligibility: string;
  level: string;
  officialUrl: string;
  lookingFor: string;
  note: string;
};

const voteLabels: { key: VoteStatus; label: string }[] = [
  { key: "join", label: "参加したい" },
  { key: "considering", label: "参加を検討中" },
  { key: "partner", label: "パートナー募集中" },
  { key: "teamMembers", label: "団体メンバー募集中" },
];

const emptyVotes: Record<VoteStatus, number> = {
  join: 0,
  considering: 0,
  partner: 0,
  teamMembers: 0,
};

const emptyForm: MatchForm = {
  title: "",
  eventDate: "",
  venue: "",
  region: "",
  eventType: "",
  eventDetail: "",
  eligibility: "",
  level: "",
  officialUrl: "",
  lookingFor: "パートナー募集中",
  note: "",
};

const matchPostsStorageKey = "bujueyi-match-posts";

export function EventSubmissionHub() {
  const [form, setForm] = useState<MatchForm>(emptyForm);
  const [posts, setPosts] = useState<MatchPost[]>([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(matchPostsStorageKey);
      setPosts(stored ? (JSON.parse(stored) as MatchPost[]) : []);
    } catch {
      setPosts([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(matchPostsStorageKey, JSON.stringify(posts));
  }, [posts]);

  const canPublish =
    form.title.trim().length > 0 &&
    form.eventDate.trim().length > 0 &&
    form.venue.trim().length > 0 &&
    form.eventType.trim().length > 0 &&
    form.level.trim().length > 0;

  function updateField(key: keyof MatchForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handlePhotoFile(file: File | undefined) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatusMessage("图片导入只支持图片文件。");
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setPhotoPreview(dataUrl);
    setPhotoName(file.name);
    setStatusMessage(
      "已添加比赛照片。当前本地版本还没有接 OCR/AI，所以不会直接从图片自动读字；你可以照着预览补填，或把可复制的要项文字粘贴到下方文本框自动拆字段。",
    );
  }

  async function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const imageFile = Array.from(event.clipboardData.files).find((file) =>
      file.type.startsWith("image/"),
    );
    const pastedText = event.clipboardData.getData("text/plain");

    if (imageFile) {
      event.preventDefault();
      await handlePhotoFile(imageFile);
      return;
    }

    if (pastedText.trim()) {
      event.preventDefault();
      setRecognizedText(pastedText);
      applyRecognizedText(pastedText);
    }
  }

  function applyRecognizedText(text = recognizedText) {
    const parsed = parseEventText(text);

    setForm((current) => ({
      ...current,
      ...removeEmptyValues(parsed),
    }));

    setStatusMessage(
      "已从粘贴文字里尝试拆出字段。请对照原始照片或官方要项确认后再发布。",
    );
  }

  function publishPost() {
    if (!canPublish) {
      setStatusMessage("请至少填写比赛名称、日期、地点、类型和大概水平。");
      return;
    }

    const post: MatchPost = {
      id: crypto.randomUUID(),
      ...form,
      photoPreview,
      createdAt: new Date().toISOString(),
      votes: { ...emptyVotes },
    };

    setPosts((current) => [post, ...current]);
    setForm(emptyForm);
    setPhotoPreview("");
    setPhotoName("");
    setRecognizedText("");
    setStatusMessage("已发布找队友卡片。");
  }

  function vote(postId: string, nextVote: VoteStatus) {
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const votes = { ...post.votes };

        if (post.userVote) {
          votes[post.userVote] = Math.max(0, votes[post.userVote] - 1);
        }

        if (post.userVote === nextVote) {
          return { ...post, votes, userVote: undefined };
        }

        votes[nextVote] += 1;
        return { ...post, votes, userVote: nextVote };
      }),
    );
  }

  return (
    <section className="mt-14 space-y-6">
      <div className="rounded-lg border border-sky-300/20 bg-white/[0.06] p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-300">
          Find Teammates
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          发布比赛信息，开始寻找队友
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          可以手动填写，也可以先把比赛要项照片粘贴/上传到这里作为参考。当前版本支持从可复制文字里自动拆字段；纯图片自动识别需要下一步接 OCR/AI。
        </p>

        <div
          onPaste={handlePaste}
          className="mt-5 rounded-lg border border-dashed border-sky-300/30 bg-black/20 p-4"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <h3 className="text-base font-black text-white">
                从比赛照片生成草稿
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                点击选择图片，或在这个区域按 Ctrl+V 粘贴截图。图片会作为填写参考显示；若你能复制到网页文字，也可以粘贴到下方文本框自动拆字段。
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handlePhotoFile(event.target.files?.[0])}
                className="mt-4 block w-full rounded-md border border-white/10 bg-black/25 px-3 py-3 text-sm text-slate-300 file:mr-4 file:rounded file:border-0 file:bg-court-blue file:px-3 file:py-2 file:text-sm file:font-bold file:text-white"
              />
              <textarea
                value={recognizedText}
                onChange={(event) => setRecognizedText(event.target.value)}
                placeholder="也可以把复制出来的要项文字粘贴到这里，例如：開催日、会場、種目、参加資格..."
                className="mt-4 min-h-24 w-full rounded-md border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/70"
              />
              <button
                type="button"
                onClick={() => applyRecognizedText()}
                disabled={!recognizedText.trim()}
                className="mt-3 h-11 rounded-md bg-court-blue px-4 text-sm font-black text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-45"
              >
                从文字自动填入表单
              </button>
            </div>
            <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
              {photoPreview ? (
                // User-provided competition reference image. Kept local in browser storage only.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoPreview}
                  alt={photoName || "比赛要项照片"}
                  className="h-56 w-full object-contain"
                />
              ) : (
                <div className="grid h-56 place-items-center px-4 text-center text-sm leading-7 text-slate-500">
                  粘贴或上传比赛照片后，会显示在这里。
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field
            label="比赛名称"
            value={form.title}
            onChange={(value) => updateField("title", value)}
            placeholder="例：卓球丼ナイトチャレンジ"
          />
          <Field
            label="比赛日子"
            value={form.eventDate}
            onChange={(value) => updateField("eventDate", value)}
            placeholder="例：2026年7月1日（水）"
          />
          <Field
            label="地点 / 会场"
            value={form.venue}
            onChange={(value) => updateField("venue", value)}
            placeholder="例：東京体育館サブアリーナ"
          />
          <Field
            label="地区"
            value={form.region}
            onChange={(value) => updateField("region", value)}
            placeholder="例：东京 / 关东"
          />
          <Field
            label="类型 / 种目"
            value={form.eventType}
            onChange={(value) => updateField("eventType", value)}
            placeholder="例：シングルス / 団体戦 / ダブルス"
          />
          <Field
            label="种目详细"
            value={form.eventDetail}
            onChange={(value) => updateField("eventDetail", value)}
            placeholder="例：男女混合シングルス練習試合"
          />
          <Field
            label="参加资格"
            value={form.eligibility}
            onChange={(value) => updateField("eligibility", value)}
            placeholder="例：オープン / 誰でも参加OK"
          />
          <Field
            label="大概水平"
            value={form.level}
            onChange={(value) => updateField("level", value)}
            placeholder="例：初中级 / 中级 / 高级 / 练习赛"
          />
          <Field
            label="要项 / 官方链接"
            value={form.officialUrl}
            onChange={(value) => updateField("officialUrl", value)}
            placeholder="https://example.com/event"
          />
          <label className="grid gap-2">
            <span className="text-xs font-bold text-slate-400">寻找内容</span>
            <select
              value={form.lookingFor}
              onChange={(event) => updateField("lookingFor", event.target.value)}
              className="h-11 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-sky-300/70"
            >
              <option>パートナー募集中</option>
              <option>団体メンバー募集中</option>
              <option>一緒に参加したい人募集</option>
              <option>参加を検討中</option>
            </select>
          </label>
          <label className="grid gap-2 md:col-span-2">
            <span className="text-xs font-bold text-slate-400">补充说明</span>
            <textarea
              value={form.note}
              onChange={(event) => updateField("note", event.target.value)}
              placeholder="例：想找一位水平接近的搭档，一起参加练习赛。"
              className="min-h-24 rounded-md border border-white/10 bg-black/25 px-3 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/70"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={publishPost}
            disabled={!canPublish}
            className="h-12 rounded-md bg-court-blue px-5 text-sm font-black text-white shadow-[0_18px_45px_rgba(11,95,255,0.28)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-45"
          >
            发布并寻找队友
          </button>
          <p className="text-xs leading-5 text-slate-500">
            正式报名仍然请到主办方官方页面完成。
          </p>
        </div>

        {statusMessage ? (
          <p className="mt-4 rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-sky-100">
            {statusMessage}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <MatchPostCard key={post.id} post={post} onVote={vote} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.04] p-6 text-sm leading-7 text-slate-400">
            还没有找队友卡片。发布一条比赛信息后，会显示在这里。
          </div>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold text-slate-400">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-sky-300/70"
      />
    </label>
  );
}

function MatchPostCard({
  post,
  onVote,
}: {
  post: MatchPost;
  onVote: (postId: string, vote: VoteStatus) => void;
}) {
  const rows = [
    ["開催日", post.eventDate],
    ["会場", post.venue],
    ["地域", post.region],
    ["種目", post.eventType],
    ["種目詳細", post.eventDetail],
    ["参加資格", post.eligibility],
    ["大概水平", post.level],
    ["募集", post.lookingFor],
  ];

  return (
    <article className="overflow-hidden rounded-lg border border-sky-300/20 bg-[#07111f] shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#0b5fff,#0f172a_58%,#231527)] p-5">
        <EventCardSvg />
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-100">
            Bujueyi Team Finder
          </p>
          <h3 className="mt-4 max-w-2xl text-2xl font-black tracking-tight text-white">
            {post.title}
          </h3>
          <p className="mt-2 inline-flex rounded-full border border-pink-200/30 bg-pink-200/10 px-3 py-1 text-xs font-black text-pink-100">
            {post.lookingFor}
          </p>
        </div>
      </div>

      <div className="grid gap-4 p-5">
        {post.photoPreview ? (
          <div className="overflow-hidden rounded-md border border-white/10 bg-black/20">
            {/* User-provided competition reference image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.photoPreview}
              alt={`${post.title} 要项照片`}
              className="max-h-72 w-full object-contain"
            />
          </div>
        ) : null}

        <dl className="grid gap-3 sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div
              key={label}
              className="rounded-md border border-white/10 bg-white/[0.045] p-3"
            >
              <dt className="text-xs font-bold text-slate-500">{label}</dt>
              <dd className="mt-1 text-sm font-bold text-slate-100">
                {value || "未填写"}
              </dd>
            </div>
          ))}
        </dl>

        {post.note ? (
          <p className="rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm leading-7 text-slate-300">
            {post.note}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {voteLabels.map((vote) => (
            <button
              key={vote.key}
              type="button"
              onClick={() => onVote(post.id, vote.key)}
              className={`rounded-md border px-3 py-2 text-xs font-black transition ${
                post.userVote === vote.key
                  ? "border-sky-200 bg-court-blue text-white"
                  : "border-white/10 bg-black/20 text-slate-300 hover:border-sky-300/60 hover:text-white"
              }`}
            >
              {vote.label} · {post.votes[vote.key]}
            </button>
          ))}
        </div>

        <p className="rounded-md border border-sky-200/20 bg-sky-300/10 px-4 py-3 text-sm font-bold leading-6 text-sky-50">
          大会への正式な申込みは主催者の公式ページで行ってください。
        </p>

        {post.officialUrl ? (
          <a
            href={post.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-fit items-center justify-center rounded-md bg-court-blue px-4 text-sm font-black text-white transition hover:bg-blue-500"
          >
            要項を見る
          </a>
        ) : null}
      </div>
    </article>
  );
}

function EventCardSvg() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-55"
      viewBox="0 0 900 280"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="team-finder-grid" x1="0" x2="1">
          <stop stopColor="#7dd3fc" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f9a8d4" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        d="M0 230 C170 170 240 250 410 185 S700 80 900 150"
        fill="none"
        stroke="url(#team-finder-grid)"
        strokeWidth="3"
      />
      <path
        d="M0 72 H900 M120 0 V280 M300 0 V280 M480 0 V280 M660 0 V280 M840 0 V280"
        stroke="#ffffff"
        strokeOpacity="0.08"
      />
      <circle
        cx="720"
        cy="86"
        r="56"
        fill="#ffffff"
        fillOpacity="0.1"
        stroke="#ffffff"
        strokeOpacity="0.18"
      />
      <circle cx="724" cy="84" r="12" fill="#ffffff" fillOpacity="0.72" />
    </svg>
  );
}

function parseEventText(text: string): Partial<MatchForm> {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const joined = lines.join("\n");

  const parsed: Partial<MatchForm> = {
    title: lines[0] ?? "",
    eventDate: findValueAfterLabel(joined, ["開催日", "比赛日子", "開催日時"]),
    venue: findValueAfterLabel(joined, ["会場", "地点", "場所"]),
    eventType: findValueAfterLabel(joined, ["種目", "类型"]),
    eventDetail: findValueAfterLabel(joined, ["種目詳細", "项目详细"]),
    eligibility: findValueAfterLabel(joined, ["参加資格", "资格"]),
    officialUrl: findFirstUrl(joined),
  };

  if (parsed.eventDetail?.includes("練習試合")) {
    parsed.level = "练习赛";
  }

  if (!parsed.level && parsed.eligibility?.includes("オープン")) {
    parsed.level = "オープン";
  }

  return parsed;
}

function findValueAfterLabel(text: string, labels: string[]) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`${escaped}\\s*[:：]?\\s*([^\\n]+)`, "i");
    const match = text.match(pattern);

    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
}

function findFirstUrl(text: string) {
  return text.match(/https?:\/\/\S+/)?.[0] ?? "";
}

function removeEmptyValues(values: Partial<MatchForm>) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value.trim().length > 0),
  ) as Partial<MatchForm>;
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("图片读取失败。"));
    reader.readAsDataURL(file);
  });
}
