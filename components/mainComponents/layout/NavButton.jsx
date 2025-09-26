"use client";

import { useAuth } from "@/context/AuthContext";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const NavButton = () => {
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false); // Control Popover
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-row space-x-3">
        <Skeleton className="h-[35px] w-[100px] rounded-xl bg-gray-300 dark:bg-gray-100" />
        <Skeleton className="h-[35px] w-[100px] rounded-xl bg-gray-300 dark:bg-gray-100" />
      </div>
    );
  }

  const handleProfileClick = () => {
    setOpen(false); // Close popover
    router.push("/profile"); // Navigate programmatically
  };

  return (
    <div className="flex gap-2">
      {user ? (
        <div className="flex gap-8">
          <div className="flex gap-4">
            <Link
              href="/create-event"
              className="flex flex-col items-center justify-center hover:text-gray-500 delay-150 cursor-pointer"
            >
              <BadgePlus className="text-green-500" />
              <p className="font-semibold text-xs">Create Event</p>
            </Link>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-gray-300">
                {user?.image ? (
                  <Image
                    src={
                      user.image.startsWith("http")
                        ? user.image
                        : `${process.env.NEXT_PUBLIC_BASE_URI}${user.image}`
                    }
                    width={48}
                    height={48}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="bg-blue-500 w-full h-full rounded-full flex items-center justify-center font-bold text-white">
                    {user?.name[0]?.toUpperCase()}
                  </div>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-gray-200 p-2 rounded-md mr-2 mt-2">
              <div className="grid gap-2">
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setOpen(false);
                      router.push("/dashboard/events");
                    }}
                    variant="outline"
                    className="w-full cursor-pointer"
                  >
                    Dashboard
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setOpen(false);
                      logout();
                      router.push("/");
                    }}
                    variant="outline"
                    className="w-full cursor-pointer"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" className={"cursor-pointer"}>
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#00616E] cursor-pointer">SignUp</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavButton;
