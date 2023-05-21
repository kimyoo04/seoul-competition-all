/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        main_color: "#2F80ED",
        sub_color: "#96d0f2",
        back_color: "#c2d1ff",

        gray_1: "#303030",
        gray_2: "#808080",
        gray_3: "#BDBDBD",
        gray_4: "#EEEEEE",

        bg_1: "#FBFBFB",

        font_black: "#101010",
        font_white: "#ffffff",
        font_gray: "#808080",

        alert_success: "#219653",
        alert_warning: "#F2C94C",
        alert_danger: "#EB5757",
        alert_info: "#2F80ED",
      },
      fontFamily: {
        base: "IBM Plex Sans KR, system-ui, sans-serif",
      },
      fontSize: {
        h1: "68px",
        h2: "42px",
        h3: "26px",
        h4: "20px",
        medium: "16px",
        small: "14px",
      },
      maxWidth: {
        container: "1080px",
      },
      minWidth: {
        sidebar: "320px",
      },
    },
  },
  plugins: [],
};
