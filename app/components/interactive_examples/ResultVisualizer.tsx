import { MinHeap } from "@/app/algorithms/minheap";

interface MinHeapViewProps {
  results: { id: string; weight: number }[];
}

export const ResultVisualizer: React.FC<MinHeapViewProps> = ({ results }) => {
  return (
    <div className="p-4 text-sm bg-background text-background-foreground h-full">
      <p className="mb-2">Results</p>
      <ul className="space-y-1">
        {results
          .map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="font-mono">{item.id}</span>
              <span className="text-right">{item.weight}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
