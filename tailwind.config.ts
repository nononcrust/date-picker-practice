import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-light": colors.blue[50],
        primary: colors.blue[500],
        "primary-dark": colors.blue[600],
        disabled: colors.gray[300],
        hover: colors.gray[100],
        main: colors.gray[700],
        sub: colors.gray[500],
        error: colors.red[500],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
