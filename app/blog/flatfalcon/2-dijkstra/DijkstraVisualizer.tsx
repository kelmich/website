"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import { AlgorithmStep } from "@/app/components/interactive_examples/AlgorithmVisualizer";
import { MinHeapVisualizer } from "@/app/components/interactive_examples/MinHeapVisualizer";

export const DijkstraVisualizer = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 0, variant: "primary" } },
          { id: "B", data: { x: 150, y: 0, variant: "secondary" } },
          { id: "C", data: { x: 0, y: 200, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 200, variant: "secondary" } },
          { id: "E", data: { x: 300, y: 100, variant: "secondary" } },
        ],
        [
          { from: "A", to: "B", weight: 5, data: { variant: "secondary" } },
          { from: "B", to: "A", weight: 5, data: { variant: "secondary" } },

          { from: "A", to: "C", weight: 1, data: { variant: "secondary" } },
          { from: "C", to: "A", weight: 1, data: { variant: "secondary" } },

          { from: "C", to: "D", weight: 2, data: { variant: "secondary" } },
          { from: "D", to: "C", weight: 2, data: { variant: "secondary" } },

          { from: "E", to: "B", weight: 1, data: { variant: "secondary" } },
          { from: "E", to: "D", weight: 1, data: { variant: "secondary" } },

          // { from: "A", to: "C", weight: 1, data: { variant: "secondary" } },
          // { from: "C", to: "A", weight: 1, data: { variant: "secondary" } },
        ],
      ),
    [],
  );
  const [graph, setGraph] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(initialGraph);
  const [stepData, setStepData] = useState<AlgorithmStep<DijkstraState> | null>(
    null,
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
      Object.entries(state.visited).forEach(([nodeId, [, parentId]]) => {
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
      <div className="flex flex-row h-[400px] divide-x">
        <div className="flex-1 overflow-auto">
          <GraphVisualizer graph={graph} />
        </div>
        <div className="w-[300px] overflow-auto">
          {stepData?.state.minHeap && (
            <MinHeapVisualizer minHeap={stepData.state.minHeap} />
          )}
        </div>
      </div>
      {stepData?.message && (
        <div className="p-4 bg-background text-background-foreground text-sm">
          {stepData?.message}
        </div>
      )}
    </div>
  );
};
