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

  defaultEdgeDataFactory?: () => U;

  constructor(nodes: Node<T>[], edges: Edge<U>[], defaultEdgeDataFactory?: () => U) {
    this.nodes = nodes;
    this.edges = edges;
    this.defaultEdgeDataFactory = defaultEdgeDataFactory;
  }

  clone(): Graph<T, U> {
    const clonedNodes = this.nodes.map((node) => ({
      id: node.id,
      data: structuredClone(node.data),
    }));

    const clonedEdges = this.edges.map((edge) => ({
      from: edge.from,
      to: edge.to,
      weight: edge.weight,
      data: structuredClone(edge.data),
    }));

    return new Graph(clonedNodes, clonedEdges, this.defaultEdgeDataFactory);
  }

  hasEdge(source: NodeId, target: NodeId) {
    return this.edges.some((edge) => source === edge.from && edge.to === target);
  }

  createEdge(source: NodeId, target: NodeId, weight: number) {
    if (!this.defaultEdgeDataFactory) {
      throw "You must specify a defaultEdgeDataFactory to create Edges"
    }
    this.edges.push({
      from: source,
      to: target,
      weight,
      data: this.defaultEdgeDataFactory()
    })
  }

  updateEdge(source: NodeId, target: NodeId, weight: number) {
    const edge = this.edges.find((edge) => source === edge.from && edge.to === target);
    if (edge) {
      edge.weight = weight;
    } else {
      throw "Edge does not exist!"
    }
  }

  neighbors(nodeId: NodeId, incoming?: boolean): Edge<U>[] {
    return this.edges.filter((edge) => {
      if (incoming) {
        return edge.to === nodeId;
      } else {
        return edge.from === nodeId;
      }
    });
  }
}
