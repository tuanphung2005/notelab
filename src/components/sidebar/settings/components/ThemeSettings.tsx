import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { AppConfig, ThemeSettingsProps } from "../../../../types";

export default function ThemeSettings({ currentTheme, onThemeChange }: ThemeSettingsProps) {
  const handleThemeChange = (theme: AppConfig['theme']) => {
    onThemeChange(theme);
  };

  return (
    <Card radius="none" shadow="sm">
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium">appearance</h3>
      </CardHeader>
      <CardBody className="pt-0">
        <div className="flex gap-2">
          {[
            { key: 'light', icon: Sun, label: 'light' },
            { key: 'dark', icon: Moon, label: 'dark' },
            { key: 'system', icon: Monitor, label: 'system' }
          ].map(({ key, icon: Icon, label }) => (
            <Button
              key={key}
              size="sm"
              variant={currentTheme === key ? 'solid' : 'bordered'}
              color={currentTheme === key ? 'primary' : 'default'}
              onPress={() => handleThemeChange(key as AppConfig['theme'])}
              className="flex-1"
              radius="none"
            >
              <Icon size={16} />
              {label}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}