import React from "react";

export type WebCitation = {
  type: "web";
  id: string;
  url: string;
  lastAccessed: Date;
};

export type JournalCitation = {
  type: "journal";
  id: string;
  author: string;
  title: string;
  journal: string;
  volume: string;
  number: string;
  year: number;
  doi?: string;
  url?: string;
};

export type BookCitation = {
  type: "book";
  id: string;
  author: string;
  title: string;
  publisher: string;
  edition?: string;
  year: number;
  isbn?: string;
  url?: string;
};

type Citation = WebCitation | JournalCitation | BookCitation;

type InlineCitationProps = {
  citation: Citation;
  page?: number | [number, number];
};

export const InlineCitation: React.FC<InlineCitationProps> = ({
  citation,
  page,
}) => {
  return (
    <span>
      [
      <a href={`./bibliography#${citation.id}`} data-citation-id={citation.id}>
        {citation.id}
        {page
          ? Array.isArray(page)
            ? `, pages ${page[0]}-${page[1]}`
            : `, page ${page}`
          : ""}
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
    switch (citation.type) {
      case "web":
        return (
          <>
            <div>
              <strong>URL:</strong>{" "}
              <a href={citation.url} target="_blank" rel="noopener noreferrer">
                {citation.url}
              </a>
            </div>
            <div>
              <strong>Last Accessed:</strong>{" "}
              {citation.lastAccessed.toLocaleDateString()}
            </div>
          </>
        );

      case "journal":
        return (
          <>
            <div>
              <strong>Author:</strong> {citation.author}
            </div>
            <div>
              <strong>Title:</strong> {citation.title}
            </div>
            <div>
              <strong>Journal:</strong> {citation.journal}
            </div>
            <div>
              <strong>Volume:</strong> {citation.volume}
              {citation.number && `, Number: ${citation.number}`}
            </div>
            <div>
              <strong>Year:</strong> {citation.year}
            </div>
            {citation.doi && (
              <div>
                <strong>DOI:</strong>{" "}
                <a
                  href={`https://doi.org/${citation.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {citation.doi}
                </a>
              </div>
            )}
            {citation.url && (
              <div>
                <strong>URL:</strong>{" "}
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {citation.url}
                </a>
              </div>
            )}
          </>
        );

      case "book":
        return (
          <>
            <div>
              <strong>Author:</strong> {citation.author}
            </div>
            <div>
              <strong>Title:</strong> {citation.title}
            </div>
            <div>
              <strong>Publisher:</strong> {citation.publisher}
            </div>
            {citation.edition && (
              <div>
                <strong>Edition:</strong> {citation.edition}
              </div>
            )}
            <div>
              <strong>Year:</strong> {citation.year}
            </div>
            {citation.isbn && (
              <div>
                <strong>ISBN:</strong> {citation.isbn}
              </div>
            )}
            {citation.url && (
              <div>
                <strong>URL:</strong>{" "}
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {citation.url}
                </a>
              </div>
            )}
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
              flexShrink: 0,
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
