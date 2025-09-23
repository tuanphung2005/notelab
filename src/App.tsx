'use client'

import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import LineNumberedEditor from "./components/editor/Editor";
import MarkdownPreview from "./components/preview/MarkdownPreview";
import { StatusBar } from "./components/StatusBar";
import type { SidebarKey, FileInfo } from "./types";
import { validateFilename } from "./utils/fileValidation";
import { showError } from "./utils/notifications";
import { vaultService } from "./services/vaultService";
import { useEditorStats, useNotesStats, useSidebarStats } from "./hooks/useStatusStats";

function App() {
  const [activeKey, setActiveKey] = useState<SidebarKey | string>("notes");
  const [markdown, setMarkdown] = useState<string>("# Welcome to NoteLab\n\nStart writing your notes here...");
  const [vaultFiles, setVaultFiles] = useState<FileInfo[]>([]);
  const [vaultPath, setVaultPath] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<string>("");

  // status hook
  const editorStats = useEditorStats(markdown);
  const notesStats = useNotesStats(vaultFiles, vaultFiles.find(f => f.name === currentFile));
  const sidebarStats = useSidebarStats();

  // refresh when window refocus
  useEffect(() => {
    const handleFocus = () => {
      loadVaultFiles();
    };

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // new vault
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const path = await vaultService.getVaultInfo();
        setVaultPath(path);
        loadVaultFiles();
      } catch (error) {
        console.error('Failed to initialize vault:', error);
      }
    };
    
    initializeApp();
  }, []);

  const loadVaultFiles = async () => {
    try {
      const files = await vaultService.listVaultFiles();
      setVaultFiles(files);
    } catch (error) {
      console.error('failed to load vault files:', error);
      setVaultFiles([]);
    }
  };

  const handleNewNote = async () => {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `New Note ${timestamp}.md`;

      const validationError = validateFilename(filename);
      if (validationError) {
        showError(`Cannot create note: ${validationError}`);
        return;
      }
      
      await vaultService.createNewNote(filename);
      
      await loadVaultFiles();
      await openFile(filename);
      
    } catch (error) {
      showError(`Failed to create new note: ${error}`);
    }
  };

  const openFile = async (filename: string) => {
    try {
      const content = await vaultService.readNote(filename);
      setMarkdown(content);
      setCurrentFile(filename);
    } catch (error) {
      showError(`Failed to open file: ${error}`);
    }
  };

  const saveCurrentFile = useCallback(async (content: string) => {
    if (!currentFile) return;

    try {
      await vaultService.saveNote(currentFile, content);
    } catch (error) {
      console.error('failed to save file:', error);
    }
  }, [currentFile]);

  const handleRenameNote = async (oldFilename: string, newFilename: string) => {

    const newName = newFilename.endsWith('.md') ? newFilename : `${newFilename}.md`;
    const validationError = validateFilename(newName);
    if (validationError) {
      showError(validationError);
      return;
    }

    try {
      await vaultService.renameNote(oldFilename, newName);
      
      if (currentFile === oldFilename) {
        setCurrentFile(newName);
      }
      await loadVaultFiles();
    } catch (error) {
      showError(`Failed to rename file: ${error}`);
    }
  };

  // autosave 1s timeout
  useEffect(() => {
    if (!currentFile) return;

    const timeoutId = setTimeout(() => {
      saveCurrentFile(markdown);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [markdown, currentFile, saveCurrentFile]);

  return (
    <div className="h-screen grid grid-rows-[1fr_auto]">
      <div className="grid grid-cols-[260px_1fr] overflow-hidden">
        <Sidebar 
          activeKey={activeKey} 
          onChange={setActiveKey} 
          onNewNote={handleNewNote}
          vaultPath={vaultPath}
          vaultFiles={vaultFiles}
          onOpenFile={openFile}
          onRenameFile={handleRenameNote}
          canCreate={true}
          currentFile={currentFile}
        />

        <main className="h-full grid grid-cols-2">
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
      
      <StatusBar
        sidebarStatus={sidebarStats.status}
        notesStatus={notesStats.selectedNoteName ? 
          `${notesStats.selectedNoteName} (${notesStats.totalNotes} notes)` : 
          `${notesStats.totalNotes} notes`
        }
        editorWordCount={editorStats.wordCount}
        editorLineCount={editorStats.lineCount}
      />
    </div>
  );
}

export default App;