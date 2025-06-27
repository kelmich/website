"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export type NodeId = string;

export type Edge = {
  from: NodeId;
  to: NodeId;
  weight: number;
  variant?: EdgeVariantProps["variant"];
  active?: boolean;
};

export type Node = {
  id: NodeId;
  x: number;
  y: number;
  variant?: NodeVariantProps["variant"];
  active?: boolean;
};

export type Graph = {
  nodes: Node[];
  edges: Edge[];
};

type Props = {
  graph: Graph;
};

const nodeStyles = cva("transition-colors duration-300", {
  variants: {
    variant: {
      primary: "fill-primary",
      secondary: "fill-secondary",
      success: "fill-success",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const nodeTextStyles = cva("font-bold transition-colors duration-300", {
  variants: {
    variant: {
      primary: "fill-primary-foreground",
      secondary: "fill-secondary-foreground",
      success: "fill-success-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type NodeVariantProps = VariantProps<typeof nodeStyles>;

const edgeStyles = cva("stroke-2 transition-colors duration-200", {
  variants: {
    variant: {
      primary: "stroke-primary",
      secondary: "stroke-secondary",
      success: "stroke-success",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const edgeTextStyles = cva("font-bold transition-colors duration-300", {
  variants: {
    variant: {
      primary: "fill-primary",
      secondary: "fill-secondary",
      success: "fill-success",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type EdgeVariantProps = VariantProps<typeof edgeStyles>;

const GraphVisualizer: React.FC<Props> = ({ graph }) => {
  return (
    <div className="flex gap-5 bg-background border p-5">
      <svg width="800" height="300" className="bg-background">
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
                className={edgeStyles({
                  variant: edge.variant,
                })}
              />
              <g>
                <rect
                  x={midX - 10}
                  y={midY - 10}
                  width={20}
                  height={20}
                  rx={10}
                  ry={10}
                  className="fill-background"
                  strokeWidth={2}
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  className={edgeTextStyles({ variant: edge.variant })}
                >
                  {edge.weight}
                </text>
              </g>
            </g>
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              className={nodeStyles({
                variant: node.variant,
              })}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fontSize="16"
              className={nodeTextStyles({ variant: node.variant })}
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
