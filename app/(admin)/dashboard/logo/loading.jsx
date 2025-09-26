import { Skeleton } from "@/components/ui/skeleton";

const LogoLoading = () => {
  return (
    <div className="flex flex-col p-2 md:p-6 space-y-3">
      <div className="flex flex-row justify-between items-center gap-2 max-w-[60rem]">
        <div>
          <Skeleton className="h-8 w-[5rem] rounded-xl bg-gray-700" />
        </div>
        <div className="flex flex-row justify-between items-center gap-2">
          <Skeleton className="h-8 w-[5rem] rounded-xl bg-gray-700" />
          <Skeleton className="h-8 w-[5rem] rounded-xl bg-gray-700" />
          <Skeleton className="h-8 w-[5rem] rounded-xl bg-gray-700" />
        </div>
      </div>

      <div className="space-y-2 p-2">
        <Skeleton className="h-8 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
        <Skeleton className="h-6 w-full max-w-[60rem] bg-gray-600" />
      </div>
    </div>
  );
};

export default LogoLoading;
