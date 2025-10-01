import { Chip } from "@heroui/react";
import type { SidebarHeaderProps } from "../../types";
import packageInfo from "../../../package.json";

export default function SidebarHeader({ vaultPath }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">notelab</span>
          <Chip color="secondary" size="sm" radius="none" variant="dot">v{packageInfo.version}</Chip>
          <Chip size="sm" variant="flat" radius="none" color={vaultPath ? "success" : "danger"}>
            {vaultPath ? "ready" : "no vault"}
          </Chip>
        </div>
        
      </div>
    </div>
  );
}