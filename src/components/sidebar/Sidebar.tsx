import { Tabs, Tab, Button, Input, Divider } from "@heroui/react";
import type { SidebarProps } from "../../types";

export default function Sidebar({ activeKey, onChange, onNewNote }: SidebarProps) {
  return (
    <aside className="h-screen border-r border-default-200 p-3 overflow-y-auto bg-content1">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-success-400" />
        <span className="font-semibold">NoteLab</span>
      </div>
      <Tabs
        selectedKey={activeKey}
        onSelectionChange={(k) => onChange(String(k))}
        aria-label="Sidebar tabs"
        variant="underlined"
        className="w-full"
      >
        <Tab key="notes" title="Notes">
          <div className="flex flex-col gap-2 mt-2">
            <Button size="sm" color="primary" onPress={onNewNote}>new note</Button>
            <Input size="sm" placeholder="Search notes..." />
            <Divider className="my-1" />
            <div className="text-tiny text-foreground-500">no folders opened</div>
          </div>
        </Tab>
        <Tab key="settings" title="Settings">
          <div className="text-sm text-foreground-500 mt-2">coming soon</div>
        </Tab>
      </Tabs>
    </aside>
  );
}
