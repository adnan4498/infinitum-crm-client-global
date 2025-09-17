"use client"

import { useState, useEffect } from "react"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"

import data from "../app/dashboard/data.json"

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

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>

      {/* Tasks Section */}
      <div className="px-4 lg:px-6">
        <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
        {loading ? (
          <div className="text-center py-8">Loading tasks...</div>
        ) : tasks.length > 0 ? (
          <div className="rounded-lg border">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Assigned By</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="border-t">
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{task.priority}</td>
                    <td className="px-4 py-2">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      {task.assignedBy?.firstName} {task.assignedBy?.lastName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No tasks assigned to you yet.
          </div>
        )}
      </div>

      <DataTable data={data} />
    </div>
  );
}