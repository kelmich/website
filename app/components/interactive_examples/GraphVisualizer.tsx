"use client";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Graph } from "@/app/algorithms/graph";
import { useElementSize } from "@/app/utils/useElementSize";

// your styles and types unchanged …
export interface VisualizationNodeData extends NodeVariantProps {
  x: number;
  y: number;
  shape?: "circle" | "rect";
}
export type VisualizationEdgeData = EdgeVariantProps;

type Props<T extends VisualizationNodeData, U extends VisualizationEdgeData> = {
  graph: Graph<T, U>;
  id?: string;
  straightEdges?: boolean;
  edgeBendAmount?: number;
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
> = ({ graph, id = "", straightEdges = false, edgeBendAmount = 0.2 }) => {
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>();
  const padding = 40;
  const xs = graph.nodes.map((n) => n.data.x);
  const ys = graph.nodes.map((n) => n.data.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const graphWidth = maxX - minX + 10;
  const graphHeight = maxY - minY + 10;

  function mapNodePosition(x: number, y: number) {
    const normX = (x - minX) / graphWidth;
    const normY = (y - minY) / graphHeight;
    const mappedX = Math.round(padding + normX * (width - 2 * padding));
    const mappedY = Math.round(padding + normY * (height - 2 * padding));
    return { x: mappedX, y: mappedY };
  }

  const nodeRadius = 20;

  return (
    <div
      ref={containerRef}
      className="flex gap-5 bg-background w-full"
      style={{ height: `${graphHeight + 2 * padding}px` }}
    >
      <svg width={width} height={height} className="bg-background">
        <defs>
          {/* default arrow, unused in the edges, so you might remove it */}
          <marker
            id={`arrow${id}`}
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
        {graph.edges
          .sort((a, b) => {
            const priority = { secondary: 0, success: 1, primary: 2 };
            return (
              (priority[a.data.variant ?? "primary"] ?? 2) -
              (priority[b.data.variant ?? "primary"] ?? 2)
            );
          })
          .map((edge) => {
            const from = graph.nodes.find((n) => n.id === edge.from)!;
            const to = graph.nodes.find((n) => n.id === edge.to)!;

            const { x: x1, y: y1 } = mapNodePosition(from.data.x, from.data.y);
            const { x: x2, y: y2 } = mapNodePosition(to.data.x, to.data.y);

            const dx = x2 - x1;
            const dy = y2 - y1;
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;

            const length = Math.hypot(dx, dy);
            const offsetX = (-dy / length) * edgeBendAmount * length;
            const offsetY = (dx / length) * edgeBendAmount * length;

            const cx = mx + offsetX;
            const cy = my + offsetY;

            const dx1 = 2 * (cx - x1);
            const dy1 = 2 * (cy - y1);
            const dx2 = 2 * (x2 - cx);
            const dy2 = 2 * (y2 - cy);

            const tangentStart = Math.atan2(dy1, dx1);
            const tangentEnd = Math.atan2(dy2, dx2);

            let x1Adj = x1;
            let y1Adj = y1;
            let x2Adj = x2;
            let y2Adj = y2;

            function adjustPosition(
              x: number,
              y: number,
              angle: number,
              shape: "circle" | "rect",
            ) {
              if (shape === "rect") {
                const halfSize = nodeRadius;
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
                const tanTheta = Math.abs(sin / cos);

                let dx = halfSize;
                let dy = halfSize;

                if (tanTheta > 1) {
                  dx = halfSize / tanTheta;
                } else {
                  dy = halfSize * tanTheta;
                }

                return {
                  x: x + Math.sign(cos) * dx,
                  y: y + Math.sign(sin) * dy,
                };
              } else {
                return {
                  x: x + Math.cos(angle) * nodeRadius,
                  y: y + Math.sin(angle) * nodeRadius,
                };
              }
            }

            if (straightEdges) {
              const angle = Math.atan2(y2 - y1, x2 - x1);
              const startAdj = adjustPosition(
                x1,
                y1,
                angle,
                from.data.shape ?? "circle",
              );
              const endAdj = adjustPosition(
                x2,
                y2,
                angle + Math.PI,
                to.data.shape ?? "circle",
              );
              x1Adj = startAdj.x;
              y1Adj = startAdj.y;
              x2Adj = endAdj.x;
              y2Adj = endAdj.y;
            } else {
              const startAdj = adjustPosition(
                x1,
                y1,
                tangentStart,
                from.data.shape ?? "circle",
              );
              const endAdj = adjustPosition(
                x2,
                y2,
                tangentEnd + Math.PI,
                to.data.shape ?? "circle",
              );
              x1Adj = startAdj.x;
              y1Adj = startAdj.y;
              x2Adj = endAdj.x;
              y2Adj = endAdj.y;
            }

            x1Adj = Math.fround(x1Adj);
            y1Adj = Math.fround(y1Adj);
            x2Adj = Math.fround(x2Adj);
            y2Adj = Math.fround(y2Adj);

            const pathD = straightEdges
              ? `M ${x1Adj} ${y1Adj} L ${x2Adj} ${y2Adj}`
              : `M ${x1Adj} ${y1Adj} Q ${cx} ${cy}, ${x2Adj} ${y2Adj}`;
            const markerId = `arrow-${id}-${edge.from}-${edge.to}`; // updated

            const strokeClass = edgeStyles({ variant: edge.data.variant });
            const fillClass = edgeTextStyles({ variant: edge.data.variant });

            const t = 0.5;

            const xt = straightEdges
              ? (x1Adj + x2Adj) / 2
              : (1 - t) * (1 - t) * x1Adj +
                2 * (1 - t) * t * cx +
                t * t * x2Adj;

            const yt = straightEdges
              ? (y1Adj + y2Adj) / 2
              : (1 - t) * (1 - t) * y1Adj +
                2 * (1 - t) * t * cy +
                t * t * y2Adj;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <defs>
                  <marker
                    id={markerId}
                    viewBox="0 0 10 10"
                    refX="11"
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

                <rect
                  x={xt - 7.5}
                  y={yt - 7.5}
                  width={15}
                  height={15}
                  rx={7.5}
                  ry={7.5}
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
        {graph.nodes.map((node) => {
          const { x, y } = mapNodePosition(node.data.x, node.data.y);
          return (
            <g key={node.id}>
              {node.data.shape === "rect" ? (
                <rect
                  x={x - nodeRadius}
                  y={y - nodeRadius}
                  width={nodeRadius * 2}
                  height={nodeRadius * 2}
                  rx={6}
                  ry={6}
                  className={nodeStyles({
                    variant: node.data.variant,
                  })}
                />
              ) : (
                <circle
                  cx={x}
                  cy={y}
                  r={nodeRadius}
                  className={nodeStyles({
                    variant: node.data.variant,
                  })}
                />
              )}
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize="16"
                className={nodeTextStyles({
                  variant: node.data.variant,
                })}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default GraphVisualizer;
