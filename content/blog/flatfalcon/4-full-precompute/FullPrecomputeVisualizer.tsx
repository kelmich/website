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
  ConcurrentVisualizer as Parallel,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";
import {
  Dijkstra,
  DijkstraState,
} from "@/content/blog/flatfalcon/2-dijkstra/dijkstra";
import { GraphLegend } from "@/app/components/interactive_examples/GraphLegend";
import { MessageRenderer } from "@/app/components/interactive_examples/MessageRenderer";
import { MinHeap } from "@/app/algorithms/minheap";

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
        ],
      ),
    [],
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
        ],
      ),
    [],
  );
  const [graphA, setGraphA] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(
      initialGraphA,
    );
  const [graphB, setGraphB] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(
      initialGraphB,
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
          // kelmich-highlight-start
          const minHeaps = Object.fromEntries(
            [...initialGraphA.nodes].map((node) => [node.id, new MinHeap()]),
          );
          const distances = new Parallel<DijkstraState, DijkstraState>(
            new Dijkstra(initialGraphA, "B", false, (node, weight) => {
              minHeaps[node].insert({ id: "B", weight });
            }),
            new Dijkstra(initialGraphB, "E", false, (node, weight) => {
              minHeaps[node].insert({ id: "E", weight });
            }),
          );
          for (const minHeap of Object.values(minHeaps)) {
            minHeap.convertToList();
          }
          // kelmich-highlight-end
          return distances;
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col divide-y">
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col sm:flex-row">
            <GraphVisualizer graph={graphA} id="graphA" />
            <GraphVisualizer graph={graphB} id="graphB" />
          </div>
          <GraphLegend />
        </div>
        <div className="w-full overflow-auto bg-background text-background-foreground px-4 pb-4">
          <div className="flex flex-wrap gap-6">
            {Array.from(initialGraphA.nodes).map((node) => {
              // Gather distances from both sources
              const distanceFromB = stepData?.state[0].visited[node.id]?.[0];
              const distanceFromE = stepData?.state[1].visited[node.id]?.[0];

              // Create sorted list of distances
              const distances = [
                { source: "B", distance: distanceFromB },
                { source: "E", distance: distanceFromE },
              ]
                .filter((item) => item.distance !== undefined)
                .sort(
                  (a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity),
                );

              return (
                <div key={node.id} className="min-w-[120px]">
                  <h3 className="font-bold text-center pb-8 text-lg">
                    {node.id}
                  </h3>
                  {distances.length > 0 && (
                    <div className="border divide-y">
                      {distances.map((item, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 flex justify-between items-center"
                        >
                          <span className="font-medium">{item.source}:</span>
                          <span className="font-mono">{item.distance}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
