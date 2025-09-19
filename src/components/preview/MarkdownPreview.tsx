import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { MarkdownPreviewProps } from "../../types";

export default function MarkdownPreview({ value }: MarkdownPreviewProps) {
  return (
    <div className="overflow-auto p-6">
  <div className="preview prose dark:prose-invert max-w-none overflow-x-auto prose-headings:font-semibold prose-headings:text-foreground prose-table:border prose-td:p-2 prose-table:w-fit text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-blockquote:text-foreground prose-th:text-foreground prose-td:text-foreground">
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
