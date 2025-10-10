import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { EditorProps } from "../../types";
import { useConfig } from "../../contexts/ConfigContext";
import Toolbar from "./Toolbar";

export default function LineNumberedEditor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const [visualLines, setVisualLines] = useState<(number | string)[]>([]);
  const { config } = useConfig();

  const lines = useMemo(() => value.split("\n"), [value]);

  const calcVisualLines = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return [];

    const result: (number | string)[] = [];
    const style = window.getComputedStyle(editor);

    // measurer
    const measurer = document.createElement('div');
    Object.assign(measurer.style, {
      position: 'absolute',
      visibility: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      font: style.font,
      fontSize: style.fontSize,
      fontFamily: style.fontFamily,
      lineHeight: style.lineHeight,
      padding: '0',
      margin: '0',
      border: 'none',
      width: `${editor.clientWidth - 56}px`
    });
    
    document.body.appendChild(measurer);

    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.75;

    lines.forEach((line, index) => {
      if (line.length === 0) {
        result.push(index + 1);
        return;
      }

      measurer.textContent = line;
      const wrappedLines = Math.round(measurer.offsetHeight / lineHeight);
      
      result.push(index + 1);
      for (let i = 1; i < wrappedLines; i++) {
        result.push('-');
      }
    });

    document.body.removeChild(measurer);
    return result;
  }, [lines]);

  // on editor resize
  useEffect(() => {
    const update = () => setVisualLines(calcVisualLines());
    update();

    const editor = editorRef.current;
    if (!editor) return;

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(editor);

    window.addEventListener('resize', update);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [calcVisualLines]);

  useEffect(() => {
    const editor = editorRef.current;
    const gutter = gutterRef.current;
    if (!editor || !gutter) return;
    
    const sync = () => {
      gutter.scrollTop = editor.scrollTop;
      gutter.style.height = `${editor.scrollHeight}px`;
    };
    
    editor.addEventListener("scroll", sync);
    sync();
    return () => editor.removeEventListener("scroll", sync);
  }, [visualLines]);

  const handleInsert = useCallback((before: string, after: string = "") => {
    const editor = editorRef.current;
    if (!editor) return;

    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Set cursor position after insert
    setTimeout(() => {
      if (selectedText) {
        // If there was selected text, select the wrapped text
        editor.selectionStart = start + before.length;
        editor.selectionEnd = start + before.length + selectedText.length;
      } else {
        // If no selection, position cursor between before and after
        editor.selectionStart = editor.selectionEnd = start + before.length;
      }
      editor.focus();
    }, 0);
  }, [value, onChange]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Toolbar onInsert={handleInsert} />
      <div className="relative flex-1 overflow-hidden">
      <div
        ref={gutterRef}
        aria-hidden
        className="absolute left-0 top-0 w-12 h-full overflow-hidden select-none text-right pr-2 text-foreground-500 bg-content2 border-r border-default-200"
        style={config ? {
          paddingTop: '12px',
          fontSize: `${config.font.fontSize}px`,
          lineHeight: config.font.lineHeight,
          fontFamily: config.font.fontFamily,
        } : {
          paddingTop: '12px',
          fontSize: "14px",
          lineHeight: 1.75,
          fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, 'DejaVu Sans Mono', monospace",
        }}
      >
        <div className="inline-block min-w-full">
          {visualLines.map((lineNumber, i) => (
            <div 
              key={i} 
              className="tabular-nums"
            >
              {lineNumber}
            </div>
          ))}
        </div>
      </div>
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 pl-14 p-3 resize-none outline-none bg-transparent text-foreground overflow-y-auto"
        style={config ? {
          fontFamily: config.font.fontFamily,
          fontSize: `${config.font.fontSize}px`,
          lineHeight: config.font.lineHeight,
        } : {
          fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, 'DejaVu Sans Mono', monospace",
          fontSize: "14px",
          lineHeight: 1.75,
        }}
        spellCheck={false}
      />
      </div>
    </div>
  );
}
