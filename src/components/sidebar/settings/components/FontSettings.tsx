import { Select, SelectItem, Slider, Card, CardBody, CardHeader } from "@heroui/react";
import { FontSettingsProps } from "../../../../types";

const FONT_FAMILIES = [
  { key: "monospace", label: "monospace", value: "monospace" },
  { key: "fira-code", label: "fira code", value: "'Fira Code', monospace" },
  { key: "source-code-pro", label: "source code pro", value: "'Source Code Pro', monospace" },
  { key: "cascadia-code", label: "cascadia code", value: "'Cascadia Code', monospace" },
  { key: "consolas", label: "consolas", value: "Consolas, monospace" },
  { key: "inconsolata", label: "inconsolata", value: "Inconsolata, monospace" },
  { key: "roboto-mono", label: "roboto mono", value: "'Roboto Mono', monospace" },
  { key: "jetbrains-mono", label: "jetbrains mono", value: "'JetBrains Mono', monospace" },
  
  { key: "sans-serif", label: "sans-serif", value: "sans-serif" },
  { key: "system-ui", label: "system ui", value: "system-ui, sans-serif" },
  { key: "inter", label: "inter", value: "Inter, sans-serif" },
  { key: "roboto", label: "roboto", value: "Roboto, sans-serif" },
  { key: "open-sans", label: "open sans", value: "'Open Sans', sans-serif" },
  
  { key: "serif", label: "serif", value: "serif" },
  { key: "georgia", label: "georgia", value: "Georgia, serif" },
  { key: "times", label: "times", value: "'Times New Roman', serif" },
];

export default function FontSettings({ 
  title, 
  config,
  onConfigChange
}: FontSettingsProps) {
  return (
    <Card radius="none" shadow="sm">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </CardHeader>
      <CardBody className="pt-0 space-y-4">
        <div>
          <label className="text-xs text-foreground-600 mb-2 block">font family</label>
          <Select
            size="sm"
            selectedKeys={[FONT_FAMILIES.find(f => f.value === config.fontFamily)?.key || "system-ui"]}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;
              const family = FONT_FAMILIES.find(f => f.key === key);
              if (family) {
                onConfigChange({ fontFamily: family.value });
              }
            }}
            radius="none"
          >
            {FONT_FAMILIES.map((font) => (
              <SelectItem key={font.key}>
                {font.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <label className="text-xs text-foreground-600 mb-2 block">
            font size: {config.fontSize}px
          </label>
          <Slider
            size="sm"
            step={1}
            minValue={12}
            maxValue={24}
            value={config.fontSize}
            onChange={(value) => onConfigChange({ fontSize: value as number })}
            className="max-w-md"
            radius="none"
          />
        </div>

        <div>
          <label className="text-xs text-foreground-600 mb-2 block">
            line height: {config.lineHeight}
          </label>
          <Slider
            size="sm"
            step={0.1}
            minValue={1.0}
            maxValue={2.5}
            value={config.lineHeight}
            onChange={(value) => onConfigChange({ lineHeight: value as number })}
            className="max-w-md"
            radius="none"
          />
        </div>
      </CardBody>
    </Card>
  );
}