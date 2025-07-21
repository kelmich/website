import CodeBlock from "@/app/components/CodeBlock";
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
      <p>Now the query works like so</p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/8-hub-labels/hubLabel.ts"
      />
      <HubLabelVisualizer />
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
