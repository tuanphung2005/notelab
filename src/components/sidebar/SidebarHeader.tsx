import { Chip } from "@heroui/react";
import ThemeToggle from "../theme/ThemeToggle";
import type { SidebarHeaderProps } from "../../types";

export default function SidebarHeader({ vaultPath }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <span className="font-semibold flex items-center gap-2">
        notelab
        <Chip size="sm" variant="flat" radius="none" color={vaultPath ? "success" : "warning"}>
          {vaultPath ? "vault ready" : "no vault"}
        </Chip>
      </span>
      <ThemeToggle />
    </div>
  );
}