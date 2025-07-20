import { FlatfalconBarChart } from "../results";

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
