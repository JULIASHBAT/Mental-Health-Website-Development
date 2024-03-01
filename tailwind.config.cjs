module.exports = {
  content: ["./*.{html,js,ts}"],
  darkMode: 'class', 
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio")
  ],
};
// vite.config.js
export default {
  server: {
    open: '/about.html', // Replace with the actual path of the page you want to open
  },
};

