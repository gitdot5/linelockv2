export const EquipmentCardSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-lg border border-border overflow-hidden flex flex-col sm:flex-row animate-fade-in">
        <div className="w-full sm:w-72 h-48 sm:h-auto flex-shrink-0 skeleton-shimmer" />
        <div className="flex-1 p-4 space-y-3">
          <div className="h-6 w-3/4 skeleton-shimmer" />
          <div className="h-4 w-1/2 skeleton-shimmer" />
          <div className="h-4 w-1/3 skeleton-shimmer" />
          <div className="flex justify-between items-center mt-4">
            <div className="h-8 w-28 skeleton-shimmer" />
            <div className="h-9 w-24 skeleton-shimmer rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
      <div className="h-48 skeleton-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-full skeleton-shimmer" />
        <div className="h-4 w-2/3 skeleton-shimmer" />
        <div className="h-4 w-1/2 skeleton-shimmer" />
        <div className="flex justify-between items-center pt-3 border-t border-border">
          <div className="h-7 w-24 skeleton-shimmer" />
          <div className="h-9 w-24 skeleton-shimmer rounded-md" />
        </div>
      </div>
    </div>
  );
};
