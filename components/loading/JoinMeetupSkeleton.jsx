import { Skeleton } from "../ui/skeleton";

export function JoinMeetupSkeleton() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6 border rounded-lg mt-6">
      {/* Left Side */}
      <div className="w-full md:w-1/2 space-y-3">
        <Skeleton className="h-8 w-40" /> {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-10 w-24" /> {/* Button */}
      </div>

      {/* Right Side (Illustration) */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Skeleton className="h-48 w-64 rounded-lg" /> {/* Image placeholder */}
      </div>
    </div>
  );
}
