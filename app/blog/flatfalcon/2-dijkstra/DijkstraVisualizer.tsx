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
import { AlgorithmStep } from "@/app/components/interactive_examples/AlgorithmVisualizer";

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
  const [, setIsDone] = useState(false);

  const dijkstraRef = useRef<Dijkstra | null>(null);

  const reset = useCallback(() => {
    setGraph(initialGraph);
    dijkstraRef.current = new Dijkstra(initialGraph, "A");
    setStepData(null);
    setIsDone(false);
  }, [initialGraph]);

  const step = async () => {
    if (!dijkstraRef.current) return;
    const { done, value } = dijkstraRef.current.run().next();
    setIsDone(done ?? false);
    setStepData(value ?? null);
  };

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!stepData) return;

    const { state } = stepData;
    setGraph((prevGraph) => {
      const newGraph = prevGraph.clone();
      const { visited } = state;

      // mark all nodes
      newGraph.nodes.forEach((node) => {
        if (visited[node.id] !== undefined) {
          node.data.variant = "success";
        } else {
          node.data.variant = "secondary";
        }
        if (node.id === state.currentNode) {
          node.data.variant = "primary";
        }
      });

      // mark edges
      newGraph.edges.forEach((edge) => {
        if (edge.from === state.currentNode) {
          edge.data.variant = "primary";
        } else {
          edge.data.variant = "secondary";
        }
      });

      return newGraph;
    });
  }, [stepData]);

  return (
    <div className="flex flex-col space-y-2">
      <ControlBar
        reset={reset}
        run={() => {
          console.log("Running Dijkstra's algorithm...");
        }}
        step={step}
      />
      <div className="text-sm text-muted-foreground">
        {stepData
          ? stepData.description
          : "Click 'Run' to start the algorithm."}
      </div>
      <GraphVisualizer graph={graph} />
    </div>
  );
};
