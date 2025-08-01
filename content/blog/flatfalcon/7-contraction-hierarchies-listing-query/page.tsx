import { ContractedUpDownGraph } from "../5-contraction-hierarchies-introduction/ContractedGraph";
import { FlatfalconBarChart } from "../results";
import { ContractionHierarchyListingSetupVisualizer } from "./ContractionHierarchyListingSetup";
import { ContractionHierarchyListingQueryVisualizer } from "./ContractionHierarchyListingQuery";
import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";

export default async function Home() {
  return (
    <>
      <h1>Chapter 7</h1>
      <h2>Contraction Hierarchies Listing Query</h2>

      <p>
        Now that we have a good understand of contraction hierarchies we can get
        to how they can help us for our listing problem. Recall that we have our
        up and down DAG (darker edges are shortcuts we added).
      </p>
      <ContractedUpDownGraph />
      <p>
        In order to compute a point to point shortest path query we started a
        bidirectional dijkstra from the source vertex in the up DAG and the
        target in the down DAG. For our listing query, we simply store all
        listings that are reachable from a vertex in the up DAG, by traversing
        the down DAG within the allowed maximum time budget.
      </p>
      <p>
        Again, this is a parallelizable problem, we can do this for listings
        concurrently.
      </p>
      <p>
        Another interesting thing we can do is use the fact that our graph is a
        DAG, and we can use a topological sort to visit all vertices in the up
        DAG in order. This way we avoid having to use a min heap and can gain
        some performance.
      </p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/dagShortestPath.ts"
      />
      <ContractionHierarchyListingSetupVisualizer />
      <p>
        Once we have computed all of the labels for each vertex in the up DAG,
        we can use them when we perform our regular shortest path algorithm on
        the up DAG. Whenever we visit a vertex we now use the vertex's label to
        update our results.
      </p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/7-contraction-hierarchies-listing-query/ContractionHierarchyListingQuery.tsx"
      />
      <ContractionHierarchyListingQueryVisualizer />

      <p>
        The performance results are quite encouraging. We have now reached a
        level of performance where the query time is negligible in comparison to
        the time it takes for a request to traverse the network. Further we
        didn&apos;t have to wait minutes to compute the data structure. We were
        ready in seconds.
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
