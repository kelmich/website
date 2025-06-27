"use client";
import React, { useEffect, useState } from 'react';

type NodeId = string;

type Edge = {
  from: NodeId;
  to: NodeId;
  color: string;
  weight: number;
};

type Node = {
  id: NodeId;
  x: number;
  y: number;
  color: string;
};

type Graph = {
  nodes: Node[];
  edges: Edge[];
};

type Props = {
  graph: Graph;
};

const GraphVisualizer: React.FC<Props> = ({ graph }) => {
  const backgroundColor = '#1e103f';

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        background: backgroundColor,
        padding: 20,
        borderRadius: 10,
      }}
    >
      <svg width="500" height="300" style={{ background: backgroundColor, borderRadius: 8 }}>
        {/* Edges */}
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find((n) => n.id === edge.from)!;
          const to = graph.nodes.find((n) => n.id === edge.to)!;

          const transitionStyle = {
            transition: 'stroke 0.25s ease, fill 0.25s ease',
          };

          return (
            <g key={i}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={edge.color}
                strokeWidth="2"
                style={transitionStyle}
              />
              <g>
                <rect
                  x={(from.x + to.x) / 2 - 12.5}
                  y={(from.y + to.y) / 2 - 12.5}
                  width={25}
                  height={25}
                  rx={12.5}
                  ry={12.5}
                  fill={backgroundColor}
                  stroke={edge.color}
                  strokeWidth={1}
                  style={transitionStyle}
                />
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 + 4}
                  fill={edge.color}
                  fontSize="12"
                  textAnchor="middle"
                  fontWeight="bold"
                  style={transitionStyle}
                >
                  {edge.weight}
                </text>
              </g>
            </g>
          );
        })}

        {/* Nodes */}
        {graph.nodes.map((node) => {
          const transitionStyle = {
            transition: 'fill 0.5s ease, stroke 0.5s ease',
          };

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill={node.color}
                stroke={node.color}
                strokeWidth="2"
                style={transitionStyle}
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill={backgroundColor}
                fontSize="14"
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
