import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type HubLabelExplorerState = {
  inHubs: Record<string, Set<string>>;
  outHubs: Record<string, Set<string>>;
  currentNode?: string;
  explorationPhase: "in-hubs" | "out-hubs" | "intersection" | "completed";
  visited: Set<string>;
  reachableViaInHubs: Set<string>;
  reachableViaOutHubs: Set<string>;
  intersection: Set<string>;
  currentHubSet?: Set<string>;
};

export class HubLabelExplorer extends AlgorithmVisualizer<HubLabelExplorerState> {
  private graph: Graph<unknown, unknown>;
  private inHubs: Record<string, Set<string>>;
  private outHubs: Record<string, Set<string>>;
  private visit?: (
    nodeId: string,
    phase: string,
    hubsUsed?: Set<string>,
  ) => void;
  private currentNode?: string;
  private explorationPhase:
    | "in-hubs"
    | "out-hubs"
    | "intersection"
    | "completed";
  private visited: Set<string>;
  private reachableViaInHubs: Set<string>;
  private reachableViaOutHubs: Set<string>;
  private intersection: Set<string>;
  private currentHubSet?: Set<string>;
  private startNodeId: string;
  private targetNodeId?: string;

  constructor(
    graph: Graph<unknown, unknown>,
    startNodeId: string,
    inHubs: Record<string, Set<string>>,
    outHubs: Record<string, Set<string>>,
    targetNodeId?: string,
    visit?: (nodeId: string, phase: string, hubsUsed?: Set<string>) => void,
  ) {
    super();
    this.graph = graph.clone();
    this.startNodeId = startNodeId;
    this.targetNodeId = targetNodeId;
    this.inHubs = this.deepCloneHubLabels(inHubs);
    this.outHubs = this.deepCloneHubLabels(outHubs);
    this.visit = visit;
    this.explorationPhase = "in-hubs";
    this.visited = new Set();
    this.reachableViaInHubs = new Set();
    this.reachableViaOutHubs = new Set();
    this.intersection = new Set();
  }

  private deepCloneHubLabels(
    hubs: Record<string, Set<string>>,
  ): Record<string, Set<string>> {
    const cloned: Record<string, Set<string>> = {};
    for (const [nodeId, hubSet] of Object.entries(hubs)) {
      cloned[nodeId] = new Set(hubSet);
    }
    return cloned;
  }

  public getState(): HubLabelExplorerState {
    return {
      inHubs: this.deepCloneHubLabels(this.inHubs),
      outHubs: this.deepCloneHubLabels(this.outHubs),
      currentNode: this.currentNode,
      explorationPhase: this.explorationPhase,
      visited: new Set(this.visited),
      reachableViaInHubs: new Set(this.reachableViaInHubs),
      reachableViaOutHubs: new Set(this.reachableViaOutHubs),
      intersection: new Set(this.intersection),
      currentHubSet: this.currentHubSet
        ? new Set(this.currentHubSet)
        : undefined,
    };
  }

  *run(): Generator<AlgorithmStep<HubLabelExplorerState>, void, unknown> {
    // Initialize exploration from start node
    this.currentNode = this.startNodeId;
    this.visited.add(this.startNodeId);

    yield* this.breakpoint(
      `Starting hub label exploration from ${this.startNodeId}.`,
    );

    // Phase 1: Explore using in-hub labels
    this.explorationPhase = "in-hubs";
    this.currentHubSet = this.inHubs[this.startNodeId];

    if (this.currentHubSet && this.currentHubSet.size > 0) {
      yield* this.breakpoint(
        `Found ${this.currentHubSet.size} in-hub labels for ${this.startNodeId}.`,
      );

      // For each in-hub, find all nodes that have this hub in their out-hub labels
      for (const hubId of this.currentHubSet) {
        for (const node of this.graph.nodes) {
          if (this.outHubs[node.id]?.has(hubId)) {
            this.reachableViaInHubs.add(node.id);
            this.visit?.(node.id, "in-hub-exploration", new Set([hubId]));
          }
        }
        yield* this.breakpoint(
          `Explored via in-hub ${hubId}, found nodes reachable through this hub.`,
        );
      }
    }

    // Phase 2: Explore using out-hub labels
    this.explorationPhase = "out-hubs";
    this.currentHubSet = this.outHubs[this.startNodeId];

    if (this.currentHubSet && this.currentHubSet.size > 0) {
      yield* this.breakpoint(
        `Found ${this.currentHubSet.size} out-hub labels for ${this.startNodeId}.`,
      );

      // For each out-hub, find all nodes that have this hub in their in-hub labels
      for (const hubId of this.currentHubSet) {
        for (const node of this.graph.nodes) {
          if (this.inHubs[node.id]?.has(hubId)) {
            this.reachableViaOutHubs.add(node.id);
            this.visit?.(node.id, "out-hub-exploration", new Set([hubId]));
          }
        }
        yield* this.breakpoint(
          `Explored via out-hub ${hubId}, found nodes reachable through this hub.`,
        );
      }
    }

    // Phase 3: Find intersection (bidirectionally reachable nodes)
    this.explorationPhase = "intersection";
    for (const nodeId of this.reachableViaInHubs) {
      if (this.reachableViaOutHubs.has(nodeId)) {
        this.intersection.add(nodeId);
      }
    }

    if (this.intersection.size > 0) {
      yield* this.breakpoint(
        `Found ${this.intersection.size} nodes reachable in both directions.`,
      );

      // Visit intersection nodes
      for (const nodeId of this.intersection) {
        this.currentNode = nodeId;
        this.visit?.(nodeId, "intersection", undefined);
        yield* this.breakpoint(`Processing intersection node ${nodeId}.`);
      }
    }

    // Check if target is reachable (if specified)
    if (this.targetNodeId) {
      const targetReachable =
        this.reachableViaInHubs.has(this.targetNodeId) ||
        this.reachableViaOutHubs.has(this.targetNodeId);
      yield* this.breakpoint(
        `Target ${this.targetNodeId} is ${targetReachable ? "reachable" : "not reachable"} from ${this.startNodeId}.`,
      );
    }

    this.explorationPhase = "completed";
    this.currentNode = undefined;
    this.currentHubSet = undefined;
    yield* this.breakpoint("Hub label exploration completed.", true);
  }

  // Helper method to check 2-hop reachability between two specific nodes
  public canReach(sourceId: string, targetId: string): boolean {
    const sourceOutHubs = this.outHubs[sourceId] || new Set();
    const targetInHubs = this.inHubs[targetId] || new Set();

    // Check if there's any common hub
    for (const hub of sourceOutHubs) {
      if (targetInHubs.has(hub)) {
        return true;
      }
    }
    return false;
  }

  // Get all nodes reachable from a given node via hub labels
  public getAllReachableNodes(sourceId: string): Set<string> {
    const reachable = new Set<string>();
    const sourceOutHubs = this.outHubs[sourceId] || new Set();

    for (const node of this.graph.nodes) {
      const nodeInHubs = this.inHubs[node.id] || new Set();
      for (const hub of sourceOutHubs) {
        if (nodeInHubs.has(hub)) {
          reachable.add(node.id);
          break;
        }
      }
    }

    return reachable;
  }
}
