/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", "sans-serif"]
      },
      theme: [
        {
          dark: {
            primary: "#1eb854",
            "primary-focus": "#188c40",
            "primary-content": "#ffffff",
            secondary: "#20d55f",
            "secondary-focus": "#18aa4b",
            "secondary-content": "#ffffff",
            accent: "#d99330",
            "accent-focus": "#b57721",
            "accent-content": "#ffffff",
            neutral: "#110e0e",
            "neutral-focus": "#060404",
            "neutral-content": "#ffffff",
            "base-100": "#171212",
            "base-200": "#110e0e",
            "base-300": "#060404",
            "base-content": "#ffffff",
            info: "#66c7ff",
            success: "#87cf3a",
            warning: "#e1d460",
            error: "#ff6b6b"
          },
          light: {
            primary: "#66cc8a",
            "primary-focus": "#41be6d",
            "primary-content": "#f9fafb",
            secondary: "#377cfb",
            "secondary-focus": "#055bfa",
            "secondary-content": "#f9fafb",
            accent: "#ea5234",
            "accent-focus": "#d03516",
            "accent-content": "#f9fafb",
            neutral: "#333c4d",
            "neutral-focus": "#1f242e",
            "neutral-content": "#f9fafb",
            "base-100": "#ffffff",
            "base-200": "#f9fafb",
            "base-300": "#f0f0f0",
            "base-content": "#333c4d",
            info: "#1c92f2",
            success: "#009485",
            warning: "#ff9900",
            error: "#ff5724"
          }
        }
      ]
    }
  },
  plugins: []
};
