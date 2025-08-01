import { CodeBlock } from "@/app/components/code_renderer/CodeBlock";
import { ContractionHierarchyListingSetupVisualizer } from "../7-contraction-hierarchies-listing-query/ContractionHierarchyListingSetup";
import { FlatfalconBarChart } from "../results";
import { ContractionHierarchyListingUpSetupVisualizer } from "./ContractionHierarchyListingUpSetup";
import { HubLabelVisualizer } from "./HubLabelVisualizer";

export default async function Home() {
  return (
    <>
      <h1>Chapter 8</h1>
      <h2>Hub Labels</h2>
      <p>
        There is one more way we can improve upon the contraction hierarchies
        method. We can use it to bootstrap a hub label approach. In essence both
        methods are similar, hub labelling in our case is simply eliminating the
        query time forward dijkstra search in favor of a precomputed hub label
        assignment.
      </p>
      <p>Recall that we computed labels for each node in the down DAG.</p>
      <ContractionHierarchyListingSetupVisualizer />
      <p>
        We can now do the same for the up DAG, but we store all vertices in the
        label that are reachable in our maximum time budget.
      </p>
      <ContractionHierarchyListingUpSetupVisualizer />
      <p>
        Now our query time algorithm simply has to go do memory lookups. First
        we check all hub nodes that are within our time budget in the up label,
        then for each of those we go look at the listings stored in the down
        label.
      </p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/8-hub-labels/hubLabel.ts"
      />
      <p>
        The process for finding listings from Vertex B would look as follows.
      </p>
      <HubLabelVisualizer />
      <p>
        While we pay a bit more to set this data structure up, it is still very
        much a managable price. Note that we would expect the number of vertices
        we need to store for each node to remain approximately constant no
        matter the size of the graph. This is because we do not need to store
        vertices that are further away than our maximum time budget, because any
        listings we would find by going through those far away vertices would
        also be too far away to be of interest. This means storage is
        Asymptotically linear in the number of vertices. Query time is
        Asymptotically the square of the maximum label size in the system.
      </p>
      <p>
        Another nice advantage of this data structure is that it can be
        implemented very nicely in most SQL databases using joins.
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
