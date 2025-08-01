"use client";
import { useState } from "react";

interface Props {
  html: string;
  defaultCollapsed?: boolean;
}

export function CodeBlockClient({ html, defaultCollapsed = false }: Props) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <div className="border divide-y">
      {defaultCollapsed && (
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer bg-background px-4 py-2 text-sm text-background-foreground hover:bg-muted"
        >
          {collapsed ? "Show code" : "Hide code"}
        </div>
      )}
      {!collapsed && (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="p-4 overflow-auto bg-background"
        />
      )}
    </div>
  );
}
