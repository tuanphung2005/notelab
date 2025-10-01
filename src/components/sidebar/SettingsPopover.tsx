import { Button, Input, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useState } from "react";
import { Cog, Pencil, Trash2, Check } from "lucide-react";
import type { RenamePopoverProps } from "../../types";

export default function RenamePopover({ 
  fileName, 
  onRename, 
  onDelete, 
  triggerComponent 
}: RenamePopoverProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const startRename = () => {
    setIsRenaming(true);
    setNewFileName(fileName.replace('.md', ''));
  };

  const finishRename = () => {
    if (newFileName.trim()) {
      onRename(fileName, newFileName.trim());
    }
    setIsRenaming(false);
    setNewFileName("");
    setIsOpen(false);
  };

  const cancelRename = () => {
    setIsRenaming(false);
    setNewFileName("");
  };

  const onPopoverChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && isRenaming) {
      setIsRenaming(false);
      setNewFileName("");
    }
  };

  const handleDeleteClick = () => {
    onDelete(fileName);
    setIsOpen(false);
  };

  const defaultTrigger = (
    <Button
      size="sm"
      variant="light"
      isIconOnly
      className="ml-2 opacity-70 hover:opacity-100"
      radius="none"
    >
      <Cog size={20} />
    </Button>
  );

  return (
    <Popover isOpen={isOpen} onOpenChange={onPopoverChange} radius="none">
      <PopoverTrigger>
        {triggerComponent || defaultTrigger}
      </PopoverTrigger>
      <PopoverContent>
        {!isRenaming ? (
          <div className="flex flex-col gap-1 p-1">
            <Button
              size="sm"
              variant="light"
              onPress={startRename}
              className="justify-start"
              radius="none"
            >
              <Pencil size={14} />
              rename
            </Button>
            <Button
              size="sm"
              variant="light"
              onPress={handleDeleteClick}
              className="justify-start text-danger"
              radius="none"
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
                  finishRename();
                } else if (e.key === 'Escape') {
                  cancelRename();
                }
              }}
              placeholder="enter new name"
              autoFocus
              radius="none"
            />
            <Button
              size="sm"
              color="primary"
              onPress={finishRename}
              isDisabled={!newFileName.trim()}
              isIconOnly
              radius="none"
            >
              <Check size={16} />
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}