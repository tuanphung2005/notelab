import type { AppConfig, FontConfig } from './config';

export interface ThemeSettingsProps {
  currentTheme: AppConfig['theme'];
  onThemeChange: (theme: AppConfig['theme']) => void;
}

export interface FontSettingsProps {
  title: string;
  config: FontConfig;
  onConfigChange: (updates: Partial<FontConfig>) => void;
}