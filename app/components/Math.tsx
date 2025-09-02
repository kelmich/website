// components/Math.tsx
import katex from "katex";
import React from "react";

export const InlineMath: React.FC<{ math: string }> = ({ math }) => {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export const DisplayMath: React.FC<{ math: string }> = ({ math }) => {
  const html = katex.renderToString(math, {
    throwOnError: false,
    displayMode: true,
  });
  return (
    <div
      style={{ margin: "1em 0" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
