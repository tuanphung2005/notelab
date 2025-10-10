import { Button } from "@heroui/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code2,
  Table,
  CheckSquare,
  Image,
  Minus
} from "lucide-react";

interface ToolbarProps {
  onInsert: (before: string, after?: string) => void;
}

export default function Toolbar({ onInsert }: ToolbarProps) {
  const toolbarButtons = [
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => onInsert("# ", "\n"),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => onInsert("## ", "\n"),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => onInsert("### ", "\n"),
    },
    { type: "divider" as const },
    {
      icon: Bold,
      label: "Bold",
      action: () => onInsert("**", "**"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => onInsert("_", "_"),
    },
    {
      icon: Strikethrough,
      label: "Strikethrough",
      action: () => onInsert("~~", "~~"),
    },
    {
      icon: Code,
      label: "Inline Code",
      action: () => onInsert("`", "`"),
    },
    { type: "divider" as const },
    {
      icon: Link,
      label: "Link",
      action: () => onInsert("[", "](url)"),
    },
    {
      icon: Image,
      label: "Image",
      action: () => onInsert("![alt text](", ")"),
    },
    { type: "divider" as const },
    {
      icon: List,
      label: "Bullet List",
      action: () => onInsert("- ", "\n"),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => onInsert("1. ", "\n"),
    },
    {
      icon: CheckSquare,
      label: "Task List",
      action: () => onInsert("- [ ] ", "\n"),
    },
    { type: "divider" as const },
    {
      icon: Quote,
      label: "Quote",
      action: () => onInsert("> ", "\n"),
    },
    {
      icon: Code2,
      label: "Code Block",
      action: () => onInsert("```\n", "\n```\n"),
    },
    {
      icon: Minus,
      label: "Horizontal Rule",
      action: () => onInsert("\n---\n", ""),
    },
    {
      icon: Table,
      label: "Table",
      action: () => onInsert("\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n", ""),
    },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border-b border-default-200 bg-content2 flex-wrap">
      {toolbarButtons.map((item, index) => {
        if (item.type === "divider") {
          return (
            <div
              key={`divider-${index}`}
              className="w-px h-6 bg-default-300 mx-1"
            />
          );
        }

        const Icon = item.icon;
        return (
          <Button
            key={item.label}
            isIconOnly
            size="sm"
            variant="light"
            onPress={item.action}
            className="min-w-8 h-8"
            title={item.label}
          >
            <Icon size={16} />
          </Button>
        );
      })}
    </div>
  );
}
