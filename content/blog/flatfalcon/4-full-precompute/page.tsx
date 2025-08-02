import { InlineMath } from "@/app/components/Math";
import { FullPrecomputeVisualizer } from "./FullPrecomputeVisualizer";
import { FlatfalconBarChart } from "@/content/blog/flatfalcon/results";
import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";

export default async function Home() {
  return (
    <>
      <h1>Chapter 4</h1>
      <h2>Complete Precomputation</h2>

      <p>
        In pursuit of optimal query performance, one approach stands out for its
        speed at query time: complete precomputation of all possible query
        results. This method ensures that the answer to any valid query can be
        retrieved in optimal time via a simple lookup. Although the approach
        demands considerable computational and memory resources during the setup
        phase, its query-time performance is exceptional.
      </p>

      <p>
        A significant advantage of this approach is the inherent parallelism in
        the setup process. Specifically, we can execute a forward Dijkstra
        search from each listing node in parallel, storing the shortest path
        distances to all other nodes in a lookup table of size{" "}
        <InlineMath math="\mathcal{O}(L \cdot V)" />, where{" "}
        <InlineMath math="L" /> denotes the number of listings and{" "}
        <InlineMath math="V" /> is the total number of vertices in the graph.
      </p>

      <h3>Algorithm Description</h3>
      <p>
        The setup phase of the FullPrecompute approach computes the shortest
        path distance from each listing to all reachable vertices in the graph.
        These distances are stored in a lookup table. Once the table is
        constructed, it is sorted in ascending order of the shortest path
        distances.
      </p>

      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/4-full-precompute/full-precompute-setup-pseudocode.txt"
      />

      <p>
        At query time, we read the lookup table until the travel time exceeds
        the maximum allowed travel time.
      </p>

      <CodeBlock
        lang="py"
        filepath="./content/blog/flatfalcon/4-full-precompute/full-precompute-query-pseudocode.txt"
      />

      {/*<FullPrecomputeVisualizer />*/}

      <h3>Time Complexity</h3>
      <p>
        The setup phase requires executing a shortest path algorithm from each
        listing node. Assuming Dijkstra's algorithm is used with a binary heap,
        the time complexity for one listing is{" "}
        <InlineMath math="\mathcal{O}((V + E) \log V)" />, where{" "}
        <InlineMath math="V" /> is the number of vertices and{" "}
        <InlineMath math="E" /> is the number of edges. For{" "}
        <InlineMath math="L" /> listings, the total setup time is{" "}
        <InlineMath math="\mathcal{O}(L \cdot (V + E) \log V)" />. Note that
        this step is highly parallelizable, and can be reduced by a factor of{" "}
        <InlineMath math="\frac{1}{\text{num\_threads}}" />.
      </p>

      <p>
        The query phase is output sensitive, meaning the time complexity depends
        on the number of output listings. This is optimal, an algorithm must at
        the very least output the result it computes. If <InlineMath math="R" />{" "}
        denotes the result set, then the time complexity is{" "}
        <InlineMath math="\mathcal{O}(R)" />.
      </p>

      <h3>Space Complexity</h3>
      <p>
        The primary space cost arises from storing the precomputed distances.
        Each listing requires a table entry for every vertex in the graph,
        resulting in a total space complexity of{" "}
        <InlineMath math="\mathcal{O}(L \cdot V)" />. In addition to this, the
        graph itself must also be stored in memory, which requires{" "}
        <InlineMath math="\mathcal{O}(V + E)" /> space. Therefore, the overall
        space requirement is <InlineMath math="\mathcal{O}(L \cdot V + E)" />.
      </p>

      <p>
        To illustrate this with a real-world example, consider New York City,
        where there are approximately 17,000 listings. The graph representing
        the city occupies approximately 3.6MB of memory. Storing the shortest
        path information for each listing yields a total memory requirement of{" "}
        <InlineMath math="3.6\,\text{MB} \times 17{,}000 \approx 61{,}200\,\text{MB} \approx 60\,\text{GB}" />
        .
      </p>

      <h3>Empirical Performance</h3>
      <p>
        In practice, the full precomputation setup takes approximately five
        minutes to complete on our dataset. For benchmarking purposes, this
        process was repeated 100 times to compute confidence intervals. During
        testing, it is likely that FullPrecompute was throttled, leading to a
        total benchmark runtime of approximately 24 hours, primarily due to the
        setup overhead.
      </p>

      <FlatfalconBarChart
        dataType="Setup"
        algorithms={["Dijkstra", "Dial", "FullPrecompute"]}
      />

      <p>
        Despite its long setup time, FullPrecompute offers unparalleled query
        performance. In our experiments, it was approximately 1,000 times faster
        than the Dial algorithm at query time.
      </p>

      <FlatfalconBarChart
        dataType="Query"
        algorithms={["Dijkstra", "Dial", "FullPrecompute"]}
      />

      <p>
        Whether such query performance is necessary depends on the application
        context. In scenarios where queries are invoked frequently and response
        time is critical, this approach may be justified. However, in our use
        case, where query responses are transmitted over a network, the benefit
        of such speed is diminished due to the dominance of network latency in
        total response time.
      </p>

      <p>
        Consequently, we seek alternative methods that offer a better balance
        between setup time, memory usage, and query performance. The next
        chapter introduces such a method.
      </p>
    </>
  );
}
