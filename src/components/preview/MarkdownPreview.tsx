import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { MarkdownPreviewProps } from "../../types";
import { useConfig } from "../../contexts/ConfigContext";

export default function MarkdownPreview({ value }: MarkdownPreviewProps) {
  const { config } = useConfig();

  return (
    <div className="overflow-auto p-6">
      <div 
        className="preview prose dark:prose-invert max-w-none overflow-x-auto prose-headings:font-semibold prose-headings:text-foreground prose-table:border prose-td:p-2 prose-table:w-fit text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-blockquote:text-foreground prose-th:text-foreground prose-td:text-foreground"
        style={config ? {
          fontFamily: config.preview.fontFamily,
          fontSize: `${config.preview.fontSize}px`,
          lineHeight: config.preview.lineHeight,
        } : {
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
          fontSize: "16px",
          lineHeight: 1.6,
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {value}
        </ReactMarkdown>
      </div>
    </div>
  );
}
