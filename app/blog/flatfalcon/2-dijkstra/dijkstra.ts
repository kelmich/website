import { MinHeap } from "@/app/algorithms/minheap";
import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type DijkstraState = {
  visited: Record<string, [number, string | undefined]>;
  minHeap: MinHeap<{
    id: string;
    weight: number;
    parent?: string;
  }>;
  currentNode?: string;
};

export class Dijkstra extends AlgorithmVisualizer<DijkstraState> {
  private graph: Graph<unknown, unknown>;
  private visited: Record<string, [number, string | undefined]>;
  private minHeap: MinHeap<{
    id: string;
    weight: number;
    parent?: string;
  }>;
  private currentNode?: string;
  private startNodeId: string;

  constructor(graph: Graph<unknown, unknown>, startNodeId: string) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.visited = {};
    this.minHeap = new MinHeap<{
      id: string;
      weight: number;
      parent?: string;
    }>();
  }

  protected getState(): DijkstraState {
    return {
      visited: { ...this.visited },
      minHeap: this.minHeap.clone(),
      currentNode: this.currentNode,
    };
  }

  *run(): Generator<AlgorithmStep<DijkstraState>, void, unknown> {
    // kelmich-highlight-start
    this.minHeap.insert({
      id: this.startNodeId,
      weight: 0,
      parent: undefined,
    });
    while (this.minHeap.size() > 0) {
      const { id, weight, parent } = this.minHeap.pop()!;

      this.currentNode = id;
      this.visited[id] = [weight, parent];

      for (const edge of this.graph.neighbors(id, true)) {
        if (this.visited[edge.from] !== undefined) {
          continue; // Skip already visited nodes
        }
        const newDistance = weight + edge.weight;
        this.minHeap.insert({
          id: edge.from,
          weight: newDistance,
          parent: id,
        });
      }

      yield* this.breakpoint(`Visiting ${id} and exploring neighbors.`);
    }
    // kelmich-highlight-end
    this.currentNode = undefined;
    yield* this.breakpoint(`Algorithm Completed.`, true);
  }
}
