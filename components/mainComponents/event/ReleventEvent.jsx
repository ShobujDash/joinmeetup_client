"use client";
import { getEventsByCreatorIdService } from "@/lib/Events/getEventsByUserId";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "../../ui/card";

const ReleventEvent = ({ creatorId, creatorName, eventId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fectchEvent = async () => {
      const res = await getEventsByCreatorIdService(creatorId);
      const filtered = res.filter((event) => event.id !== eventId);
      setEvents(filtered);
    };
    fectchEvent();
  }, []);

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No events found for this user.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b-2 border-blue-500 inline-block pb-1 mb-4">
        {creatorName} More Events
      </h1>
      {events.map((event) => (
        <Card key={event.id} className="py-0">
          <Link
            href={`/event/${event?.id}`}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
          >
            {event.banner && (
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${event.banner}`}
                alt={event.eName}
                className="w-32 h-full rounded-l-md object-cover"
              />
            )}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-800">{event.eName}</h2>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarDays size={16} />
                <span>{event.eStDateAndTime}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{event.isOnline ? "Online" : event.eAddress}</span>
              </div>

              {event.fbUrl && (
                <p
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View on Facebook
                </p>
              )}
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default ReleventEvent;
