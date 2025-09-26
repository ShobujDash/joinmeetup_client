// "use client";

import { TicketsTable } from "@/components/adminComponents/table/TicketsTable";
// import { useAuth } from "@/context/AuthContext";
import { getAllTicketsAPI } from "@/service/projectService/ticket.service";
// import { useEffect, useState } from "react";

const Ticketspage = async () => {
  const tickets = await getAllTicketsAPI();
  // const { user } = useAuth();
  // const userRole = user?.role;

  // const [tickets, setTickets] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTicketData = async () => {
  //     try {
  //       if (!userRole) return;

  //       if (userRole === "eventCreator" || userRole === "user") {
  //         const result = await getMyTicketsAPI();
  //         setTickets(result?.registeredEvents || []);
  //       } else if (userRole === "admin") {
  //         const registrationEvent = await getAllTicketsAPI();
  //         setTickets(registrationEvent || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching tickets:", error);
  //       setTickets([]); // ✅ এখানে setTickets হবে, setEvents নয়
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTicketData();
  // }, [user]);

  // if (loading) {
    return <h1>Loading...</h1>;
  // }

  return (
    <div className="max-w-[67rem]">
      <TicketsTable data={tickets} />
    </div>
  );
};

export default Ticketspage;
