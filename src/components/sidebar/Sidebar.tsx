import { Tabs, Tab, Button, Input, Divider, Chip } from "@heroui/react";
import ThemeToggle from "../theme/ThemeToggle";
import type { SidebarProps } from "../../types";

export default function Sidebar({ 
  activeKey, 
  onChange, 
  onNewNote, 
  vaultPath, 
  vaultFiles = [], 
  onOpenFile,
  canCreate,
  currentFile
}: SidebarProps) {
  return (
    <aside className="h-screen border-r border-default-200 p-3 overflow-y-auto bg-content1">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="font-semibold flex items-center gap-2">
          NoteLab
          <Chip size="sm" variant="flat" color={vaultPath ? "success" : "warning"}>
            {vaultPath ? "vault ready" : "no vault"}
          </Chip>
        </span>
        <ThemeToggle />
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
            <Button 
              size="sm" 
              color="primary" 
              onPress={() => {
                console.log("New note button clicked", { vaultPath, canCreate });
                onNewNote?.();
              }} 
              isDisabled={!canCreate}
            >
              new note {!canCreate ? "(disabled)" : ""}
            </Button>
            <Input size="sm" placeholder="Search notes..." />
            <Divider className="my-1" />
            {vaultPath && (
              <div className="text-tiny text-foreground-500 break-all mb-2">vault: {vaultPath}</div>
            )}
            {vaultFiles && vaultFiles.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                <div className="text-tiny text-foreground-400">Files ({vaultFiles.length}):</div>
                {vaultFiles.map((f) => (
                  <button
                    key={f.name}
                    className={`text-left text-small truncate px-2 py-1 rounded hover:bg-default-100 ${
                      currentFile === f.name ? 'bg-primary-50 text-primary' : ''
                    }`}
                    title={f.path}
                    onClick={() => {
                      console.log("Clicked file:", f);
                      onOpenFile?.(f.name);
                    }}
                  >
                    {f.name.replace('.md', '')}
                  </button>
                ))}
              </div>
            )}
            {(!vaultFiles || vaultFiles.length === 0) && vaultPath && (
              <div className="text-tiny text-foreground-500 italic">
                no notes found
              </div>
            )}
          </div>
        </Tab>
        <Tab key="settings" title="Settings">
          <div className="text-sm text-foreground-500 mt-2">coming soon</div>
        </Tab>
      </Tabs>
    </aside>
  );
}
