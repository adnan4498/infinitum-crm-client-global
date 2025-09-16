"use client"
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import React, { useState } from "react";

const page = () => {
  const taskData = [
    { status: "To Do", count: 45, color: "bg-blue-500" },
    { status: "In Progress", count: 32, color: "bg-yellow-500" },
    { status: "In Review", count: 18, color: "bg-purple-500" },
    { status: "Completed", count: 85, color: "bg-green-500" },
    { status: "Canceled", count: 12, color: "bg-red-500" },
  ];

  const employeeData = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Developer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      performance: 94,
      tasksCompleted: 28,
      projectsActive: 5,
      efficiency: "Excellent",
    },
  ];

  const [employeeTasks, setEmployeeTasks] = useState([
    {
      id: 1,
      title: "Frontend Dashboard UI",
      priority: "High",
      status: "To Do",
      dueDate: "2025-09-15",
    },
    {
      id: 2,
      title: "API Integration",
      priority: "Medium",
      status: "In Progress",
      dueDate: "2025-09-13",
    },
    {
      id: 3,
      title: "Fix Authentication Bugs",
      priority: "High",
      status: "To Do",
      dueDate: "2025-09-14",
    },
    {
      id: 4,
      title: "Write Unit Tests",
      priority: "Low",
      status: "Completed",
      dueDate: "2025-09-10",
    },
  ]);

  const totalTasks = taskData.reduce((sum, task) => sum + task.count, 0);

  const getStrokeDasharray = () => {
    const circumference = 2 * Math.PI * 70;
    let cumulativePercentage = 0;

    return taskData.map((task) => {
      const percentage = (task.count / totalTasks) * 100;
      const strokeLength = (percentage / 100) * circumference;
      const result = {
        strokeLength,
        offset: (cumulativePercentage * circumference) / 100,
        color: task.color.replace("bg-", ""),
      };
      cumulativePercentage += percentage;
      return result;
    });
  };

  const strokeData = getStrokeDasharray();
  const circumference = 2 * Math.PI * 70;

  const handleStatusChange = (taskId, newStatus) => {
    setEmployeeTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Task Overview Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                  Task Overview
                </h2>

                <div className="flex items-center justify-center mb-8">
                  <div className="relative">
                    <svg
                      width="260"
                      height="260"
                      className="transform -rotate-90 drop-shadow-sm"
                    >
                      <circle
                        cx="130"
                        cy="130"
                        r="70"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="12"
                      />
                      {strokeData.map((data, index) => (
                        <circle
                          key={index}
                          cx="130"
                          cy="130"
                          r="70"
                          fill="none"
                          stroke={
                            data.color === "blue-500"
                              ? "#3b82f6"
                              : data.color === "yellow-500"
                              ? "#eab308"
                              : data.color === "purple-500"
                              ? "#a855f7"
                              : data.color === "green-500"
                              ? "#22c55e"
                              : "#ef4444"
                          }
                          strokeWidth="12"
                          strokeDasharray={`${data.strokeLength} ${
                            circumference - data.strokeLength
                          }`}
                          strokeDashoffset={-data.offset}
                          className="transition-all duration-1500 ease-in-out"
                          style={{ strokeLinecap: "round" }}
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center bg-white rounded-full w-24 h-24 flex items-center justify-center ">
                        <div>
                          <div className="text-3xl font-bold text-gray-800">
                            {totalTasks}
                          </div>
                          <div className="text-sm text-gray-500 font-medium">
                            Total
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {taskData.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl "
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-14 h-4 rounded-full ${task.color} `}
                        ></div>
                        <span className="text-base font-semibold text-gray-700">
                          {task.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-base text-gray-600 font-medium">
                          {task.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Employee Performance Card */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                  Top Performer
                </h2>

                {employeeData.map((employee) => (
                  <div key={employee.id} className="text-center space-y-6">
                    {/* Employee Profile */}
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-green-200"
                        />
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {employee.name}
                      </h3>
                      <p className="text-gray-600 font-medium mb-4">
                        {employee.role}
                      </p>

                      {/* Star Rating */}
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-6 h-6 text-yellow-400 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>

                      <div className="text-lg font-semibold text-gray-700 mb-6">
                        Performance Rating
                      </div>
                    </div>

                    {/* Performance Badge */}
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {employee.performance}%
                      </div>
                      <div className="text-green-700 font-semibold text-lg">
                        {employee.efficiency}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Employee Task Table */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Tasks Assigned 
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <th className="p-4">Task</th>
                    <th className="p-4">Priority</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {task.title}
                      </td>
                      <td
                        className={`p-4 font-semibold ${
                          task.priority === "High"
                            ? "text-red-500"
                            : task.priority === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      >
                        {task.priority}
                      </td>
                      <td className="p-4">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleStatusChange(task.id, e.target.value)
                          }
                          className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </td>
                      <td className="p-4 text-gray-600">{task.dueDate}</td>
                      <td className="p-4 text-right">
                        <button className="bg-blue-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-600 transition">
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default page;
