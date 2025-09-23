import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

import { Sun, Moon } from "lucide-react";

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(mode: "light" | "dark") {
  const root = document.documentElement;
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem("notelab:theme") as "light" | "dark" | null);
    const initial = saved ?? (getSystemPrefersDark() ? "dark" : "light");
    setMode(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    applyTheme(mode);
    localStorage.setItem("notelab:theme", mode);
  }, [mode]);

  return (
    <Button
      size="sm"
      variant="light"
      onPress={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
      aria-label="Toggle theme"
      radius="none"
      isIconOnly
    >
      {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
