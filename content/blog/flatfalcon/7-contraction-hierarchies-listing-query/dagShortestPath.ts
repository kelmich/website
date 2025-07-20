import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type DAGShortestPathState = {
  distances: Record<string, [number, string | undefined]>;
  topologicalOrder: string[];
  currentIndex: number;
  currentNode?: string;
  processed: Set<string>;
};

export class DAGShortestPath extends AlgorithmVisualizer<DAGShortestPathState> {
  private graph: Graph<unknown, unknown>;
  private distances: Record<string, [number, string | undefined]>;
  private visit?: (nodeId: string, weight: number, parent?: string) => void;
  private topologicalOrder: string[];
  private currentIndex: number;
  private currentNode?: string;
  private processed: Set<string>;
  private startNodeId: string;
  private incoming: boolean;

  constructor(
    graph: Graph<unknown, unknown>,
    startNodeId: string,
    incoming: boolean,
    visit?: (nodeId: string, weight: number, parent?: string) => void,
  ) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.distances = {};
    this.visit = visit;
    this.topologicalOrder = [];
    this.currentIndex = 0;
    this.processed = new Set();
    this.incoming = incoming;
    this.topologicalSort();
  }

  public getState(): DAGShortestPathState {
    return {
      distances: { ...this.distances },
      topologicalOrder: [...this.topologicalOrder],
      currentIndex: this.currentIndex,
      currentNode: this.currentNode,
      processed: new Set(this.processed),
    };
  }

  private topologicalSort() {
    const inDegree: Record<string, number> = {};
    const queue: string[] = [];

    // Initialize in-degrees
    for (const node of this.graph.nodes) {
      inDegree[node.id] = 0;
    }

    // Calculate in-degrees
    for (const node of this.graph.nodes) {
      for (const edge of this.graph.neighbors(node.id, false)) {
        const targetId = edge.to;
        inDegree[targetId] = (inDegree[targetId] || 0) + 1;
      }
    }

    // Find nodes with no incoming edges
    for (const node of this.graph.nodes) {
      if (inDegree[node.id] === 0) {
        queue.push(node.id);
      }
    }

    // Process nodes in topological order
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      this.topologicalOrder.push(nodeId);

      // Reduce in-degree of neighbors
      for (const edge of this.graph.neighbors(nodeId, false)) {
        const targetId = edge.to;
        inDegree[targetId]--;
        if (inDegree[targetId] === 0) {
          queue.push(targetId);
        }
      }
    }

    // Check for cycles (shouldn't happen in a DAG)
    if (this.topologicalOrder.length !== this.graph.nodes.length) {
      throw new Error("Graph contains a cycle - not a DAG!");
    }
  }

  *run(): Generator<AlgorithmStep<DAGShortestPathState>, void, unknown> {
    // kelmich-highlight-start
    for (const node of this.graph.nodes) {
      this.distances[node.id] = [Infinity, undefined];
    }
    this.distances[this.startNodeId] = [0, undefined];

    yield* this.breakpoint("Initialized distances.");

    // Step 3: Process nodes in topological order
    for (
      this.currentIndex = 0;
      this.currentIndex < this.topologicalOrder.length;
      this.currentIndex++
    ) {
      const nodeId = this.topologicalOrder[this.currentIndex];
      this.currentNode = nodeId;

      // Skip if this node is unreachable
      if (this.distances[nodeId][0] === Infinity) {
        continue;
      }

      const currentDistance = this.distances[nodeId][0];
      const currentParent = this.distances[nodeId][1];

      // Mark as processed and call visit callback
      this.processed.add(nodeId);
      this.visit?.(nodeId, currentDistance, currentParent);

      // Update distances to neighbors
      const direction = this.incoming;
      for (const edge of this.graph.neighbors(nodeId, direction)) {
        const sourceId = direction ? edge.to : edge.from;
        const targetId = direction ? edge.from : edge.to;
        const newDistance = currentDistance + edge.weight;

        // In DAG shortest path, we can always
        // update if we find a shorter path
        // because we process nodes in topological order
        if (newDistance < this.distances[targetId][0]) {
          this.distances[targetId] = [newDistance, sourceId];
        }
      }

      yield* this.breakpoint(`Processed ${nodeId} and updated neighbors.`);
    }
    // kelmich-highlight-end

    this.currentNode = undefined;
    yield* this.breakpoint("DAG shortest path algorithm completed.", true);
  }
}
