import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CodeBlock from "@/app/components/CodeBlock";
import { DialVisualizer } from "./DialVisualizer";
import BarChart from "@/app/components/BarChart";
import {
  queryPerformance,
  testingMethodologyNotes,
} from "@/content/blog/flatfalcon/results";

export default async function Home() {
  return (
    <>
      <h1>Chapter 3</h1>
      <h2>Dial&apos;s Algorithm</h2>

      <p>
        Dial&apos;s Algorithm doesn&apos;t really address any of the core issues
        we had with Dijkstra, but it&apos;s quite a neat optimization and quite
        a bit faster for basically free, which is why I want to show it to you.
      </p>

      <p>
        The core insight is that our users will realistically only care about
        listings that are within a certain distance from the query point. Nobody
        wants to live 10h from where they work. We can use this to our advantage
        and, instead of using a Min Heap to store the nodes we want to visit
        next, we can use a simple array of buckets, where each bucket
        corresponds to a distance from the query point. We can then simply
        iterate through the buckets in order, visiting all nodes that are within
        the distance of the current bucket.
      </p>

      <p>An example implementation in TypeScript can be found below.</p>

      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/3-dial/dial.ts"
      />

      <DialVisualizer />

      <p>
        How does this compare asymptotically to Dijkstra? The theoretical worst
        case complexity is O(E + V + B), where E is the number of edges, V is
        the number of vertices in the graph and B the &quot;Maximum Query
        Budget&quot;. This is because we only visit each node once and we only
        visit each edge once. Further we visit every bucket at most once. This
        is a significant improvement over Dijkstra, which has a complexity of
        O(E + V log V) in the worst case.
      </p>

      <p>
        We also see a nice drop in real world query performance. Using
        Dial&quot;s Algorithm we are almost three times faster than if we used a
        more traditional MinHeap.
      </p>

      <BarChart
        unit="ms"
        title="Average Query Time (NYC)"
        bars={[
          { name: "DijkstraSearcher", time: queryPerformance["Dijkstra"] },
          { name: "DialSearcher", time: queryPerformance["Dial"] },
        ]}
        notes={testingMethodologyNotes}
      />
    </>
  );
}
