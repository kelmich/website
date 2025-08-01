import clsx from "clsx";
import React from "react";

export type WebCitation = {
  id: string;
  url: string;
  lastAccessed: Date;
};

export type BookCitation = {
  id: string;
  author: string;
  title: string;
  publisher: string;
  year: number;
};

type Citation = WebCitation | BookCitation;

type InlineCitationProps = {
  citation: Citation;
};

export const InlineCitation: React.FC<InlineCitationProps> = ({ citation }) => {
  return (
    <span>
      [
      <a href={`./bibliography#${citation.id}`} data-citation-id={citation.id}>
        {citation.id}
      </a>
      ]
    </span>
  );
};

type BibliographyProps = {
  citations: Citation[];
  highlightedCitationId?: string;
};

export const Bibliography: React.FC<BibliographyProps> = ({
  citations,
  highlightedCitationId,
}) => {
  const renderCitationContent = (citation: Citation) => {
    if ("url" in citation) {
      // WebCitation
      return (
        <>
          URL:{" "}
          <a href={citation.url} target="_blank" rel="noopener noreferrer">
            {citation.url}
          </a>
          <br />
          Last Accessed: {citation.lastAccessed.toLocaleDateString()}
        </>
      );
    } else {
      // BookCitation
      return (
        <>
          Author: {citation.author}
          <br />
          Title: {citation.title}
          <br />
          Publisher: {citation.publisher}
          <br />
          Year: {citation.year}
        </>
      );
    }
  };

  return (
    <div>
      {citations.map((citation) => (
        <dl key={citation.id} id={citation.id} className="flex mb-4">
          <dt
            style={{
              width: `${Math.max(...citations.map((c) => c.id.length)) + 4}ch`,
              fontWeight: "bold",
              position: "relative",
            }}
          >
            {highlightedCitationId === citation.id && (
              <span style={{ position: "absolute", left: "-2ch" }}>*</span>
            )}
            [{citation.id}]
          </dt>
          <dd style={{ margin: 0, marginLeft: "1rem" }}>
            {renderCitationContent(citation)}
          </dd>
        </dl>
      ))}
    </div>
  );
};
