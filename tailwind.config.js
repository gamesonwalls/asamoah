module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "2000px",
      },
    },
    colors: {
      cyan: {
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
      },
    },

    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  variants: {
    backgroundColor: ["hover", "focus"],
    color: ["hover", "focus", "active"],

    extend: {
      transitionProperty: ["hover", "focus"],
    },
  },
  plugins: [
    // require('tailwind-scrollbar-hide'),
    // require('@tailwindcss/line-clamp'),
    require("flowbite/plugin"),
  ],
  content: ["./node_modules/flowbite/**/*.js"],
};
