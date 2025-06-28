import { MinHeap } from "@/app/algorithms/minheap";
import { Graph } from "@/app/algorithms/graph";

export const dijkstraStep = (
  graph: Graph<unknown, unknown>,
  minHeap: MinHeap<{ id: string; weight: number }>,
  visited: Set<string>,
  result: Record<string, number>
): Record<string, number> => {
  const current = minHeap.pop();
  if (!current) return result;

  const { id, weight } = current;

  visited.add(id);
  result[id] = weight;

  // Update distances for neighbors
  for (const edge of graph.neighbors(id)) {
    if (!visited.has(edge.to)) {
      const newDistance = weight + edge.weight;
      if (newDistance < (result[edge.to] || Infinity)) {
        result[edge.to] = newDistance;
        minHeap.insert({ id: edge.to, weight: newDistance });
      }
    }
  }

  return result;
};
