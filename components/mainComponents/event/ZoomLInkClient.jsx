"use client";
import { useAuth } from "@/context/AuthContext";
import { checkIfUserRegisteredEventAPI } from "@/service/projectService/registerEvent.service";
import { useEffect, useState } from "react";

const ZoomLInkClient = ({ isOnline, zoomLink, eventId }) => {
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkBooking = async () => {
      if (!user?.id || !eventId) {
        setLoading(false);
        return;
      }

      try {
        const res = await checkIfUserRegisteredEventAPI(eventId);
        if (res?.success) {
          setIsRegistered(res?.isRegistered);
        }
      } catch (error) {
        setIsRegistered(false);
      } finally {
        setLoading(false);
      }
    };

    checkBooking();
  }, [user?.id, eventId]);

  if (loading) return null; // লোডিং চললে কিছুই দেখাবো না

  return (
    <>
      {user && isOnline && isRegistered && (
        <div className="flex gap-2 bg-white rounded-md p-2 items-center">
          <h3 className="font-semibold mb-1">Zoom Link:</h3>
          <p className="text-blue-600 underline">{zoomLink}</p>
        </div>
      )}
    </>
  );
};

export default ZoomLInkClient;
