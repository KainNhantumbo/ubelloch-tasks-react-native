export interface AppPreferences {
  ui: {
    theme: string;
    enableDarkMode: boolean;
    enableNotifications: boolean;
    language: string;
  };
  editor: {
    fontSize: number;
    fontFamily: string;
    enableAutoSave: boolean;
  };
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
  auth: {
    token: string;
  };
}
