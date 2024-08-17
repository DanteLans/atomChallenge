/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      theme: {
        fontFamily: {
          sans: ['"Poppins", sans-serif',],
        },
        colors: {
          'title': '#000000;',
        },
        backgroundImage: {
          'add': "url('./src/assets/add.svg')",
          'clip': "url('./src/assets/clip.svg')",
          'comments': "url('./src/assets/comments.svg')",
          'like': "url('./src/assets/like.svg')"
        }
      },
    },
  },
  plugins: [],
}