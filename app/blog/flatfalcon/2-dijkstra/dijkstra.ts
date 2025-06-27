import { Graph } from "@/app/components/interactive_examples/GraphVisualizer";

export const dijkstra = (
  graph: Graph,
  start: string
): Record<string, number> => {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited: Set<string> = new Set(graph.nodes.map((n) => n.id));

  // Initialize distances and previous nodes
  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Get the unvisited node with the smallest distance
    let currentNode: string | null = null;
    for (const node of unvisited) {
      if (currentNode === null || distances[node] < distances[currentNode]) {
        currentNode = node;
      }
    }

    if (distances[currentNode] === Infinity) break; // All remaining nodes are unreachable

    // Update distances to neighbors
    for (const neighbor in graph[currentNode]) {
      const weight = graph[currentNode][neighbor];
      const newDistance = distances[currentNode] + weight;

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = currentNode;
      }
    }

    unvisited.delete(currentNode);
  }

  return distances;
};
