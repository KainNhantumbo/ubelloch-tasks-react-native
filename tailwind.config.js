/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {}
  },
  plugins: []
};
