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