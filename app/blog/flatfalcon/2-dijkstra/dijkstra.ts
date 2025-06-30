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
  private visited: Record<string, number>;
  private minHeap: MinHeap<{
    id: string;
    weight: number;
    parent?: string;
  }>;
  private currentNode?: string;

  constructor(graph: Graph<unknown, unknown>, startNodeId: string) {
    super();
    this.graph = graph.clone();
    this.visited = {};
    this.minHeap = new MinHeap<{
      id: string;
      weight: number;
      parent?: string;
    }>();
    this.minHeap.insert({ id: startNodeId, weight: 0 });
    this.currentNode = startNodeId;
  }

  protected getState(): DijkstraState {
    return {
      visited: { ...this.visited },
      minHeap: this.minHeap.clone(),
      currentNode: this.currentNode,
    };
  }

  *run(): Generator<AlgorithmStep<DijkstraState>, void, unknown> {
    console.log("Hello from Dijkstra!", this.minHeap.size());
    while (this.minHeap.size() > 0) {
      let currentNode = this.minHeap.pop();

      // Skip already visited nodes
      while (currentNode && this.visited[currentNode.id] !== undefined) {
        currentNode = this.minHeap.pop();
      }

      console.log("Current Node:", currentNode);

      if (!currentNode) return;

      const { id, weight } = currentNode;

      this.currentNode = id;
      yield* this.breakpoint(`Visiting ${id}`);
      this.visited[id] = weight;

      for (const edge of this.graph.neighbors(id)) {
        const newDistance = weight + edge.weight;
        this.minHeap.insert({
          id: edge.to,
          weight: newDistance,
          parent: id,
        });
      }

      console.log("MinHeap after visiting:", this.minHeap.size());
    }
    console.log("Exited Dijkstra loop");
  }
}
