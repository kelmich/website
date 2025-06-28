"use client";
import React, { useState } from "react";
import GraphVisualizer, {
  VisualizationEdgeData,
  VisualizationNodeData,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";
import { Graph } from "@/app/algorithms/graph";

export const DijkstraVisualizer = () => {
  const initialGraph = new Graph<VisualizationNodeData, VisualizationEdgeData>(
    [
      { id: "A", data: { x: 100, y: 100, variant: "primary" } },
      { id: "B", data: { x: 200, y: 50, variant: "secondary" } },
      { id: "C", data: { x: 200, y: 150, variant: "secondary" } },
      { id: "D", data: { x: 300, y: 100, variant: "secondary" } },
      { id: "E", data: { x: 400, y: 50, variant: "secondary" } },
      { id: "F", data: { x: 400, y: 150, variant: "secondary" } },
      { id: "G", data: { x: 500, y: 30, variant: "secondary" } },
      { id: "H", data: { x: 500, y: 170, variant: "secondary" } },
    ],
    [
      { from: "A", to: "B", weight: 2, data: { variant: "secondary" } },
      { from: "B", to: "A", weight: 3, data: { variant: "secondary" } },
      { from: "A", to: "C", weight: 4, data: { variant: "secondary" } },
      { from: "B", to: "D", weight: 7, data: { variant: "secondary" } },
      { from: "C", to: "D", weight: 1, data: { variant: "secondary" } },
      { from: "D", to: "E", weight: 3, data: { variant: "secondary" } },
      { from: "D", to: "F", weight: 2, data: { variant: "secondary" } },
      { from: "E", to: "G", weight: 2, data: { variant: "secondary" } },
      { from: "F", to: "H", weight: 3, data: { variant: "secondary" } },
      { from: "G", to: "H", weight: 1, data: { variant: "secondary" } },
    ]
  );
  const [graph, setGraph] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(initialGraph);

  return (
    <div className="flex flex-col space-y-2">
      <ControlBar
        reset={() => {
          setGraph(initialGraph);
        }}
        run={() => {
          console.log("Running Dijkstra's algorithm...");
        }}
        step={() => {
          console.log("Stepping through Dijkstra's algorithm...");
        }}
      />
      <GraphVisualizer graph={graph} />
    </div>
  );
};
