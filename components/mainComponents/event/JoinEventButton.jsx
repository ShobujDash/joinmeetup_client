"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { checkIfUserRegisteredEventAPI } from "@/service/projectService/registerEvent.service";
import { isEventExpired } from "@/utils/timeUtils";
import { Loader2Icon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { GetTicketModal } from "../modal/GetTicketModal";

export default function JoinEventClientButton({
  startTime,
  endTime,
  eventId,
  eventName,
  eventCreatorId,
}) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [registered, setRegisterede] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // 🟢 modal state
  const [ticket, setTicket] = useState(null);

  const isExpired = useMemo(() => {
    return isEventExpired(startTime, endTime);
  }, [startTime, endTime]);

  // ✅ Check booking status
  useEffect(() => {
    const checkBooking = async () => {
      if (!user?.id || !eventId) {
        setLoading(false);
        return;
      }

      try {
        const res = await checkIfUserRegisteredEventAPI(eventId);
        if (res?.success) {
          setRegisterede(res?.isRegistered);
        }
      } catch (error) {
        // Not booked is expected: do nothing
        setRegisterede(false);
      } finally {
        setLoading(false);
      }
    };

    checkBooking();
  }, [user?.id, eventId]);

  const handleJoinEvent = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please login before joining this event!");
    }

    try {
      const res = await axiosPublic.get(`/api/ticket/${eventId}`);
      if (res?.data?.success) {
        setTicket(res?.data?.ticket); // 🟢 Set ticket data
        setModalOpen(true); // 🟢 Open the modal
      } else {
        toast.error("No ticket available for this event.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching ticket data.");
    }
  };

  return (
    <>
      <Button
        onClick={handleJoinEvent}
        disabled={isExpired || registered || loading}
        className={`w-full sm:w-fit flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
          isExpired || registered
            ? "bg-red-600 cursor-not-allowed hover:bg-red-600"
            : "bg-gradient-to-r from-green-400 via-blue-400 to-green-400 hover:from-green-300 hover:via-blue-300 hover:to-green-300 text-white"
        }`}
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin w-4 h-4" />
            Checking...
          </>
        ) : isExpired ? (
          "Time Over"
        ) : registered ? (
          "Registered"
        ) : (
          "Get Ticket"
        )}
      </Button>

      {/* 🟢 Show Modal */}
      <GetTicketModal
        open={modalOpen}
        setOpen={setModalOpen}
        ticket={ticket}
        eventId={eventId}
        eventName={eventName}
        eventCreatorId={eventCreatorId}
      />
    </>
  );
}
