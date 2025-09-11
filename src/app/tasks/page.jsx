// import { DashboardLayout } from "@/components/dashboard-layout"

// export default function TasksPage() {
//   return (
//     <DashboardLayout>
//       <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//         <div className="px-4 lg:px-6">
//           <h1 className="text-2xl font-bold">Tasks</h1>
//           <p className="text-muted-foreground">Manage your tasks and workflows here.</p>
//         </div>

//         <div className="px-4 lg:px-6">
//           <div className="rounded-lg border p-6">
//             <h2 className="text-lg font-semibold mb-4">Task Management</h2>
//             <p className="text-muted-foreground">
//               This is where your task management interface will be implemented.
//               You can add task lists, kanban boards, or any other task management features here.
//             </p>

//             {/* Placeholder for task content */}
//             <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               <div className="rounded-lg border p-4">
//                 <h3 className="font-medium">To Do</h3>
//                 <p className="text-sm text-muted-foreground mt-2">Tasks to be completed</p>
//               </div>
//               <div className="rounded-lg border p-4">
//                 <h3 className="font-medium">In Progress</h3>
//                 <p className="text-sm text-muted-foreground mt-2">Currently working on</p>
//               </div>
//               <div className="rounded-lg border p-4">
//                 <h3 className="font-medium">Done</h3>
//                 <p className="text-sm text-muted-foreground mt-2">Completed tasks</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }




"use client";

import React, { useState } from 'react';
import { Plus, Calendar, User, MoreHorizontal, Trash2 } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';

const assigneeOptions = [
  'Designer',
  'Developer',
  'Project Manager',
  'Sales Person'
];

const initialTasks = [
  { 
    id: 'TSK-001', 
    title: 'Design login page', 
    status: 'To Do', 
    createdAt: new Date(),
    priority: 'High',
    assignee: 'Designer'
  },
  { 
    id: 'TSK-002', 
    title: 'Setup database connection and schema', 
    status: 'In Progress', 
    createdAt: new Date(),
    priority: 'Medium',
    assignee: 'Developer'
  },
  { 
    id: 'TSK-003', 
    title: 'Write API documentation', 
    status: 'Done', 
    createdAt: new Date(),
    priority: 'Low',
    assignee: 'Project Manager'
  },
];

const statusColumns = [
  { key: 'To Do', title: 'To Do', backgroundColor: '#f8f9fa', count: 0 },
  { key: 'In Progress', title: 'In Progress', backgroundColor: '#e3f2fd', count: 0 },
  { key: 'Done', title: 'Done', backgroundColor: '#e8f5e8', count: 0 },
];

const priorityStyles = {
  High: { backgroundColor: '#fee2e2', color: '#b91c1c' },
  Medium: { backgroundColor: '#fef3c7', color: '#d97706' },
  Low: { backgroundColor: '#dcfce7', color: '#16a34a' },
};

export default function ProfessionalTaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState('To Do');
  const [newTaskAssignee, setNewTaskAssignee] = useState(assigneeOptions[0]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [menuTaskId, setMenuTaskId] = useState(null);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    
    setTasks([
      ...tasks,
      {
        id: `TSK-${String(Date.now()).slice(-3)}`,
        title: newTaskTitle,
        status: newTaskStatus,
        createdAt: new Date(),
        priority: 'Medium',
        assignee: newTaskAssignee
      },
    ]);
    setNewTaskTitle('');
    setNewTaskAssignee(assigneeOptions[0]);
    setShowAddTask(false);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    handleStatusChange(taskId, status);
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const handleMenuOpen = (taskId) => {
    setMenuTaskId(taskId);
  };

  const handleMenuClose = () => {
    setMenuTaskId(null);
  };

  return (
    <DashboardLayout>
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#1a202c',
                marginBottom: '8px',
                margin: 0
              }}>Project Tasks</h1>
              <p style={{
                color: '#718096',
                margin: 0
              }}>Manage and track your team's progress</p>
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
          
          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '24px',
            fontSize: '14px',
            color: '#718096'
          }}>
            <span>Total: {tasks.length} tasks</span>
            <span>In Progress: {getTasksByStatus('In Progress').length}</span>
            <span>Completed: {getTasksByStatus('Done').length}</span>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '8px',
              width: '384px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                margin: '0 0 16px 0'
              }}>Add New Task</h3>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                autoFocus
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <select
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <select
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              >
                {assigneeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddTask}
                  style={{
                    flex: 1,
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  style={{
                    flex: 1,
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1d5db'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {statusColumns.map((column) => {
            const columnTasks = getTasksByStatus(column.key);
            return (
              <div
                key={column.key}
                style={{
                  backgroundColor: column.backgroundColor,
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e5e7eb'
                }}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, column.key)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}>
                  <h2 style={{
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '18px',
                    margin: 0
                  }}>{column.title}</h2>
                  <span style={{
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    fontSize: '12px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}>
                    {columnTasks.length}
                  </span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, task.id)}
                      onMouseEnter={() => setHoveredTask(task.id)}
                      onMouseLeave={() => setHoveredTask(null)}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: hoveredTask === task.id ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid #e5e7eb',
                        cursor: 'move',
                        transition: 'all 0.2s',
                        position: 'relative'
                      }}
                    >
                      {/* Task Header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '12px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontWeight: '500',
                            color: '#1a202c',
                            marginBottom: '4px',
                            lineHeight: '1.3',
                            margin: '0 0 4px 0'
                          }}>
                            {task.title}
                          </h3>
                          <p style={{
                            fontSize: '12px',
                            color: '#718096',
                            fontFamily: 'monospace',
                            margin: 0
                          }}>{task.id}</p>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          opacity: hoveredTask === task.id ? 1 : 0,
                          transition: 'opacity 0.2s'
                        }}>
                          <button
                            style={{
                              padding: '4px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                              position: 'relative'
                            }}
                            onClick={() => handleMenuOpen(task.id)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <MoreHorizontal size={14} style={{ color: '#9ca3af' }} />
                            {/* Dropdown menu */}
                            {menuTaskId === task.id && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '24px',
                                  right: 0,
                                  background: 'white',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '8px',
                                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                  zIndex: 100,
                                  minWidth: '140px'
                                }}
                              >
                                {['To Do', 'In Progress', 'Done'].filter(s => s !== task.status).map(status => (
                                  <button
                                    key={status}
                                    onClick={() => {
                                      handleStatusChange(task.id, status);
                                      handleMenuClose();
                                    }}
                                    style={{
                                      width: '100%',
                                      padding: '8px 16px',
                                      background: 'none',
                                      border: 'none',
                                      textAlign: 'left',
                                      cursor: 'pointer',
                                      fontSize: '14px',
                                      color: '#374151',
                                      borderRadius: '8px',
                                      transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
                                  >
                                    Move to {status}
                                  </button>
                                ))}
                                <button
                                  onClick={handleMenuClose}
                                  style={{
                                    width: '100%',
                                    padding: '8px 16px',
                                    background: 'none',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: '#9ca3af',
                                    borderRadius: '8px'
                                  }}
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            style={{
                              padding: '4px',
                              border: 'none',
                              borderRadius: '4px',
                              backgroundColor: 'transparent',
                              color: '#ef4444',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#fef2f2';
                              e.currentTarget.style.color = '#dc2626';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#ef4444';
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Task Meta */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {task.priority && (
                            <span style={{
                              fontSize: '12px',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontWeight: '500',
                              ...priorityStyles[task.priority]
                            }}>
                              {task.priority}
                            </span>
                          )}
                        </div>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '12px',
                          color: '#718096'
                        }}>
                          <Calendar size={12} />
                          <span>{task.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Assignee */}
                      {task.assignee && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '12px',
                          paddingTop: '12px',
                          borderTop: '1px solid #f3f4f6'
                        }}>
                          <User size={14} style={{ color: '#9ca3af' }} />
                          <span style={{
                            fontSize: '12px',
                            color: '#4b5563'
                          }}>{task.assignee}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Empty State */}
                  {columnTasks.length === 0 && (
                    <div style={{
                      textAlign: 'center',
                      padding: '32px 0',
                      color: '#9ca3af'
                    }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
                      <p style={{ fontSize: '14px', margin: 0 }}>No tasks yet</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
