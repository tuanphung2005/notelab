export type NoteId = string;

export type Note = {
  id: NoteId;
  title: string;
  content: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
  tags?: string[];
};

export type FolderId = string;

export type Folder = {
  id: FolderId;
  name: string;
  noteIds: NoteId[];
};

// config types
export interface AppConfig {
  theme: "light" | "dark" | "system";
  editor: EditorConfig;
  preview: PreviewConfig;
}

export interface EditorConfig {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export interface PreviewConfig {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export const DEFAULT_CONFIG: AppConfig = {
  theme: "system",
  editor: {
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, 'DejaVu Sans Mono', monospace",
    fontSize: 14,
    lineHeight: 1.75,
  },
  preview: {
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: 16,
    lineHeight: 1.6,
  },
};
