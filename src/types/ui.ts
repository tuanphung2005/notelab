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
}

export interface FileItemProps {
  file: FileInfo;
  isActive: boolean;
  onOpenFile?: (filename: string) => void;
  onRenameFile?: (oldFilename: string, newFilename: string) => void;
}

export interface EditorProps {
  value: string;
  onChange: (next: string) => void;
}

export interface MarkdownPreviewProps {
  value: string;
}

export interface StatusBarProps {
  sidebarStatus?: string;
  notesStatus?: string;
  editorWordCount?: number;
  editorLineCount?: number;
}
