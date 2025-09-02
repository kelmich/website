"use client";
import React, { useState } from "react";

interface Props {
  title: string;
  unit: string; // legacy; no longer used
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

const timeUnits = [
  { label: "µs", factor: 1e3 },
  { label: "ms", factor: 1 },
  { label: "s", factor: 1e-3 },
  { label: "min", factor: 1 / (60 * 1000) },
  { label: "h", factor: 1 / (60 * 60 * 1000) },
];

function chooseUnit(valueMs: number) {
  let unitIdx = -1;
  for (const unit of timeUnits) {
    const converted = valueMs * unit.factor;
    if (converted >= 1) {
      unitIdx += 1;
    }
  }
  return timeUnits[unitIdx];
}

function formatTime(value: number, factor: number): string {
  return (value * factor).toFixed(1);
}

export default function BarChart(props: Props) {
  const maxTime = Math.max(...props.bars.map((b) => b.times.mean));
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="p-6 bg-background text-background-foreground border">
      <h2 className="!mt-0 text-xl font-bold pb-8">{props.title}</h2>
      <div className="space-y-4">
        {props.bars.map((b) => {
          const unit = chooseUnit(b.times.mean);
          const scale = unit.factor;

          return (
            <div key={b.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-mono">{b.name}</span>
                <div className="flex items-center justify-between gap-2 w-54">
                  <span className="text-muted-foreground">
                    [{formatTime(b.times.ciLow, scale)}
                    {unit.label}
                  </span>
                  <span className="text-background-foreground">
                    {formatTime(b.times.mean, scale)}
                    {unit.label}
                  </span>
                  <span className="text-muted-foreground">
                    {formatTime(b.times.ciHigh, scale)}
                    {unit.label}]
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
          );
        })}
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
