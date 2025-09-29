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