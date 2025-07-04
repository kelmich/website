import React from "react";

interface Props {
  title: string;
  unit: string;
  bars: Bar[];
}

export type Bar = {
  name: string;
  time: number; // Time in milliseconds
};

// Find the max time to scale bars proportionally

export default function BarChart(props: Props) {
  const maxTime = Math.max(...props.bars.map((b) => b.time));
  return (
    <div className="p-6 bg-background text-background-foreground border">
      <h2 className="text-xl font-bold mb-4">{props.title}</h2>
      <div className="space-y-4">
        {props.bars.map((b) => (
          <div key={b.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-mono">{b.name}</span>
              <span className="text-gray-600">
                {b.time.toFixed(3)} {props.unit}
              </span>
            </div>
            <div className="bg-muted h-5 relative">
              <div
                className="bg-primary h-5"
                style={{
                  width: `${(b.time / maxTime) * 100}%`,
                  minWidth: "2px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
