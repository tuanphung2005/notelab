import { useEffect, useMemo, useRef } from "react";
import type { LineNumberedEditorProps } from "../../types";

export default function LineNumberedEditor({ value, onChange }: LineNumberedEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const gutterRef = useRef<HTMLDivElement | null>(null);

  const lines = useMemo(() => value.split("\n").length, [value]);

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
  }, [value]);

  return (
    <div className="relative h-full">
      <div
        ref={gutterRef}
        aria-hidden
        className="absolute left-0 top-0 w-12 h-full overflow-hidden select-none text-right pr-2 pt-3 text-foreground-500 bg-content2 border-r border-default-200"
      >
        <div className="inline-block min-w-full">
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="leading-[1.75rem] text-xs tabular-nums">
              {i + 1}
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
