import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        court: {
          blue: "#0B5FFF",
          navy: "#0A1F44",
          ice: "#EAF3FF",
          line: "#C7D8F3",
        },
        pig: {
          pink: "#F9A8D4",
          light: "#FCE7F3",
        },
      },
      boxShadow: {
        soft: "0 18px 45px rgba(10, 31, 68, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
