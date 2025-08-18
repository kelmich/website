"use client";
import { useEffect, useState } from "react";
import { CodeFile } from "./CodeBlock";
import clsx from "clsx";
import { BundledLanguage } from "shiki";

interface RenderedCodeFile extends CodeFile {
  html: string;
}

interface Props {
  renderedCodeFiles: RenderedCodeFile[];
}

export function CodeBlockClient({ renderedCodeFiles }: Props) {
  const [chosenFile, setChosenFile] = useState<RenderedCodeFile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("codeblock-mode");
    const foundFile =
      saved && renderedCodeFiles.find((file) => file.language === saved);
    setChosenFile(foundFile || renderedCodeFiles[0] || null);
  }, [renderedCodeFiles]);

  return (
    <div className="border divide-y bg-background">
      {renderedCodeFiles.length > 1 && (
        <div className="flex flex-row p-4 space-x-4">
          {renderedCodeFiles.map((file) => {
            return (
              <button
                key={file.filepath}
                className={clsx(
                  "button",
                  file.language !== chosenFile?.language && "secondary",
                )}
                onClick={() => {
                  setChosenFile(file);
                  localStorage.setItem("codeblock-mode", file.language);
                }}
              >
                {file.language !== "latex-rendered"
                  ? file.language
                  : "pseudocode"}
              </button>
            );
          })}
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: chosenFile?.html || "" }}
        className="p-4 overflow-auto"
      />
    </div>
  );
}
