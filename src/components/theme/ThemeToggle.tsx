import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";
import { configService } from "../../services/configService";
import type { AppConfig } from "../../types";

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(mode: AppConfig['theme']) {
  const root = document.documentElement;
  root.classList.remove("dark");
  
  if (mode === "dark") {
    root.classList.add("dark");
  } else if (mode === "system") {
    const prefersDark = getSystemPrefersDark();
    if (prefersDark) {
      root.classList.add("dark");
    }
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<AppConfig['theme']>("system");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const config = await configService.loadConfig();
        setTheme(config.theme);
        applyTheme(config.theme);
      } catch (error) {
        console.error('Failed to load theme:', error);

        
        const systemTheme = getSystemPrefersDark() ? "dark" : "light";
        setTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };
    
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
    
    try {
      await configService.updateConfig({ theme: newTheme });
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <Button
      size="sm"
      variant="light"
      onPress={toggleTheme}
      radius="none"
      isIconOnly
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
