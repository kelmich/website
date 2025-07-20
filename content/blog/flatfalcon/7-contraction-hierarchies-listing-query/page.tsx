import BarChart from "@/app/components/BarChart";
import { ContractedUpDownGraph } from "../5-contraction-hierarchies-introduction/ContractedGraph";
import { FlatfalconBarChart } from "../results";
import { ContractionHierarchyListingSetupVisualizer } from "./ContractionHierarchyListingSetup";
import { ContractionHierarchyListingQueryVisualizer } from "./ContractionHierarchyListingQuery";

export default async function Home() {
  return (
    <>
      <h1>Chapter 7</h1>
      <h2>Contraction Hierarchies Listing Query</h2>

      <p>
        Now that we have a good understand of contraction hierarchies we can get
        to how they can help us for our listing problem. Recall that we have our
        up and down DAG
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
        concurrently using established shortest path algorithms.
      </p>
      <ContractionHierarchyListingSetupVisualizer />
      <p>
        Once we have computed all of the labels for each vertex in the up DAG,
        we can use them when we perform our regular shortest path algorithm on
        the up DAG. Whenever we visit a vertex we now use the vertex's label to
        update our results.
      </p>
      <ContractionHierarchyListingQueryVisualizer />

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
