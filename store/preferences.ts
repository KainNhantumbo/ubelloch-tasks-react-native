import type { AppPreferences } from "@/@types/preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState: AppPreferences = {
  ui: {
    theme: "system",
    enableDarkMode: false,
    enableNotifications: true,
    language: "en"
  },
  editor: {
    fontSize: 14,
    fontFamily: "system",
    enableAutoSave: true
  },
  user: {
    id: "",
    email: "",
    name: "",
    avatar: "",
    hasCompletedOnboarding: false
  },
  auth: {
    token: ""
  }
};

interface PreferencesState {
  preferences: AppPreferences;
  setPreferences: (prefs: Partial<AppPreferences>) => void;
  resetPreferences: () => void;
}

export const useAppPreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      preferences: initialState,

      setPreferences: (prefs) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...prefs,
            ui: { ...state.preferences.ui, ...prefs.ui },
            editor: { ...state.preferences.editor, ...prefs.editor },
            user: { ...state.preferences.user, ...prefs.user },
            auth: { ...state.preferences.auth, ...prefs.auth }
          }
        }));
      },

      resetPreferences: () => {
        set({ preferences: initialState });
      }
    }),
    {
      name: "app-preferences",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
