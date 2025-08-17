import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";
import { readFileSync } from "fs";
import { CodeBlockClient } from "./CodeBlock.client";
import katex from "katex";

export interface CodeFile {
  filepath: string;
  language: BundledLanguage | "latex-rendered";
}

interface Props {
  files: CodeFile[];
}

function extractInterestingCode(content: string): string {
  const lines = content.split("\n");
  const start = lines.findIndex((line) =>
    line.includes("kelmich-highlight-start"),
  );
  const end = lines.findIndex((line) => line.includes("kelmich-highlight-end"));

  if (start !== -1 && end !== -1 && end > start) {
    return lines.slice(start + 1, end).join("\n");
  }

  return content;
}

function removeLeadingWhitespace(code: string): string {
  const lines = code.split("\n");
  const leadingWhitespace = lines
    .filter((line) => line.trim() !== "")
    .reduce((min, line) => {
      const match = line.match(/^(\s*)/);
      return match ? Math.min(min, match[0].length) : min;
    }, Infinity);

  return lines
    .map((line) => line.slice(leadingWhitespace))
    .join("\n")
    .trim();
}

export async function CodeBlock({ files }: Props) {
  const renderedCodeFiles = await Promise.all(
    files.map(async ({ filepath, language }) => {
      const fileContent = readFileSync(filepath, "utf8");
      const interestingPart = extractInterestingCode(fileContent);
      const cleanedCode = removeLeadingWhitespace(interestingPart);

      let html;
      switch (language) {
        case "latex-rendered":
          html = katex.renderToString(cleanedCode, {
            throwOnError: false,
            displayMode: false,
          });
          break;
        default:
          html = await codeToHtml(cleanedCode, {
            lang: language,
            theme: "github-light",
          });
          break;
      }

      return {
        filepath,
        language,
        html,
      };
    }),
  );

  return <CodeBlockClient renderedCodeFiles={renderedCodeFiles} />;
}
