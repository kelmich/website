import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";
import { DialVisualizer } from "./DialVisualizer";
import { FlatfalconBarChart } from "@/content/blog/flatfalcon/results";
import { InlineCitation } from "@/app/components/Citation";
import { Cormen2009, Dial1969 } from "../references";
import { InlineMath } from "@/app/components/Math";

export default async function Home() {
  return (
    <>
      <h1>Chapter 3</h1>
      <h2>Dial&apos;s Algorithm</h2>
      <p>
        Dial&apos;s algorithm is an optimization of Dijkstra&apos;s algorithm
        designed for graphs with bounded, small integer edge weights. It avoids
        the use of priority queues by using a simple array of buckets, one for
        each possible distance value up to a maximum budget{" "}
        <InlineCitation citation={Dial1969} page={632} />. This results in a
        significant performance gain in both theoretical and practical terms
        when the query budget <InlineMath math="b" /> is small.
      </p>
      <p>
        In our setting, we are interested in shortest paths <b>to</b> the query
        point from all possible listing locations, but only up to a fixed
        maximum travel time budget <InlineMath math="b" />. Dial&apos;s
        algorithm is well-suited for this scenario because we do not need to
        explore beyond this travel time, and the use of buckets allows for fast
        access to the next node to visit.
      </p>
      <h3>Formal Algorithm Description</h3>
      <p>
        The algorithm maintains an array of buckets indexed by distance. Each
        bucket stores nodes whose tentative distance to the query point equals
        that index. We iterate through the buckets in increasing order, visiting
        nodes in the current bucket and exploring their <b>incoming edges</b>.
      </p>
      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/3-dial/dial-pseudocode.txt"
      />
      <p>
        As in the adapted Dijkstra&apos;s algorithm, note that we explore{" "}
        <b>incoming edges</b> at each step, to find shortest paths to the query
        point.
      </p>
      <h3>Time Complexity</h3>
      <p>
        The time complexity of Dial&apos;s algorithm is{" "}
        <InlineMath math="\mathcal{O}(V + E + b)" />, where{" "}
        <InlineMath math="E" /> is the number of edges, <InlineMath math="V" />{" "}
        is the number of vertices, and <InlineMath math="b" /> is the maximum
        distance budget.
      </p>
      <p>
        This is because each node is processed at most once, each edge is
        considered at most once, and each bucket is accessed at most once. This
        is a substantial improvement over Dijkstra&apos;s{" "}
        <InlineMath math="\mathcal{O}((E + V)\log V)" /> complexity when using
        standard binary heaps{" "}
        <InlineCitation citation={Cormen2009} page={506} />, assuming a low{" "}
        <InlineMath math="b" />.
      </p>
      <p>
        Importantly, this improvement hinges on the assumption that edge weights
        and the budget <InlineMath math="b" /> are reasonably small, which holds
        in our real-world application. For unbounded edge weights or unbounded
        time budgets <InlineMath math="b" />, Dial&apos;s algorithm is not
        applicable.
      </p>
      <h3>Space Complexity</h3>{" "}
      <p>
        The space complexity of Dial&apos;s algorithm arises from three main
        components: the bucket array, the graph representation, and the visited
        node map. The bucket array contains <InlineMath math="b + 1" /> buckets,
        where <InlineMath math="b" /> is the maximum distance budget. In the
        worst case, each edge can cause its target vertex to be placed in a
        bucket, leading to <InlineMath math="\mathcal{O}(E)" /> total bucket
        entries. Thus, the bucket array requires{" "}
        <InlineMath math="\mathcal{O}(E + b)" /> space.{" "}
      </p>
      <p>
        The graph, stored in adjacency list form, uses{" "}
        <InlineMath math="\mathcal{O}(V + E)" /> space. Additionally,
        maintaining the visited map requires{" "}
        <InlineMath math="\mathcal{O}(V)" /> space to track the shortest
        distance (and possibly parent) for each vertex.{" "}
      </p>
      <p>
        Summing all components, the overall space complexity of Dial&apos;s
        algorithm is <InlineMath math="\mathcal{O}(V + E + b)" />.
      </p>
      <h2>Visualization and Implementation</h2>
      <p>
        Below is a sample TypeScript implementation of Dial&apos;s algorithm,
        and an interactive visualization that demonstrates how it operates on a
        small graph.
      </p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/3-dial/dial.ts"
        defaultCollapsed
      />
      <DialVisualizer />
      <h2>Empirical Performance</h2>
      <p>
        In practice, Dial&apos;s algorithm significantly reduces query time
        compared to Dijkstra&apos;s algorithm. The bar chart below shows the
        average query time using both algorithms, demonstrating a speedup of
        nearly 3× when using Dial&apos;s approach.
      </p>
      <FlatfalconBarChart dataType="Query" algorithms={["Dijkstra", "Dial"]} />
    </>
  );
}
