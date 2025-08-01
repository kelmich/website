import { DijkstraVisualizer } from "@/content/blog/flatfalcon/2-dijkstra/DijkstraVisualizer";
import { FlatfalconBarChart } from "../results";
import { InlineCitation } from "@/app/components/Citation";
import { Cormen2009, Dijkstra1959 } from "../references";
import { InlineMath } from "@/app/components/Math";
import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";

export default async function Home() {
  return (
    <>
      <h1>Chapter 2</h1>
      <h2>Dijkstra&apos;s Algorithm</h2>

      <p>
        A natural starting point is to use Dijkstra&apos;s algorithm, which
        computes the shortest paths from a source node to all other nodes in a
        graph with non-negative edge weights. In our setting, we are interested
        in the shortest paths <b>to</b> the query point from all possible
        listing locations. To achieve this, we adapt Dijkstra&apos;s algorithm
        to explore <b>incoming</b> edges.
      </p>

      <h3>Formal Algorithm Description</h3>
      <p>
        The algorithm <InlineCitation citation={Dijkstra1959} page={270} />{" "}
        maintains a priority queue of nodes ordered by their tentative distance
        to the query point. The key steps are:
      </p>

      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/2-dijkstra/dijkstra-pseudocode.txt"
      />

      <p>
        Note that this version explores <b>incoming edges</b> at each step,
        which differs from the standard formulation that explores outgoing
        edges.
      </p>

      <h3>Complexity</h3>
      <p>
        The overall time complexity of this algorithm depends on the priority
        queue used. Overall we perform <InlineMath math="\mathcal{O}(E)" />{" "}
        insert operations and <InlineMath math="\mathcal{O}(V)" /> extract_min
        operations.
      </p>
      <p>
        Standard priority queues like binary heaps achieve insert in{" "}
        <InlineMath math="\mathcal{O}(\log V)" /> time and extract_min in{" "}
        <InlineMath math="\mathcal{O}(\log V)" /> time{" "}
        <InlineCitation citation={Cormen2009} page={506} />. This yields an
        overall time complexity of{" "}
        <InlineMath math="\mathcal{O}((E + V) \log V)" />.
      </p>
      <p>
        Advanced priority queues like Fibonacci heaps achieve insert in{" "}
        <InlineMath math="\mathcal{O}(1)" /> time and extract_min in{" "}
        <InlineMath math="\mathcal{O}(\log V)" /> time{" "}
        <InlineCitation citation={Cormen2009} page={506} /> (amortized). This
        yields an overall time complexity of{" "}
        <InlineMath math="\mathcal{O}(E + V \log V)" />. However, Fibonacci
        heaps are rarely used in practice due to their implementation overhead{" "}
        <InlineCitation citation={Cormen2009} page={507} />.
      </p>
      <p>
        In this work, we use a binary heap, yielding overall time complexity{" "}
        <InlineMath math="\mathcal{O}((E + V) \log V)" />.
      </p>

      <h2>Visualization and Implementation</h2>
      <p>
        Below is a sample TypeScript implementation of the adapted Dijkstra’s
        algorithm, and an interactive visualization that demonstrates how it
        operates on a small graph.
      </p>

      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/2-dijkstra/dijkstra.ts"
        defaultCollapsed
      />

      <DijkstraVisualizer />

      <h2>Empirical Performance</h2>
      <p>
        We benchmark this approach in our experimental setting. The bar chart
        below shows the average query time using Dijkstra’s algorithm.
      </p>

      <FlatfalconBarChart dataType="Query" algorithms={["Dijkstra"]} />
    </>
  );
}
