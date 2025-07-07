import { Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";

export type ContractorState = {
  graph: Graph<unknown, unknown>;
};

export class Contractor extends AlgorithmVisualizer<ContractorState> {
  private graph: Graph<unknown, unknown>;

  constructor(graph: Graph<unknown, unknown>, contractNode: string) {
    super();
    this.graph = graph.clone();
    this.contractNode = contractNode;
  }

  public getState(): ContractorState {
    return {
      graph: this.graph.clone(),
    };
  }

  *run(): Generator<AlgorithmStep<ContractorState>, void, unknown> {
    // kelmich-highlight-start

    // kelmich-highlight-end
    yield* this.breakpoint(`Completed Algorithm.`, true);
  }
}
