/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "darkest-green": "#143601",
        // "darker-green": "#1A4301",
        // "dark-green": "#245501",
        // "light-green": "#538D22",
        // "lighter-green": "#73A942",
        // "lightest-green": "#AAD576",
        // "black": "#040B01",
        // "light-black": "#242A21",
        // "dark-grey": "#62675F",
        // "grey": "#81857E",
        // "light-grey": "#BFC2BD",
        // "lighter-grey": "#DEE0DC",
        // "dark-white": "#EEEFEC",
        // "white": "#FDFEFB",
      },
      fontFamily: {
        // Poppins: ["Poppins", "sans-serif"],
        // Inter: ["Inter", "sans-serif"],
      },
      listStyleImage: {
        checkmark: 'url("/img/checkmark.png")',
      },
    },
  },
  plugins: [],
};

