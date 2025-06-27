"use client";
import React from "react";
import clsx from "clsx";
import { cva } from "class-variance-authority";

export type NodeId = string;

export type Edge = {
  from: NodeId;
  to: NodeId;
  style: string; // e.g., "stroke-blue-500 fill-blue-500"
  weight: number;
};

export type Node = {
  id: NodeId;
  x: number;
  y: number;
  style: string; // e.g., "fill-pink-500 stroke-pink-500"
};

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

type Props = {
  graph: Graph;
};

const GraphVisualizer: React.FC<Props> = ({ graph }) => {
  return (
    <div className="flex gap-5 bg-background p-5 rounded-lg">
      <svg width="800" height="300" className="bg-background rounded-md">
        {/* Edges */}
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find((n) => n.id === edge.from)!;
          const to = graph.nodes.find((n) => n.id === edge.to)!;

          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={clsx(
                  edge.style,
                  "stroke-2 transition-colors duration-200",
                )}
              />
              <g>
                <rect
                  x={midX - 12.5}
                  y={midY - 12.5}
                  width={25}
                  height={25}
                  rx={12.5}
                  ry={12.5}
                  className={clsx(
                    "fill-background",
                    edge.style,
                    "transition-colors duration-200",
                  )}
                  strokeWidth={1}
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  className={clsx(edge.style, "transition-colors duration-200")}
                >
                  {edge.weight}
                </text>
              </g>
            </g>
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => (
          <g
            key={node.id}
            className={clsx(node.style, "transition-colors duration-300")}
          >
            <circle cx={node.x} cy={node.y} r="20" className="stroke-2" />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fontSize="16"
              className="fill-red-300"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
