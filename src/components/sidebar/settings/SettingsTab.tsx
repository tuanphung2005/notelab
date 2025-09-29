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
        title="editor"
        config={config.editor}
        onConfigChange={(updates) => updateConfig({ editor: { ...config.editor, ...updates } })}
        fontSizeRange={{ min: 10, max: 20 }}
        defaultFont="monospace"
      />
      
      <FontSettings
        title="preview"
        config={config.preview}
        onConfigChange={(updates) => updateConfig({ preview: { ...config.preview, ...updates } })}
        fontSizeRange={{ min: 12, max: 24 }}
        defaultFont="sans-serif"
      />
    </div>
  );
}