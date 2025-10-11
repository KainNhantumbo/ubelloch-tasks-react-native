import { PaletteColorScheme } from "@/types/theme";
import { clsx, type ClassValue } from "clsx";
import { Appearance } from "react-native";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEffectiveTheme(
  mode: "strict" | "system",
  theme: "light" | "dark"
): "light" | "dark" {
  if (mode === "system") {
    const systemColorScheme = Appearance.getColorScheme();
    return systemColorScheme === "dark" ? "dark" : "light";
  }
  return theme;
}

export function getPalette(paletteKey: keyof typeof PaletteColorScheme) {
  return PaletteColorScheme[paletteKey];
}
