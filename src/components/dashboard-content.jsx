"use client"

import React, { useState, useEffect } from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"

import data from "../app/dashboard/data.json"

// Task table columns
const taskColumns = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <Badge
          variant={
            status === 'completed' ? 'default' :
            status === 'in_progress' ? 'secondary' :
            'outline'
          }
          className={
            status === 'completed' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
            status === 'in_progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
            'bg-gray-100 text-gray-800 hover:bg-gray-100'
          }
        >
          {status.replace('_', ' ')}
        </Badge>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority")
      return (
        <Badge
          variant="outline"
          className={
            priority === 'urgent' ? 'border-red-500 text-red-700' :
            priority === 'high' ? 'border-orange-500 text-orange-700' :
            priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
            'border-green-500 text-green-700'
          }
        >
          {priority}
        </Badge>
      )
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = row.getValue("startDate")
      if (!startDate) return <span className="text-muted-foreground">N/A</span>

      const date = new Date(startDate)
      return (
        <span>
          {date.toLocaleDateString()}
        </span>
      )
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate")
      if (!dueDate) return <span className="text-muted-foreground">N/A</span>

      const date = new Date(dueDate)
      const today = new Date()
      const isOverdue = date < today && row.original.status !== 'completed'

      return (
        <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
          {date.toLocaleDateString()}
        </span>
      )
    },
  },
  {
    accessorKey: "assignedBy",
    header: "Assigned By",
    cell: ({ row }) => {
      const assignedBy = row.getValue("assignedBy")
      if (!assignedBy) return <span className="text-muted-foreground">N/A</span>
      return `${assignedBy.firstName} ${assignedBy.lastName}`
    },
  },
]

// TaskTable component
function TaskTable({ tasks, loading }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data: tasks,
    columns: taskColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  if (loading) {
    return (
      <div className="rounded-lg border">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          Loading tasks...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Select
            value={(table.getColumn("status")?.getFilterValue()) ?? ""}
            onValueChange={(value) =>
              table.getColumn("status")?.setFilterValue(value)
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_status">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={taskColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No tasks assigned to you yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} task(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardContent() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, getToken } = useAuth()
  const URL = process.env.NEXT_PUBLIC_URL

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user || !getToken()) return

      try {
        const response = await fetch(`${URL}/api/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
          },
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setTasks(data.data.tasks)
        } else {
          toast.error(data.message || "Failed to fetch tasks")
        }
      } catch (error) {
        console.error("Fetch tasks error:", error)
        toast.error("Network error. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [user, getToken, URL])

  // Check if user can view admin-level dashboard components
  const canViewAdminComponents = user && (
    user.role === 'admin' ||
    (user.role === 'employee' && user.designation === 'project_manager')
  )

  return (
    <>
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {/* Only show SectionCards and ChartAreaInteractive for admin or project manager employees */}
      {canViewAdminComponents && (
        <>
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
        </>
      )}

      {/* Tasks Section */}
      <div className="px-4 lg:px-6">
        <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
        <TaskTable tasks={tasks} loading={loading} />
      </div>

      {/* <DataTable data={data} /> */}
    </div>
    </>
  );
}