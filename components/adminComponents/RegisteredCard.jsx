"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarRange, Download } from "lucide-react"; // 🗓️ Icon for empty state
import Link from "next/link";
import { useState } from "react";
import TicketModal from "./modal/DownloadTicketModal";

const RegisteredCard = ({ events }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDownloadClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <Card className="flex flex-col h-full py-0" key={event?.id}>
            <Link
              href={`/event/${event?.event?.id}`}
              className="flex flex-col h-full bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${event?.event?.banner}`}
                alt="event image"
                width={500}
                height={200}
                className="w-full h-44 object-cover rounded-t-2xl"
              />

              {/* Content */}
              <div className="p-4 flex-1">
                <h3 className="font-semibold text-md text-gray-900 mb-2">
                  {event?.event?.eName}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Hosted by: {event?.event?.hostName || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500 mb-1 flex gap-2">
                  <CalendarRange className="w-4 h-4 text-blue-800" />{" "}
                  {event?.event?.eStDateAndTime}
                </p>
              </div>

              {!event?.tickets && (
                <div className="mt-auto flex flex-col gap-1">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDownloadClick(event);
                    }}
                    className="w-full rounded-none cursor-pointer"
                    variant={"ghost"}
                  >
                    <span>
                      <Download />
                    </span>
                    <span>DownLoad Ticket</span>
                  </Button>
                  <Button className="w-full rounded-t-none bg-blue-800 ">
                    Booked
                  </Button>
                </div>
              )}
            </Link>
          </Card>
        ))}
      </div>

      {selectedEvent && (
        <TicketModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          userTickets={selectedEvent.userJson}
          event={selectedEvent}
        />
      )}
    </>
  );
};

export default RegisteredCard;
