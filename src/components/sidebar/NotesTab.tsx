import { Button, Input, Divider } from "@heroui/react";
import FileItem from "./FileItem";
import type { NotesTabProps } from "../../types";

export default function NotesTab({
  onNewNote,
  canCreate = false,
  vaultPath = "",
  vaultFiles = [],
  currentFile = "",
  onOpenFile,
  onRenameFile
}: NotesTabProps) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <Button 
        size="sm" 
        color="primary" 
        onPress={() => {
          console.log("New note button clicked", { vaultPath, canCreate });
          onNewNote?.();
        }} 
        isDisabled={!canCreate}
        radius="none"
      >
        new note {!canCreate ? "(disabled)" : ""}
      </Button>
      <Input size="sm" placeholder="Search notes..." radius="none"/>
      <Divider className="my-1" />
      {vaultPath && (
        <div className="text-tiny text-foreground-500 break-all mb-2">vault: {vaultPath}</div>
      )}
      {vaultFiles && vaultFiles.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <div className="text-tiny text-foreground-400">Files ({vaultFiles.length}):</div>
          {vaultFiles.map((f) => (
            <FileItem
              key={f.name}
              file={f}
              isActive={currentFile === f.name}
              onOpenFile={onOpenFile || (() => {})}
              onRenameFile={onRenameFile || (() => {})}
            />
          ))}
        </div>
      )}
      {(!vaultFiles || vaultFiles.length === 0) && vaultPath && (
        <div className="text-tiny text-foreground-500 italic">
          no notes found
        </div>
      )}
    </div>
  );
}