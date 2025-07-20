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
} from "@/content/blog/flatfalcon/2-dijkstra/dijkstra";
import { GraphLegend } from "@/app/components/interactive_examples/GraphLegend";
import { MessageRenderer } from "@/app/components/interactive_examples/MessageRenderer";
import { ResultVisualizer } from "@/app/components/interactive_examples/ResultVisualizer";

export const ContractionHierarchyListingQueryVisualizer = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 200, variant: "secondary" } },
          {
            id: "B",
            data: { x: 50, y: 150, variant: "secondary", shape: "rect" },
          },
          { id: "C", data: { x: 100, y: 100, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 50, variant: "secondary" } },
          {
            id: "E",
            data: { x: 200, y: 0, variant: "secondary", shape: "rect" },
          },
        ],
        [
          { from: "A", to: "B", weight: 5, data: { variant: "secondary" } },
          { from: "A", to: "C", weight: 1, data: { variant: "secondary" } },
          { from: "C", to: "D", weight: 2, data: { variant: "secondary" } },
          { from: "D", to: "E", weight: 1, data: { variant: "secondary" } },

          { from: "B", to: "C", weight: 6, data: { variant: "primary" } },
        ],
        () => {
          return { variant: "secondary" };
        },
      ),
    [],
  );
  const [graph, setGraph] =
    useState<Graph<VisualizationNodeData, VisualizationEdgeData>>(initialGraph);
  const listingNodes = initialGraph.nodes
    .filter((node) => node.data.shape === "rect")
    .map((node) => node.id);
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

  const downLabels: Record<string, Record<string, number>> = {
    A: {
      B: 5,
      E: 6,
    },
    B: {
      B: 0,
      E: 1,
    },
    C: {
      E: 7,
    },
    D: {
      E: 9,
    },
    E: {
      E: 0,
    },
  };

  return (
    <div className="flex flex-col border divide-y">
      <ControlBar
        executorFactory={() => {
          return new Dijkstra(initialGraph, "C", false);
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col divide-y">
        <div className="flex flex-col flex-1 overflow-auto bg-background">
          <div className="flex flex-row divide-x">
            <div className="w-2/3">
              <GraphVisualizer graph={graph} id="graphA" edgeBendAmount={0.8} />
              <GraphLegend />
            </div>
            <div className="w-1/3 flex flex-col divide-y">
              <div className="p-2">
                <h4 className="text-sm font-bold mb-1">Labels</h4>
                {Array.from(initialGraph.nodes).map((node) => (
                  <div
                    key={node.id}
                    className="flex flex-row items-center gap-2 w-full p-1"
                  >
                    <div className="font-bold">{node.id}</div>
                    <div className="flex flex-row gap-2">
                      {(() => {
                        const valueA = downLabels[node.id]["B"];
                        const valueB = downLabels[node.id]["E"];
                        return (
                          <div className="flex flex-row items-center gap-2">
                            {valueA !== undefined && (
                              <div className="px-2 py-1 bg-secondary text-secondary-foreground border">
                                <span>B</span> {valueA}
                              </div>
                            )}
                            {valueB !== undefined && (
                              <div className="px-2 py-1 bg-secondary text-secondary-foreground border">
                                <span>E</span> {valueB}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
              {stepData?.state.minHeap && (
                <ResultVisualizer
                  title="Results"
                  results={Object.entries(stepData.state.visited)
                    .map(([id, [weight]]) => ({
                      id,
                      weight,
                    }))
                    .filter((item) => listingNodes.includes(item.id))}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
