/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' for system preference
  theme: {
    extend: {},
  },
  plugins: ["daisyui"],
  daisyui: {
    themes: ["light", "dark"], // або інші теми які вам потрібні
    darkTheme: "dark", // назва темної теми
    base: true, // застосовувати базові стилі
    styled: true, // застосовувати стилі компонентів
    utils: true, // додавати утилітарні класи
  },
};
