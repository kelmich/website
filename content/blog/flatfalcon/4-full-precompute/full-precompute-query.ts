import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type FullPrecomputeQueryState = {
  currentListingNode: string | undefined;
  results: [string, number][];
};

export class FullPrecomputeQuery extends AlgorithmVisualizer<FullPrecomputeQueryState> {
  private distances: Record<string, [string, number][]>;
  private currentListingNode: string | undefined;
  private queryNode: string;
  private budget: number;
  private results: [string, number][];

  constructor(
    queryNode: string,
    budget: number,
    distances: Record<string, [string, number][]>,
  ) {
    super();
    this.distances = distances;
    this.currentListingNode = undefined;
    this.queryNode = queryNode;
    this.budget = budget;
    this.results = [];
  }

  public getState(): FullPrecomputeQueryState {
    return {
      currentListingNode: this.currentListingNode,
      results: this.results,
    };
  }

  *run(): Generator<AlgorithmStep<FullPrecomputeQueryState>, void, unknown> {
    // kelmich-highlight-start
    for (const [listing, travelTime] of this.distances[this.queryNode]) {
      this.currentListingNode = listing;
      if (travelTime <= this.budget) {
        yield* this.breakpoint(
          `Found path from ${listing} with distance ${travelTime}.`,
        );
        this.results.push([listing, travelTime]);
      } else {
        break;
      }
    }
    // kelmich-highlight-end

    this.currentListingNode = undefined;
    yield* this.breakpoint("Algorithm Completed.", true);
  }
}
