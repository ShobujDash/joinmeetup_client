"use client";

import Calendar24 from "@/components/calendar-24";
import FormBuilderComponent from "@/components/mainComponents/formBuilder/FormBuilderComponent";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import axiosPublic from "@/lib/Axios/AxiosPublic";
import { Plus, Trash } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CreateTicketPage() {
  const { eventId } = useParams();
  const { user, loading } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";
  const ticketId = searchParams.get("ticketId");

  const [startSelling, setStartSelling] = useState("");
  const [stopSelling, setStopSelling] = useState("");
  const [totalTickets, setTotalTickets] = useState(""); // fallback "" instead of undefined
  const [maxTicketsPerOrder, setMaxTicketsPerOrder] = useState("10");
  const [createTicketOpen, setCreateTicketOpen] = useState(true);
  const [addAddendeeOpen, setAddAddendeeOpen] = useState(false);

  const [sellFeesToBuyer, setSellFeesToBuyer] = useState("pass");
  const [hasTablesOrGroups, setHasTablesOrGroups] = useState(false);
  const [limitToOne, setLimitToOne] = useState(false);
  const [ticketLoading, setTicketLoading] = useState(false);

  const [ticketTypes, setTicketTypes] = useState([
    {
      ticketName: "",
      price: "",
      quantity: "",
      sellStartAndEnd: ["", ""],
    },
  ]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/");
    } else {
      const fetchTicket = async () => {
        if (eventId) {
          try {
            const res = await axiosPublic.get(`/api/ticket/${eventId}`);
            const ticket = res?.data?.ticket;

            setStartSelling(ticket?.startSelling ?? "");
            setStopSelling(ticket?.stopSelling ?? "");
            setTotalTickets(ticket?.totalTickets?.toString() ?? "");
            setMaxTicketsPerOrder(
              ticket?.maxTicketsPerOrder?.toString() ?? "10"
            );
            setSellFeesToBuyer(ticket?.sellFeesToBuyer ?? "pass");
            setHasTablesOrGroups(ticket?.hasTablesOrGroups ?? false);
            setLimitToOne(ticket?.limitToOne ?? false);

            setTicketTypes(
              ticket?.ticketTypes?.map((type) => ({
                ticketName: type?.ticketName ?? "",
                price: type?.price?.toString() ?? "",
                quantity: type?.quantity?.toString() ?? "",
                sellStartAndEnd: type?.sellStartAndEnd?.map((dt) =>
                  dt ? new Date(dt).toISOString().slice(0, 16) : ""
                ) ?? ["", ""],
              })) ?? [
                {
                  ticketName: "",
                  price: "",
                  quantity: "",
                  sellStartAndEnd: ["", ""],
                },
              ]
            );
          } catch (err) {
            console.error("Failed to load ticket data", err);
          }
        }
      };
      fetchTicket();
    }
  }, [user, loading, eventId, router]);

  const addTicketType = () => {
    setTicketTypes((prev) => [
      ...prev,
      { ticketName: "", price: "", quantity: "", sellStartAndEnd: ["", ""] },
    ]);
  };

  const updateTicketType = (index, field, value) => {
    setTicketTypes((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const updateSellDates = (index, dateIndex, value) => {
    setTicketTypes((prev) => {
      const updated = [...prev];
      updated[index].sellStartAndEnd[dateIndex] = value;
      return updated;
    });
  };

  const removeTicketType = (index) => {
    setTicketTypes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventId) return toast.error("Event ID missing");

    const payload = {
      startSelling,
      stopSelling,
      totalTickets: totalTickets ? Number(totalTickets) : undefined,
      maxTicketsPerOrder: Number(maxTicketsPerOrder),
      sellFeesToBuyer,
      hasTablesOrGroups,
      limitToOne,
      ticketTypes: ticketTypes.map((t) => ({
        ticketName: t.ticketName,
        price: t.price ? parseFloat(t.price) : 0,
        quantity: t.quantity ? parseInt(t.quantity) : 0,
        sellStartAndEnd: t.sellStartAndEnd.map((dt) =>
          dt ? new Date(dt).toISOString() : null
        ),
      })),
    };

    try {
      setTicketLoading(true);

      if (isEditMode && ticketId) {
        await axiosPublic.put(`/api/ticket/${ticketId}`, payload);
        toast.success("Ticket updated!");
      } else {
        await axiosPublic.post(`/api/ticket/${eventId}`, payload);
        toast.success("Ticket created!");
      }

      router.push("/dashboard/events");
    } catch (err) {
      toast.error("Failed to submit ticket.");
    } finally {
      setTicketLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Tickets for Event</h1>

      <div className="flex gap-2 mt-3">
        <Button
          onClick={() => {
            setCreateTicketOpen(true);
            setAddAddendeeOpen(false);
          }}
          variant="outline"
          className={`${
            createTicketOpen ? "bg-blue-500 text-white" : ""
          } duration-200 cursor-pointer hover:bg-blue-600`}
        >
          <Plus />
          Create Ticket
        </Button>
        <Button
          onClick={() => {
            setCreateTicketOpen(false);
            setAddAddendeeOpen(true);
          }}
          variant="outline"
          className={`${
            addAddendeeOpen ? "bg-blue-500 text-white" : ""
          } duration-200 cursor-pointer hover:bg-blue-600`}
        >
          <Plus />
          Add Additional Registration Info
        </Button>
      </div>

      {createTicketOpen && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Calendar24
                ticket="ticket"
                eventdate="When do you want to start selling?"
                onChange={setStartSelling}
                value={startSelling ?? ""}
              />
            </div>
            <div>
              <Calendar24
                ticket="ticket"
                eventdate="When do you want to stop selling?"
                onChange={setStopSelling}
                value={stopSelling ?? ""}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Total number of tickets for event .
              </label>
              <input
                type="number"
                className="w-full border rounded p-2 mb-4"
                placeholder="Optional"
                value={totalTickets ?? ""}
                onChange={(e) => setTotalTickets(e.target.value)}
              />
            </div>

            <div>
              <label className="font-medium">Max Tickets per Order</label>
              <input
                type="number"
                className="w-full border p-2 mt-1"
                value={maxTicketsPerOrder ?? ""}
                onChange={(e) => setMaxTicketsPerOrder(e.target.value)}
              />
            </div>

            <div className="gap-3">
              <label className="block mb-2 font-medium">Selling Fees</label>
              <select
                className="w-full border rounded p-2 mb-4"
                value={sellFeesToBuyer ?? "pass"}
                onChange={(e) => setSellFeesToBuyer(e.target.value)}
              >
                <option value="pass">Pass selling fees onto buyer</option>
                <option value="absorb">Absorb fees</option>
                <option value="split">Split fees</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!hasTablesOrGroups}
              onChange={() => setHasTablesOrGroups(!hasTablesOrGroups)}
              id="hasTables"
            />
            <label htmlFor="hasTables">Event has tables/groups?</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={!!limitToOne}
              onChange={() => setLimitToOne(!limitToOne)}
              id="limitOne"
            />
            <label htmlFor="limitOne">Limit one ticket per person?</label>
          </div>

          <hr />

          <div className="flex gap-2 justify-between items-center">
            <h2 className="text-xl font-semibold">Ticket Types</h2>
            <Button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={addTicketType}
            >
              + Add Ticket Type
            </Button>
          </div>

          {ticketTypes?.map((t, index) => (
            <div key={index} className="border p-4 rounded relative space-y-2">
              <button
                type="button"
                onClick={() => removeTicketType(index)}
                className="absolute -top-3 -right-3 text-white bg-red-700 hover:bg-red-500 text-xs p-1 rounded-md"
                title="Remove"
              >
                <Trash />
              </button>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                <input
                  type="text"
                  placeholder="Ticket Name"
                  value={t?.ticketName ?? ""}
                  onChange={(e) =>
                    updateTicketType(index, "ticketName", e.target.value)
                  }
                  className="border p-2"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={t?.price ?? ""}
                  onChange={(e) =>
                    updateTicketType(index, "price", e.target.value)
                  }
                  className="border p-2"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={t?.quantity ?? ""}
                  onChange={(e) =>
                    updateTicketType(index, "quantity", e.target.value)
                  }
                  className="border p-2"
                />
                <input
                  type="datetime-local"
                  value={t?.sellStartAndEnd?.[0] ?? ""}
                  onChange={(e) => updateSellDates(index, 0, e.target.value)}
                  className="border p-2"
                />
                <input
                  type="datetime-local"
                  value={t?.sellStartAndEnd?.[1] ?? ""}
                  onChange={(e) => updateSellDates(index, 1, e.target.value)}
                  className="border p-2"
                />
              </div>
            </div>
          ))}

          <div className="mt-2 w-full flex justify-between">
            <div></div>
            <Button className="bg-blue-600 hover:bg-blue-700 duration-300 items-center self-end cursor-pointer">
              Submit
            </Button>
          </div>
        </form>
      )}

      {addAddendeeOpen && (
        <div className="my-2">
          <FormBuilderComponent
            ticketId={ticketId}
            eventId={eventId}
            isEditMode={isEditMode}
          />
        </div>
      )}
    </div>
  );
}
