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
        To achieve fast shortest path queries with minimal memory overhead, we
        make use of Contraction Hierarchies, a hierarchical routing technique
        proposed by Geisberger et al.{" "}
        <InlineCitation citation={Geisberger2008} page={[319, 320]} />. This
        method preprocesses the graph by adding shortcut edges and organizing
        nodes by importance, allowing queries to navigate only through the most
        relevant parts of the graph.
      </p>
      <h3>Algorithm Description</h3>
      <p>
        Each node is assigned an importance value. Nodes that appear in more
        shortest paths are considered more important (e.g., highway entry vs.
        residential intersection). The key preprocessing step is to contract
        nodes from least to most important. Contracting a node means removing it
        from the graph, but before doing so, we insert shortcut edges that
        preserve shortest path distances for any path that would have passed
        through the removed node.
      </p>
      <p>
        Specifically, for every pair of neighbors <InlineMath math="u, w" /> of
        a node <InlineMath math="v" />, if the shortest path from{" "}
        <InlineMath math="u" /> to <InlineMath math="w" /> passes through{" "}
        <InlineMath math="v" />, we add a shortcut edge{" "}
        <InlineMath math="(u, w)" /> with weight{" "}
        <InlineMath math="t(u, v) + t(v, w)" />.
      </p>
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/full-contract-pseudocode.txt"
      />
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/contract-pseudocode.txt"
      />
      <p>
        Below is an example of contracting a single node (C) and the shortcuts
        added as a result:
      </p>
      {/*<CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/contractor.ts"
        defaultCollapsed
      />*/}
      <ContractionVisualizer />
      <p>
        This contraction process is repeated for all nodes in increasing order
        of importance. In our example, nodes are contracted in alphabetical
        order: A, B, C, D, E. We invite the curious reader to determine why no
        shortcut is created at the beginning from C -{`>`} B.
      </p>
      <ContractionHierarchyVisualizer />
      <p>
        After contraction, the graph contains the original edges plus all added
        shortcuts:
      </p>
      <ContractedGraph />
      <h3>Key Properties of the Contracted Graph</h3>
      <ol>
        <li>
          Any shortest path from <InlineMath math="s" /> to{" "}
          <InlineMath math="t" /> can be represented as a sequence of edges
          where node importance first increases to a peak node{" "}
          <InlineMath math="v^*" />, then decreases—forming a “hill-shaped” path
          in the hierarchy.
        </li>
        <li>
          Edges going from lower to higher importance form the upward graph (a
          DAG), while edges going from higher to lower importance form the
          downward graph (also a DAG).
        </li>
      </ol>
      <p>
        In our running example this looks as follows. Added shortcut edges are
        emphasized.
      </p>
      <ContractedUpDownGraph />
      <h3>Shortest Path Querying</h3>
      <p>
        These key properties enable efficient bidirectional search restricted to
        the two directed acyclic graphs.
      </p>
      <p>
        To compute the shortest path between nodes <InlineMath math="s" /> and{" "}
        <InlineMath math="t" />:
      </p>
      <ol>
        <li>
          Perform a forward Dijkstra search from <InlineMath math="s" /> using
          only upward edges.
        </li>
        <li>
          Perform a backward Dijkstra search from <InlineMath math="t" /> using
          only downward edges.
        </li>
        <li>
          The searches meet at the highest-ranked node along the shortest path.
        </li>
      </ol>
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/query-pseudocode.txt"
      />
      <p>
        This bidirectional search over the contracted graph is extremely fast.
        On the New York City road network, average query time is <b>0.026ms</b>{" "}
        <InlineCitation citation={FastPaths} />.
      </p>
      <p>
        We will not discuss the detailled running time and memory usage for
        point-to-point routing here, as point-to-point shortest path queries are
        not our main interest. However, most of the analysis is similar to what
        we will discuss in the next section for our problem of interest.
      </p>
      <h3>Time Complexity</h3>
      <p>The time complexity depends on multiple factors:</p>
      <ol>
        <li>The structure of the Graph</li>
        <li>The order of contraction</li>
        <li>The implementation of shortestPathViaContractNode</li>
      </ol>
      <p>
        We will discuss how graph structure and contraction order affects the
        construction time complexity in the next chapter. When it comes to the
        choice of implementation shortestPathViaContractNode, there is a
        tradeoff to be made between fewer added shortcuts and faster
        computation. We could simply check if a direct edge exists between{" "}
        <InlineMath math="u \to w" /> and only add the shortcut if that direct
        edge does not already exist (or update the weight if it does).
      </p>
      <p>
        Alternatively, we could run Dijkstra and determine if a shortest path
        between <InlineMath math="u \to w" /> does indeed go through the
        contracted node. Running Dijkstra is much more expensive than checking
        for a direct edge, but it may lead to fewer shortcuts being added (which
        is good for our query time performance). One might also consider a
        middle ground approximation of some sort.
      </p>
      <p>
        In the worst case however, where we are constructing a Contraction
        Hierarchy on a complete graph where every node is most efficiently
        connected to every other node by a single edge, the construction time
        complexity is{" "}
        <InlineMath math="\mathcal{O}(V^3 \cdot shortestPathViaContractNode)" />
        , where <InlineMath math="\mathcal{O}(shortestPathViaContractNode)" />{" "}
        is <InlineMath math="\mathcal{O}(1)" /> for the simple edge check vs{" "}
        <InlineMath math="\mathcal{O}((V + E) \log V)" /> for Dijkstra.
      </p>
      <h3>Space Complexity</h3>
      <p>
        The space complexity also depends strongly on the number of shortcuts
        added during the contraction process. In the worst case where we end up
        storing a complete graph with every node connected to every other node,
        the space complexity is <InlineMath math="\mathcal{O}(V^2)" />.
      </p>
      <h3>Next Steps</h3>
      <p>Two questions remain:</p>
      <ol>
        <li>How do we compute good importance values for nodes efficiently?</li>
        <li>
          How can we adapt Contraction Hierarchies to our goal of efficiently
          filtering listings by travel time?
        </li>
      </ol>
    </>
  );
}
