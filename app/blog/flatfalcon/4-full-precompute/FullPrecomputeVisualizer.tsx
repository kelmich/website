"use client";
import React, { useEffect, useMemo, useState } from "react";
import GraphVisualizer, {
  VisualizationEdgeData,
  VisualizationNodeData,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";
import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  ConcurrentVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";
import {
  Dijkstra,
  DijkstraState,
} from "@/app/blog/flatfalcon/2-dijkstra/dijkstra";
import { ResultVisualizer } from "@/app/components/interactive_examples/ResultVisualizer";
import { GraphLegend } from "@/app/components/interactive_examples/GraphLegend";
import { MessageRenderer } from "@/app/components/interactive_examples/MessageRenderer";

export const FullPrecomputeVisualizer = () => {
  const initialGraphA = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 0, variant: "secondary" } },
          {
            id: "B",
            data: { x: 150, y: 0, variant: "primary", shape: "rect" },
          },
          { id: "C", data: { x: 0, y: 200, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 200, variant: "secondary" } },
          {
            id: "E",
            data: { x: 300, y: 100, variant: "secondary", shape: "rect" },
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
        ]
      ),
    []
  );
  const initialGraphB = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 0, variant: "secondary" } },
          {
            id: "B",
            data: { x: 150, y: 0, variant: "secondary", shape: "rect" },
          },
          { id: "C", data: { x: 0, y: 200, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 200, variant: "secondary" } },
          {
            id: "E",
            data: { x: 300, y: 100, variant: "primary", shape: "rect" },
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
        ]
      ),
    []
  );
  const [graphA, setGraphA] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(
      initialGraphA
    );
  const [graphB, setGraphB] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(
      initialGraphB
    );
  const [stepData, setStepData] = useState<AlgorithmStep<
    [DijkstraState, DijkstraState]
  > | null>(null);

  useEffect(() => {
    if (!stepData) return;
    const { state } = stepData;
    const [stateA, stateB] = state;
    for (const [setGraph, state] of [
      [setGraphA, stateA],
      [setGraphB, stateB],
    ] as const) {
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
    }
  }, [stepData]);

  return (
    <div className="flex flex-col border divide-y">
      <ControlBar
        executorFactory={() => {
          return new ConcurrentVisualizer<DijkstraState, DijkstraState>(
            new Dijkstra(initialGraphA, "B", false),
            new Dijkstra(initialGraphB, "E", false)
          );
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col divide-y">
        <div className="flex-1 overflow-auto">
          <div className="flex flex-row">
            <GraphVisualizer graph={graphA} id="graphA" />
            <GraphVisualizer graph={graphB} id="graphB" />
          </div>
          <GraphLegend />
        </div>
        <div className="w-full overflow-auto bg-background text-background-foreground">
          <table className="min-w-full text-sm divide-y table-fixed">
            <thead>
              <tr className="bg-muted divide-x">
                <th className="px-2 py-1 text-left w-20">From \ To</th>
                {Array.from(initialGraphA.nodes).map((node) => (
                  <th
                    key={node.id}
                    className="px-2 py-1 text-center w-20"
                  >
                    {node.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr className="odd:bg-background even:bg-muted divide-x">
                <td className="px-2 py-1 font-bold">B</td>
                {Array.from(initialGraphA.nodes).map((node) => {
                  const weightA =
                    stepData?.state[0].visited[node.id]?.[0] ?? "∞";
                  return (
                    <td
                      key={node.id}
                      className="px-2 py-1 text-center font-mono w-20"
                    >
                      {weightA}
                    </td>
                  );
                })}
              </tr>
              <tr className="odd:bg-background even:bg-muted divide-x">
                <td className="px-2 py-1 font-bold">E</td>
                {Array.from(initialGraphA.nodes).map((node) => {
                  const weightB =
                    stepData?.state[1].visited[node.id]?.[0] ?? "∞";
                  return (
                    <td
                      key={node.id}
                      className="px-2 py-1 text-center font-mono w-20"
                    >
                      {weightB}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>

        </div>


      </div>
      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
