import { Button, Input, Divider, Tabs, Tab, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useState } from "react";
import type { NotesTabProps } from "../../types";
import { Cog, Pencil, Trash2, Check } from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModal";

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
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [renamingFile, setRenamingFile] = useState("");
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  const handleStartRename = (filename: string) => {
    setIsRenaming(true);
    setRenamingFile(filename);
    setNewFileName(filename.replace('.md', ''));
  };

  const handleFinishRename = () => {
    if (newFileName.trim() && renamingFile) {
      onRenameFile?.(renamingFile, newFileName.trim());
    }
    setIsRenaming(false);
    setNewFileName("");
    setRenamingFile("");
  };

  const handleCancelRename = () => {
    setIsRenaming(false);
    setNewFileName("");
    setRenamingFile("");
  };

  const handlePopoverChange = (isOpen: boolean) => {
    if (!isOpen && isRenaming) {
      setIsRenaming(false);
      setNewFileName("");
      setRenamingFile("");
    }
  };

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
            variant="light"
            className="w-full"
            classNames={{
              tabList: "w-full",
              tabContent: "w-full flex px-3 py-2"
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
                      <Popover onOpenChange={handlePopoverChange}>
                        <PopoverTrigger>
                          <Button
                            size="sm"
                            variant="light"
                            isIconOnly
                            className="ml-2 opacity-70 hover:opacity-100"
                          >
                            <Cog size={14} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          {!isRenaming || renamingFile !== file.name ? (
                            <div className="flex flex-col gap-1 p-1">
                              <Button
                                size="sm"
                                variant="light"
                                onPress={() => handleStartRename(file.name)}
                                className="justify-start"
                              >
                                <Pencil size={14} />
                                rename
                              </Button>
                              <Button
                                size="sm"
                                variant="light"
                                onPress={() => handleDeleteClick(file.name)}
                                className="justify-start text-danger"
                              >
                                <Trash2 size={14} />
                                delete
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2 p-1">
                              <Input
                                size="sm"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleFinishRename();
                                  } else if (e.key === 'Escape') {
                                    handleCancelRename();
                                  }
                                }}
                                placeholder="enter new name"
                                autoFocus
                              />
                              <Button
                                size="sm"
                                color="primary"
                                onPress={handleFinishRename}
                                isDisabled={!newFileName.trim()}
                                isIconOnly
                              >
                                <Check size={16} />
                              </Button>
                            </div>
                          )}
                        </PopoverContent>
                      </Popover>
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