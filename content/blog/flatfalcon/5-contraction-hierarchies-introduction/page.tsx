import { ContractionVisualizer } from "@/content/blog/flatfalcon/5-contraction-hierarchies-introduction/ContractionVisualizer";
import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";
import { ContractionHierarchyVisualizer } from "./ContractionHierarchyVisualizer";
import { ContractedGraph, ContractedUpDownGraph } from "./ContractedGraph";
import { InlineMath, DisplayMath } from "@/app/components/Math";
import { InlineCitation } from "@/app/components/Citation";
import { FastPaths, Geisberger2008 } from "../references";

export default async function Home() {
  return (
    <>
      <h1>Chapter 5</h1>
      <h2>Introduction to Contraction Hierarchies</h2>
      <p>
        Our goal now is to achieve fast query performance comparable to our full
        precompute approach, but with reduced startup time and memory overhead.
        To this end, we introduce Contraction Hierarchies, a hierarchical
        routing technique proposed by Geisberger et al.
        <InlineCitation citation={Geisberger2008} page={[319, 320]} />.
      </p>
      <p>
        We start by assigning an importance value to each node in the graph. The
        idea is that nodes that appear more frequently in shortest paths are
        assigned higher importance values. For instance, a suburban home would
        likely have a lower importance than the entry of a major highway.
        Computing these importance values is a crucial step in the preprocessing
        phase, but can be computationally expensive. For now we will assume that
        we are given good importance values. The next chapter will discuss how
        to compute these values efficiently.
      </p>
      <p>
        The key idea of Contraction Hierarchies is to precompute additional
        edges called shortcuts, which represent shortest paths that pass through
        less important nodes. These shortcuts allow us to answer shortest path
        queries efficiently by navigating only through more important nodes.
      </p>
      <p>
        Because this scheme is more involved than our previous schemes, we will
        first only consider the original use case of the data structure:
        point-to-point shortest path routing. How we can use Contraction
        Hierarchies to solve our problem of interest efficiently will be
        discussed in an upcoming chapter.
      </p>
      <h3>Definition: Shortcut Edge</h3>
      <p>
        Given two edges <InlineMath math="(u, v)" /> and{" "}
        <InlineMath math="(v, w)" /> on a shortest path, if node{" "}
        <InlineMath math="v" /> is removed, we add a shortcut edge{" "}
        <InlineMath math="(u, w)" /> with weight{" "}
        <InlineMath math="t(u, v) + t(v, w)" /> to preserve shortest path
        distances.
      </p>
      <h3>Algorithm Overview: Contracting a Node</h3>
      <p>
        Contracting a node means removing it from the graph, but before we do
        so, we need to make sure that all shortest paths that previously passed
        through this node are still preserved. To achieve this, we add new edges
        called shortcuts between the neighbors of the node being removed. These
        shortcuts directly connect pairs of nodes that were previously only (or
        most efficiently) connected via <InlineMath math="v" />. This way, even
        after <InlineMath math="v" /> is gone, the shortest path distances
        remain unchanged. This entire process is called &quot;contracting node{" "}
        <InlineMath math="v" />
        &quot;.
      </p>
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/contract-pseudocode.txt"
      />
      <p>Below we show an example of contracting a single node (C).</p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/contractor.ts"
        defaultCollapsed
      />
      <ContractionVisualizer />
      <h3>Algorithm Overview: Contraction Hierarchy Construction</h3>
      <p>We now iteratively contract all nodes from least to most important.</p>
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/full-contract-pseudocode.txt"
      />
      <p>
        In our example, the contraction order is alphabetical: A, B, C, D, E.
      </p>
      <ContractionHierarchyVisualizer />
      <p>Below, we show the original graph with the added shortcuts.</p>
      <ContractedGraph />
      <h3>Resulting Key Properties</h3>
      <ol>
        <li>
          For any pair of nodes <InlineMath math="s, t \in V" />, the shortest
          path from
          <InlineMath math="s" /> to <InlineMath math="t" /> can be expressed as
          a path that first visits nodes in strictly increasing importance
          order, up to a highest-ranked node <InlineMath math="v^*" />, followed
          by nodes in strictly decreasing importance order.
        </li>
        <li>
          The upward edges (from less to more important nodes) form a directed
          acyclic graph (DAG), called the <b>upward graph</b>. Likewise, the
          downward edges (from more to less important nodes) form the{" "}
          <b>downward graph</b>, which is also a DAG.
        </li>
      </ol>
      <p>
        These properties allow us to restrict shortest path search to upward and
        downward graphs, enabling efficient bidirectional search.
      </p>
      <ContractedUpDownGraph />
      <h3>Querying with Contraction Hierarchies</h3>
      <p>
        To find the shortest path between source <InlineMath math="s" /> and
        target <InlineMath math="t" />:
      </p>
      <ol>
        <li>
          Perform a forward search from <InlineMath math="s" /> in the upward
          graph.
        </li>
        <li>
          Perform a backward search from <InlineMath math="t" /> in the downward
          graph.
        </li>
        <li>
          The two searches meet at the highest-ranked node on the shortest path.
        </li>
      </ol>
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/query-pseudocode.txt"
      />
      <p>
        This bidirectional search technique allows for extremely fast point to
        point queries. In our experiments on the New York City graph, queries
        take on average <b>0.026ms</b> <InlineCitation citation={FastPaths} />.
      </p>
      <h3>Next Steps</h3>
      <p>Two key questions remain:</p>
      <ol>
        <li>How do we determine a good contraction order?</li>
        <li>
          How can we apply contraction hierarchies to our Listing Query problem?
        </li>
      </ol>
    </>
  );
}
