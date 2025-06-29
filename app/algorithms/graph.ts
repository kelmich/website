export type NodeId = string;

export type Edge<T> = {
  from: NodeId;
  to: NodeId;
  weight: number;
  data: T;
};

export type Node<T> = {
  id: NodeId;
  data: T;
};
export class Graph<T, U> {
  nodes: Node<T>[];
  edges: Edge<U>[];

  constructor(nodes: Node<T>[], edges: Edge<U>[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  clone(): Graph<T, U> {
    const clonedNodes = this.nodes.map((node) => ({ ...node }));
    const clonedEdges = this.edges.map((edge) => ({ ...edge }));
    return new Graph(clonedNodes, clonedEdges);
  }

  neighbors(nodeId: NodeId): Edge<U>[] {
    return this.edges.filter((edge) => edge.from === nodeId);
  }
}
