"use client";
import { TableSkeleton } from "@/components/loading/TableSkeleton";
import CreatedEvent from "@/components/mainComponents/profile/CreatedEvent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {
  getAllEventsAPI,
  getCreatorEventsAPI,
} from "@/service/adminService/event.service";
import { IconChevronDown, IconLayoutColumns } from "@tabler/icons-react";
import { Search, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EventsPage = () => {
  const { user } = useAuth();
  const userRole = user?.role;
  const [viewMode, setViewMode] = useState("table");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventByUser = async () => {
      try {
        setLoading(true);
        if (userRole === "eventCreator" || userRole === "user") {
          const data = await getCreatorEventsAPI();
          setEvents(data || []);
        } else if (userRole === "admin") {
          const data = await getAllEventsAPI();
          setEvents(data || []);
        }
        setLoading(false);
      } catch (error) {
        setEvents([]);
        setLoading(false);
      }
    };

    fetchEventByUser();
  }, [userRole]);

  if (loading) return <TableSkeleton />;

  return (
    <div className="max-w-screen md:max-w-[45rem] lg:max-w-[67rem] mx-auto p-4">
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-2xl border border-dashed">
          <Users className="h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-semibold text-gray-700">
            No Events Found
          </h3>
          <p className="mt-1 text-gray-500 text-sm">
            Try selecting a different event or check back later.
          </p>
          <Button
            className={"bg-blue-700 mt-2 cursor-pointer"}
            onClick={() => router.push("/create-event")}
          >
            Create Event
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between my-2">
            <div className="hidden sm:block">
              <h1 className="text-2xl font-semibold text-blue-400">
                {user?.role === "admin" ? (
                  <p> All Events</p>
                ) : (
                  <p> My Created Events</p>
                )}
              </h1>
            </div>
            <div className="flex items-center justify-between gap-2">
              {user?.role !== "admin" && (
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Users />
                  <Link href="/dashboard/participants">
                    <span className="hidden lg:inline">Participants</span>
                    <span className="lg:hidden">Participants </span>
                  </Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    <IconLayoutColumns />
                    <span className="hidden lg:inline">Customize View</span>
                    <span className="lg:hidden">Columns</span>
                    <IconChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={viewMode === "table"}
                    onCheckedChange={(value) => {
                      if (value) setViewMode("table");
                    }}
                    className="cursor-pointer"
                  >
                    Table View
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={viewMode === "card"}
                    onCheckedChange={(value) => {
                      if (value) setViewMode("card");
                    }}
                    className="cursor-pointer"
                  >
                    Card View
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="hidden  md:flex items-center border rounded-md overflow-hidden w-full max-w-sm shadow-sm">
                <div className="flex items-center px-3 gap-2 w-full border-r">
                  <Search className="h-4 w-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search events"
                    className="outline-none w-full py-2 text-sm bg-transparent"
                  />
                </div>
                <button className="bg-red-500 hover:bg-red-600 p-3">
                  <Search className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          <CreatedEvent
            viewMode={viewMode}
            events={events}
            setEvents={setEvents}
          />
        </>
      )}
    </div>
  );
};

export default EventsPage;
