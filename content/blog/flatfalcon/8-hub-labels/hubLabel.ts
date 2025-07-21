import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type HubLabelExplorerState = {
  currentUpNode: string | undefined;
  currentDownNode: string | undefined;
  currentUpNodeLabel: string | undefined;
  currentDownNodeLabel: string | undefined;
  results: Record<string, number>;
};

export class HubLabelExplorer extends AlgorithmVisualizer<HubLabelExplorerState> {
  private inHubs: Record<string, Record<string, number>>;
  private outHubs: Record<string, Record<string, number>>;
  private visit?: (
    nodeId: string,
    phase: string,
    hubUsed?: [string, number],
  ) => void;
  private results: Record<string, number>;
  private currentUpNode?: string | undefined;
  private currentDownNode?: string | undefined;
  private currentUpNodeLabel?: string | undefined;
  private currentDownNodeLabel?: string | undefined;

  constructor(
    startNodeId: string,
    inHubs: Record<string, Record<string, number>>,
    outHubs: Record<string, Record<string, number>>,
    visit?: (nodeId: string, phase: string, hubUsed?: [string, number]) => void,
  ) {
    super();
    this.inHubs = this.deepCloneHubLabels(inHubs);
    this.outHubs = this.deepCloneHubLabels(outHubs);
    this.visit = visit;
    this.results = {};

    this.currentUpNode = startNodeId;
    this.currentDownNode = undefined;
    this.currentUpNodeLabel = undefined;
    this.currentDownNodeLabel = undefined;
  }

  private deepCloneHubLabels(
    hubs: Record<string, Record<string, number>>,
  ): Record<string, Record<string, number>> {
    const cloned: Record<string, Record<string, number>> = {};
    for (const [nodeId, hubWeights] of Object.entries(hubs)) {
      cloned[nodeId] = { ...hubWeights };
    }
    return cloned;
  }

  public getState(): HubLabelExplorerState {
    return {
      currentUpNode: this.currentUpNode,
      currentDownNode: this.currentDownNode,
      currentUpNodeLabel: this.currentUpNodeLabel,
      currentDownNodeLabel: this.currentDownNodeLabel,
      results: this.results,
    };
  }

  *run(): Generator<AlgorithmStep<HubLabelExplorerState>, void, unknown> {
    // kelmich-highlight-start
    for (const [hubNodeId, queryPointToHub] of Object.entries(
      this.inHubs[this.currentUpNode ?? ""],
    )) {
      this.currentUpNodeLabel = hubNodeId;
      this.currentDownNode = hubNodeId;

      yield* this.breakpoint(`Exploring Hub ${hubNodeId}.`);

      for (const [listingNodeId, hubToListing] of Object.entries(
        this.outHubs[this.currentDownNode ?? ""],
      )) {
        this.currentDownNodeLabel = listingNodeId;
        const travelTime = queryPointToHub + hubToListing;
        if (
          this.results[listingNodeId] === undefined ||
          travelTime < this.results[listingNodeId]
        ) {
          this.results[listingNodeId] = travelTime;
        }
        yield* this.breakpoint(
          `Found path to ${listingNodeId} with distance ${travelTime}.`,
        );
        this.currentDownNodeLabel = undefined;
      }
    }
    // kelmich-highlight-end

    this.currentUpNode = undefined;
    this.currentDownNode = undefined;
    this.currentUpNodeLabel = undefined;
    this.currentDownNodeLabel = undefined;
    yield* this.breakpoint("Algorithm Completed.", true);
  }
}
