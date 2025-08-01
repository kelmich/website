interface ResultViewProps {
  title: string;
  results: { id: string; weight: number }[];
}

export const ResultVisualizer: React.FC<ResultViewProps> = ({
  title,
  results,
}) => {
  return (
    <div className="p-2 overflow-auto bg-background text-background-foreground h-full">
      <h4 className="text-sm font-bold mb-2">{title}</h4>
      <div className="space-y-1">
        {results.map((item) => (
          <div key={item.id} className="flex justify-between text-sm px-2">
            <span className="font-mono">{item.id}</span>
            <span className="text-right">{item.weight}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
