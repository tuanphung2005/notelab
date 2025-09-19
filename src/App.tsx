'use client'

import { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import LineNumberedEditor from "./components/editor/LineNumberedEditor";
import MarkdownPreview from "./components/preview/MarkdownPreview";
import type { SidebarKey } from "./types";

interface FileInfo {
  name: string;
  path: string;
}

function App() {
  const [activeKey, setActiveKey] = useState<SidebarKey | string>("notes");
  const [markdown, setMarkdown] = useState<string>("# Welcome to NoteLab\n\nStart writing your notes here...");
  const [vaultFiles, setVaultFiles] = useState<FileInfo[]>([]);
  const [vaultPath, setVaultPath] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<string>("");
  
  const [isTauri, setIsTauri] = useState(false);

  // refresh when window refocus
  useEffect(() => {
    if (!isTauri) return;

    const handleFocus = () => {
      loadVaultFiles();
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [isTauri]);

  // is tauri
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const path = await invoke<string>('get_vault_info');
        setVaultPath(path);
        setIsTauri(true);
        loadVaultFiles();
      } catch (error) {
        console.error('not running in Tauri environment');
      }
    };
    
    initializeApp();
  }, []);

  const loadVaultFiles = async () => {
    try {
      const files = await invoke<FileInfo[]>('list_vault_files');
      setVaultFiles(files);
    } catch (error) {
      console.error('failed to load vault files:', error);
      setVaultFiles([]);
    }
  };

  const handleNewNote = async () => {
    if (!isTauri) {
      alert('plz download desktop version');
      return;
    }

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `New Note ${timestamp}.md`;
      
      await invoke<string>('create_new_note', { filename });
      
      await loadVaultFiles();
      await openFile(filename);
      
    } catch (error) {
      console.error('failed to create new note:', error);
      alert(`failed to create new note: ${error}`);
    }
  };

  const openFile = async (filename: string) => {
    if (!isTauri) {
      alert('download desktop plz');
      return;
    }

    try {
      const content = await invoke<string>('read_note', { filename });
      setMarkdown(content);
      setCurrentFile(filename);
    } catch (error) {
      console.error('failed to open:', error);
      alert(`failed to open: ${error}`);
    }
  };

  const saveCurrentFile = useCallback(async (content: string) => {
    if (!isTauri || !currentFile) return;

    try {
      await invoke('save_note', { filename: currentFile, content });
    } catch (error) {
      console.error('failed to save file:', error);
    }
  }, [isTauri, currentFile]);

  // autosave 1s timeout
  useEffect(() => {
    if (!currentFile) return;

    const timeoutId = setTimeout(() => {
      saveCurrentFile(markdown);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [markdown, currentFile, saveCurrentFile]);

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <Sidebar 
        activeKey={activeKey} 
        onChange={setActiveKey} 
        onNewNote={handleNewNote}
        vaultPath={vaultPath}
        vaultFiles={vaultFiles}
        onOpenFile={openFile}
        canCreate={isTauri}
        currentFile={currentFile}
      />

      <main className="h-screen grid grid-cols-2">
        <section className="h-full border-r border-default-200 bg-content1">
          <div className="h-full grid grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between p-3 border-b border-default-200">
              <span className="font-medium">{currentFile ? `editor — ${currentFile}` : "editor"}</span>
            </div>
            <LineNumberedEditor value={markdown} onChange={setMarkdown} />
          </div>
        </section>

        <section className="h-full bg-content1">
          <div className="h-full grid grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between p-3 border-b border-default-200">
              <span className="font-medium">preview</span>
            </div>
            <MarkdownPreview value={markdown} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;