/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue,svelte,html}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Space Grotesk', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  