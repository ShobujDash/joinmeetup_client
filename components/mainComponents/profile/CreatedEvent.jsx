"use client";

import { Button } from "@/components/ui/button";
import { CalendarX2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EventCard from "../EventCard";
import { DeleteAlartModal } from "../modal/DeleteModal";
import { PublishAlertModal } from "../modal/PublishEventModal";
import { TicketModal } from "../modal/ShowTicketModal";
import { CreatedEventTable } from "../table/CreatedEventTable";

const CreatedEvent = ({ viewMode, events, setEvents }) => {
  const [eventId, setEventId] = useState(null);
  const [showAlartModal, setShowAlartModal] = useState(false);
  const [showTicketDetailsModal, setShowTicketDetailsModal] = useState(false);
  const [showPublishEventModal, setShowPublishEventModal] = useState(false);
  const [ticket, setTicket] = useState({});
  const [publish, setPublish] = useState(null);

  const handleDeleteSuccess = (deletedEventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== deletedEventId));
  };

  const handlePublishSuccess = (publishedEventId, isNowPublished) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === publishedEventId
          ? { ...event, isPublish: isNowPublished }
          : event
      )
    );
  };

  return (
    <div className="min-h-[50vh] py-6">
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 bg-white rounded-xl shadow-inner py-20 px-6">
          <CalendarX2 className="w-16 h-16 text-red-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            No Events Found
          </h2>
          <p className="text-gray-500 mb-4">
            You haven’t created any events yet. Start building your first one!
          </p>
          <Link href="/create-event">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              + Create New Event
            </Button>
          </Link>
        </div>
      ) : viewMode === "card" ? (
        <EventCard
          events={events}
          setTicket={setTicket}
          setEventId={setEventId}
          setShowTicketDetailsModal={setShowTicketDetailsModal}
          setShowAlartModal={setShowAlartModal}
          setShowPublishEventModal={setShowPublishEventModal}
          setPublish={setPublish}
        />
      ) : (
        <CreatedEventTable
          data={events}
          events={events}
          setTicket={setTicket}
          setEventId={setEventId}
          setShowTicketDetailsModal={setShowTicketDetailsModal}
          setShowAlartModal={setShowAlartModal}
          setShowPublishEventModal={setShowPublishEventModal}
          setPublish={setPublish}
        />
      )}

      <TicketModal
        open={showTicketDetailsModal}
        setOpen={setShowTicketDetailsModal}
        ticket={ticket}
        eventId={eventId}
      />

      <DeleteAlartModal
        open={showAlartModal}
        setOpen={setShowAlartModal}
        eventId={eventId}
        onDeleteSuccess={handleDeleteSuccess}
      />

      <PublishAlertModal
        open={showPublishEventModal}
        setOpen={setShowPublishEventModal}
        eventId={eventId}
        onPublishSuccess={handlePublishSuccess}
        publish={publish}
      />
    </div>
  );
};

export default CreatedEvent;
