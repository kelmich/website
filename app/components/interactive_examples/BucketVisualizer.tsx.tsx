import { DialsState } from "@/content/blog/flatfalcon/3-dial/dial";

export const BucketsVisualizer = ({
  buckets,
  activeIdx,
}: {
  buckets: DialsState["buckets"];
  activeIdx?: number;
}) => {
  return (
    <div className="p-2 overflow-auto bg-background text-background-foreground h-full">
      <h4 className="text-sm font-bold mb-2">Buckets</h4>
      {buckets.map((bucket, idx) => (
        <div
          key={idx}
          className={`text-xs px-2 py-0.5 cursor-pointer transition-all ${activeIdx === idx
            ? "bg-primary text-primary-foreground font-semibold"
            : "hover:bg-muted"
            }`}
        >
          <span className="font-mono">{idx}:</span>{" "}
          {bucket.map((n) => n.id).join(", ") || "-"}
        </div>
      ))}
    </div>
  );
};
