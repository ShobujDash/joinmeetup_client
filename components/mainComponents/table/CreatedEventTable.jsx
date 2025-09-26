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
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
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
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
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
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { isEventEditExpired } from "@/utils/timeUtils";
import { toast } from "sonner";
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), {
  ssr: false,
});

export const eventSchema = z.object({
  id: z.string(),
  eName: z.string(),
  eStDateAndTime: z.string(),
  eEndDateAndTime: z.string(),
  eDes: z.string(),
  banner: z.string(),
  isOnline: z.boolean(),
  eAddress: z.string(),
  fbUrl: z.string(),
  refindPolicy: z.string(),
  tremsAndCon: z.boolean(),
  userId: z.string(),
  creator: z.object({
    name: z.string(),
    email: z.string(),
  }),
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

export function CreatedEventTable({
  data: initialData,
  setTicket,
  setEventId,
  setShowTicketDetailsModal,
  setShowAlartModal,
  setShowPublishEventModal,
  setPublish,
}) {
  const [data, setData] = React.useState(() => initialData);
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
  const router = useRouter();
  const { filteredEventId, setFilteredEventId } = useAuth();

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data]);

  const columns = [
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
      accessorKey: "eName",
      header: "Event Name",
      cell: ({ row }) => {
        const fullName = row.original.eName;
        const words = fullName.split(" ");
        const shortName =
          words.length > 2 ? `${words[0]} ${words[1]}...` : fullName;
        return (
          <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded-md">
            {shortName}
          </span>
        );
      },
    },
    {
      accessorKey: "HostName",
      header: "Host Name",
      cell: ({ row }) => {
        const hostName = row.original.hostName;
        const words = hostName.split(" ");
        const shortName =
          words.length > 2 ? `${words[0]} ${words[1]}...` : hostName;
        return (
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
            {shortName}
          </span>
        );
      },
    },
    {
      accessorKey: "eStDateAndTime",
      header: "Start Date",
      cell: ({ row }) => (
        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md">
          {row.original.eStDateAndTime}
        </span>
      ),
    },
    {
      accessorKey: "eEndDateAndTime",
      header: "End Date",
      cell: ({ row }) => (
        <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-md">
          {row.original.eEndDateAndTime}
        </span>
      ),
    },
    {
      accessorKey: "isOnline",
      header: "Mode",
      cell: ({ row }) =>
        row.original.isOnline ? (
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
            Online
          </span>
        ) : (
          <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
            Offline
          </span>
        ),
    },
    {
      accessorKey: "eAddress",
      header: "Location",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.eAddress?.split(" ").slice(0, 2).join(" ") +
            (row.original.eAddress?.split(" ").length > 2 ? "..." : "")}
        </span>
      ),
    },
    {
      accessorKey: "Publish",
      header: "Publish",
      cell: ({ row }) => {
        const isPublished = row?.original?.isPublish;
        return (
          <span
            className={`px-2 py-1 rounded ${
              isPublished
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isPublished ? "Yes" : "No"}
          </span>
        );
      },
    },
    {
      accessorKey: "banner",
      header: "Banner",
      cell: ({ row }) => (
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URI}/uploads/${row.original.banner}`}
          alt="Banner"
          className="h-10 w-16 object-cover rounded shadow"
        />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"flex flex-col gap-2"}>
            <DropdownMenuItem
              onClick={() => router.push(`/event/${row?.original?.id}`)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black cursor-pointer duration-300"
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setFilteredEventId(row?.original?.id);
                router.push(`/dashboard/participants`);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-black cursor-pointer duration-300"
            >
              Details
            </DropdownMenuItem>

            <DropdownMenuItem
             
              onClick={() => {

                if (isEventEditExpired(row?.original?.eEndDateAndTime)) {
                  toast.error(
                    "The event date has already passed, so it cannot be edited!"
                  );
                  return;
                }

                router.push(`/create-event/?eventId=${row?.original?.id}`);
              }}
              className="w-full bg-gray-300 hover:bg-gray-400 text-black cursor-pointer duration-300"
            >
              Edit
            </DropdownMenuItem>

            {!row?.original?.isPublish ? (
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEventId(row?.original.id);
                  setShowPublishEventModal(true);
                  setPublish(true);
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white cursor-pointer duration-300"
              >
                Publish Event
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEventId(row?.original?.id);
                  setShowPublishEventModal(true);
                  setPublish(false);
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer"
              >
                Remove from Public
              </DropdownMenuItem>
            )}

            {row?.original?.tickets[0]?.id ? (
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setTicket(row?.original?.tickets[0]);
                  setEventId(row?.original?.id);
                  setShowTicketDetailsModal(true);
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white cursor-pointer duration-300"
              >
                See Ticket
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/event/${row?.original.id}/ticket`);
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-500 text-white cursor-pointer duration-300"
              >
                Add Ticket
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

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
  const csvHeaders = [
    { label: "ID", key: "id" },
    { label: "Event Name", key: "eName" },
    { label: "Start Date & Time", key: "eStDateAndTime" },
    { label: "End Date & Time", key: "eEndDateAndTime" },
    { label: "Banner Filename", key: "banner" },
    { label: "Is Online?", key: "isOnline" },
    { label: "Is Published?", key: "isPublish" },
    { label: "Event Address", key: "eAddress" },
    { label: "Facebook URL", key: "fbUrl" },
    { label: "Refund Policy", key: "refindPolicy" },
    { label: "Terms & Conditions Accepted", key: "tremsAndCon" },
    { label: "User ID", key: "userId" },
    { label: "Created At", key: "createdAt" },
    { label: "Updated At", key: "updatedAt" },
    { label: "Creator Name", key: "creator.name" },
    { label: "Creator Email", key: "creator.email" },
  ];

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      {/* <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div>
          <h1 className="font-bold text-lg text-blue-700">All Events</h1>
        </div>
        <div className="flex items-center gap-2">
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
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Events</span>
          </Button>
          <CSVLink data={data} headers={csvHeaders} filename="events.csv">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <Download />
              <span className="hidden lg:inline">CSV</span>
            </Button>
          </CSVLink>
        </div>
      </div> */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto"
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
