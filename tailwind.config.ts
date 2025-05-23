import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        baumans: ['Baumans', 'sans-serif'],
        bowlby: ['Bowlby One Sc', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config;
