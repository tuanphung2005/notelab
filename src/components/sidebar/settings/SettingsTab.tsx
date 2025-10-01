import { useConfig } from "../../../contexts/ConfigContext";
import { ThemeSettings, FontSettings } from "./components";

export default function SettingsTab() {
  const { config, updateConfig } = useConfig();

  if (!config) {
    return <div className="text-sm text-foreground-500 mt-2">loading settings...</div>;
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <ThemeSettings 
        currentTheme={config.theme}
        onThemeChange={(theme) => updateConfig({ theme })}
      />
      
      <FontSettings
        title="font settings"
        config={config.font}
        onConfigChange={(updates) => updateConfig({ font: { ...config.font, ...updates } })}
      />
    </div>
  );
}