import { Button, Input, Divider, Tabs, Tab } from "@heroui/react";
import { useState } from "react";
import type { NotesTabProps } from "../../types";
import DeleteConfirmModal from "./DeleteConfirmModal";
import RenamePopover from "./RenamePopover";

export default function NotesTab({
  onNewNote,
  canCreate = false,
  vaultPath = "",
  vaultFiles = [],
  currentFile = "",
  onOpenFile,
  onRenameFile,
  onDeleteFile
}: NotesTabProps) {
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  const handleDeleteClick = (filename: string) => {
    setDeleteModal(filename);
  };

  const handleDeleteConfirm = () => {
    if (deleteModal) {
      onDeleteFile?.(deleteModal);
      setDeleteModal(null);
    }
  };

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
      <Input size="sm" placeholder="search notes..." radius="none"/>
      <Divider className="my-1" />
      {vaultPath && (
        <div className="text-tiny text-foreground-500 break-all mb-2">vault: {vaultPath}</div>
      )}
      {vaultFiles && vaultFiles.length > 0 && (
        <div className="mt-2 flex flex-col gap-1">
          <div className="text-tiny text-foreground-400">files ({vaultFiles.length}):</div>
          <Tabs
            selectedKey={currentFile}
            onSelectionChange={(key) => onOpenFile?.(String(key))}
            isVertical={true}
            variant="underlined"
            className="w-full"
            classNames={{
              tabList: "w-full",
              tabContent: "w-full flex py-2"
            }}
          >
            {vaultFiles.map((file) => (
              <Tab
                key={file.name}
                title={
                  <div className="w-full flex items-center justify-between">
                    <span className="text-small truncate">
                      {file.name.replace('.md', '')}
                    </span>
                    {currentFile === file.name && (
                      <RenamePopover
                        fileName={file.name}
                        onRename={(oldName, newName) => onRenameFile?.(oldName, newName)}
                        onDelete={handleDeleteClick}
                      />
                    )}
                  </div>
                }
              />
            ))}
          </Tabs>
        </div>
      )}
      {(!vaultFiles || vaultFiles.length === 0) && vaultPath && (
        <div className="text-tiny text-foreground-500 italic">
          no notes found
        </div>
      )}
      
      {deleteModal && (
        <DeleteConfirmModal
          isOpen={!!deleteModal}
          onClose={() => setDeleteModal(null)}
          fileName={deleteModal}
          onConfirmDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
}