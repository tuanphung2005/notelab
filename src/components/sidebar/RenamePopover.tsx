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

  const handleStartRename = () => {
    setIsRenaming(true);
    setNewFileName(fileName.replace('.md', ''));
  };

  const handleFinishRename = () => {
    if (newFileName.trim()) {
      onRename(fileName, newFileName.trim());
    }
    setIsRenaming(false);
    setNewFileName("");
    setIsOpen(false);
  };

  const handleCancelRename = () => {
    setIsRenaming(false);
    setNewFileName("");
  };

  const handlePopoverChange = (open: boolean) => {
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
    >
      <Cog size={20} />
    </Button>
  );

  return (
    <Popover isOpen={isOpen} onOpenChange={handlePopoverChange}>
      <PopoverTrigger>
        {triggerComponent || defaultTrigger}
      </PopoverTrigger>
      <PopoverContent>
        {!isRenaming ? (
          <div className="flex flex-col gap-1 p-1">
            <Button
              size="sm"
              variant="light"
              onPress={handleStartRename}
              className="justify-start"
            >
              <Pencil size={14} />
              rename
            </Button>
            <Button
              size="sm"
              variant="light"
              onPress={handleDeleteClick}
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
  );
}