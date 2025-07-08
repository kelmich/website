import { Edge, Graph } from "@/app/algorithms/graph";
import {
  AlgorithmStep,
  AlgorithmVisualizer,
} from "@/app/components/interactive_examples/AlgorithmVisualizer";
import { Dijkstra } from "../2-dijkstra/dijkstra";
export type ContractorState<T1, T2> = {
  graph: Graph<T1, T2>;
  inEdge?: Edge<T2>;
  outEdge?: Edge<T2>;
};

export class Contractor<T1, T2> extends AlgorithmVisualizer<ContractorState<T1, T2>> {
  private graph: Graph<T1, T2>;
  private contractNode: string;
  private inEdge?: Edge<T2>;
  private outEdge?: Edge<T2>;

  constructor(graph: Graph<T1, T2>, contractNode: string) {
    super();
    this.graph = graph.clone();
    this.contractNode = contractNode;
  }

  public getState(): ContractorState<T1, T2> {
    return {
      graph: this.graph.clone(),
      inEdge: this.inEdge,
      outEdge: this.outEdge
    };
  }

  private shortestPathViaContractNode(from: string, to: string) {
    const dijkstra = new Dijkstra(this.graph, from, false);
    for (const step of dijkstra.run()) {
      continue;
    }
    const { visited } = dijkstra.getState();
    let current = to;
    while (current !== from) {
      if (current === this.contractNode) return true;
      current = visited[current][1]!;
    }
    if (from === this.contractNode) return true;
    return false;
  }

  *run(): Generator<AlgorithmStep<ContractorState<T1, T2>>, void, unknown> {
    yield* this.breakpoint(`Contracting ${this.contractNode}`)

    const contractNode = this.contractNode;

    // kelmich-highlight-start
    const inEdges = this.graph.edges.filter((edge) => edge.to === contractNode)
    const outEdges = this.graph.edges.filter((edge) => edge.from === contractNode)

    for (this.inEdge of inEdges) {
      for (this.outEdge of outEdges) {
        if (this.inEdge.from === this.outEdge.to) continue;

        const u = this.inEdge.from;
        const v = this.outEdge.to;
        const w = this.inEdge.weight + this.outEdge.weight;

        if (this.shortestPathViaContractNode(u, v)) {
          if (this.graph.hasEdge(u, v)) {
            this.graph.updateEdge(u, v, w);
            yield* this.breakpoint(`Updating edge weight between ${u} -> ${v}.`);
          } else {
            this.graph.createEdge(u, v, w);
            yield* this.breakpoint(`Creating shortcut edge between ${u} -> ${v}.`);
          }
        }
      }
    }

    this.graph.nodes = this.graph.nodes.filter((node) => node.id !== contractNode);
    this.graph.edges = this.graph.edges.filter((edge) =>
      edge.from !== contractNode && edge.to !== this.contractNode
    );
    yield* this.breakpoint(`Remove Contract Node.`, true);
    // kelmich-highlight-end
  }
}
