"use client";

import EventForm from "@/components/mainComponents/event/EventForm";
import { useAuth } from "@/context/AuthContext";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CreateEventPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const eventId = searchParams.get("eventId");

  const [isChecking, setIsChecking] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [hasShownLimitError, setHasShownLimitError] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    const checkEventLimit = async () => {
      if (!user) {
        router.push("/");
        return;
      }

      try {
        setIsChecking(true);

        // 🔹 Event limit check
        const res = await axiosPublic.get(`/api/events/totalEventNumber`);
        const totalEvents = res?.data?.totalEvents || 0;

        if (totalEvents >= 5 && !hasShownLimitError) {
          toast.error(
            "You’ve reached your event creation limit. Please enroll."
          );
          setHasShownLimitError(true); 
          router.push("/enroll");
          setIsChecking(false);
          return;
        }

        if (eventId) {
          try {
            const { data } = await axiosPublic.get(
              `/api/events/single-event/${eventId}`
            );
            setEventData(data?.event);
          } catch (err) {
            toast.error("Could not load event details.");
          }
        }

        setIsChecking(false);
      } catch (error) {
        if (!hasShownLimitError) {
          toast.error("Unable to verify event creation limit.");
          setHasShownLimitError(true);
        }
        router.push("/");
      }
    };

    checkEventLimit();
  }, [user, router, eventId, authLoading, hasShownLimitError]);

  if (isChecking) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
          <p className="text-gray-600 font-semibold">
            Checking your event limit...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-10 bg-gray-100 min-h-screen">
      <EventForm eventData={eventData} />
    </main>
  );
};

export default CreateEventPage;
