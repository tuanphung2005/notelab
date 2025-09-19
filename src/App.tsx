'use client'

import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import LineNumberedEditor from "./components/editor/LineNumberedEditor";
import MarkdownPreview from "./components/preview/MarkdownPreview";
import type { SidebarKey } from "./types";

function App() {
  const [activeKey, setActiveKey] = useState<SidebarKey | string>("notes");
  // example markdown content
  const [markdown, setMarkdown] = useState<string>(
    "# Welcome to NoteLab\n\n- Edit on the left\n- Preview on the right\n\n```ts\nconst hello = 'world'\n```\n\n| Tables | Are | Cool |\n|-------:|:---:|:----:|\n| right  |  c  |  c   |\n"
  );

  useEffect(() => {
  }, [markdown]);

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr]">
      <Sidebar activeKey={activeKey} onChange={setActiveKey} onNewNote={() => {}} />

      <main className="h-screen grid grid-cols-2">
        <section className="h-full border-r border-default-200 bg-content1">
          <div className="h-full grid grid-rows-[auto_1fr]">
            <div className="flex items-center justify-between p-3 border-b border-default-200">
              <span className="font-medium">editor</span>
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
