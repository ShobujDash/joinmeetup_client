
import { Skeleton } from "../ui/skeleton";


export function HeroSkeleton() {
  return (
    <div className="max-w-6xl mx-auto h-[80vh] flex items-center p-4 lg:p-0">
      <div className="flex flex-col md:flex-row gap-3 w-full">
        {/* Left Side (Text Section) */}
        <div className="w-full md:w-1/2 space-y-4">
          <Skeleton className="h-10 w-3/4" /> {/* Title */}
          <Skeleton className="h-6 w-full" /> {/* Paragraph line 1 */}
          <Skeleton className="h-6 w-5/6" /> {/* Paragraph line 2 */}
          <Skeleton className="h-6 w-2/3" /> {/* Paragraph line 3 */}
          <Skeleton className="h-10 w-40 mt-4" /> {/* Button */}
        </div>

        {/* Right Side (Image Section) */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Skeleton className="h-[250px] w-[400px] md:h-[350px] md:w-[500px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
