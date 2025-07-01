import { MinHeap } from "@/app/algorithms/minheap";

interface MinHeapViewProps {
  minHeap: MinHeap<{ id: string; weight: number }>;
}

export const MinHeapVisualizer: React.FC<MinHeapViewProps> = ({ minHeap }) => {
  return (
    <div className="p-4 text-sm bg-muted text-muted-foreground">
      <h2 className="font-semibold mb-2">Min Heap</h2>
      <ul className="space-y-1">
        {minHeap
          .export()
          .slice()
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
