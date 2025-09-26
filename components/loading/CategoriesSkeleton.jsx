import { Skeleton } from "../ui/skeleton";

export function CategoriesSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <Skeleton className="h-8 w-64" /> {/* Section title */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center border rounded-lg p-4 space-y-2"
          >
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Icon */}
            <Skeleton className="h-4 w-20" /> {/* Category name */}
          </div>
        ))}
      </div>
    </div>
  );
}
