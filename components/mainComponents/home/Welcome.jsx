"use client";

import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";

const Welcome = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-3 my-2">
          <Skeleton className="h-[50px] w-[400px] rounded-xl bg-gray-300 dark:bg-gray-100" />
          <Skeleton className="h-[40px] w-[300px] rounded-xl bg-gray-300 dark:bg-gray-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-3 my-2">
        <h1 className="text-5xl font-bold py-4">{`Welcome, ${user?.name} 👋` }</h1>
        <h1 className="text-3xl font-bold text-gray-900"> Event From Your Groups.</h1>
      </div>
    </div>
  );
};

export default Welcome;
