import BarChart from "@/app/components/BarChart";
import { ContractedUpDownGraph } from "../5-contraction-hierarchies-introduction/ContractedGraph";
import {
  queryPerformance,
  setupPerformance,
  TestingMethodologyNotes,
} from "../results";

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
          {
            name: "HubLabelsSearcher",
            times: setupPerformance["CHLabel"],
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
          {
            name: "HubLabelsSearcher",
            times: queryPerformance["CHLabel"],
          },
        ]}
        notes={<TestingMethodologyNotes />}
      />
    </>
  );
}
