"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getDetailsByTransIdAPI } from "@/service/projectService/registerEvent.service";
import { X } from "lucide-react";
import InvoiceDetails from "@/components/mainComponents/InvoiceDetails";

export default function DownloadInvoiceModal({ isOpen, onClose, transId }) {
  const contentRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!transId) return;
      try {
        setLoading(true);
        const data = await getDetailsByTransIdAPI(transId);
        setInvoiceData(data);
      } catch (error) {
        console.error("❌ Failed to fetch invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [transId]);

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
            <title>Invoice - ${transId}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; background: #f9fafb; }
              .invoice-card {
                background: #fff;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                max-width: 700px;
                margin: auto;
              }
              .invoice-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
              }
              .invoice-item {
                background: #f3f4f6;
                padding: 10px;
                border-radius: 8px;
              }
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
    <Dialog open={isOpen} onOpenChange={onClose} className="bg-[#0A2339]">
      <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0A2339]">
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
          <DialogDescription>Transaction ID: {transId}</DialogDescription>
        </DialogHeader>

        {/* Invoice Content */}
        <div ref={contentRef} className="invoice-card">
          <InvoiceDetails invoiceData={invoiceData} />
        </div>

        <DialogFooter>
          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Download / Print
          </Button>
          <Button variant="destructive" onClick={onClose}>
            <X className="w-4 h-4 mr-1" /> Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
