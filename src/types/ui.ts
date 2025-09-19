export type SidebarKey = "notes" | "settings";

export type SidebarProps = {
  activeKey: SidebarKey | string;
  onChange: (key: SidebarKey | string) => void;
  onNewNote?: () => void;
  vaultPath?: string | null;
  vaultFiles?: { name: string; path: string; }[];
  onOpenFile?: (filename: string) => void;
  canCreate?: boolean;
  currentFile?: string;
};

export type LineNumberedEditorProps = {
  value: string;
  onChange: (next: string) => void;
};

export type MarkdownPreviewProps = {
  value: string;
};
