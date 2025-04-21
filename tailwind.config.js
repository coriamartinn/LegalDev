/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue,svelte,html}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Monserrat', 'sans-serif'],       // para textos y navegación
          title: ['Monserrat', 'sans-serif'],     // para títulos
        },
      },
    },
    plugins: [],
  }
  