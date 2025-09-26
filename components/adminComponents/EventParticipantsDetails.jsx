"use client"

import { getSingleEventAPI } from "@/service/projectService/event.service";
import { CalendarCheck, Ticket, Users, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const EventParticipantsDetails =  ({eventId}) => {

  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchSingleEventDetails = async () => {
      const data = await getSingleEventAPI(eventId);
      setEvent(data)
    };
    fetchSingleEventDetails();
  }, [eventId]);

  return (
    <>
      <div className="md:max-w-[43rem] lg:max-w-[65rem] ">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-2">
          {/* Total Tickets */}
          <div className="flex items-center p-4 bg-blue-50 rounded-lg shadow border border-gray-200">
            <div className="p-3 bg-blue-100 rounded-full">
              <Ticket className="w-6 h-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Tickets</p>
              <p className="text-xl font-semibold text-gray-800">
                {event?.totalTickets}
              </p>
            </div>
          </div>

          {/* Total Bookings */}
          <div className="flex items-center p-4 bg-green-50 rounded-lg shadow border border-gray-200">
            <div className="p-3 bg-green-100 rounded-full">
              <CalendarCheck className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-xl font-semibold text-gray-800">
                {event?.totalBookings}
              </p>
            </div>
          </div>

          {/* Total Income */}
          <div className="flex items-center p-4 bg-yellow-50 rounded-lg shadow border border-gray-200">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Wallet className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-xl font-semibold text-gray-800">
                {event?.totalIncome} BDT
              </p>
            </div>
          </div>

          {/* Total Members */}
          <div className="flex items-center p-4 bg-purple-50 rounded-lg shadow border border-gray-200">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-xl font-semibold text-gray-800">
                {event?.totalMember}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventParticipantsDetails;
