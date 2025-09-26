"use client";
import { TableSkeleton } from "@/components/loading/TableSkeleton";
import { SearchBox } from "@/components/mainComponents/SearchBox/SearchBox";
import { ParticipantsTable } from "@/components/mainComponents/table/ParticipantsTable";
import { useAuth } from "@/context/AuthContext";
import { participantsAPI } from "@/service/projectService/registerEvent.service";
import { Users } from "lucide-react"; 
import { useEffect, useState } from "react";

const Page = () => {
  const [participants, setParticipants] = useState([]);
  const { filteredEventId, setFilteredEventId } = useAuth();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getParticipants = async () => {
      setLoading(true);
      const res = await participantsAPI();

      if (res?.success) {
        setParticipants(res?.data);
      } else {
        setParticipants([]);
      }
      setLoading(false);
    };
    getParticipants();
  }, []);

  const uniqueEventIds = Array.from(
    new Set(participants.map((p) => p.eventId))
  );

  const filteredParticipants = filteredEventId
    ? participants.filter((p) => p.eventId === filteredEventId)
    : participants;
  
  const uniqueEventOptions = Array.from(
    new Map(
      participants.map((p) => [
        p.eventId,
        p.eventName.split(" ").slice(0, 3).join(" ") +
          (p.eventName.split(" ").length > 3 ? "..." : ""),
      ])
    )
  ).map(([id, shortName]) => ({ id, name: shortName }));

  if (loading) return <TableSkeleton />;

  return (
    <div className="max-w-screen md:max-w-[45rem] lg:max-w-[67rem] mx-auto p-4">
      {filteredParticipants.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-2xl border border-dashed">
          <Users className="h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-semibold text-gray-700">
            No Participants Found
          </h3>
          <p className="mt-1 text-gray-500 text-sm">
            Try selecting a different event or check back later.
          </p>
        </div>
      ) : (
        <ParticipantsTable
          data={filteredParticipants}
          eventId={filteredEventId}
        >
          <SearchBox
            eventOptions={uniqueEventOptions}
            setFilteredEventId={setFilteredEventId}
          />
        </ParticipantsTable>
      )}
    </div>
  );
};

export default Page;
