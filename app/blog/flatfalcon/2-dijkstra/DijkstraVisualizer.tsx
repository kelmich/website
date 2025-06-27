import GraphVisualizer, { Graph } from "@/app/components/GraphVisualizer";

export const DijkstraVisualizer = () => {
  const dijkstraGraph: Graph = {
    nodes: [
      {
        id: "A",
        x: 100,
        y: 100,
        variant: "primary",
      },
      {
        id: "B",
        x: 200,
        y: 50,
        variant: "secondary",
      },
      {
        id: "C",
        x: 200,
        y: 150,
        variant: "primary",
      },
      {
        id: "D",
        x: 300,
        y: 100,
        variant: "primary",
      },
      {
        id: "E",
        x: 400,
        y: 50,
        variant: "primary",
      },
      {
        id: "F",
        x: 400,
        y: 150,
        variant: "primary",
      },
      {
        id: "G",
        x: 500,
        y: 30,
        variant: "primary",
      },
      {
        id: "H",
        x: 500,
        y: 170,
        variant: "primary",
      },
    ],
    edges: [
      { from: "A", to: "B", weight: 2, variant: "secondary" },
      { from: "A", to: "C", weight: 4, variant: "primary" },
      { from: "B", to: "D", weight: 7, variant: "secondary" },
      { from: "C", to: "D", weight: 1, variant: "primary" },
      { from: "D", to: "E", weight: 3, variant: "primary" },
      { from: "D", to: "F", weight: 2, variant: "primary" },
      { from: "E", to: "G", weight: 2, variant: "primary" },
      { from: "F", to: "H", weight: 3, variant: "primary" },
      { from: "G", to: "H", weight: 1, variant: "primary" },
    ],
  };

  return <GraphVisualizer graph={dijkstraGraph} />;
};
