import { Skeleton } from "../ui/skeleton";

const EventDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        {/* Main Content */}
        <div className="w-full md:w-2/3">
          {/* Banner */}
          <Skeleton className="w-full h-64 sm:h-80 md:h-96 rounded-md mb-6" />

          {/* Title */}
          <Skeleton className="h-10 w-3/4 mb-4" />

          {/* Seat Info */}
          <div className="flex gap-4 items-center mb-4">
            <Skeleton className="h-6 w-28 rounded-sm" />
            <Skeleton className="h-6 w-28 rounded-sm" />
          </div>

          {/* Date & Join Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 my-4">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-9 w-32 rounded-md" />
          </div>

          {/* Hosted By */}
          <div className="mb-4 border-b border-gray-300 pb-2">
            <Skeleton className="h-4 w-52" />
          </div>

          {/* Description */}
          <div className="space-y-3 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Other Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>

          {/* Comments */}
          <section className="border-t pt-4">
            <Skeleton className="h-10 w-full" />
          </section>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block w-full md:w-1/3 space-y-6">
          {/* User Profile */}
          <div className="p-4 border rounded-lg space-y-3">
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-5 w-24 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>

          {/* Relevent Events */}
          <div className="p-4 border rounded-lg space-y-3">
            <Skeleton className="h-5 w-40" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <Skeleton className="h-12 w-12 rounded-md" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSkeleton;
