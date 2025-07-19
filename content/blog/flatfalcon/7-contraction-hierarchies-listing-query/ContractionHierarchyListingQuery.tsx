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

export const ContractionHierarchyListingQueryVisualizer = () => {
  const initialGraph = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 200, variant: "secondary" } },
          {
            id: "B",
            data: { x: 50, y: 150, variant: "secondary" },
          },
          { id: "C", data: { x: 100, y: 100, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 50, variant: "secondary" } },
          {
            id: "E",
            data: { x: 200, y: 0, variant: "secondary" },
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
          return new Dijkstra(initialGraph, "B", false);
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col divide-y">
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="flex flex-row">
            <div className="w-1/2">
              <GraphVisualizer graph={graph} id="graphA" edgeBendAmount={0.8} />
            </div>
          </div>
        </div>
        <GraphLegend />
      </div>
      <div className="flex flex-row w-full justify-between">
        {Array.from(initialGraph.nodes).map((node) => (
          <div key={node.id} className="w-full p-2 bg-background">
            <div className="font-bold mb-2">{node.id}</div>
            <div className="flex flex-row gap-2">
              {(() => {
                const valueA = stepData?.state.visited[node.id]?.[0];
                return (
                  <div className="flex flex-row items-center gap-2">
                    {valueA !== undefined && (
                      <div className="px-2 py-1 bg-muted text-foreground border border-muted-foreground">
                        <span>B</span> {valueA}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>
      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
