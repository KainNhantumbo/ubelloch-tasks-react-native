/** @type {import('tailwindcss').Config} */

const config = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : "class",
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./components/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./utils/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./*.{html,js,jsx,ts,tsx,mdx}",
    "./src/**/*.{html,js,jsx,ts,tsx,mdx}"
  ],
  presets: [require("nativewind/preset")],
  important: "html",
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-plus-jakarta-sans)"],
        roboto: ["var(--font-roboto)"],
        inter: ["var(--font-inter)"],
        // Fredoka font family
        sans: ["AlbertSans-Regular", "system-ui"],
        fredoka: {
          bold: "Fredoka-Bold",
          light: "Fredoka-Light",
          medium: "Fredoka-Medium",
          regular: "Fredoka-Regular",
          semibold: "Fredoka-SemiBold"
        },
        // Albert Sans font family
        albert: {
          regular: "AlbertSans-Regular",
          italic: "AlbertSans-Italic",
          medium: "AlbertSans-Medium",
          mediumItalic: "AlbertSans-MediumItalic",
          semibold: "AlbertSans-SemiBold",
          semiboldItalic: "AlbertSans-SemiBoldItalic",
          bold: "AlbertSans-Bold",
          boldItalic: "AlbertSans-BoldItalic",
          extrabold: "AlbertSans-ExtraBold",
          extraboldItalic: "AlbertSans-ExtraBoldItalic"
        }
      }
    }
  },
  plugins: []
};

module.exports = config;
