import { MinHeap } from "@/app/algorithms/minheap";

interface MinHeapViewProps {
  minHeap: MinHeap<{ id: string; weight: number }>;
}

export const MinHeapVisualizer: React.FC<MinHeapViewProps> = ({ minHeap }) => {
  return (
    <div className="p-2 overflow-auto bg-background text-background-foreground h-full">
      <h4 className="text-sm font-bold mb-2">Min Heap</h4>
      <ul className="space-y-1 px-2">
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
