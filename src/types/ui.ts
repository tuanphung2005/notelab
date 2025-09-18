export type SidebarKey = "notes" | "settings";

export type SidebarProps = {
  activeKey: SidebarKey | string;
  onChange: (key: SidebarKey | string) => void;
  onNewNote?: () => void;
};

export type LineNumberedEditorProps = {
  value: string;
  onChange: (next: string) => void;
};

export type MarkdownPreviewProps = {
  value: string;
};
