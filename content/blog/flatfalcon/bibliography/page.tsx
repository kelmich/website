"use client";

import * as AllReferences from "../references";
import { useEffect, useState } from "react";

import { Bibliography } from "@/app/components/Citation";

export default function Page() {
  const entries = Object.values(AllReferences);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setHighlightId(hash.substring(1));
    }
  }, []);

  return (
    <section>
      <h1>Bibliography</h1>
      <Bibliography
        citations={entries}
        highlightedCitationId={highlightId ?? undefined}
      />
    </section>
  );
}
