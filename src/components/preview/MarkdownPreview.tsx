import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MarkdownPreviewProps } from "../../types";

export default function MarkdownPreview({ value }: MarkdownPreviewProps) {
  return (
    <div className="overflow-auto p-6 prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
    </div>
  );
}
