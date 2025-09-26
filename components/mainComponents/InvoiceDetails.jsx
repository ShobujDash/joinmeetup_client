"use client";

export default function InvoiceDetails({ invoiceData }) {
  if (!invoiceData) {
    return <p className="text-gray-400">No invoice details available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div className="flex flex-col">
        <span className="font-medium text-gray-300 mb-1">Name</span>
        <div className="bg-[#1e3d63] text-gray-100 px-3 py-2 rounded invoice-item">
          {invoiceData?.userName}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-300 mb-1">Email</span>
        <div className="bg-[#1e3d63] text-gray-100 px-3 py-2 rounded invoice-item">
          {invoiceData?.userEmail}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-300 mb-1">Transaction ID</span>
        <div className="bg-[#1e3d63] text-gray-100 px-3 py-2 rounded font-mono invoice-item">
          {invoiceData?.transactionId}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-300 mb-1">Amount Paid</span>
        <div className="bg-[#1e3d63] text-gray-100 px-3 py-2 rounded invoice-item">
          {invoiceData?.totalPrice} BDT
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-300 mb-1">Date</span>
        <div className="bg-[#1e3d63] text-gray-100 px-3 py-2 rounded invoice-item">
          {new Date(invoiceData?.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="font-medium text-gray-300 mb-1">Total Ticket</span>
        <div className="bg-[#1e3d63] text-gray-100 px-3 py-2 rounded invoice-item">
          {invoiceData?.ticketCount}
        </div>
      </div>
    </div>
  );
}
