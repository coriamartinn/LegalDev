/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx,vue,svelte,html}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Nunito', 'sans-serif'],       // para textos y navegación
          title: ['Poppins', 'sans-serif'],     // para títulos
        },
      },
    },
    plugins: [],
  }
  