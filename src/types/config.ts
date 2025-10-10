export interface AppConfig {
  theme: "light" | "dark" | "system";
  font: FontConfig;
  showPreview: boolean;
  showEditor: boolean;
}

export interface FontConfig {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  theme: "system",
  font: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
  },
  showPreview: true,
  showEditor: true,
};