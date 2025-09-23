import { useState, useEffect } from 'react';

export const useEditorStats = (content: string) => {
  const [stats, setStats] = useState({
    wordCount: 0,
    lineCount: 0,
    charCount: 0,
  });

  useEffect(() => {
    if (!content) {
      setStats({ wordCount: 0, lineCount: 0, charCount: 0 });
      return;
    }

    const words = content
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);
    const lines = content.split('\n');
    const chars = content.length;

    setStats({
      wordCount: words.length,
      lineCount: lines.length,
      charCount: chars,
    });
  }, [content]);

  return stats;
};

export const useNotesStats = (notes: any[], selectedNote: any) => {
  const [stats, setStats] = useState({
    totalNotes: 0,
    selectedNoteName: '',
  });

  useEffect(() => {
    setStats({
      totalNotes: notes.length,
      selectedNoteName: selectedNote?.name || '',
    });
  }, [notes, selectedNote]);

  return stats;
};

export const useSidebarStats = () => {
  const stats = {
    status: 'ready!',
  };

  return stats;
};