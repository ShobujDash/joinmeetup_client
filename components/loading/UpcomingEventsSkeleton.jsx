import { Skeleton } from "../ui/skeleton";


export function UpcomingEventsSkeleton() {
  return (
    <div className="max-w-9xl mx-auto p-4 space-y-4">
      <Skeleton className="h-8 w-48" /> {/* Section title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2 border rounded-lg p-3">
            <Skeleton className="h-40 w-full rounded-md" /> {/* Event image */}
            <Skeleton className="h-4 w-24" /> {/* Seats info */}
            <Skeleton className="h-6 w-3/4" /> {/* Event title */}
            <Skeleton className="h-4 w-32" /> {/* Host */}
            <Skeleton className="h-4 w-40" /> {/* Date */}
            <Skeleton className="h-4 w-16" /> {/* Price / Free */}
          </div>
        ))}
      </div>
    </div>
  );
}
