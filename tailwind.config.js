import typography from "@tailwindcss/typography";

export default {
  content: [
    "./**/*.njk",
    "./**/*.html",
    "./**/*.md"
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
