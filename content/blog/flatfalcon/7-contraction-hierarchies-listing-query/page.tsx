import BarChart from "@/app/components/BarChart";
import { ContractedUpDownGraph } from "../5-contraction-hierarchies-introduction/ContractedGraph";
import {
  queryPerformance,
  setupPerformance,
  TestingMethodologyNotes,
} from "../results";
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

      <ContractionHierarchyListingQueryVisualizer />

      <BarChart
        unit="ms"
        title="Average Setup Time (NYC)"
        bars={[
          { name: "DijkstraSearcher", times: setupPerformance["Dijkstra"] },
          { name: "DialSearcher", times: setupPerformance["Dial"] },
          {
            name: "SmartStupidSearcher",
            times: setupPerformance["SmartStupid"],
          },
          {
            name: "ContractionHierarchiesSearcher",
            times: setupPerformance["CH"],
          },
        ]}
        notes={<TestingMethodologyNotes />}
      />

      <BarChart
        unit="ms"
        title="Average Query Time (NYC)"
        bars={[
          { name: "DijkstraSearcher", times: queryPerformance["Dijkstra"] },
          { name: "DialSearcher", times: queryPerformance["Dial"] },
          {
            name: "SmartStupidSearcher",
            times: queryPerformance["SmartStupid"],
          },
          {
            name: "ContractionHierarchiesSearcher",
            times: queryPerformance["CH"],
          },
        ]}
        notes={<TestingMethodologyNotes />}
      />
    </>
  );
}
