"use client";
import React, { useMemo, useState } from "react";
import {
  VisualizationEdgeData,
  VisualizationNodeData,
} from "@/app/components/interactive_examples/GraphVisualizer";
import { ControlBar } from "@/app/components/interactive_examples/ControlBar";
import { Graph } from "@/app/algorithms/graph";
import { AlgorithmStep } from "@/app/components/interactive_examples/AlgorithmVisualizer";
import { MessageRenderer } from "@/app/components/interactive_examples/MessageRenderer";
import { HubLabelExplorer, HubLabelExplorerState } from "./hubLabel";
import clsx from "clsx";
import { ResultVisualizer } from "@/app/components/interactive_examples/ResultVisualizer";

type LabelLabelProps = {
  label: string;
  value: number;
  variant?: "primary" | "secondary";
};

const LabelLabel: React.FC<LabelLabelProps> = ({
  label,
  value,
  variant = "secondary",
}) => {
  return (
    <div
      className={clsx(
        "px-2 py-1 border",
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground",
      )}
    >
      {label}: {value}
    </div>
  );
};

export const HubLabelVisualizer = () => {
  const initialGraphA = useMemo(
    () =>
      new Graph<VisualizationNodeData, VisualizationEdgeData>(
        [
          { id: "A", data: { x: 0, y: 200, variant: "secondary" } },
          {
            id: "B",
            data: { x: 50, y: 150, variant: "secondary", shape: "rect" },
          },
          { id: "C", data: { x: 100, y: 100, variant: "secondary" } },
          { id: "D", data: { x: 150, y: 50, variant: "secondary" } },
          {
            id: "E",
            data: { x: 200, y: 0, variant: "secondary", shape: "rect" },
          },
        ],
        [
          { from: "A", to: "B", weight: 5, data: { variant: "secondary" } },
          { from: "A", to: "C", weight: 1, data: { variant: "secondary" } },
          { from: "C", to: "D", weight: 2, data: { variant: "secondary" } },
          { from: "D", to: "E", weight: 1, data: { variant: "secondary" } },

          { from: "B", to: "C", weight: 6, data: { variant: "primary" } },
        ],
        () => {
          return { variant: "secondary" };
        },
      ),
    [],
  );
  const [stepData, setStepData] =
    useState<AlgorithmStep<HubLabelExplorerState> | null>(null);

  const upLabels: Record<string, Record<string, number>> = {
    A: {
      A: 0,
      B: 5,
      C: 1,
      D: 3,
      E: 4,
    },
    B: {
      B: 0,
      C: 6,
      D: 8,
      E: 9,
    },
    C: {
      C: 0,
      D: 2,
      E: 3,
    },
    D: {
      D: 0,
      E: 1,
    },
    E: {
      E: 0,
    },
  };

  const downLabels: Record<string, Record<string, number>> = {
    A: {},
    B: {
      B: 0,
    },
    C: {},
    D: {},
    E: {
      E: 0,
      B: 1,
    },
  };

  return (
    <div className="flex flex-col border divide-y">
      <ControlBar
        executorFactory={() => {
          return new HubLabelExplorer("B", upLabels, downLabels);
        }}
        onStep={setStepData}
      />
      <div className="flex flex-col">
        <div className="flex flex-col flex-1 overflow-auto">
          <div className="flex flex-row divide-x bg-background">
            <div className="w-1/2">
              <div className="w-full p-2 ">
                <div className="font-bold mb-2">Up Labels</div>
                <div className="flex flex-col gap-2">
                  {Array.from(initialGraphA.nodes).map((node) => (
                    <div
                      key={node.id}
                      className="flex flex-row items-center gap-2 w-full p-1 h-10"
                    >
                      <div className="font-bold">{node.id}</div>
                      <div className="flex flex-row gap-2">
                        {Object.entries(upLabels[node.id]).map(
                          ([key, value]) => (
                            <LabelLabel
                              key={key}
                              label={key}
                              value={value}
                              variant={
                                stepData?.state.currentUpNodeLabel === key &&
                                stepData?.state.currentUpNode === node.id
                                  ? "primary"
                                  : "secondary"
                              }
                            />
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <div className="w-full p-2">
                <div className="font-bold mb-2">Down Labels</div>
                <div className="flex flex-col gap-2">
                  {Array.from(initialGraphA.nodes).map((node) => (
                    <div
                      key={node.id}
                      className="flex flex-row items-center gap-2 w-full p-1 h-10"
                    >
                      <div className="font-bold">{node.id}</div>
                      <div className="flex flex-row gap-2">
                        {Object.entries(downLabels[node.id]).map(
                          ([key, value]) => (
                            <LabelLabel
                              key={key}
                              label={key}
                              value={value}
                              variant={
                                stepData?.state.currentDownNodeLabel === key &&
                                stepData?.state.currentDownNode === node.id
                                  ? "primary"
                                  : "secondary"
                              }
                            />
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <ResultVisualizer
                title="Results"
                results={Object.entries(stepData?.state.results ?? {}).map(
                  ([key, value]) => ({ id: key, weight: value }),
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between"></div>
      </div>
      {stepData?.message && <MessageRenderer message={stepData.message} />}
    </div>
  );
};
