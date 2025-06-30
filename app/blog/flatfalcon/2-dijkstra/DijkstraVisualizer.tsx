"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import GraphVisualizer, {
  VisualizationEdgeData,
  VisualizationNodeData,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";
import { Graph } from "@/app/algorithms/graph";
import {
  Dijkstra,
  DijkstraState,
} from "@/app/blog/flatfalcon/2-dijkstra/dijkstra";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export const DijkstraVisualizer = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 100, y: 200, variant: "primary" } },
          { id: "B", data: { x: 200, y: 100, variant: "secondary" } },
          { id: "C", data: { x: 200, y: 300, variant: "secondary" } },
          { id: "D", data: { x: 300, y: 200, variant: "secondary" } },
          { id: "E", data: { x: 400, y: 100, variant: "secondary" } },
          { id: "F", data: { x: 400, y: 300, variant: "secondary" } },
          { id: "G", data: { x: 500, y: 60, variant: "secondary" } },
          { id: "H", data: { x: 550, y: 200, variant: "secondary" } },
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
      ),
    []
  );
  const [graph, setGraph] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(initialGraph);
  const [stepData, setStepData] = useState<AlgorithmStep<DijkstraState> | null>(
    null
  );

  useEffect(() => {
    if (!stepData) return;
    const { state } = stepData;
    setGraph((prevGraph) => {
      const newGraph = prevGraph.clone();

      newGraph.nodes.forEach((node) => {
        if (node.id in state.visited) {
          node.data.variant = "success";
        } else if (state.currentNode === node.id) {
          node.data.variant = "primary";
        } else {
          node.data.variant = "secondary";
        }
      });

      const usedEdges = new Set<string>();
      Object.entries(state.visited).forEach(([nodeId, [_, parentId]]) => {
        if (parentId !== null && parentId !== undefined) {
          usedEdges.add(`${parentId}-${nodeId}`);
        }
      });

      newGraph.edges.forEach((edge) => {
        if (state.currentNode === edge.from) {
          edge.data.variant = "primary";
        } else if (usedEdges.has(`${edge.from}-${edge.to}`)) {
          edge.data.variant = "success";
        } else {
          edge.data.variant = "secondary";
        }
      });

      return newGraph;
    });
  }, [stepData]);

  return (
    <div className="flex flex-col border divide-y">
      <ControlBar
        executorFactory={() => {
          return new Dijkstra(initialGraph, "A");
        }}
        onStep={setStepData}
      />
      <GraphVisualizer graph={graph} />
      {stepData?.message && (
        <div className="p-4 bg-background text-background-foreground text-sm">
          {stepData?.message}
        </div>
      )}
    </div>
  );
};
