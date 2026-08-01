import type { Language } from "@/components/LanguageProvider";
import type { ForumPost } from "@/components/ForumPostCard";

export const categories: Record<Language, string[]> = {
  zh: ["技术讨论", "战术分析", "器材讨论", "训练日记", "比赛复盘"],
  ja: ["技術相談", "戦術分析", "用具相談", "練習日記", "試合の振り返り"],
  en: ["Technique", "Tactics", "Gear", "Training Log", "Match Review"],
};

export const forumPosts: Record<Language, ForumPost[]> = {
  zh: [
    {
      title: "反手拧拉之后，下一板如何衔接正手抢攻？",
      category: "技术讨论",
      replies: 18,
      views: 326,
      time: "2 小时前",
    },
  ],
  ja: [
    {
      title: "バックハンドチキータの後、次球をフォア攻撃につなげるには？",
      category: "技術相談",
      replies: 18,
      views: 326,
      time: "2時間前",
    },
  ],
  en: [
    {
      title: "After a backhand flick, how do I connect into a forehand attack?",
      category: "Technique",
      replies: 18,
      views: 326,
      time: "2 hours ago",
    },
  ],
};
