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
        listings from each vertex by traversing the downward graph in a time
        bounded search from each listing. This setup is embarrassingly parallel,
        as each listing's traversal can be computed independently.
      </p>
      <CodeBlock
        files={[
          {
            language: "latex-rendered",
            filepath:
              "./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/setup.tex",
          },
          {
            language: "typescript",
            filepath:
              "./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/dagShortestPath.ts",
          },
        ]}
      />
      <p>Below is a small example to demonstrate the process.</p>
      <ContractionHierarchyListingSetupVisualizer />
      <p>
        After preprocessing, we perform a standard CH query. However, during
        traversal of the upward graph, we now accumulate results using each
        visited vertex’s precomputed label. This allows us to efficiently
        aggregate reachable listings.
      </p>
      <CodeBlock
        files={[
          {
            filepath:
              "./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/query.tex",
            language: "latex-rendered",
          },
          {
            filepath:
              "./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/ContractionHierarchyListingQuery.tsx",
            language: "typescript",
          },
        ]}
      />
      <p>
        This would work as follows on our small example graph starting from
        vertex C.
      </p>
      <ContractionHierarchyListingQueryVisualizer />
      <h3>Time Complexity</h3>
      <p>
        Because we use a heuristic when constructing the contraction hierarchy,
        the theoretical bounds are not very exciting. Similarly to the full
        precompute method, the construction time is{" "}
        <InlineMath math="\mathcal{O}(L \cdot (V + E) \cdot \log V)" />, we run{" "}
        Dijkstra <InlineMath math="L" /> times. At query time we run another
        Dijkstra in <InlineMath math="\mathcal{O}((V + E) \cdot \log V)" />{" "}
        time.
      </p>
      <p>
        Suppose we have built a contraction hierarchy as described in the
        previous chapter, and the graph has a low highway dimension{" "}
        <InlineMath math="h" />. In this case, the time to compute labels is{" "}
        <InlineMath math="\mathcal{O}(L \cdot (h \cdot \log h \cdot \log D)^2)" />
        , where <InlineMath math="L" /> is the number of listings,{" "}
        <InlineMath math="h" /> is the highway dimension, and{" "}
        <InlineMath math="D" /> is the diameter of the graph. For a query, the
        time required is{" "}
        <InlineMath math="\mathcal{O}((h \cdot \log h \cdot \log D)^2 + R^2)" />
        , where <InlineMath math="R" /> is the number of listings returned by
        the query. The first term,{" "}
        <InlineMath math="\mathcal{O}((h \cdot \log h \cdot \log D)^2)" />, is
        the time to perform the shortest path search using the contraction
        hierarchy. The second term, <InlineMath math="R^2" />, accounts for the
        time needed to update or merge the result set as listings are found
        during the search. In summary: with low highway dimension and an
        appropriate contraction hierarchy, the time complexity is much more
        attractive.
      </p>

      <h3>Space Complexity</h3>
      <p>
        If we assume a worst case scenario and that the heuristic did not do a
        good job, then the storage complexity can be{" "}
        <InlineMath math="\mathcal{O}(V \cdot L)" /> in the worst case, i.e. we
        store all listings at all nodes, as in the full precompute approach.
      </p>
      <p>
        Suppose we have built a contraction hierarchy as described earlier, and
        the graph has a low highway dimension <InlineMath math="h" />.
      </p>
      <ul>
        <li>
          Vertex storage: We need to store information for each vertex, which
          takes <InlineMath math="\mathcal{O}(V)" /> space.
        </li>
        <li>
          Label storage: For each listing (there are <InlineMath math="L" />{" "}
          listings), we propagate its label through the contraction hierarchy.
          Due to the structure of the hierarchy, each label is stored at up to{" "}
          <InlineMath math="\mathcal{O}((h \cdot \log h \cdot \log D)^2)" />{" "}
          vertices, where <InlineMath math="D" /> is the diameter of the graph.
        </li>
      </ul>
      <p>
        Therefore, the overall space complexity is{" "}
        <InlineMath math="\mathcal{O}(V + L \cdot (h \cdot \log h \cdot \log D)^2)" />
        .
      </p>
      <h3>Empirical Performance</h3>
      <p>
        The empirical performance gains are substantial, despite relying on a
        heuristic for computing the contraction hierarchy. Preprocessing
        completes in seconds, not minutes, and query latency is negligible
        compared to network overheads.
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
