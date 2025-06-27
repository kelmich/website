"use client";
import React, { useEffect, useState } from "react";
import GraphVisualizer, {
  Graph,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";

type Distances = Record<string, number>;
type Previous = Record<string, string | null>;

export const DijkstraVisualizer = () => {
  const initialGraph: Graph = {
    nodes: [
      { id: "A", x: 100, y: 100, variant: "primary" },
      { id: "B", x: 200, y: 50, variant: "secondary" },
      { id: "C", x: 200, y: 150, variant: "secondary" },
      { id: "D", x: 300, y: 100, variant: "secondary" },
      { id: "E", x: 400, y: 50, variant: "secondary" },
      { id: "F", x: 400, y: 150, variant: "secondary" },
      { id: "G", x: 500, y: 30, variant: "secondary" },
      { id: "H", x: 500, y: 170, variant: "secondary" },
    ],
    edges: [
      { from: "A", to: "B", weight: 2, variant: "secondary" },
      { from: "A", to: "C", weight: 4, variant: "secondary" },
      { from: "B", to: "D", weight: 7, variant: "secondary" },
      { from: "C", to: "D", weight: 1, variant: "secondary" },
      { from: "D", to: "E", weight: 3, variant: "secondary" },
      { from: "D", to: "F", weight: 2, variant: "secondary" },
      { from: "E", to: "G", weight: 2, variant: "secondary" },
      { from: "F", to: "H", weight: 3, variant: "secondary" },
      { from: "G", to: "H", weight: 1, variant: "secondary" },
    ],
  };
  const [graph, setGraph] = useState<Graph>(initialGraph);

  // Dijkstra variables
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [distances, setDistances] = useState<Distances>({});
  const [previous, setPrevious] = useState<Previous>({});
  const [currentNode, setCurrentNode] = useState<string | null>(null);
  const [unvisited, setUnvisited] = useState<Set<string>>(new Set());

  // Run initialization once on mount
  useEffect(() => {
    const nodes = initialGraph.nodes.map((n) => n.id);
    const dist: Distances = {};
    const prev: Previous = {};
    nodes.forEach((n) => {
      dist[n] = Infinity;
      prev[n] = null;
    });
    dist["A"] = 0; // starting from A
    setDistances(dist);
    setPrevious(prev);
    setUnvisited(new Set(nodes));
    setCurrentNode("A");
  }, []);

  // Run the step every 2 seconds
  useEffect(() => {
    if (currentNode === null) return;

    const timer = setTimeout(() => {
      setGraph((g) => {
        // Mark current node as visited
        const newVisited = new Set(visited);
        newVisited.add(currentNode);
        setVisited(newVisited);

        // Relax edges from currentNode
        const neighbors = g.edges.filter((e) => e.from === currentNode);
        let newDistances = { ...distances };
        let newPrevious = { ...previous };

        neighbors.forEach(({ to, weight }) => {
          if (!newVisited.has(to)) {
            const alt = (newDistances[currentNode] ?? Infinity) + weight;
            if (alt < (newDistances[to] ?? Infinity)) {
              newDistances[to] = alt;
              newPrevious[to] = currentNode;
            }
          }
        });

        setDistances(newDistances);
        setPrevious(newPrevious);

        // Pick next node with smallest tentative distance
        const newUnvisited = new Set(unvisited);
        newUnvisited.delete(currentNode);
        setUnvisited(newUnvisited);

        let minNode: string | null = null;
        let minDist = Infinity;
        newUnvisited.forEach((node) => {
          if ((newDistances[node] ?? Infinity) < minDist) {
            minDist = newDistances[node];
            minNode = node;
          }
        });

        setCurrentNode(minNode);

        // Update graph styling for visualization
        // Mark visited nodes as "success", current node as "primary", others as "secondary"
        const newNodes = g.nodes.map((node) => {
          if (node.id === currentNode) {
            return { ...node, variant: "primary" };
          } else if (newVisited.has(node.id)) {
            return { ...node, variant: "success" };
          } else {
            return { ...node, variant: "secondary" };
          }
        });

        // Optionally update edge styling to highlight shortest path tree
        const newEdges = g.edges.map((edge) => {
          // If edge is part of shortest path tree (previous[to] = from), highlight it
          if (newPrevious[edge.to] === edge.from) {
            return { ...edge, variant: "success" };
          }
          return { ...edge, variant: "secondary" };
        });

        return {
          nodes: newNodes,
          edges: newEdges,
        };
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentNode, distances, previous, unvisited, visited]);

  return (
    <div className="flex flex-col space-y-2">
      <ControlBar
        reset={() => {
          setGraph(initialGraph);
          setVisited(new Set());
          setDistances({});
          setPrevious({});
          setCurrentNode(null);
          setUnvisited(new Set(initialGraph.nodes.map((n) => n.id)));
        }}
        run={() => {
          if (currentNode === null) return;
          setCurrentNode(currentNode);
        }}
        step={() => {
          if (currentNode === null) return;
          setCurrentNode(currentNode);
        }}
      />
      <GraphVisualizer graph={graph} />
    </div>
  );
};
