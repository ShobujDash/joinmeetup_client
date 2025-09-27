"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
} from "@tabler/icons-react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import EventParticipantsDetails from "@/components/adminComponents/EventParticipantsDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), {
  ssr: false,
});

// Create a separate component for the drag handle
function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

export const columns = [
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
    accessorKey: "UserName",
    header: "User Name",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-teal-100 text-teal-700 text-[10px] font-mono"
      >
        {row.original.userName}
      </Badge>
    ),
  },
  {
    accessorKey: "User Email",
    header: "User Email",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-teal-100 text-teal-700 text-[10px] font-mono"
      >
        {row.original.userEmail}
      </Badge>
    ),
  },
  {
    accessorKey: "eventId",
    header: "Event Name",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="bg-purple-100 text-purple-700 text-[10px] font-mono"
      >
        {row.original.eventName.split(" ").slice(0, 3).join(" ") +
          (row.original.eventName.split(" ").length > 3 ? "..." : "")}
      </Badge>
    ),
  },
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
        {row.original.ticketPrice}
      </span>
    ),
  },
  {
    id: "userJson",
    header: "User Details",
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="text-xs px-2 py-1 h-auto">
            See Details
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
    header: "Attendee Details",
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="text-xs px-2 py-1 h-auto">
            See Details
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] max-h-[250px] overflow-auto text-xs">
          {Object.entries(row.original.attendeeJson || {}).map(
            ([key, val], idx) => {
              const label = key.split("-")[0]; // only keep the first part (e.g., "checkbox" or "date")

              return (
                <div
                  key={idx}
                  className="border rounded p-2 mb-2 bg-gray-50 shadow"
                >
                  <div className="font-medium text-gray-600 mb-1">{label}</div>
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
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function ParticipantsTable({ data: initialData, children, eventId }) {
  const [data, setData] = React.useState(() => initialData);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  // ✅ CSV header (শুধু দরকারি ফিল্ড)
  const csvHeaders = [
    { label: "User Name", key: "userName" },
    { label: "User Email", key: "userEmail" },
    { label: "Event Name", key: "eventName" },
    { label: "Ticket Type", key: "ticketType" },
    { label: "Member", key: "ticketCount" },
    { label: "Price", key: "ticketPrice" },
    { label: "Purchase Time", key: "createdAt" },
  ];

  // ✅ CSV data প্রস্তুত করা
  const preparedData = data.map((item) => ({
    userName: item.userName,
    userEmail: item.userEmail,
    eventName:
      item.eventName.split(" ").slice(0, 4).join(" ") +
      (item.eventName.split(" ").length > 4 ? "..." : ""),
    ticketType: item.ticketType,
    ticketCount: item.ticketCount,
    ticketPrice: item.ticketPrice,
    createdAt: new Date(item.createdAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }), // যেমন: 9 Jan 2025
  }));

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 mt-4"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div>
          <h1 className="hidden sm:block font-bold text-lg text-indigo-700">
            Registered Participants
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {children}
          <div className="hidden sm:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CSVLink
            data={preparedData}
            headers={csvHeaders}
            filename="registration.csv"
          >
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Download />
              <span className="hidden lg:inline">CSV</span>
            </Button>
          </CSVLink>
        </div>
      </div>
      {eventId && <EventParticipantsDetails eventId={eventId} />}

      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
