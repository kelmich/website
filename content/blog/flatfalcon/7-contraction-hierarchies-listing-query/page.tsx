import { ContractedUpDownGraph } from "../5-contraction-hierarchies-introduction/ContractedGraph";

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
        target in the down DAG. For our listing query we will now simply store
        the listings that are reachable from a node in the up DAG.
      </p>
    </>
  );
}
