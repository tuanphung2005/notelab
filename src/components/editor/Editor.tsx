import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import type { EditorProps } from "../../types";

export default function LineNumberedEditor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);
  const [visualLines, setVisualLines] = useState<(number | string)[]>([]);

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

  return (
    <div className="relative h-full">
      <div
        ref={gutterRef}
        aria-hidden
        className="absolute left-0 top-0 w-12 h-full overflow-hidden select-none text-right pr-2 pt-3 text-foreground-500 bg-content2 border-r border-default-200"
      >
        <div className="inline-block min-w-full">
          {visualLines.map((lineNumber, i) => (
            <div key={i} className="leading-[1.75rem] text-xs tabular-nums">
              {lineNumber}
            </div>
          ))}
        </div>
      </div>
      <textarea
        ref={editorRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 pl-14 p-3 resize-none outline-none bg-transparent text-foreground text-base leading-7 font-mono"
        spellCheck={false}
      />
    </div>
  );
}
