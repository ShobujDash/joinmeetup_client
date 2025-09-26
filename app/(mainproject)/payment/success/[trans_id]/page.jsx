"use client";

import InvoiceDetails from "@/components/mainComponents/InvoiceDetails";
import { getDetailsByTransIdAPI } from "@/service/projectService/registerEvent.service";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function PaymentSuccess({ params }) {
  const router = useRouter();
  const { trans_id } = params;
  const [loading, setLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceRef = useRef(null); // Ref for print

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!trans_id) return;

      try {
        setLoading(true);
        const data = await getDetailsByTransIdAPI(trans_id);
        setInvoiceData(data);
      } catch (error) {
        console.error("Failed to fetch invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [trans_id]);

const handlePrint = () => {
  if (invoiceRef.current) {
    const printContents = invoiceRef.current.outerHTML;
    const printWindow = window.open("", "", "height=900,width=1200");
    printWindow.document.write("<html><head><title>Invoice</title>");
    printWindow.document.write(`
        <style>
          body { font-family: sans-serif; padding: 20px; background-color: #0A2339; color: #fff; margin: 0; }
          .invoice-container { display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap; background-color: #142E4C; padding: 20px; border-radius: 12px; }
          .invoice-column { flex: 1 1 45%; display: flex; flex-direction: column; gap: 12px; }
          .invoice-item { background-color: #1e3d63; padding: 10px; border-radius: 8px; color: #fff; }
          .invoice-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
          h2 { margin: 0; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      `);
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A2339]">
        <p className="text-lg font-semibold text-white">
          Loading payment details...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-4 sm:py-0"
      style={{
        background: `radial-gradient(circle at center, #0A2339, #0B1121, #0B1120, #0F172A)`,
      }}
    >
      <div className="max-w-[80vw] min-h-[70vh] bg-[#12203F] rounded-2xl shadow-xl p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column - Payment Success */}
        <div className="flex-1 flex flex-col justify-center items-start rounded-xl p-8 shadow-inner">
          <h1 className="text-4xl font-bold text-green-300 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg mb-2 text-white">Thank you for your payment.</p>
          <p className="text-sm text-gray-200 mb-6">
            Your transaction ID is:
            <span className="font-mono bg-gray-100 px-2 py-1 rounded ml-2 text-black">
              {trans_id}
            </span>
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Go to Home
          </button>
        </div>

        {/* Right Column - Invoice */}
        <div
          className="flex-1 flex flex-col justify-start items-start bg-[#142E4C] rounded-xl p-6 shadow-lg"
          ref={invoiceRef}
        >
          {/* Invoice Header */}
          <div className="w-full flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-100">Invoice</h2>
            <Download
              className="text-white w-5 h-5 cursor-pointer"
              onClick={handlePrint}
            />
          </div>

          {/* Invoice Details */}
          <InvoiceDetails invoiceData={invoiceData}/>
        </div>
      </div>
    </div>
  );
}
