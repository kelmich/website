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
  startNode: string;
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
  private incoming: boolean;
  private visitor?: (node: string, weight: number, parent?: string) => void;

  constructor(
    graph: Graph<unknown, unknown>,
    startNodeId: string,
    incoming: boolean,
    visitor?: (node: string, weight: number, parent?: string) => void,
  ) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.visited = {};
    this.minHeap = new MinHeap<{
      id: string;
      weight: number;
      parent?: string;
    }>();
    this.incoming = incoming;
    this.visitor = visitor;
  }

  public getState(): DijkstraState {
    return {
      visited: { ...this.visited },
      minHeap: this.minHeap.clone(),
      currentNode: this.currentNode,
      startNode: this.startNodeId,
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

      if (this.visited[id] !== undefined) continue;

      this.currentNode = id;
      this.visited[id] = [weight, parent];
      this.visitor?.(id, weight, parent);

      for (const edge of this.graph.neighbors(id, this.incoming)) {
        const sourceId = this.incoming ? edge.to : edge.from;
        const targetId = this.incoming ? edge.from : edge.to;
        const newDistance = weight + edge.weight;
        this.minHeap.insert({
          id: targetId,
          weight: newDistance,
          parent: sourceId,
        });
      }

      yield* this.breakpoint(`Visiting ${id} and exploring neighbors.`);
    }
    // kelmich-highlight-end
    this.currentNode = undefined;
    yield* this.breakpoint(`Algorithm Completed.`, true);
  }
}
