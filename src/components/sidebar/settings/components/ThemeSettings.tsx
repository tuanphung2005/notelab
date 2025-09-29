import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Sun, Moon, Monitor } from "lucide-react";
import { AppConfig } from "../../../../types";

interface ThemeSettingsProps {
  currentTheme: AppConfig['theme'];
  onThemeChange: (theme: AppConfig['theme']) => void;
}

const applyTheme = (theme: AppConfig['theme']) => {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  } else {
    root.classList.remove('light', 'dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }
};

export default function ThemeSettings({ currentTheme, onThemeChange }: ThemeSettingsProps) {
  const handleThemeChange = (theme: AppConfig['theme']) => {
    onThemeChange(theme);
    applyTheme(theme);
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