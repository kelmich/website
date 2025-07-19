"use client";
import React, { useState } from "react";

interface Props {
  title: string;
  unit: string;
  bars: Bar[];
  notes?: React.ReactNode;
}

export type Bar = {
  name: string;
  times: {
    ciLow: number;
    mean: number;
    ciHigh: number;
  };
};

// Find the max time to scale bars proportionally

export default function BarChart(props: Props) {
  const maxTime = Math.max(...props.bars.map((b) => b.times.mean));
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="p-6 bg-background text-background-foreground border">
      <h2 className="text-xl font-bold mb-4">{props.title}</h2>
      <div className="space-y-4">
        {props.bars.map((b) => (
          <div key={b.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-mono">{b.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  [{b.times.ciLow.toFixed(3)}
                  {props.unit}
                </span>
                <span className="text-background-foreground">
                  {b.times.mean.toFixed(3)}
                  {props.unit}
                </span>
                <span className="text-muted-foreground">
                  {b.times.ciHigh.toFixed(3)}
                  {props.unit}]
                </span>
              </div>
            </div>
            <div className="bg-muted h-5 relative">
              <div
                className="bg-primary h-5"
                style={{
                  width: `${(b.times.mean / maxTime) * 100}%`,
                  minWidth: "2px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Expandable Notes Section */}
      {props.notes && (
        <div className="pt-4">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="group flex items-center gap-1 text-sm !px-0 !bg-transparent !text-background-foreground"
          >
            <span className="underline underline-offset-2">
              About this chart
            </span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${
                showNotes ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {showNotes && (
            <div className="mt-2 text-sm text-background-foreground whitespace-pre-wrap">
              {props.notes}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
