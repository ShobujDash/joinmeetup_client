"use client";

import { UpcomingEventsSkeleton } from "@/components/loading/UpcomingEventsSkeleton";
import { useAuth } from "@/context/AuthContext";
import {
  fetchEvents,
  fetchEventsByCategory,
} from "@/lib/Events/getEventsFromHome";
import { useEffect, useState } from "react";
import HomeEvents from "../home/HomeEvents";

const FilteredEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedOption } = useAuth();

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);

        if (!selectedOption) {
          const data = await fetchEvents();
          setEvents(data);
        } else {
          const data = await fetchEventsByCategory(selectedOption);
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, [selectedOption]);

  if (loading) {
    return <UpcomingEventsSkeleton />;
  }

  // যদি events array খালি হয়
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center text-gray-500">
        <svg
          className="w-16 h-16 mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-4h6v4m2 0H7m6 0V9m0 0L5 21h14L12 9z"
          />
        </svg>
        <h2 className="text-lg font-semibold mb-1">No Events Found</h2>
        <p className="text-sm text-gray-400">
          There are no events available for "{selectedOption}" category.
        </p>
      </div>
    );
  }

  return (
    <HomeEvents
      events={events}
      allEvents={true}
      selectedOption={selectedOption}
    />
  );
};

export default FilteredEvents;
