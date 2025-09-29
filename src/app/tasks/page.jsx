// export default function TasksPage() {
// //   return (
// //     <DashboardLayout>
// //       <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
// //         <div className="px-4 lg:px-6">
// //           <h1 className="text-2xl font-bold">Tasks</h1>
// //           <p className="text-muted-foreground">Manage your tasks and workflows here.</p>
// //         </div>

// //         <div className="px-4 lg:px-6">
// //           <div className="rounded-lg border p-6">
// //             <h2 className="text-lg font-semibold mb-4">Task Management</h2>
// //             <p className="text-muted-foreground">
// //               This is where your task management interface will be implemented.
// //               You can add task lists, kanban boards, or any other task management features here.
// //             </p>

// //             {/* Placeholder for task content */}
// //             <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //               <div className="rounded-lg border p-4">
// //                 <h3 className="font-medium">To Do</h3>
// //                 <p className="text-sm text-muted-foreground mt-2">Tasks to be completed</p>
// //               </div>
// //               <div className="rounded-lg border p-4">
// //                 <h3 className="font-medium">In Progress</h3>
// //                 <p className="text-sm text-muted-foreground mt-2">Currently working on</p>
// //               </div>
// //               <div className="rounded-lg border p-4">
// //                 <h3 className="font-medium">Done</h3>
// //                 <p className="text-sm text-muted-foreground mt-2">Completed tasks</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // }

// "use client";

// import React, { useState } from 'react';
// import { Plus, Calendar, User, MoreHorizontal, Trash2 } from 'lucide-react';
// import { DashboardLayout } from '@/components/dashboard-layout';

// const assigneeOptions = [
//   'Designer',
//   'Developer',
//   'Project Manager',
//   'Sales Person'
// ];

// const initialTasks = [
//   {
//     id: 'TSK-001',
//     title: 'Design login page',
//     status: 'To Do',
//     createdAt: new Date(),
//     priority: 'High',
//     assignee: 'Designer'
//   },
//   {
//     id: 'TSK-002',
//     title: 'Setup database connection and schema',
//     status: 'In Progress',
//     createdAt: new Date(),
//     priority: 'Medium',
//     assignee: 'Developer'
//   },
//   {
//     id: 'TSK-003',
//     title: 'Write API documentation',
//     status: 'Done',
//     createdAt: new Date(),
//     priority: 'Low',
//     assignee: 'Project Manager'
//   },
// ];

// const statusColumns = [
//   { key: 'To Do', title: 'To Do', backgroundColor: '#f8f9fa', count: 0 },
//   { key: 'In Progress', title: 'In Progress', backgroundColor: '#e3f2fd', count: 0 },
//   { key: 'Done', title: 'Done', backgroundColor: '#e8f5e8', count: 0 },
// ];

// const priorityStyles = {
//   High: { backgroundColor: '#fee2e2', color: '#b91c1c' },
//   Medium: { backgroundColor: '#fef3c7', color: '#d97706' },
//   Low: { backgroundColor: '#dcfce7', color: '#16a34a' },
// };

// export default function ProfessionalTaskBoard() {
//   const [tasks, setTasks] = useState(initialTasks);
//   const [newTaskTitle, setNewTaskTitle] = useState('');
//   const [showAddTask, setShowAddTask] = useState(false);
//   const [newTaskStatus, setNewTaskStatus] = useState('To Do');
//   const [newTaskAssignee, setNewTaskAssignee] = useState(assigneeOptions[0]);
//   const [hoveredTask, setHoveredTask] = useState(null);
//   const [menuTaskId, setMenuTaskId] = useState(null);

//   const handleAddTask = () => {
//     if (!newTaskTitle.trim()) return;

//     setTasks([
//       ...tasks,
//       {
//         id: `TSK-${String(Date.now()).slice(-3)}`,
//         title: newTaskTitle,
//         status: newTaskStatus,
//         createdAt: new Date(),
//         priority: 'Medium',
//         assignee: newTaskAssignee
//       },
//     ]);
//     setNewTaskTitle('');
//     setNewTaskAssignee(assigneeOptions[0]);
//     setShowAddTask(false);
//   };

//   const handleStatusChange = (taskId, newStatus) => {
//     setTasks(tasks.map(task =>
//       task.id === taskId ? { ...task, status: newStatus } : task
//     ));
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   const onDragStart = (e, taskId) => {
//     e.dataTransfer.setData('text/plain', taskId);
//   };

//   const onDragOver = (e) => {
//     e.preventDefault();
//   };

//   const onDrop = (e, status) => {
//     e.preventDefault();
//     const taskId = e.dataTransfer.getData('text/plain');
//     handleStatusChange(taskId, status);
//   };

//   const getTasksByStatus = (status) => {
//     return tasks.filter(task => task.status === status);
//   };

//   const handleMenuOpen = (taskId) => {
//     setMenuTaskId(taskId);
//   };

//   const handleMenuClose = () => {
//     setMenuTaskId(null);
//   };

//   return (
//     <DashboardLayout>
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
//       padding: '24px'
//     }}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         {/* Header */}
//         <div style={{ marginBottom: '32px' }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginBottom: '16px'
//           }}>
//             <div>
//               <h1 style={{
//                 fontSize: '2rem',
//                 fontWeight: 'bold',
//                 color: '#1a202c',
//                 marginBottom: '8px',
//                 margin: 0
//               }}>Project Tasks</h1>
//               <p style={{
//                 color: '#718096',
//                 margin: 0
//               }}>Manage and track your team's progress</p>
//             </div>
//             <button
//               onClick={() => setShowAddTask(true)}
//               style={{
//                 backgroundColor: '#3b82f6',
//                 color: 'white',
//                 padding: '8px 16px',
//                 borderRadius: '8px',
//                 border: 'none',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px',
//                 cursor: 'pointer',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
//               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
//             >
//               <Plus size={20} />
//               Add Task
//             </button>
//           </div>

//           {/* Stats */}
//           <div style={{
//             display: 'flex',
//             gap: '24px',
//             fontSize: '14px',
//             color: '#718096'
//           }}>
//             <span>Total: {tasks.length} tasks</span>
//             <span>In Progress: {getTasksByStatus('In Progress').length}</span>
//             <span>Completed: {getTasksByStatus('Done').length}</span>
//           </div>
//         </div>

//         {/* Add Task Modal */}
//         {showAddTask && (
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             zIndex: 50
//           }}>
//             <div style={{
//               backgroundColor: 'white',
//               padding: '24px',
//               borderRadius: '8px',
//               width: '384px',
//               boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
//             }}>
//               <h3 style={{
//                 fontSize: '18px',
//                 fontWeight: '600',
//                 marginBottom: '16px',
//                 margin: '0 0 16px 0'
//               }}>Add New Task</h3>
//               <input
//                 type="text"
//                 value={newTaskTitle}
//                 onChange={(e) => setNewTaskTitle(e.target.value)}
//                 placeholder="Enter task title..."
//                 style={{
//                   width: '100%',
//                   padding: '12px',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '8px',
//                   marginBottom: '16px',
//                   fontSize: '14px',
//                   boxSizing: 'border-box',
//                   outline: 'none'
//                 }}
//                 autoFocus
//                 onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
//                 onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
//               />
//               <select
//                 value={newTaskStatus}
//                 onChange={(e) => setNewTaskStatus(e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '12px',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '8px',
//                   marginBottom: '16px',
//                   fontSize: '14px',
//                   boxSizing: 'border-box',
//                   outline: 'none'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
//                 onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
//               >
//                 <option value="To Do">To Do</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Done">Done</option>
//               </select>
//               <select
//                 value={newTaskAssignee}
//                 onChange={(e) => setNewTaskAssignee(e.target.value)}
//                 style={{
//                   width: '100%',
//                   padding: '12px',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '8px',
//                   marginBottom: '16px',
//                   fontSize: '14px',
//                   boxSizing: 'border-box',
//                   outline: 'none'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
//                 onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
//               >
//                 {assigneeOptions.map(option => (
//                   <option key={option} value={option}>{option}</option>
//                 ))}
//               </select>
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <button
//                   onClick={handleAddTask}
//                   style={{
//                     flex: 1,
//                     backgroundColor: '#3b82f6',
//                     color: 'white',
//                     padding: '8px 16px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.2s'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
//                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
//                 >
//                   Add Task
//                 </button>
//                 <button
//                   onClick={() => setShowAddTask(false)}
//                   style={{
//                     flex: 1,
//                     backgroundColor: '#e5e7eb',
//                     color: '#374151',
//                     padding: '8px 16px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.2s'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
//                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Kanban Board */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//           gap: '24px'
//         }}>
//           {statusColumns.map((column) => {
//             const columnTasks = getTasksByStatus(column.key);
//             return (
//               <div
//                 key={column.key}
//                 style={{
//                   backgroundColor: column.backgroundColor,
//                   borderRadius: '12px',
//                   padding: '16px',
//                   boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//                   border: '1px solid #e5e7eb'
//                 }}
//                 onDragOver={onDragOver}
//                 onDrop={(e) => onDrop(e, column.key)}
//               >
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   marginBottom: '16px'
//                 }}>
//                   <h2 style={{
//                     fontWeight: '600',
//                     color: '#374151',
//                     fontSize: '18px',
//                     margin: 0
//                   }}>{column.title}</h2>
//                   <span style={{
//                     backgroundColor: '#e5e7eb',
//                     color: '#374151',
//                     fontSize: '12px',
//                     padding: '2px 8px',
//                     borderRadius: '12px',
//                     fontWeight: '500'
//                   }}>
//                     {columnTasks.length}
//                   </span>
//                 </div>

//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//                   {columnTasks.map((task) => (
//                     <div
//                       key={task.id}
//                       draggable
//                       onDragStart={(e) => onDragStart(e, task.id)}
//                       onMouseEnter={() => setHoveredTask(task.id)}
//                       onMouseLeave={() => setHoveredTask(null)}
//                       style={{
//                         backgroundColor: 'white',
//                         borderRadius: '8px',
//                         padding: '16px',
//                         boxShadow: hoveredTask === task.id ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
//                         border: '1px solid #e5e7eb',
//                         cursor: 'move',
//                         transition: 'all 0.2s',
//                         position: 'relative'
//                       }}
//                     >
//                       {/* Task Header */}
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'flex-start',
//                         justifyContent: 'space-between',
//                         marginBottom: '12px'
//                       }}>
//                         <div style={{ flex: 1 }}>
//                           <h3 style={{
//                             fontWeight: '500',
//                             color: '#1a202c',
//                             marginBottom: '4px',
//                             lineHeight: '1.3',
//                             margin: '0 0 4px 0'
//                           }}>
//                             {task.title}
//                           </h3>
//                           <p style={{
//                             fontSize: '12px',
//                             color: '#718096',
//                             fontFamily: 'monospace',
//                             margin: 0
//                           }}>{task.id}</p>
//                         </div>
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '4px',
//                           opacity: hoveredTask === task.id ? 1 : 0,
//                           transition: 'opacity 0.2s'
//                         }}>
//                           <button
//                             style={{
//                               padding: '4px',
//                               border: 'none',
//                               borderRadius: '4px',
//                               backgroundColor: 'transparent',
//                               cursor: 'pointer',
//                               position: 'relative'
//                             }}
//                             onClick={() => handleMenuOpen(task.id)}
//                             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
//                             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
//                           >
//                             <MoreHorizontal size={14} style={{ color: '#9ca3af' }} />
//                             {/* Dropdown menu */}
//                             {menuTaskId === task.id && (
//                               <div
//                                 style={{
//                                   position: 'absolute',
//                                   top: '24px',
//                                   right: 0,
//                                   background: 'white',
//                                   border: '1px solid #e5e7eb',
//                                   borderRadius: '8px',
//                                   boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
//                                   zIndex: 100,
//                                   minWidth: '140px'
//                                 }}
//                               >
//                                 {['To Do', 'In Progress', 'Done'].filter(s => s !== task.status).map(status => (
//                                   <button
//                                     key={status}
//                                     onClick={() => {
//                                       handleStatusChange(task.id, status);
//                                       handleMenuClose();
//                                     }}
//                                     style={{
//                                       width: '100%',
//                                       padding: '8px 16px',
//                                       background: 'none',
//                                       border: 'none',
//                                       textAlign: 'left',
//                                       cursor: 'pointer',
//                                       fontSize: '14px',
//                                       color: '#374151',
//                                       borderRadius: '8px',
//                                       transition: 'background 0.2s'
//                                     }}
//                                     onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
//                                     onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
//                                   >
//                                     Move to {status}
//                                   </button>
//                                 ))}
//                                 <button
//                                   onClick={handleMenuClose}
//                                   style={{
//                                     width: '100%',
//                                     padding: '8px 16px',
//                                     background: 'none',
//                                     border: 'none',
//                                     textAlign: 'left',
//                                     cursor: 'pointer',
//                                     fontSize: '14px',
//                                     color: '#9ca3af',
//                                     borderRadius: '8px'
//                                   }}
//                                 >
//                                   Cancel
//                                 </button>
//                               </div>
//                             )}
//                           </button>
//                           <button
//                             onClick={() => handleDeleteTask(task.id)}
//                             style={{
//                               padding: '4px',
//                               border: 'none',
//                               borderRadius: '4px',
//                               backgroundColor: 'transparent',
//                               color: '#ef4444',
//                               cursor: 'pointer'
//                             }}
//                             onMouseEnter={(e) => {
//                               e.currentTarget.style.backgroundColor = '#fef2f2';
//                               e.currentTarget.style.color = '#dc2626';
//                             }}
//                             onMouseLeave={(e) => {
//                               e.currentTarget.style.backgroundColor = 'transparent';
//                               e.currentTarget.style.color = '#ef4444';
//                             }}
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Task Meta */}
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                       }}>
//                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                           {task.priority && (
//                             <span style={{
//                               fontSize: '12px',
//                               padding: '2px 8px',
//                               borderRadius: '12px',
//                               fontWeight: '500',
//                               ...priorityStyles[task.priority]
//                             }}>
//                               {task.priority}
//                             </span>
//                           )}
//                         </div>

//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '8px',
//                           fontSize: '12px',
//                           color: '#718096'
//                         }}>
//                           <Calendar size={12} />
//                           <span>{task.createdAt.toLocaleDateString()}</span>
//                         </div>
//                       </div>

//                       {/* Assignee */}
//                       {task.assignee && (
//                         <div style={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '8px',
//                           marginTop: '12px',
//                           paddingTop: '12px',
//                           borderTop: '1px solid #f3f4f6'
//                         }}>
//                           <User size={14} style={{ color: '#9ca3af' }} />
//                           <span style={{
//                             fontSize: '12px',
//                             color: '#4b5563'
//                           }}>{task.assignee}</span>
//                         </div>
//                       )}
//                     </div>
//                   ))}

//                   {/* Empty State */}
//                   {columnTasks.length === 0 && (
//                     <div style={{
//                       textAlign: 'center',
//                       padding: '32px 0',
//                       color: '#9ca3af'
//                     }}>
//                       <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
//                       <p style={{ fontSize: '14px', margin: 0 }}>No tasks yet</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//     </DashboardLayout>
//   );
// }

/**
 * Tasks Management Page
 *
 * Features:
 * - Role-based access control (Admin, Project Manager, Employee with Project Manager designation)
 * - Dynamic employee assignment with nested dropdown structure
 * - Employees grouped by designation (Backend, Frontend, Designer, etc.)
 * - Real-time employee data fetching from API
 * - Task creation with proper employee assignment
 * - Loading states and error handling
 * - Full backend API integration (CRUD operations)
 *
 * Task Creation Permissions:
 * ✅ Admin role: Can create tasks
 * ✅ Project Manager role: Can create tasks
 * ✅ Employee + Project Manager designation: Can create tasks
 * ❌ Other employees: Cannot create tasks (view only)
 *
 * Backend APIs Used:
 * - POST /api/tasks (Create task)
 * - GET /api/tasks (Load tasks)
 * - PUT /api/tasks/:id (Update task status)
 * - DELETE /api/tasks/:id (Delete task)
 * - GET /api/employees (Load employees for assignment)
 */

"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useAuth } from "@/contexts/AuthContext";

import { ProtectedRoute } from "@/components/ProtectedRoute";

// export default function TasksPage() {
//   return (
//     <ProtectedRoute>
//       <TicketingSystem />
//     </ProtectedRoute>
//   );
// }


export default function TicketingSystem() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeesByDesignation, setEmployeesByDesignation] = useState({});
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const URL = process.env.NEXT_PUBLIC_URL;
  const PRODUCTION_URL = process.env.PRODUCTION_URL;

  // Check if user can create tasks
  const canCreateTasks =
    user &&
    (user.role === "admin" ||
      user.role === "project_manager" ||
      (user.role === "employee" && user.designation === "project_manager"));

  // Role-based access control
  const hasAccess =
    user &&
    (user.role === "admin" ||
      user.role === "project_manager" ||
      (user.role === "employee" && user.designation === "project_manager"));

  // Debug logging for access control

  // Fetch employees and tasks data
  useEffect(() => {
    console.log("useEffect running, hasAccess:", hasAccess, "user:", user);

    if (!hasAccess) {
      console.log("No access, skipping data fetch");
      return;
    }

    const fetchData = async () => {
      console.log("Starting data fetch...");
      setLoadingEmployees(true);
      setLoadingTasks(true);

      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token from localStorage:", token ? "Present" : "Missing");

        if (!token) {
          console.error("No token found in localStorage");
          alert("Please log in to access tasks");
          return;
        }

        // Fetch employees
        console.log("Fetching employees...");
        // const employeesResponse = await fetch("https://adnan4498-infinitum-crm-server-glob.vercel.app/api/employees",
        const employeesResponse = await fetch(`${URL}/api/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Employees response status:", employeesResponse.status);
        const employeesData = await employeesResponse.json();
        console.log("Employees data:", employeesData);

        if (
          employeesData.success &&
          employeesData.data &&
          employeesData.data.employees
        ) {
          const employeesList = employeesData.data.employees;
          setEmployees(employeesList);

          // Group employees by designation
          const grouped = employeesList.reduce((acc, employee) => {
            const designation = employee.designation || "Other";
            if (!acc[designation]) {
              acc[designation] = [];
            }
            acc[designation].push(employee);
            return acc;
          }, {});

          setEmployeesByDesignation(grouped);
          console.log("Employees grouped by designation:", grouped);
        }

        // Fetch tasks
        console.log("Fetching tasks...");
        // const tasksResponse = await fetch("https://adnan4498-infinitum-crm-server-glob.vercel.app/api/tasks",
        const tasksResponse = await fetch(`${URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Tasks response status:", tasksResponse.status);
        const tasksData = await tasksResponse.json();
        console.log("Tasks data:", tasksData);

        if (tasksData.success && tasksData.data && tasksData.data.tasks) {
          const tasksList = tasksData.data.tasks.map((task) => ({
            id: task._id,
            title: task.title,
            status: task.status,
            createdAt: new Date(task.createdAt),
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
            startDate: task.startDate ? new Date(task.startDate) : null,
            assignee: task.assignedTo
              ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
              : "Unknown",
            assigneeId: task.assignedTo?._id,
            designation: task.assignedTo?.designation || "Unknown",
          }));

          setTasks(tasksList);
          console.log("Tasks loaded from backend:", tasksList);
        } else {
          console.log("No tasks found or API error:", tasksData);
          setTasks([]); // Clear tasks if none found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading data. Please check your connection.");
        setTasks([]); // Clear tasks on error
      } finally {
        setLoadingEmployees(false);
        setLoadingTasks(false);
      }
    };

    fetchData();
  }, [hasAccess, user]);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !selectedEmployeeId || !dueDate) return;

    try {
      const taskData = {
        title: newTaskTitle,
        description: newTaskTitle, // Using title as description for now
        assignedTo: selectedEmployeeId,
        dueDate: new Date(dueDate).toISOString(),
        startDate: startDate ? new Date(startDate).toISOString() : null,
        category: selectedDesignation.toLowerCase(),
        tags: [selectedDesignation.toLowerCase()],
      };

      // const response = await fetch("https://adnan4498-infinitum-crm-server-glob.vercel.app/api/tasks",
      const response = await fetch(`${URL}/api/tasks`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Task created successfully:", data.data.task);

        // Add the new task to the local state
        const selectedEmployee = employees.find(
          (emp) => emp._id === selectedEmployeeId
        );
        const newTask = {
          id: data.data.task._id,
          title: data.data.task.title,
          status: data.data.task.status,
          createdAt: new Date(data.data.task.createdAt),
          dueDate: data.data.task.dueDate ? new Date(data.data.task.dueDate) : null,
          startDate: data.data.task.startDate ? new Date(data.data.task.startDate) : null,
          assignee: data.data.task.assignedTo
            ? `${data.data.task.assignedTo.firstName} ${data.data.task.assignedTo.lastName}`
            : "Unknown",
          assigneeId: data.data.task.assignedTo?._id,
          designation: data.data.task.assignedTo?.designation || "Unknown",
        };

        setTasks((prevTasks) => [newTask, ...prevTasks]);

        // Reset form
        setNewTaskTitle("");
        setSelectedDesignation("");
        setSelectedEmployeeId("");
        setDueDate("");
        setStartDate("");
        setShowAddTask(false);

        alert("Task created successfully!");
      } else {
        alert("Failed to create task: " + (data.error || data.message));
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      // const response = await fetch(`https://adnan4498-infinitum-crm-server-glob.vercel.app/api/tasks/${taskId}`,
      const response = await fetch(`${URL}/api/tasks/${taskId}`, 
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        // Remove from local state
        setTasks(tasks.filter((task) => task.id !== taskId));
        console.log("Task deleted successfully");
      } else {
        alert("Failed to delete task: " + (data.error || data.message));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task. Please try again.");
    }
  };


  // If user doesn't have access, show access denied
  if (!hasAccess) {
    return (
      <DashboardLayout>
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "48px",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🚫</div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 8px 0",
                color: "#1a202c",
              }}
            >
              Access Denied
            </h2>
            <p style={{ color: "#718096", margin: "0 0 16px 0" }}>
              You don't have permission to access the Tasks page.
            </p>
            <p style={{ fontSize: "14px", color: "#9ca3af", margin: 0 }}>
              Required: Admin, Project Manager role, or Employee with Project
              Manager designation
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#9ca3af",
                margin: "8px 0 0 0",
              }}
            >
              Your current role: {user?.role || "Unknown"}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
                Ticketing System
              </h1>
              <p style={{ color: "#718096", margin: 0 }}>
                Manage all tasks in a simple table view
              </p>
            </div>
            {canCreateTasks ? (
              <button
                onClick={() => setShowAddTask(true)}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <Plus size={18} /> Add Task
              </button>
            ) : (
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  color: "#d97706",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  border: "1px solid #f59e0b",
                }}
              >
                You need Admin role, Project Manager role, or Employee with
                Project Manager designation to create tasks
              </div>
            )}
          </div>

          {/* Table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <thead style={{ backgroundColor: "#f3f4f6" }}>
                <tr>
                  {[
                    // "ID",
                    "Title",
                    "Status",
                    "Assignee",
                    "Created At",
                    "Due Date",
                    // "Start Date",
                    "Actions",
                  ].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    style={{ borderBottom: "1px solid #e5e7eb" }}
                  >
                    {/* <td style={{ padding: "12px", fontFamily: "monospace" }}>
                      {task.id}
                    </td> */}
                    <td style={{ padding: "12px" }}>{task.title}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500",
                          backgroundColor:
                            task.status === "Done"
                              ? "#dcfce7"
                              : task.status === "In Progress"
                              ? "#dbeafe"
                              : "#fef3c7",
                          color:
                            task.status === "Done"
                              ? "#166534"
                              : task.status === "In Progress"
                              ? "#1e40af"
                              : "#92400e",
                        }}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div>
                        <div style={{ fontWeight: "500" }}>{task.assignee}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          {task.designation}
                        </div>
                      </div>
                    </td>
                    {/* <td
                      style={{
                        padding: "12px",
                        fontSize: "13px",
                        color: "#6b7280",
                      }}
                    >
                      {task.startDate ? new Date(task.startDate).toLocaleDateString() : "N/A"}
                    </td> */}
                        <td
                      style={{
                        padding: "12px",
                        fontSize: "13px",
                        color: "#6b7280",
                      }}
                    >
                      {task.createdAt.toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontSize: "13px",
                        color: "#6b7280",
                      }}
                    >
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {tasks.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      style={{
                        padding: "32px",
                        textAlign: "center",
                        color: "#9ca3af",
                      }}
                    >
                      No tasks yet 📝
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Add Task Modal */}
          {showAddTask && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "8px",
                  width: "384px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
              >
                <h3 style={{ margin: "0 0 16px 0" }}>Add New Task</h3>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {/* Designation Dropdown */}
                <select
                  value={selectedDesignation}
                  onChange={(e) => {
                    setSelectedDesignation(e.target.value);
                    setSelectedEmployeeId(""); // Reset employee selection
                  }}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                  disabled={loadingEmployees}
                >
                  <option value="">
                    {loadingEmployees
                      ? "Loading designations..."
                      : "Select Designation"}
                  </option>
                  {Object.keys(employeesByDesignation).map((designation) => (
                    <option key={designation} value={designation}>
                      {designation} (
                      {employeesByDesignation[designation].length})
                    </option>
                  ))}
                </select>

                {/* Employee Dropdown */}
                {selectedDesignation && (
                  <select
                    value={selectedEmployeeId}
                    onChange={(e) => setSelectedEmployeeId(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      marginBottom: "16px",
                    }}
                    disabled={loadingEmployees}
                  >
                    <option value="">
                      {loadingEmployees
                        ? "Loading employees..."
                        : "Select Employee"}
                    </option>
                    {employeesByDesignation[selectedDesignation]?.map(
                      (employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstName} {employee.lastName} (
                          {employee.email})
                        </option>
                      )
                    )}
                  </select>
                )}

                {/* Due Date Input */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="dueDate"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Due Date *
                  </label>
                  <input
                    id="dueDate"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                    required
                  />
                </div>

                {/* Start Date Input */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    htmlFor="startDate"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                    }}
                  >
                    Start Date (Optional)
                  </label>
                  <input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={handleAddTask}
                    disabled={!selectedEmployeeId || !dueDate || loadingEmployees}
                    style={{
                      flex: 1,
                      backgroundColor:
                        !selectedEmployeeId || !dueDate || loadingEmployees
                          ? "#9ca3af"
                          : "#3b82f6",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "none",
                      cursor:
                        !selectedEmployeeId || !dueDate || loadingEmployees
                          ? "not-allowed"
                          : "pointer",
                      opacity:
                        !selectedEmployeeId || !dueDate || loadingEmployees ? 0.6 : 1,
                    }}
                  >
                    {loadingEmployees ? "Loading..." : "Add Task"}
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    style={{
                      flex: 1,
                      backgroundColor: "#e5e7eb",
                      color: "#374151",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
