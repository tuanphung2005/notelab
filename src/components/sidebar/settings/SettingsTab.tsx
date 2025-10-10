import { useConfig } from "../../../contexts/ConfigContext";
import { ThemeSettings, FontSettings, ViewSettings } from "./components";

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
      
      <ViewSettings
        showPreview={config.showPreview}
        showEditor={config.showEditor}
        onTogglePreview={(showPreview) => updateConfig({ showPreview })}
        onToggleEditor={(showEditor) => updateConfig({ showEditor })}
      />
      
      <FontSettings
        title="font settings"
        config={config.font}
        onConfigChange={(updates) => updateConfig({ font: { ...config.font, ...updates } })}
      />
    </div>
  );
}