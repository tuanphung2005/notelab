import { Button, Input, Popover, PopoverTrigger, PopoverContent, useDisclosure } from "@heroui/react";
import { useState } from "react";
import type { FileItemProps } from "../../types";
import DeleteConfirmModal from "./DeleteConfirmModal";

import { Pencil, Check, Trash2, Cog } from "lucide-react";

export default function FileItem({ 
  file, 
  isActive, 
  onOpenFile, 
  onRenameFile,
  onDeleteFile
}: FileItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newFileName, setNewFileName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  const handleFinishRename = (originalFilename: string) => {
    if (newFileName.trim()) {
      onRenameFile?.(originalFilename, newFileName.trim());
    }
    setNewFileName("");
    setIsRenaming(false);
  };

  // track state
  const handleCancelRename = () => {
    setNewFileName("");
    setIsRenaming(false);
  };
  const handleStartRename = () => {
    setIsRenaming(true);
    setNewFileName(file.name.replace('.md', ''));
  };



  const handleDelete = () => {
    onOpen();
  };

  const confirmDelete = () => {
    onDeleteFile?.(file.name);
    onClose();
  };

  // popover handler
  const handlePopoverChange = (isOpen: boolean) => {
    if (!isOpen && isRenaming) {
      setIsRenaming(false);
      setNewFileName("");
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center gap-1">
        <Button
          className={`flex-1 text-small ${
            isActive ? 'bg-primary-50 text-primary' : ''
          }`}
          title={file.path}
          variant="light"
          size="sm"
          radius="none"
          onPress={() => {
            onOpenFile?.(file.name);
          }}
        >
          {file.name.replace('.md', '')}
        </Button>
        
        {isActive && (
          <Popover radius="none" onOpenChange={handlePopoverChange}>
            <PopoverTrigger>
              <Button
                size="sm"
                variant="light"
                className="min-w-unit-8 transition-opacity"
                radius="none"
                isIconOnly
              >
                <Cog size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="">
              {!isRenaming ? (
                <div className="flex flex-col gap-1 p-1">
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleStartRename}
                    radius="none"
                    className="justify-start"
                  >
                    <Pencil size={14} />
                    rename
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleDelete}
                    radius="none"
                    className="justify-start text-danger"
                  >
                    <Trash2 size={14} />
                    delete
                  </Button>
                </div>
              ) : (
                <div className="flex flex-row gap-3 py-1">
                  <Input
                    size="sm"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleFinishRename(file.name);
                      } else if (e.key === 'Escape') {
                        handleCancelRename();
                      }
                    }}
                    placeholder="enter new name"
                    autoFocus
                    radius="none"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      color="primary"
                      onPress={() => handleFinishRename(file.name)}
                      isDisabled={!newFileName.trim()}
                      radius="none"
                      variant="light"
                      isIconOnly
                    >
                      <Check size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* del modal */}
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        fileName={file.name}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
}