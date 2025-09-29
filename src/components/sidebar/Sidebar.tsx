import { Tabs, Tab } from "@heroui/react";
import SidebarHeader from "./SidebarHeader";
import NotesTab from "./notes";
import SettingsTab from "./settings";
import type { SidebarProps } from "../../types";

export default function Sidebar({ 
  activeKey, 
  onChange, 
  onNewNote, 
  vaultPath, 
  vaultFiles = [], 
  onOpenFile,
  onRenameFile,
  onDeleteFile,
  canCreate,
  currentFile
}: SidebarProps) {
  return (
    <aside className="h-screen border-r border-default-200 p-3 overflow-y-auto bg-content1">
      <SidebarHeader vaultPath={vaultPath} />
      <Tabs
        selectedKey={activeKey}
        onSelectionChange={(k) => onChange(String(k))}
        variant="underlined"
        className="w-full"
      >
        <Tab key="notes" title="Notes">
          <NotesTab
            onNewNote={onNewNote}
            canCreate={canCreate}
            vaultPath={vaultPath}
            vaultFiles={vaultFiles}
            currentFile={currentFile}
            onOpenFile={onOpenFile}
            onRenameFile={onRenameFile}
            onDeleteFile={onDeleteFile}
          />
        </Tab>
        <Tab key="settings" title="Settings">
          <SettingsTab />
        </Tab>
      </Tabs>
    </aside>
  );
}
