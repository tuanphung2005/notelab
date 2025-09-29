export type SidebarKey = "notes" | "settings";

// file
export interface FileInfo {
  name: string;
  path: string;
}

// component
export interface SidebarProps {
  activeKey: SidebarKey | string;
  onChange: (key: SidebarKey | string) => void;
  onNewNote?: () => void;
  vaultPath?: string | null;
  vaultFiles?: FileInfo[];
  onOpenFile?: (filename: string) => void;
  onRenameFile?: (oldFilename: string, newFilename: string) => void;
  onDeleteFile?: (filename: string) => void;
  canCreate?: boolean;
  currentFile?: string;
}

export interface SidebarHeaderProps {
  vaultPath?: string | null;
}

export interface NotesTabProps {
  onNewNote?: () => void;
  canCreate?: boolean;
  vaultPath?: string | null;
  vaultFiles?: FileInfo[];
  currentFile?: string;
  onOpenFile?: (filename: string) => void;
  onRenameFile?: (oldFilename: string, newFilename: string) => void;
  onDeleteFile?: (filename: string) => void;
}

export interface FileItemProps {
  file: FileInfo;
  isActive: boolean;
  onOpenFile?: (filename: string) => void;
  onRenameFile?: (oldFilename: string, newFilename: string) => void;
  onDeleteFile?: (filename: string) => void;
}

export interface EditorProps {
  value: string;
  onChange: (next: string) => void;
}

export interface MarkdownPreviewProps {
  value: string;
}

export interface StatusBarProps {
  sidebar?: string;
  notes?: string;
  wordCount?: number;
  lineCount?: number;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  onConfirm: () => void;
}

export interface RenamePopoverProps {
  fileName: string;
  onRename: (oldName: string, newName: string) => void;
  onDelete: (fileName: string) => void;
  triggerComponent?: React.ReactNode;
}
