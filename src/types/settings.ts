import type { AppConfig, EditorConfig, PreviewConfig } from './config';

export interface ThemeSettingsProps {
  currentTheme: AppConfig['theme'];
  onThemeChange: (theme: AppConfig['theme']) => void;
}

export interface FontSettingsProps {
  title: string;
  config: EditorConfig | PreviewConfig;
  onConfigChange: (updates: Partial<EditorConfig | PreviewConfig>) => void;
  fontSizeRange: { min: number; max: number };
  defaultFont: string;
}