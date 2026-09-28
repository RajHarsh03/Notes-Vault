/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'bg-deep': '#1a1a2e',
        'bg-surface': '#22223a',
        'bg-elevated': '#2a2a45',
      },
    },
  },
  plugins: [],
}
