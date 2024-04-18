/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans-kr": ["Noto Sans KR", "sans-serif"],
        "jua": ["Jua", "sans-serif"],
        "do-hyeon": ["Do Hyeon", "sans-serif"],
      }
    },
  },
  plugins: [],
}

