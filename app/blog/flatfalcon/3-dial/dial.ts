import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type DialsState = {
  visited: Record<string, [number, string | undefined]>;
  buckets: { id: string; weight: number; parent?: string }[][];
  currentNode?: string;
};

export class Dials extends AlgorithmVisualizer<DialsState> {
  private graph: Graph<unknown, unknown>;
  private visited: Record<string, [number, string | undefined]>;
  private buckets: { id: string; weight: number; parent?: string }[][];
  private currentNode?: string;
  private startNodeId: string;
  private maxDistance: number;

  constructor(
    graph: Graph<unknown, unknown>,
    startNodeId: string,
    maxDistance: number
  ) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.maxDistance = maxDistance;

    this.visited = {};
    this.buckets = Array.from({ length: maxDistance + 1 }, () => []);
  }

  protected getState(): DialsState {
    // Deep copy of buckets for safe state inspection
    const bucketsCopy = this.buckets.map((bucket) => [...bucket]);
    return {
      visited: { ...this.visited },
      buckets: bucketsCopy,
      currentNode: this.currentNode,
    };
  }

  *run(): Generator<AlgorithmStep<DialsState>, void, unknown> {
    // kelmich-highlight-start

    this.buckets[0].push({
      id: this.startNodeId,
      weight: 0,
      parent: undefined,
    });

    for (let distance = 0; distance <= this.maxDistance; distance++) {
      yield* this.breakpoint(`Exploring distance ${distance}.`);
      const bucket = this.buckets[distance];
      while (bucket.length > 0) {
        const currentNode = bucket.shift()!;
        const { id, weight, parent } = currentNode;

        if (this.visited[id] !== undefined) {
          continue;
        }

        this.currentNode = id;
        this.visited[id] = [weight, parent];

        for (const edge of this.graph.neighbors(id, true)) {
          if (this.visited[edge.from] !== undefined) {
            continue;
          }

          const newDistance = weight + edge.weight;
          if (newDistance <= this.maxDistance) {
            this.buckets[newDistance].push({
              id: edge.from,
              weight: newDistance,
              parent: this.currentNode,
            });
          }
        }

        yield* this.breakpoint(`Visiting ${id} and exploring neighbors.`);
      }
    }
    // kelmich-highlight-end

    console.log("Dial's algorithm completed", this.visited);
    yield* this.breakpoint(`Completed Algorithm.`);
  }
}
