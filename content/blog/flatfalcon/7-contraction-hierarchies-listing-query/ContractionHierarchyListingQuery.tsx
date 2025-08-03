"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import GraphVisualizer, {
  VisualizationEdgeData,
  VisualizationNodeData,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";
import { Graph } from "@/app/algorithms/graph";
import { AlgorithmStep } from "@/app/components/interactive_examples/AlgorithmVisualizer";
import { GraphLegend } from "@/app/components/interactive_examples/GraphLegend";
import { MessageRenderer } from "@/app/components/interactive_examples/MessageRenderer";
import { ResultVisualizer } from "@/app/components/interactive_examples/ResultVisualizer";
import { DAGShortestPath, DAGShortestPathState } from "./dagShortestPath";

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
  const [stepData, setStepData] =
    useState<AlgorithmStep<DAGShortestPathState> | null>(null);

  useEffect(() => {
    if (!stepData) return;
    const { state } = stepData;
    setGraph((prevGraph) => {
      const newGraph = prevGraph.clone();

      newGraph.nodes.forEach((node) => {
        if (state.distances[node.id][0] !== Infinity) {
          node.data.variant = "success";
        } else if (state.currentNode === node.id) {
          node.data.variant = "primary";
        } else {
          node.data.variant = "secondary";
        }
      });

      const usedEdges = new Set<string>();
      Object.entries(state.distances).forEach(([nodeId, [, parentId]]) => {
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
    A: {},
    B: {
      B: 0,
    },
    C: {},
    D: {},
    E: {
      E: 0,
      B: 1,
    },
  };

  const result = useRef<Record<string, number>>({});

  return (
    <div className="flex flex-col border divide-y">
      <ControlBar
        executorFactory={() => {
          // kelmich-highlight-start
          const visit: (
            nodeId: string,
            weight: number,
            parent: string | undefined,
          ) => void = (nodeId, weight) => {
            for (const [listing, distanceToListing] of Object.entries(
              downLabels[nodeId],
            )) {
              const timeViaNode = distanceToListing + weight;
              if (
                !result.current[listing] ||
                timeViaNode < result.current[listing]
              ) {
                result.current[listing] = timeViaNode;
              }
            }
          };
          // kelmich-highlight-end
          // result.current = {};
          return new DAGShortestPath(initialGraph, "C", false, visit);
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
              <ResultVisualizer
                title="Results"
                results={Object.entries(result.current).map(([id, weight]) => {
                  return {
                    id,
                    weight,
                  };
                })}
              />
            </div>
          </div>
        </div>
      </div>

      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
