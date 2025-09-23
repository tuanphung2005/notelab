import { invoke } from "@tauri-apps/api/core";
import type { FileInfo } from "../types";

export const vaultService = {
  async getVaultInfo(): Promise<string> {
    return await invoke<string>('get_vault_info');
  },

  async getRoot(): Promise<string> {
    return await invoke<string>('get_root');
  },

  async listVaultFiles(): Promise<FileInfo[]> {
    return await invoke<FileInfo[]>('list_vault_files');
  },

  async createNewNote(filename: string): Promise<string> {
    return await invoke<string>('create_note', { filename });
  },

  async readNote(filename: string): Promise<string> {
    return await invoke<string>('read_note', { filename });
  },

  async saveNote(filename: string, content: string): Promise<void> {
    return await invoke('save_note', { filename, content });
  },

  async renameNote(oldFilename: string, newFilename: string): Promise<void> {
    return await invoke('rename_note', { 
      oldFilename, 
      newFilename 
    });
  },

  async deleteNote(filename: string): Promise<void> {
    return await invoke('delete_note', { filename });
  }
};