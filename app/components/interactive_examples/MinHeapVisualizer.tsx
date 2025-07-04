import { MinHeap } from "@/app/algorithms/minheap";

interface MinHeapViewProps {
  minHeap: MinHeap<{ id: string; weight: number }>;
}

export const MinHeapVisualizer: React.FC<MinHeapViewProps> = ({ minHeap }) => {
  return (
    <div className="p-4 text-sm bg-background text-background-foreground h-full">
      <p className="mb-2">Min Heap</p>
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
