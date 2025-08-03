import { ContractedUpDownGraph } from "../5-contraction-hierarchies-introduction/ContractedGraph";
import { FlatfalconBarChart } from "../results";
import { ContractionHierarchyListingSetupVisualizer } from "./ContractionHierarchyListingSetup";
import { ContractionHierarchyListingQueryVisualizer } from "./ContractionHierarchyListingQuery";
import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";
import { InlineMath } from "@/app/components/Math";

export default async function Home() {
  return (
    <>
      <h1>Chapter 7</h1>
      <h2>Contraction Hierarchies for Listing Queries</h2>

      <p>
        With a solid understanding of contraction hierarchies, we now explore
        how to adapt them for our specific problem: efficiently finding all
        listings reachable within a time budget. Recall that CH preprocesses the
        graph into two directed acyclic graphs (DAGs): the upward and downward
        graphs, with shortcut edges added during node contraction.
      </p>

      <ContractedUpDownGraph />

      <h3>Algorithm Description</h3>
      <p>
        For a standard point-to-point shortest path, we perform a bidirectional
        Dijkstra: one forward search on the upward graph from the source and one
        backward search on the downward graph from the target.
      </p>
      <p>
        In the listing query variant, our goal is to determine all listings
        reachable from a query point within a maximum time budget{" "}
        <InlineMath math="B" />. This is achieved by precomputing labels for
        each vertex in the upward DAG. Each label stores all listings that can
        be reached from that vertex via the downward DAG, constrained by the
        time budget.
      </p>
      <p>
        Since each listing’s position is fixed, we can precompute the reachable
        listings from each vertex by traversing the downward graph in a
        time-bounded search from each listing. This setup is embarrassingly
        parallel, as each listing's traversal can be computed independently.
      </p>

      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/setup-pseudocode.txt"
      />
      <p>Below is a small example to demonstrate the process.</p>
      {/*<CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/dagShortestPath.ts"
        defaultCollapsed
      />*/}

      <ContractionHierarchyListingSetupVisualizer />

      <p>
        After preprocessing, we perform a standard CH query. However, during
        traversal of the upward graph, we now accumulate results using each
        visited vertex’s precomputed label. This allows us to efficiently
        aggregate reachable listings.
      </p>

      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/query-pseudocode.txt"
      />

      <p>
        This would work as follows on our small example graph starting from
        vertex C.
      </p>

      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/ContractionHierarchyListingQuery.tsx"
        defaultCollapsed
      />

      <ContractionHierarchyListingQueryVisualizer />

      <h3>Time Complexity</h3>
      <ul>
        <li>
          <strong>Preprocessing:</strong> Let <InlineMath math="L" /> be the
          number of listings. Each listing triggers a bounded search over the
          downward DAG. If the average number of vertices reachable within the
          time budget is <InlineMath math="r" />, total preprocessing time is{" "}
          <InlineMath math="O(L \cdot r)" />.
        </li>
        <li>
          <strong>Query:</strong> The query runs in <InlineMath math="O(k)" />{" "}
          time, where <InlineMath math="k" /> is the number of vertices visited
          in the upward DAG. Label lookups and result aggregation are
          constant-time per vertex.
        </li>
      </ul>

      <h3>Space Complexity</h3>
      <p>
        Each vertex in the upward DAG stores a list of reachable listings. Let{" "}
        <InlineMath math="n" /> be the number of vertices and{" "}
        <InlineMath math="\ell" /> be the average number of listings per vertex
        label. Total space complexity is <InlineMath math="O(n \cdot \ell)" />.
      </p>

      <h3>Empirical Performance</h3>
      <p>
        The performance gains are substantial. Preprocessing completes in
        seconds, not minutes, and query latency is negligible compared to
        network overheads.
      </p>

      <FlatfalconBarChart
        dataType="Setup"
        algorithms={[
          "Dijkstra",
          "Dial",
          "FullPrecompute",
          "ContractionHierarchy",
        ]}
      />

      <FlatfalconBarChart
        dataType="Query"
        algorithms={[
          "Dijkstra",
          "Dial",
          "FullPrecompute",
          "ContractionHierarchy",
        ]}
      />
    </>
  );
}
