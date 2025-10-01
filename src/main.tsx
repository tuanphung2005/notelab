import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { ConfigProvider } from "./contexts/ConfigContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ConfigProvider>
        <App />
        <ToastProvider />
      </ConfigProvider>
    </HeroUIProvider>
  </React.StrictMode>,
);

if (typeof window !== "undefined") {
  window.addEventListener(
    "contextmenu",
    (e: MouseEvent) => {
      let node = e.target as HTMLElement | null;
      while (node) {
        if (node.dataset && node.dataset.allowContextMenu === "true") return;
        node = node.parentElement;
      }
      e.preventDefault();
    },
    { capture: true },
  );
}

export function ContextMenuAllow({ children }: { children: React.ReactNode }) {
  return (
    <div data-allow-context-menu="true">{children}</div>
  );
}