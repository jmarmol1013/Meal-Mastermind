import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#263973",
        "secondary": "#05C7F2",
        "third": "#6B7FF2",
        "fourth": "#445EF2",
        "fifth": "#010E26"
      },
    },
  },
  plugins: [],
};
export default config;
