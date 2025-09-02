import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";
import { ContractionHierarchyListingSetupVisualizer } from "../7-contraction-hierarchies-listing-query/ContractionHierarchyListingSetup";
import { FlatfalconBarChart } from "../results";
import { ContractionHierarchyListingUpSetupVisualizer } from "./ContractionHierarchyListingUpSetup";
import { HubLabelVisualizer } from "./HubLabelVisualizer";
import { InlineMath } from "@/app/components/Math";
import { InlineCitation } from "@/app/components/Citation";
import { Abraham2016 } from "../references";

export default async function Home() {
  return (
    <>
      <h1>Chapter 8</h1>
      <h2>Hub Labels</h2>
      <p>
        We now present a final optimization based on the Contraction Hierarchies
        method: hub labeling. This approach uses the precomputed CH structure to
        completely eliminate Dijkstra searches at query time, replacing them
        with fast memory lookups over precomputed hub labels.
      </p>
      <h3>Algorithm Description</h3>
      <p>
        In the contraction hierarchies method, each node maintains a label of
        reachable listings in the downward DAG. We extend this idea by computing
        a corresponding label in the upward DAG, which contains all hub vertices
        reachable from the query node within a maximum time budget{" "}
        <InlineMath math="B" />.
      </p>
      <CodeBlock
        files={[
          {
            language: "latex-rendered",
            filepath: "./content/blog/flatfalcon/8-hub-labels/construction.tex",
          },
        ]}
      />
      <p>
        Here is an example of how the down labels can be computed in parallel
      </p>
      <ContractionHierarchyListingSetupVisualizer />
      <p>Here is an example of how a single up label can be computed</p>
      <ContractionHierarchyListingUpSetupVisualizer />
      <p>
        Once the hub labels have been precomputed, queries can be answered
        efficiently by intersecting the upward label of the query node with the
        downward labels of the hubs it reaches. This process leverages the
        triangle inequality and the cover property of hub labels, which
        guarantees that for any source-target pair, there exists at least one
        common hub on a shortest path between them.
      </p>
      <CodeBlock
        files={[
          {
            language: "latex-rendered",
            filepath: "./content/blog/flatfalcon/8-hub-labels/query.tex",
          },
        ]}
      />
      <p>and might look like this on a small example graph</p>
      <HubLabelVisualizer />
      <h3>Real World Implementations</h3>
      <p>
        An added benefit is that hub labels naturally fit relational databases—
        queries can be implemented using SQL JOIN operations.
      </p>
      <h3>Time Complexity</h3>
      <p>
        We assume we are given a contraction hierarchy and are now computing the
        hub labels from it.
      </p>
      <p>
        In the worst case, the contraction hierarchy we get could be equivalent
        to the graph (e.g. a complete graph where all edges have weight 1). Then
        the construction of the hub labels will amount to running Dijkstra from
        every vertex on the entire graph, which yields a time complexity of{" "}
        <InlineMath math="\mathcal{O}(V \cdot (V + E) \cdot \log V)" />. As the
        worst case up label size is <InlineMath math="V" /> and the worst case
        down label size is <InlineMath math="L" />, we get a worst case query
        time of <InlineMath math="\mathcal{O}(L \cdot V)" />.
      </p>
      <p>
        By contract for graphs with low highway dimension{" "}
        <InlineMath math="h" /> that are constructed using the methods from our
        previous chapter we compute (using our shortest path algorithm that runs
        in <InlineMath math="\mathcal{O}((h \cdot \log h \cdot \log D)^2)" />{" "}
        time from the previous chapter)
      </p>
      <ul>
        <li>
          The up labels for each vertex in{" "}
          <InlineMath math="\mathcal{O}(V \cdot (h \cdot \log h \cdot \log D)^2)" />{" "}
          time
        </li>
        <li>
          The down labels for each listing in{" "}
          <InlineMath math="\mathcal{O}(L \cdot (h \cdot \log h \cdot \log D)^2)" />{" "}
          time
        </li>
      </ul>
      <p>
        Which yields a combined{" "}
        <InlineMath math="\mathcal{O}(V \cdot (h \cdot \log h \cdot \log D)^2)" />{" "}
        construction time. At query time, queries are answered by intersecting
        the up and down labels of the source and target nodes. As the maximum
        label size is{" "}
        <InlineMath math="\mathcal{O}(h \cdot \log h \cdot \log D)" />{" "}
        <InlineCitation citation={Abraham2016} page={16} />, the query time is{" "}
        <InlineMath math="\mathcal{O}((h \cdot \log h \cdot \log D)^2)" /> .
      </p>
      <h3>Space Complexity</h3>
      <p>
        In the worst case (e.g., a complete graph where all edges have weight
        1), the storage complexity can be <InlineMath math="\mathcal{O}(V^2)" />
        , as every vertex stores all other vertices in its label.
      </p>
      <p>
        For graphs with low highway dimension <InlineMath math="h" /> that are
        constructed using the methods from our previous chapter, the space
        required for hub labels is much lower. Each up label has size at most{" "}
        <InlineMath math="\mathcal{O}(h \cdot \log h \cdot \log D)" />{" "}
        <InlineCitation citation={Abraham2016} page={16} />. Additionally we
        store each listing at up to{" "}
        <InlineMath math="\mathcal{O}(h \cdot \log h \cdot \log D)" /> hubs.
        This leads to a total space complexity of{" "}
        <InlineMath math="\mathcal{O}(V \cdot h \cdot \log h \cdot \log D)" />.
      </p>
      <h3>Empirical Results</h3>
      <p>
        While we do pay about a 2x price in setup time compared to contraction
        hierarchies, we get an approximate 3x speedup in query time.
      </p>
      <FlatfalconBarChart
        dataType="Setup"
        algorithms={[
          "Dijkstra",
          "Dial",
          "FullPrecompute",
          "ContractionHierarchy",
          "HubLabel",
        ]}
      />
      <FlatfalconBarChart
        dataType="Query"
        algorithms={[
          "Dijkstra",
          "Dial",
          "FullPrecompute",
          "ContractionHierarchy",
          "HubLabel",
        ]}
      />
    </>
  );
}
