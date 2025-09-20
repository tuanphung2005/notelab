import { Button, Input, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { useState } from "react";
import type { FileItemProps } from "../../types";

export default function FileItem({ 
  file, 
  isActive, 
  onOpenFile, 
  onRenameFile 
}: FileItemProps) {
  const [newFileName, setNewFileName] = useState("");

  const handleFinishRename = (originalFilename: string) => {
    if (newFileName.trim()) {
      onRenameFile?.(originalFilename, newFileName.trim());
    }
    setNewFileName("");
  };

  const handleCancelRename = () => {
    setNewFileName("");
  };

  return (
    <div className="relative group">
      <div className="flex items-center gap-1">
        <button
          className={`flex-1 text-left text-small truncate px-2 py-1 rounded hover:bg-default-100 ${
            isActive ? 'bg-primary-50 text-primary' : ''
          }`}
          title={file.path}
          onClick={() => {
            console.log("Clicked file:", file);
            onOpenFile?.(file.name);
          }}
        >
          {file.name.replace('.md', '')}
        </button>
        
        <Popover>
          <PopoverTrigger>
            <Button
              size="sm"
              variant="light"
              className="min-w-unit-8 transition-opacity"
              title="Rename file"
            >
              edit name
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-3">
            <div className="flex flex-col gap-2">
              <div className="text-small font-medium">Rename "{file.name.replace('.md', '')}"</div>
              <Input
                size="sm"
                defaultValue={file.name.replace('.md', '')}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFinishRename(file.name);
                  } else if (e.key === 'Escape') {
                    handleCancelRename();
                  }
                }}
                placeholder="Enter new name"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  color="primary"
                  onPress={() => handleFinishRename(file.name)}
                  isDisabled={!newFileName.trim()}
                >
                  Rename
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}