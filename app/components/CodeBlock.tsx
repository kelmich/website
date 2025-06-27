import fs from "fs/promises";
import path from "path";
import { headers } from "next/headers";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface Props {
  filename: string;
  lang: BundledLanguage;
}

export default async function CodeBlock({ lang, filename }: Props) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const fullPath = path.join("app", pathname, filename);
  const fileContent = await fs.readFile(fullPath, "utf8");

  const html = await codeToHtml(fileContent, {
    lang,
    theme: "github-light",
    transformers: [
      {
        pre(node) {
          // Add padding via inline style
          node.properties.style = ""; // "padding: 1rem;";
        },
      },
    ],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="p-4 rounded-lg bg-background overflow-auto"
    />
  );
}
