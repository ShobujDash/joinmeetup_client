"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function TicketModal({ open, setOpen, ticket, eventId }) {
  if (!ticket) return null;
  const router = useRouter();

  const editHandler = () => {
    setOpen(false);
    router.push(`/event/${eventId}/ticket?mode=edit&ticketId=${ticket?.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[425px] md:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            Ticket Details
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Full configuration and settings for your event tickets
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <p className="text-sm text-gray-500">Start Selling</p>
            <p className="font-medium text-gray-800">
              {new Date(ticket.startSelling).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Stop Selling</p>
            <p className="font-medium text-gray-800">
              {new Date(ticket.stopSelling).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Tickets</p>
            <p className="font-medium text-gray-800">{ticket.totalTickets}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Max Tickets Per Order</p>
            <p className="font-medium text-gray-800">
              {ticket.maxTicketsPerOrder}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Sell Fees</p>
            <Badge>{ticket.sellFeesToBuyer}</Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">Has Tables / Groups</p>
            <Badge variant={ticket.hasTablesOrGroups ? "default" : "outline"}>
              {ticket.hasTablesOrGroups ? "Yes" : "No"}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-gray-500">Limit To One</p>
            <Badge variant={ticket.limitToOne ? "default" : "outline"}>
              {ticket.limitToOne ? "Yes" : "No"}
            </Badge>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ticket Types
          </h3>
          <div className="space-y-4">
            {ticket.ticketTypes?.map((type, idx) => (
              <div
                key={idx}
                className="border rounded-xl p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-md font-semibold text-gray-800 mb-1">
                  {type.ticketName}
                </p>
                <p className="text-sm text-gray-600">Price: ${type.price}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {type.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Sell Window:{" "}
                  {new Date(type.sellStartAndEnd[0]).toLocaleString()} -{" "}
                  {new Date(type.sellStartAndEnd[1]).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={editHandler}
            className={
              "bg-red-400 hover:bg-red-600 duration-300 cursor-pointer"
            }
          >
            Edit
          </Button>
          <Button onClick={() => setOpen(false)} className={"cursor-pointer"}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
