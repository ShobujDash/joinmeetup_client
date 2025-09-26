"use client";

import { Button } from "@/components/ui/button";
import { CalendarRange, Ticket, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const TicketModal = ({ isOpen, onClose, userTickets, event }) => {
  const contentRef = useRef(null);

  const handlePrint = () => {
    if (!contentRef.current) {
      alert("Nothing to print!");
      return;
    }

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${event?.event?.eName || "Ticket"}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              .ticket { border-radius: 15px; overflow: hidden; margin-bottom: 20px; }
              .ticket-info { background: rgba(0,0,0,0.6); color: white; padding: 20px; }
              .ticket img { max-width: 100%; border-radius: 0 15px 15px 0; }
            </style>
          </head>
          <body>
            ${contentRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 ">
      <div className="bg-white w-full max-w-5xl max-h-[85vh] p-4 md:p-8 rounded-2xl shadow-2xl overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 rounded-full w-8 h-8 flex items-center justify-center font-bold"
        >
          <X/>
        </button>

        {/* Print Button */}
        <div className="flex justify-start mb-4 gap-2">
          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Download / Print
          </Button>
        </div>

        {/* Ticket Content */}
        <div ref={contentRef} className="flex flex-col gap-6">
          {userTickets.map((ticket, index) => (
            <div
              key={index}
              className="ticket w-full flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,0,150,0.5), rgba(0,204,255,0.5)), url('https://plus.unsplash.com/premium_photo-1683121447942-a62eb0aef48e')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "260px",
              }}
            >
              <div className="ticket-info w-full flex flex-col justify-between p-6 text-white">
                <div>
                  <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">
                    Welcome, {ticket.name}!
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-1">
                    {event?.event?.eName}
                  </h3>
                  <p className="flex items-center gap-2 text-base md:text-lg mb-2">
                    <CalendarRange className="w-5 h-5 text-blue-400" />
                    {new Date(event?.event?.eStDateAndTime).toLocaleString()}
                  </p>
                  <p className="flex items-center gap-2 text-base md:text-lg mb-4">
                    <Ticket className="w-5 h-5 text-blue-400" />
                    {ticket?.ticketType}
                  </p>
                  <p className="text-base md:text-lg">
                    You are cordially invited to join this amazing event. Don’t
                    miss it!
                  </p>
                </div>
                <div className="mt-4 flex justify-end items-end">
                  <p className="text-sm md:text-base font-medium italic">
                    - {event?.event?.hostName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
