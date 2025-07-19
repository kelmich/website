export const GraphLegend = () => {
  return (
    <div className="flex flex-row gap-8 justify-center bg-background py-4">
      <div className="flex flex-row items-center gap-2 p-1">
        <div className="w-6 h-6 bg-secondary rounded-full" />
        <span className="text-sm">Road Intersection</span>
      </div>
      <div className="flex flex-row items-center gap-2 p-1">
        <div className="w-6 h-6 bg-secondary rounded-sm" />
        <span className="text-sm">Listing</span>
      </div>
    </div>
  );
};
