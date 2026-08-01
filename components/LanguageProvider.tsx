"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "zh" | "ja" | "en";

export const languageOptions: { code: Language; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
];

export const copy = {
  zh: {
    nav: {
      home: "首页",
      tactics: "战术",
      forum: "社区",
      about: "关于",
    },
    start: {
      eyebrow: "东京",
      title: "不觉一",
      enterLabel: "进入 PingPig Lab",
      greetings: [
        "你好，欢迎来到 PingPig Lab。",
        "今天想聊哪一板球？",
        "把问题发出来，一起拆解。",
      ],
    },
    hero: {
      eyebrow: "不觉一 Community",
      title: "乒乓球社区",
      subtitle:
        "不觉一重视球友交流和技术增长。我们通过每周一次的训练和偶尔参加比赛来磨练技术，也希望这里成为不同文化、不同国籍球友交流的场所，同时一起享受吃喝玩乐。",
      forumButton: "进入社区",
      tacticsButton: "战术板",
      brandTitle: "PingPig",
      brandLines: ["开心乒乓", "注重交流", "共同成长"],
      brandAlt: "PingPig 极简猪 IP 图标",
    },
    forum: {
      eyebrow: "Community",
      title: "社区",
      subtitle: "讨论战术、训练、器材和比赛复盘。",
      mascotTitle: "举起一个蹄子的小猪",
      mascotDescription: "论坛欢迎区 mascot，用于表达欢迎讨论、提问和交流战术。",
      mascotAlt: "举起一个蹄子的小猪 mascot",
      replies: "回复",
      views: "浏览",
      categories: ["技术讨论", "战术分析", "器材讨论", "训练日记", "比赛复盘"],
      posts: [
        {
          title: "反手拧拉之后，下一板如何衔接正手抢攻？",
          category: "技术讨论",
          replies: 18,
          views: 326,
          time: "2 小时前",
        },
        {
          title: "面对长胶防守，前三板应该怎样设计线路？",
          category: "战术分析",
          replies: 24,
          views: 512,
          time: "今天 09:40",
        },
        {
          title: "外置纤维底板适合弧圈结合快攻打法吗？",
          category: "器材讨论",
          replies: 11,
          views: 208,
          time: "昨天 21:15",
        },
        {
          title: "本周多球训练记录：侧旋发球后的落点变化",
          category: "训练日记",
          replies: 7,
          views: 143,
          time: "昨天 18:05",
        },
      ],
    },
    tactics: {
      eyebrow: "Tactics Lab",
      title: "战术板",
      subtitle: "",
      cardTitle: "猪鼻子乒乓球拍 Icon",
      cardDescription: "PingPig Lab 的战术识别图标，代表线路、落点和旋转讨论。",
      cardAlt: "猪鼻子乒乓球拍 icon",
      introTitle: "战术板可以做什么",
      introBody:
        "在球台上标记每一板的落点，用连线表示击球方向，把发球、接发球和连续进攻的思路整理成一张清楚的战术图。",
      introNote: "适合训练后复盘，也适合发到社区里让球友一起讨论。",
      levelsEyebrow: "Learning Levels",
      levelsTitle: "社区战术学习的三层结构",
      levelsSubtitle: "从描述一板球，到复盘一局球，再到沉淀训练计划。",
      inDevelopment: "功能开发中",
      openBoard: "打开 V1 战术板",
      levels: [
        {
          title: "描述一板球",
          englishTitle: "Point Description",
          summary: "用线路、落点、旋转和站位，把一个具体问题说清楚。",
          detail:
            "第一阶段重在表达。球友可以把发球、接发球、第三板或相持中的问题整理成清楚的战术描述，方便教练和社区成员给出建议。",
          tags: ["MVP", "低复杂度", "战术描述"],
        },
        {
          title: "复盘一段球",
          englishTitle: "Rally Review",
          summary: "把连续几板放在一起，看选择、节奏和衔接是否合理。",
          detail:
            "第二阶段关注连续性。通过复盘一段回合，分析前一板如何影响下一板，帮助训练者理解为什么要选择某条线路或某个落点。",
          tags: ["训练复盘", "中等复杂度", "连续板"],
        },
        {
          title: "沉淀训练计划",
          englishTitle: "Training Plan",
          summary: "把讨论过的问题整理成可重复练习的训练主题。",
          detail:
            "第三阶段把社区讨论转化为训练资产。未来可以结合数据和个人记录，帮助球友追踪问题、复用战术卡片并持续改进。",
          tags: ["未来规划", "社区资产", "训练计划"],
        },
      ],
      previewEyebrow: "Tactical Presets",
      previewComingSoon: "战术预览区域开发中",
      previewDescription: "这里之后可以接入更完整的战术卡片或 3D 球台展示。",
      presets: ["发球抢攻", "正手斜线", "反手直线", "侧旋发球"],
    },
    about: {
      eyebrow: "Bujueyi Table Tennis Club",
      title: "关于",
      body:
        "不觉一是一个面向社会人的乒乓球社团。无论你是刚开始打球，还是已经有比赛经验，只要想认真训练、认识球友、一起享受乒乓球，都可以来参加。",
      highlights: [
        "每周训练：我们计划固定在每周三组织训练，大家一起练基本功、对练、打比赛。",
        "定期参赛：社团会定期一起报名参加比赛，寻找队友、组队、赛后复盘都可以在这里完成。",
        "开放参加：不限制水平和背景，想认真打球、想恢复训练、想找球友的人都欢迎。",
        "重视交流：除了训练，也会定期开展聚餐和轻松聚会。想交朋友、认识新的人，甚至遇到合拍的人，这里都可以是一个很好的归宿。",
      ],
      mascotTitle: "不觉一 IP",
      mascotDescription: "用一个轻松但不幼稚的猪 IP，代表社团开放、友好、愿意一起变强的气质。",
      missionTitle: "社团目标",
      mission:
        "以平常心打磨基本功，在不知不觉间成为一流。",
      locationMapLabel: "不觉一训练场地地图：港区スポーツセンター，靠近田町站和三田站。",
      locationBadge: "训练场地",
      locationEyebrow: "Location",
      locationTitle: "港区スポーツセンター",
      locationAddress:
        "Minato City Sports Center, Minato Park Shibaura 3F-8F, 1-16-1 Shibaura, Minato-ku, Tokyo 105-0023",
      nearestStationTitle: "最近车站",
      nearestStationBody: "JR 山手线，田町站东口，步行 5 分钟",
      subwayAccessTitle: "地铁交通",
      subwayAccessBody: "都营地下铁，三田站 A6 出口，步行 6 分钟",
      mapWalkFive: "步行 5 分",
      mapWalkSix: "步行 6 分",
      mapSchematic: "示意地图",
      mapRailLegend: "铁路",
      mapWalkLegend: "步行",
      mapVenueLegend: "场地",
      tournamentEyebrow: "比赛记录",
      tournamentTitle: "定期参赛记录",
      tournamentDescription: "来自定期比赛日的号码布",
      bibLabel: "号码布",
    },
    footer: {
      line: "© 2026 不觉一 by PingPig Lab. Built for table tennis players.",
      links: "Tactics · Community · Training",
    },
  },
  ja: {
    nav: {
      home: "ホーム",
      tactics: "戦術",
      forum: "コミュニティ",
      about: "概要",
    },
    start: {
      eyebrow: "東京",
      title: "不覚一",
      enterLabel: "PingPig Lab に入る",
      greetings: [
        "こんにちは、PingPig Lab へ。",
        "今日はどの一本を話しますか？",
        "悩みを共有して、一緒に整理しましょう。",
      ],
    },
    hero: {
      eyebrow: "不覚一 Community",
      title: "卓球コミュニティ",
      subtitle:
        "不覚一は、球友同士の交流と技術向上を大切にする卓球コミュニティです。週1回の練習と時々の試合参加を通じて技術を磨きながら、文化や国籍を越えて交流し、食事や遊びも一緒に楽しみます。",
      forumButton: "コミュニティへ",
      tacticsButton: "戦術ボード",
      brandTitle: "PingPig",
      brandLines: ["楽しい卓球", "交流重視", "共に成長"],
      brandAlt: "PingPig のミニマルな豚 IP アイコン",
    },
    forum: {
      eyebrow: "Community",
      title: "コミュニティ",
      subtitle: "戦術、練習、用具、試合の振り返りを話し合います。",
      mascotTitle: "片手を上げた小さな豚",
      mascotDescription: "質問、議論、戦術交流を歓迎するフォーラム用 mascot です。",
      mascotAlt: "片手を上げた小さな豚 mascot",
      replies: "返信",
      views: "閲覧",
      categories: ["技術相談", "戦術分析", "用具相談", "練習日記", "試合の振り返り"],
      posts: [
        {
          title: "バックハンドチキータの後、次球をフォア攻撃につなげるには？",
          category: "技術相談",
          replies: 18,
          views: 326,
          time: "2時間前",
        },
        {
          title: "粒高守備に対して、最初の三球はどう組み立てるべき？",
          category: "戦術分析",
          replies: 24,
          views: 512,
          time: "今日 09:40",
        },
        {
          title: "外側カーボンのラケットはループと速攻の両立に合う？",
          category: "用具相談",
          replies: 11,
          views: 208,
          time: "昨日 21:15",
        },
        {
          title: "今週の多球練習記録：横回転サービス後の落点変化",
          category: "練習日記",
          replies: 7,
          views: 143,
          time: "昨日 18:05",
        },
      ],
    },
    tactics: {
      eyebrow: "Tactics Lab",
      title: "戦術ボード",
      subtitle: "",
      cardTitle: "豚鼻ラケット Icon",
      cardDescription: "コース、落点、回転の議論を表す PingPig Lab の戦術アイコンです。",
      cardAlt: "豚鼻卓球ラケット icon",
      introTitle: "戦術ボードでできること",
      introBody:
        "卓球台の上に各ショットの落点を置き、線で打球方向をつなげます。サービス、レシーブ、連続攻撃の考え方を一枚の戦術図として整理できます。",
      introNote: "練習後の復盤や、コミュニティで球友と相談するときに使えます。",
      levelsEyebrow: "Learning Levels",
      levelsTitle: "コミュニティ戦術学習の三層構造",
      levelsSubtitle: "一本を説明し、ラリーを振り返り、練習テーマとして残します。",
      inDevelopment: "開発中",
      openBoard: "V1 戦術ボードを開く",
      levels: [
        {
          title: "一本を説明する",
          englishTitle: "Point Description",
          summary: "コース、落点、回転、立ち位置で具体的な問題を共有します。",
          detail:
            "第一段階は表現です。サービス、レシーブ、三球目、ラリー中の悩みを戦術として整理し、コーチやコミュニティが助言しやすくします。",
          tags: ["MVP", "低い複雑度", "戦術説明"],
        },
        {
          title: "ラリーを振り返る",
          englishTitle: "Rally Review",
          summary: "数本の流れを見て、選択、リズム、つなぎを確認します。",
          detail:
            "第二段階は連続性です。前の一手が次の一手にどう影響したかを振り返り、なぜそのコースや落点を選ぶのかを理解します。",
          tags: ["練習復盤", "中程度の複雑度", "連続プレー"],
        },
        {
          title: "練習計画に残す",
          englishTitle: "Training Plan",
          summary: "話し合った課題を、繰り返し練習できるテーマに変えます。",
          detail:
            "第三段階では、コミュニティでの議論を練習資産にします。将来的には記録やデータと組み合わせ、課題管理と戦術カードの再利用を支援します。",
          tags: ["将来構想", "コミュニティ資産", "練習計画"],
        },
      ],
      previewEyebrow: "Tactical Presets",
      previewComingSoon: "戦術プレビューを準備中",
      previewDescription: "今後、より詳しい戦術カードや 3D 卓球台表示を接続できます。",
      presets: ["サービス三球目攻撃", "フォアクロス", "バックストレート", "横回転サービス"],
    },
    about: {
      eyebrow: "Bujueyi Table Tennis Club",
      title: "概要",
      body:
        "不覚一は、社会人向けの卓球サークルです。初心者でも、試合経験がある人でも、真剣に練習したい人、卓球仲間を作りたい人、一緒に卓球を楽しみたい人なら誰でも参加できます。",
      highlights: [
        "毎週の練習：毎週水曜日に練習会を開き、基礎練習、ラリー、ゲーム練習を行います。",
        "定期的な試合参加：大会にも定期的に参加し、ペア探し、チーム作り、試合後の振り返りまで一緒に行います。",
        "誰でも参加OK：レベルや背景は問いません。しっかり練習したい人、久しぶりに再開したい人、卓球仲間を探している人を歓迎します。",
        "交流を大切に：練習だけでなく、飲み会や気軽な集まりも定期的に行います。友達を作りたい人、良い出会いを探している人にとっても、居場所になるサークルを目指します。",
      ],
      mascotTitle: "不覚一 IP",
      mascotDescription: "ゆるさと本気さを両立する豚 IP で、オープンで仲間と一緒に強くなる雰囲気を表します。",
      missionTitle: "サークルの目標",
      mission:
        "平常心で基本を磨き、気づけば一流へ。",
      locationMapLabel: "不覚一の練習会場マップ：田町駅と三田駅から近い港区スポーツセンター。",
      locationBadge: "練習会場",
      locationEyebrow: "アクセス",
      locationTitle: "港区スポーツセンター",
      locationAddress:
        "Minato City Sports Center, Minato Park Shibaura 3F-8F, 1-16-1 Shibaura, Minato-ku, Tokyo 105-0023",
      nearestStationTitle: "最寄り駅",
      nearestStationBody: "JR山手線 田町駅 東口 徒歩5分",
      subwayAccessTitle: "地下鉄アクセス",
      subwayAccessBody: "都営地下鉄 三田駅 A6出口 徒歩6分",
      mapWalkFive: "徒歩5分",
      mapWalkSix: "徒歩6分",
      mapSchematic: "概略マップ",
      mapRailLegend: "鉄道",
      mapWalkLegend: "徒歩",
      mapVenueLegend: "会場",
      tournamentEyebrow: "大会参加記録",
      tournamentTitle: "定期的な試合参加の記録",
      tournamentDescription: "定期的な大会参加日のゼッケン",
      bibLabel: "ゼッケン",
    },
    footer: {
      line: "© 2026 不覚一 by PingPig Lab. Players のための卓球コミュニティ。",
      links: "Tactics · Community · Training",
    },
  },
  en: {
    nav: {
      home: "Home",
      tactics: "Tactics",
      forum: "Community",
      about: "About",
    },
    start: {
      eyebrow: "Tokyo",
      title: "Bujueyi",
      enterLabel: "Enter PingPig Lab",
      greetings: [
        "Hello, player.",
        "What point are we breaking down today?",
        "Share the problem. Build the answer together.",
      ],
    },
    hero: {
      eyebrow: "Bujueyi Community",
      title: "Table Tennis Community",
      subtitle:
        "Bujueyi values player connection and technical growth. Through weekly training and occasional tournaments, we sharpen our table tennis while creating a place for people from different cultures and nationalities to meet, eat, explore, and have fun together.",
      forumButton: "Enter Community",
      tacticsButton: "Tactics Board",
      brandTitle: "PingPig",
      brandLines: ["Happy Table Tennis", "Connection First", "Grow Together"],
      brandAlt: "PingPig minimal pig IP icon",
    },
    forum: {
      eyebrow: "Community",
      title: "Community",
      subtitle: "Discuss tactics, training, gear, and match reviews.",
      mascotTitle: "A little pig raising one hoof",
      mascotDescription: "Forum mascot for welcoming discussion, questions, and tactical exchange.",
      mascotAlt: "Little pig raising one hoof mascot",
      replies: "Replies",
      views: "Views",
      categories: ["Technique", "Tactics", "Gear", "Training Log", "Match Review"],
      posts: [
        {
          title: "After a backhand flick, how do I connect into a forehand attack?",
          category: "Technique",
          replies: 18,
          views: 326,
          time: "2 hours ago",
        },
        {
          title: "Against long-pips defense, how should the first three shots be planned?",
          category: "Tactics",
          replies: 24,
          views: 512,
          time: "Today 09:40",
        },
        {
          title: "Is an outer-fiber blade good for loop-and-counter play?",
          category: "Gear",
          replies: 11,
          views: 208,
          time: "Yesterday 21:15",
        },
        {
          title: "This week's multiball log: placement changes after sidespin serves",
          category: "Training Log",
          replies: 7,
          views: 143,
          time: "Yesterday 18:05",
        },
      ],
    },
    tactics: {
      eyebrow: "Tactics Lab",
      title: "Tactics Board",
      subtitle: "",
      cardTitle: "Pig-nose paddle icon",
      cardDescription: "PingPig Lab's tactics icon for discussing routes, placement, and spin.",
      cardAlt: "Pig-nose table tennis paddle icon",
      introTitle: "What The Tactics Board Does",
      introBody:
        "Mark each shot's landing point on the table, connect the route with lines, and turn serves, receives, and attacking patterns into a clear tactics diagram.",
      introNote: "Use it after training for review, or share it with the community for discussion.",
      levelsEyebrow: "Learning Levels",
      levelsTitle: "Three Layers Of Community Tactics Learning",
      levelsSubtitle: "Describe one point, review one rally, then turn it into a training plan.",
      inDevelopment: "Feature in development",
      openBoard: "Open V1 Tactics Board",
      levels: [
        {
          title: "Describe One Point",
          englishTitle: "Point Description",
          summary: "Use route, placement, spin, and positioning to explain a specific problem.",
          detail:
            "The first layer is expression. Players can organize serve, receive, third-ball, or rally problems into clear tactical descriptions so coaches and community members can respond well.",
          tags: ["MVP", "Low Complexity", "Tactics Description"],
        },
        {
          title: "Review One Rally",
          englishTitle: "Rally Review",
          summary: "Put several shots together and check choices, rhythm, and connection.",
          detail:
            "The second layer focuses on continuity. By reviewing a rally, players can see how one shot shapes the next and understand why a route or placement was chosen.",
          tags: ["Training Review", "Medium Complexity", "Rally Flow"],
        },
        {
          title: "Build A Training Plan",
          englishTitle: "Training Plan",
          summary: "Turn discussed problems into repeatable training themes.",
          detail:
            "The third layer turns community discussion into training assets. Later, personal records and data can help players track issues, reuse tactics cards, and keep improving.",
          tags: ["Future Plan", "Community Asset", "Training Plan"],
        },
      ],
      previewEyebrow: "Tactical Presets",
      previewComingSoon: "Tactics Preview Coming Soon",
      previewDescription: "Future space for richer tactics cards or a 3D table view.",
      presets: ["Serve + Attack", "Forehand Cross", "Backhand Line", "Sidespin Serve"],
    },
    about: {
      eyebrow: "Bujueyi Table Tennis Club",
      title: "About",
      body:
        "Bujueyi is a table tennis club for adults in Tokyo. Whether you are new to the sport or already have match experience, you are welcome if you want to train seriously, meet players, and enjoy table tennis together.",
      highlights: [
        "Weekly training: we plan to meet every Wednesday for drills, rallies, match play, and shared practice time.",
        "Regular tournaments: the club will join events together, making it easier to find partners, form teams, and review matches afterward.",
        "Open to everyone: all levels and backgrounds are welcome, from returning players to people looking for their first table tennis circle.",
        "Community matters: we also hold nomikai and casual meetups. It is a place to make friends, meet new people, and maybe find someone who fits your rhythm.",
      ],
      mascotTitle: "Bujueyi IP",
      mascotDescription: "A relaxed but grown-up pig IP represents an open club culture and the wish to improve together.",
      missionTitle: "Club Mission",
      mission:
        "Polish the fundamentals with a calm mind, and become first-class before you notice.",
      locationMapLabel: "Training venue map for Bujueyi: Minato City Sports Center near Tamachi Station and Mita Station.",
      locationBadge: "Training Venue",
      locationEyebrow: "Location",
      locationTitle: "Minato City Sports Center",
      locationAddress:
        "Minato City Sports Center, Minato Park Shibaura 3F-8F, 1-16-1 Shibaura, Minato-ku, Tokyo 105-0023",
      nearestStationTitle: "Nearest Station",
      nearestStationBody: "JR Yamanote Line, Tamachi Station East Exit, 5 min walk",
      subwayAccessTitle: "Subway Access",
      subwayAccessBody: "Toei Subway, Mita Station A6 Exit, 6 min walk",
      mapWalkFive: "walk 5 min",
      mapWalkSix: "walk 6 min",
      mapSchematic: "schematic map",
      mapRailLegend: "rail",
      mapWalkLegend: "walk",
      mapVenueLegend: "venue",
      tournamentEyebrow: "Tournament Record",
      tournamentTitle: "Regular Tournament Record",
      tournamentDescription: "Match bibs from regular tournament days",
      bibLabel: "Bib",
    },
    footer: {
      line: "© 2026 Bujueyi by PingPig Lab. Built for table tennis players.",
      links: "Tactics · Community · Training",
    },
  },
} as const;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof copy)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null | undefined): value is Language {
  return value === "zh" || value === "ja" || value === "en";
}

function getCookieLanguage() {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("pingpig-language="));

  return match?.split("=")[1] ?? null;
}

function getSavedLanguage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = window.localStorage.getItem("pingpig-language");
    if (isLanguage(saved)) {
      return saved;
    }
  } catch {
    // Some embedded browser contexts can block localStorage.
  }

  const cookieLanguage = getCookieLanguage();
  return isLanguage(cookieLanguage) ? cookieLanguage : null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("zh");

  useEffect(() => {
    const saved = getSavedLanguage();
    if (saved) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);

    try {
      window.localStorage.setItem("pingpig-language", nextLanguage);
    } catch {
      // Cookie fallback keeps language stable across route changes.
    }

    document.cookie = `pingpig-language=${nextLanguage}; path=/; max-age=31536000`;
  };

  const value = useMemo(
    () => ({ language, setLanguage, t: copy[language] }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
