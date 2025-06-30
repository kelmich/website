import fs from "fs/promises";
import path from "path";
import { headers } from "next/headers";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

interface Props {
  filename: string;
  lang: BundledLanguage;
}

function extractInterestingCode(content: string): string {
  const lines = content.split("\n");
  const start = lines.findIndex((line) =>
    line.includes("kelmich-highlight-start")
  );
  const end = lines.findIndex((line) => line.includes("kelmich-highlight-end"));

  if (start !== -1 && end !== -1 && end > start) {
    return lines.slice(start + 1, end).join("\n");
  }

  return content; // fallback to full content
}

export default async function CodeBlock({ lang, filename }: Props) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const fullPath = path.join("app", pathname, filename);
  const fileContent = await fs.readFile(fullPath, "utf8");
  const interestingPart = extractInterestingCode(fileContent);

  const html = await codeToHtml(interestingPart, {
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
