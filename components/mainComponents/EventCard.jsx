"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isEventEditExpired } from "@/utils/timeUtils";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EventCard = ({
  events,
  setTicket,
  setEventId,
  setShowTicketDetailsModal,
  setShowPublishEventModal,
  setPublish,
}) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <Card key={event?.id} className="relative p-0">
          {/* Edit Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 -right-2 text-black hover:text-gray-700 bg-gray-200"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (isEventEditExpired(event?.eEndDateAndTime)) {
                toast.error(
                  "The event date has already passed, so it cannot be edited!"
                );
                return;
              }

              router.push(`/create-event/?eventId=${event?.id}`);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>

          {/* Card Content */}
          <Link
            href={`/event/${event.id}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer block h-full"
          >
            <div className="flex flex-col h-full">
              {/* Top Section */}
              <div>
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${event.banner}`}
                  alt="event image"
                  width={500}
                  height={200}
                  className="w-full h-44 p-2 object-cover rounded-2xl"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-md text-gray-900 mb-2">
                    {event.eName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Hosted by: {event.creator?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    📅 {event.eStDateAndTime}
                  </p>
                  <p className="text-sm text-gray-500">🎟️ Free</p>
                </div>
              </div>

              {/* Buttons Always at Bottom */}
              <div className="mt-auto p-4 flex flex-col gap-2">
                {event?.tickets[0]?.id ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setTicket(event?.tickets[0]);
                      setEventId(event?.id);
                      setShowTicketDetailsModal(true);
                    }}
                    className="w-full bg-green-800 hover:bg-green-600 cursor-pointer"
                  >
                    See Ticket
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      router.push(`/event/${event.id}/ticket`);
                    }}
                    className="w-full bg-green-800 hover:bg-green-600 cursor-pointer"
                  >
                    Add Ticket
                  </Button>
                )}

                {!event?.isPublish ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEventId(event?.id);
                      setShowPublishEventModal(true);
                      setPublish(true);
                    }}
                    className="w-full bg-yellow-600 hover:bg-yellow-500 text-white cursor-pointer rounded-t-none duration-300"
                  >
                    Publish Event
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setEventId(event?.id);
                      setShowPublishEventModal(true);
                      setPublish(false);
                    }}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer rounded-t-none"
                  >
                    Remove from Public
                  </Button>
                )}
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default EventCard;
