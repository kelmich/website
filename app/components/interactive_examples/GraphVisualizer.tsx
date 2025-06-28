"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Graph } from "@/app/algorithms/graph";

export interface VisualizationNodeData extends NodeVariantProps {
  x: number;
  y: number;
}
export type VisualizationEdgeData = EdgeVariantProps;

type Props<T extends VisualizationNodeData, U extends VisualizationEdgeData> = {
  graph: Graph<T, U>;
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

export type NodeVariantProps = VariantProps<typeof nodeStyles>;

const edgeStyles = cva("stroke-2 transition-colors duration-200 fill-none", {
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

export type EdgeVariantProps = VariantProps<typeof edgeStyles>;

const GraphVisualizer: React.FC<
  Props<VisualizationNodeData, VisualizationEdgeData>
> = ({ graph }) => {
  return (
    <div className="flex gap-5 bg-background border p-5">
      <svg width="800" height="300" className="bg-background">
        {/* Define arrow marker for directed edges */}
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-primary" />
          </marker>
        </defs>

        {/* Edges */}
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find((n) => n.id === edge.from)!;
          const to = graph.nodes.find((n) => n.id === edge.to)!;

          const { x: x1, y: y1 } = from.data;
          const { x: x2, y: y2 } = to.data;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;

          const bendAmount = 0.3;
          const cx = mx - dy * bendAmount;
          const cy = my + dx * bendAmount;

          const nodeRadius = 20;

          // Compute unit tangent vector at the end of the quadratic Bézier curve
          const dx1 = 2 * (cx - x1);
          const dy1 = 2 * (cy - y1);
          const dx2 = 2 * (x2 - cx);
          const dy2 = 2 * (y2 - cy);

          const tangentStart = Math.atan2(dy1, dx1);
          const tangentEnd = Math.atan2(dy2, dx2);

          const x1Adj = x1 + Math.cos(tangentStart) * nodeRadius;
          const y1Adj = y1 + Math.sin(tangentStart) * nodeRadius;

          const x2Adj = x2 - Math.cos(tangentEnd) * nodeRadius;
          const y2Adj = y2 - Math.sin(tangentEnd) * nodeRadius;

          const pathD = `M ${x1Adj} ${y1Adj} Q ${cx} ${cy}, ${x2Adj} ${y2Adj}`;
          const markerId = `arrow-${i}`;

          const strokeClass = edgeStyles({ variant: edge.data.variant });
          const fillClass = edgeTextStyles({ variant: edge.data.variant });

          const t = 0.5;
          const xt =
            (1 - t) * (1 - t) * x1Adj + 2 * (1 - t) * t * cx + t * t * x2Adj;
          const yt =
            (1 - t) * (1 - t) * y1Adj + 2 * (1 - t) * t * cy + t * t * y2Adj;

          return (
            <g key={i}>
              <defs>
                <marker
                  id={markerId}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path
                    d="M 0 0 L 10 5 L 0 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={strokeClass}
                  />
                </marker>
              </defs>

              <path
                d={pathD}
                className={strokeClass}
                markerEnd={`url(#${markerId})`}
              />

              {/* Label background */}
              <rect
                x={xt - 10}
                y={yt - 10}
                width={20}
                height={20}
                rx={10}
                ry={10}
                className="fill-background"
              />
              <text
                x={xt}
                y={yt + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                className={fillClass}
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.data.x}
              cy={node.data.y}
              r="20"
              className={nodeStyles({
                variant: node.data.variant,
              })}
            />
            <text
              x={node.data.x}
              y={node.data.y + 5}
              textAnchor="middle"
              fontSize="16"
              className={nodeTextStyles({
                variant: node.data.variant,
              })}
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
