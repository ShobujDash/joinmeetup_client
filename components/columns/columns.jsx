import { sslIPNAPI } from "@/service/projectService/payment.service";
import { IconDotsVertical } from "@tabler/icons-react";
import { Download } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

// 🔹 Columns generator
export const getColumns = (userRole, handleDownloadClick, handleDownloadInvoice) => {
  const baseColumns = [
    {
      id: "serial",
      header: "SL",
      cell: ({ row }) => (
        <span className="text-sm font-semibold text-muted-foreground">
          {row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "eventName",
      header: "Event Name",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="bg-purple-100 text-purple-700 text-[10px] font-mono"
        >
          {row?.original?.event?.eName?.split(" ").slice(0, 3).join(" ") +
            (row?.original?.event?.eName?.split(" ").length > 3 ? "..." : "")}
        </Badge>
      ),
    },
    ...(userRole === "admin"
      ? [
          {
            accessorKey: "userName",
            header: "User Name",
            cell: ({ row }) => (
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-700 text-[10px] font-mono"
              >
                {row?.original?.user?.name?.split(" ").slice(0, 3).join(" ") +
                  (row?.original?.user?.name?.split(" ").length > 3
                    ? "..."
                    : "")}
              </Badge>
            ),
          },
        ]
      : []),
    {
      accessorKey: "ticketType",
      header: "Ticket Type",
      cell: ({ row }) => {
        const types = row.original.ticketType?.split(",") || [];
        return (
          <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap">
            {types.map((type, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-yellow-100 text-yellow-800 text-[10px] font-medium px-2 py-1 rounded"
              >
                {type}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "ticketCount",
      header: "Member",
      cell: ({ row }) => (
        <span className="text-xs font-medium text-gray-800">
          {row.original.ticketCount}
        </span>
      ),
    },
    {
      accessorKey: "ticketPrice",
      header: "Price",
      cell: ({ row }) => (
        <span className="text-xs font-medium text-gray-800">
          ${row.original.ticketPrice}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Purchase Time",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.createdAt)
            .toISOString()
            .slice(0, 16)
            .replace("T", " ")}
        </span>
      ),
    },
  ];

  // 🔹 Extra columns (only for admin)
  const extraColumns = [
    {
      id: "userJson",
      header: "User Info",
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xs px-2 py-1 h-auto">
              See Info
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] max-h-[250px] overflow-auto text-xs">
            {row.original.userJson?.map((user, index) => (
              <div
                key={index}
                className="border rounded p-2 mb-2 bg-gray-50 shadow"
              >
                <p className="font-semibold mb-1">User {index + 1}</p>
                {Object.entries(user).map(([key, val]) => (
                  <div key={key} className="flex justify-between text-gray-700">
                    <span className="font-medium">{key}:</span>
                    <span className="text-right">{String(val)}</span>
                  </div>
                ))}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      ),
    },
    {
      id: "attendeeJson",
      header: "Attendee Info",
      cell: ({ row }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="text-xs px-2 py-1 h-auto">
              See Info
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] max-h-[250px] overflow-auto text-xs">
            {Object.entries(row.original.attendeeJson || {}).map(
              ([key, val], idx) => {
                const label = key.split("-")[0];
                return (
                  <div
                    key={idx}
                    className="border rounded p-2 mb-2 bg-gray-50 shadow"
                  >
                    <div className="font-medium text-gray-600 mb-1">
                      {label}
                    </div>
                    <div className="text-gray-800">
                      {Array.isArray(val)
                        ? val.join(", ")
                        : typeof val === "object"
                        ? "Uploaded File"
                        : String(val)}
                    </div>
                  </div>
                );
              }
            )}
          </PopoverContent>
        </Popover>
      ),
    },
    {
      id: "Payment Status",
      header: "Payment Status",
      cell: ({ row }) => {
        let bgColor = "bg-gray-100 text-gray-800"; // default
        const status = row.original.paymentStatus;

        if (status === "Paid") {
          bgColor = "bg-green-100 text-green-800";
        } else if (status === "Failed") {
          bgColor = "bg-red-100 text-red-800";
        } else if (status === "Pending") {
          bgColor = "bg-yellow-100 text-yellow-800";
        }

        return (
          <Badge
            variant="outline"
            className={`${bgColor} text-[10px] font-medium px-2 py-1 rounded`}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "View Station",
      header: "Payment IPN",
      cell: ({ row }) => {
        const [ipnData, setIpnData] = React.useState(null);
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState(null);

        const fetchIPN = async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await sslIPNAPI(row.original.transactionId);
            setIpnData(data);
          } catch (err) {
            setError("Failed to load IPN data");
          } finally {
            setLoading(false);
          }
        };

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="text-xs px-2 py-1 h-auto"
                onClick={fetchIPN} // click করলে fetch হবে
              >
                Payment Ipn
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] max-h-[300px] overflow-auto text-xs">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {ipnData && (
                <pre className="text-[10px] whitespace-pre-wrap">
                  {JSON.stringify(ipnData, null, 2)}
                </pre>
              )}
              {!loading && !ipnData && !error && <p>No data yet</p>}
            </PopoverContent>
          </Popover>
        );
      },
    },
  ];

  // 🔹 Actions column (always last)
  const actionColumn = {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDownloadClick(row?.original);
            }}
            className="cursor-pointer hover:bg-gray-400 "
          >
            <span>
              <Download />
            </span>
            <span>Download Ticket</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDownloadInvoice(row?.original?.transactionId);
            }}
            className="cursor-pointer hover:bg-gray-400"
          >
            <span>
              <Download />
            </span>
            <span>Download Invoice</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  };

  // ✅ Ensure "Actions" is always at the end
  return userRole === "admin"
    ? [...baseColumns, ...extraColumns, actionColumn]
    : [...baseColumns, actionColumn];
};
