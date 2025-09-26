import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import {
  BanknoteArrowUp,
  CalendarRange,
  MapPin,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";

const SingleEvent = ({ event }) => {
  return (
    <Card className="relative py-0">
      <Link
        href={`/event/${event.id}`}
        className="bg-white rounded-2xl transition duration-300 overflow-hidden cursor-pointer block group"
      >
        {/* Image Wrapper with overflow-hidden */}
        <div className="   overflow-hidden rounded-b-none rounded-2xl">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${event.banner}`}
            alt="event image"
            width={500}
            height={200}
            className="w-full h-44 object-cover rounded-b-none rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Badge top-left */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 text-xs font-medium px-2 py-1 rounded-md shadow">
          {event?.isOnline ? (
            <>
              <Video className="w-3 h-3 text-green-600" />
              <span className="text-green-700">Online</span>
            </>
          ) : (
            <>
              <MapPin className="w-3 h-3 text-red-600" />
              <span className="text-red-700">Offline</span>
            </>
          )}
        </div>

        <div className="p-2">
          <div className="flex justify-between items-center border-b border-gray-500 pb-2">
            <p className="flex items-center gap-1 text-xs font-light px-2 py-1 rounded-sm bg-gray-200">
              <Users className="w-3 h-3" />
              <span className="font-medium">Total Seat</span>
              <span className="font-medium">{event?.totalTickets}</span>
            </p>
            <p className="flex items-center gap-1 text-xs font-light px-2 py-1 rounded-sm bg-gray-200">
              <Users className="w-3 h-3" />
              <span className="font-medium"> Seat Booked </span>
              <span className="font-medium">{event?.totalMember}</span>
            </p>
          </div>
          <h3 className="font-semibold text-md text-gray-900 mb-2">
            {event.eName.split(" ").slice(0, 5).join(" ")}
            {event.eName.split(" ").length > 5 && "..."}
          </h3>

          <p className="text-sm text-gray-600 mb-1">
            Hosted by :{" "}
            <span className="font-medium text-black">
              {event?.hostName || "Anonymous"}
            </span>
          </p>
          <p className="text-sm text-gray-500 mb-1 flex gap-2">
            <CalendarRange className="w-4 h-4 text-blue-800" />{" "}
            {formatDate(event?.eStDateAndTime)}
          </p>
          <p className="text-sm text-gray-500 mb-1 flex gap-2">
            <BanknoteArrowUp className="w-4 h-4 text-blue-800" /> Free
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default SingleEvent;
