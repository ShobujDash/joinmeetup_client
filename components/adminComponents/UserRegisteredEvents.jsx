"use client";

import { RegistrationTable } from "@/components/adminComponents/table/RegistrationTable";
import { CalendarX2 } from "lucide-react"; // 🗓️ Icon for empty state
import RegisteredCard from "./RegisteredCard";

const UserRegisteredEvents = ({ viewMode, events, userRole }) => {
  console.log("events?.event", events);

  return (
    <div className="min-h-[50vh] py-3">
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-600 bg-white rounded-xl shadow-inner py-20 px-6">
          <CalendarX2 className="w-16 h-16 text-red-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            No booked events found.
          </h2>
          <p className="text-gray-500 mb-4">
            You haven't booked any events yet.
          </p>
        </div>
      ) : viewMode === "card" ? (
        <RegisteredCard events={events} />
      ) : (
        <RegistrationTable data={events} userRole={userRole} />
      )}
    </div>
  );
};

export default UserRegisteredEvents;
