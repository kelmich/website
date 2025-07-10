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
import { Contractor, ContractorState } from "../5-contraction-hierarchies-introduction/contractor";

export const ContractionNightmare = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 0, variant: "secondary" } },
          {
            id: "B",
            data: { x: 150, y: 0, variant: "secondary" },
          },
          { id: "C", data: { x: 0, y: 200, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 200, variant: "secondary" } },
          {
            id: "E",
            data: { x: 75, y: 100, variant: "primary" },
          },
        ],
        [
          { from: "A", to: "E", weight: 5, data: { variant: "secondary" } },
          { from: "E", to: "A", weight: 5, data: { variant: "secondary" } },
          { from: "B", to: "E", weight: 3, data: { variant: "secondary" } },
          { from: "E", to: "B", weight: 3, data: { variant: "secondary" } },
          { from: "C", to: "E", weight: 6, data: { variant: "secondary" } },
          { from: "E", to: "C", weight: 6, data: { variant: "secondary" } },
          { from: "D", to: "E", weight: 2, data: { variant: "secondary" } },
          { from: "E", to: "D", weight: 3, data: { variant: "secondary" } },
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
          return new Contractor(initialGraph, ["E"])
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col">
        <GraphVisualizer graph={graph} id="contractionHierarchy" edgeBendAmount={0.1} />
      </div>

      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};

export const ContractionDream = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 0, variant: "secondary" } },
          {
            id: "B",
            data: { x: 150, y: 0, variant: "secondary" },
          },
          { id: "C", data: { x: 0, y: 200, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 200, variant: "secondary" } },
          {
            id: "E",
            data: { x: 75, y: 100, variant: "primary" },
          },
        ],
        [
          { from: "A", to: "E", weight: 5, data: { variant: "secondary" } },
          { from: "E", to: "A", weight: 5, data: { variant: "secondary" } },
          { from: "B", to: "E", weight: 3, data: { variant: "secondary" } },
          { from: "E", to: "B", weight: 3, data: { variant: "secondary" } },
          { from: "C", to: "E", weight: 6, data: { variant: "secondary" } },
          { from: "E", to: "C", weight: 6, data: { variant: "secondary" } },
          { from: "D", to: "E", weight: 2, data: { variant: "secondary" } },
          { from: "E", to: "D", weight: 3, data: { variant: "secondary" } },
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
          return new Contractor(initialGraph, ["A", "B", "C", "D", "E"])
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col">
        <GraphVisualizer graph={graph} id="contractionHierarchy" edgeBendAmount={0.1} />
      </div>

      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
