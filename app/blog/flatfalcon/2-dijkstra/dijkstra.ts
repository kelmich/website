import { MinHeap } from "@/app/algorithms/minheap";
import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type DijkstraState = {
  visited: Record<string, number>;
  minHeap: MinHeap<{
    id: string;
    weight: number;
    parent?: string;
  }>;
  currentNode?: string;
};

export class Dijkstra extends AlgorithmVisualizer<DijkstraState> {
  private graph: Graph<unknown, unknown>;
  private startNodeId: string;
  protected state: DijkstraState;

  // initialize the Dijkstra algorithm with a graph and a starting node
  constructor(graph: Graph<unknown, unknown>, startNodeId: string) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.state = {
      visited: {},
      minHeap: new MinHeap<{
        id: string;
        weight: number;
        parent?: string;
      }>(),
      currentNode: startNodeId,
    };
  }

  // kelmich-highlight-start
  *run(): Generator<AlgorithmStep<DijkstraState>, void, unknown> {
    // enqueue the starting node
    this.state.minHeap.insert({ id: this.startNodeId, weight: 0 });

    // while there are unvisited nodes
    while (this.state.minHeap.size() > 0) {
      let currentNode = this.state.minHeap.pop();

      // Skip already visited nodes
      while (currentNode && this.state.visited[currentNode.id] !== undefined) {
        currentNode = this.state.minHeap.pop();
      }

      if (!currentNode) return;

      const { id, weight } = currentNode;

      this.state.currentNode = id;
      yield* this.breakpoint(`Visiting ${id}`);
      this.state.visited[id] = weight;

      // enqueue all neighbors of the current node
      for (const edge of this.graph.neighbors(id)) {
        const newDistance = weight + edge.weight;
        this.state.minHeap.insert({
          id: edge.to,
          weight: newDistance,
          parent: id,
        });
      }
    }
  }
  // kelmich-highlight-end
}
