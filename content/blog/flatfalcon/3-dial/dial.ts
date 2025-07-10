import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type DialsState = {
  visited: Record<string, [number, string | undefined]>;
  buckets: { id: string; weight: number; parent?: string }[][];
  activeBucket?: number;
  currentNode?: string;
};

export class Dials extends AlgorithmVisualizer<DialsState> {
  private graph: Graph<unknown, unknown>;
  private visited: Record<string, [number, string | undefined]>;
  private buckets: { id: string; weight: number; parent?: string }[][];
  private activeBucket: number;
  private currentNode?: string;
  private startNodeId: string;
  private maxTravelTime: number;

  constructor(
    graph: Graph<unknown, unknown>,
    startNodeId: string,
    maxTravelTime: number
  ) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.maxTravelTime = maxTravelTime;

    this.visited = {};
    this.activeBucket = 0;
    this.buckets = Array.from({ length: maxTravelTime + 1 }, () => []);
  }

  public getState(): DialsState {
    // Deep copy of buckets for safe state inspection
    const bucketsCopy = this.buckets.map((bucket) => [...bucket]);
    return {
      visited: { ...this.visited },
      buckets: bucketsCopy,
      currentNode: this.currentNode,
      activeBucket: this.activeBucket,
    };
  }

  *run(): Generator<AlgorithmStep<DialsState>, void, unknown> {
    // kelmich-highlight-start

    this.buckets[0].push({
      id: this.startNodeId,
      weight: 0,
      parent: undefined,
    });

    for (
      this.activeBucket = 0;
      this.activeBucket <= this.maxTravelTime;
      this.activeBucket++
    ) {
      yield* this.breakpoint(`Exploring distance ${this.activeBucket}.`);
      const bucket = this.buckets[this.activeBucket];
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
          if (newDistance <= this.maxTravelTime) {
            this.buckets[newDistance].push({
              id: edge.from,
              weight: newDistance,
              parent: this.currentNode,
            });
          }
        }

        yield* this.breakpoint(`Visiting ${id} and exploring neighbors.`);
        this.currentNode = undefined;
      }
    }
    // kelmich-highlight-end
    yield* this.breakpoint(`Completed Algorithm.`, true);
  }
}
