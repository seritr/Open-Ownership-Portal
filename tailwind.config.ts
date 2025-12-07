// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',           // ← App Router
    './pages/**/*.{js,ts,jsx,tsx}',          // ← Pages Router (if you have it)
    './components/**/*.{js,ts,jsx,tsx}',     // ← All your components
    './src/**/*.{js,ts,jsx,tsx}',            // ← If you use src/ folder
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;