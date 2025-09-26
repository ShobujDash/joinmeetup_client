"use client";
import UserRegisteredEvents from "@/components/adminComponents/UserRegisteredEvents";
import { TableSkeleton } from "@/components/loading/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {
  getAllRegistrationAPI,
  getMyRegisteredEventAPI,
} from "@/service/projectService/registerEvent.service";
import { IconChevronDown, IconLayoutColumns } from "@tabler/icons-react";
import { fixTables } from "@tiptap/pm/tables";
import { useEffect, useState } from "react";

const ProfileBookedPage = () => {
  const { user } = useAuth();
  const userRole = user?.role;

  const [viewMode, setViewMode] = useState("table");
  const [loading,setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventByUser = async () => {
      try {
        if (!userRole) return;
        setLoading(true);
        if (userRole === "eventCreator" || userRole === "user") {
          const result = await getMyRegisteredEventAPI();
          setEvents(result?.registeredEvents || []);
          setLoading(false);
        } else if (userRole === "admin") {
          const registrationEvent = await getAllRegistrationAPI();
          setEvents(registrationEvent);
          setLoading(false);
        }
      } catch (error) {
        setEvents([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchEventByUser();
  }, [userRole]);

  if (loading) return <TableSkeleton />;

  return (
    <div className="max-w-screen md:max-w-[45rem] lg:max-w-[67rem] mx-auto p-4">
      <div className=" flex items-center justify-between my-2 px-4">
        <div>
          <h1 className="hidden sm:block text-2xl font-semibold text-blue-400">
            {userRole === "admin" ? (
              <p> All Registered Events</p>
            ) : (
              <p> My Registered Events</p>
            )}
          </h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize View</span>
                <span className="lg:hidden">View</span>
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
        </div>
      </div>
      <div>
        <UserRegisteredEvents
          viewMode={viewMode}
          events={events}
          userRole={userRole}
        />
      </div>
    </div>
  );
};

export default ProfileBookedPage;
