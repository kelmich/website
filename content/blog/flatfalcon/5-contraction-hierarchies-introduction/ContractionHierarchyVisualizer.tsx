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
import { Contractor, ContractorState } from "./contractor";

export const ContractionHierarchyVisualizer = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: -50, y: -50, variant: "secondary" } },
          {
            id: "B",
            data: { x: 200, y: -50, variant: "secondary" },
          },
          { id: "C", data: { x: -50, y: 250, variant: "secondary" } },
          { id: "D", data: { x: 200, y: 250, variant: "secondary" } },
          {
            id: "E",
            data: { x: 400, y: 100, variant: "secondary" },
          },
        ],
        [
          { from: "A", to: "B", weight: 5, data: { variant: "secondary" } },
          { from: "B", to: "A", weight: 5, data: { variant: "secondary" } },
          { from: "A", to: "C", weight: 1, data: { variant: "secondary" } },
          { from: "C", to: "A", weight: 1, data: { variant: "secondary" } },
          { from: "C", to: "D", weight: 2, data: { variant: "secondary" } },
          { from: "D", to: "C", weight: 2, data: { variant: "secondary" } },
          { from: "E", to: "B", weight: 1, data: { variant: "secondary" } },
          { from: "D", to: "E", weight: 1, data: { variant: "secondary" } },
        ],
        () => {
          return { variant: "secondary" };
        },
      ),
    [],
  );

  const [graph, setGraph] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(initialGraph);

  const [stepData, setStepData] = useState<AlgorithmStep<
    ContractorState<VisualizationNodeData, VisualizationEdgeData>
  > | null>(null);

  useEffect(() => {
    if (!stepData) return;
    const { state } = stepData;

    setGraph(() => {
      const newGraph = state.graph.clone();

      newGraph.edges.forEach((edge) => {
        if (state.inEdge?.from === edge.from && state.inEdge?.to === edge.to) {
          edge.data.variant = "primary";
        } else if (
          state.outEdge?.from === edge.from &&
          state.outEdge?.to === edge.to
        ) {
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
          return new Contractor(initialGraph, ["A", "B", "C", "D", "E"]);
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col">
        <GraphVisualizer
          graph={graph}
          id="contractionHierarchy"
          edgeBendAmount={0.15}
        />
      </div>

      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
