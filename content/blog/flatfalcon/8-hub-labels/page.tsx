import { ContractionHierarchyListingSetupVisualizer } from "../7-contraction-hierarchies-listing-query/ContractionHierarchyListingSetup";
import { FlatfalconBarChart } from "../results";
import { ContractionHierarchyListingUpSetupVisualizer } from "./ContractionHierarchyListingUpSetup";

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
