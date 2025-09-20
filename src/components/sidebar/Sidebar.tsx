import { Tabs, Tab } from "@heroui/react";
import SidebarHeader from "./SidebarHeader";
import NotesTab from "./NotesTab";
import type { SidebarProps } from "../../types";

export default function Sidebar({ 
  activeKey, 
  onChange, 
  onNewNote, 
  vaultPath, 
  vaultFiles = [], 
  onOpenFile,
  onRenameFile,
  canCreate,
  currentFile
}: SidebarProps) {
  return (
    <aside className="h-screen border-r border-default-200 p-3 overflow-y-auto bg-content1">
      <SidebarHeader vaultPath={vaultPath} />
      <Tabs
        selectedKey={activeKey}
        onSelectionChange={(k) => onChange(String(k))}
        aria-label="Sidebar tabs"
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
          />
        </Tab>
        <Tab key="settings" title="Settings">
          <div className="text-sm text-foreground-500 mt-2">coming soon</div>
        </Tab>
      </Tabs>
    </aside>
  );
}
