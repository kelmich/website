"use client";
import React, { useEffect, useMemo, useState } from "react";
import GraphVisualizer, {
  VisualizationEdgeData,
  VisualizationNodeData,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";
import { Graph } from "@/app/algorithms/graph";
import { AlgorithmStep } from "@/app/components/interactive_examples/AlgorithmVisualizer";
import { MessageRenderer } from "@/app/components/interactive_examples/MessageRenderer";
import { Contractor, ContractorState } from "./contraction_hierarchies";

export const ContractionVisualizer = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 0, variant: "secondary" } },
          {
            id: "B",
            data: { x: 200, y: 0, variant: "secondary" },
          },
          { id: "C", data: { x: 100, y: 0, variant: "primary" } },
          { id: "D", data: { x: 100, y: 300, variant: "secondary" } },
        ],
        [
          { from: "C", to: "A", weight: 1, data: { variant: "secondary" } },
          { from: "D", to: "C", weight: 3, data: { variant: "secondary" } },
          { from: "C", to: "B", weight: 2, data: { variant: "secondary" } },
          { from: "D", to: "B", weight: 8, data: { variant: "secondary" } },
        ],
        () => { return { variant: "secondary" } }
      ),
    []
  );

  const [graph, setGraph] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(initialGraph);

  const [stepData, setStepData] = useState<AlgorithmStep<ContractorState<VisualizationNodeData, VisualizationEdgeData>> | null>(
    null
  );

  useEffect(() => {
    if (!stepData) return;
    const { state } = stepData;

    setGraph(() => {
      // Create a shallow copy of the graph to avoid mutating state directly
      const newGraph = state.graph.clone();

      newGraph.edges.forEach((edge) => {
        if (state.inEdge?.from === edge.from && state.inEdge?.to === edge.to) {
          edge.data.variant = "primary";
        } else if (state.outEdge?.from === edge.from && state.outEdge?.to === edge.to) {
          edge.data.variant = "primary";
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
          return new Contractor(initialGraph, "C")
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col">
        <GraphVisualizer graph={graph} straightEdges />
      </div>

      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
