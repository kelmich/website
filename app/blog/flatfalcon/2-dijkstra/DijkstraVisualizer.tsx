import GraphVisualizer, { Graph } from "@/app/components/GraphVisualizer";

export const DijkstraVisualizer = () => {
  const nodeUnvisited =
    "fill-secondary stroke-secondary-foreground text-red-300";
  const nodeCurrent = "fill-primary stroke-primary-foreground";
  const nodeVisited = "fill-secondary stroke-secondary-foreground";

  const dijkstraGraph: Graph = {
    nodes: [
      {
        id: "A",
        x: 100,
        y: 100,
        style: nodeCurrent,
      },
      {
        id: "B",
        x: 200,
        y: 50,
        style: nodeUnvisited,
      },
      {
        id: "C",
        x: 200,
        y: 150,
        style: nodeUnvisited,
      },
      {
        id: "D",
        x: 300,
        y: 100,
        style: nodeUnvisited,
      },
      {
        id: "E",
        x: 400,
        y: 50,
        style: nodeUnvisited,
      },
      {
        id: "F",
        x: 400,
        y: 150,
        style: nodeUnvisited,
      },
      {
        id: "G",
        x: 500,
        y: 30,
        style: nodeUnvisited,
      },
      {
        id: "H",
        x: 500,
        y: 170,
        style: nodeUnvisited,
      },
    ],
    edges: [
      { from: "A", to: "B", weight: 2, style: "stroke-gray-500 fill-gray-500" },
      { from: "A", to: "C", weight: 4, style: "stroke-gray-500 fill-gray-500" },
      { from: "B", to: "D", weight: 7, style: "stroke-gray-500 fill-gray-500" },
      { from: "C", to: "D", weight: 1, style: "stroke-gray-500 fill-gray-500" },
      { from: "D", to: "E", weight: 3, style: "stroke-gray-500 fill-gray-500" },
      { from: "D", to: "F", weight: 2, style: "stroke-gray-500 fill-gray-500" },
      { from: "E", to: "G", weight: 2, style: "stroke-gray-500 fill-gray-500" },
      { from: "F", to: "H", weight: 3, style: "stroke-gray-500 fill-gray-500" },
      { from: "G", to: "H", weight: 1, style: "stroke-gray-500 fill-gray-500" },
    ],
  };

  return <GraphVisualizer graph={dijkstraGraph} />;
};
