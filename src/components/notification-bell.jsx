"use client"

import { useState, useEffect } from "react"
import { Bell, Check, CheckCheck, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"

export function NotificationBell() {
  const { user, getToken } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Fetch unread count
  const fetchUnreadCount = async () => {
    if (!user) return

    try {
      const response = await fetch('/api/notifications/unread-count', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUnreadCount(data.data.unreadCount)
      }
    } catch (error) {
      console.error('Failed to fetch unread count:', error)
    }
  }

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return

    try {
      const response = await fetch('/api/notifications?limit=10', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(data.data.notifications)
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    }
  }

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        // Update local state
        setNotifications(prev =>
          prev.map(n =>
            n.id === notificationId ? { ...n, isRead: true, status: 'read' } : n
          )
        )
        setUnreadCount(prev => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  }

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => ({ ...n, isRead: true, status: 'read' }))
        )
        setUnreadCount(0)
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error)
    }
  }

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      })

      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== notificationId))
        // Update unread count if deleted notification was unread
        const deletedNotification = notifications.find(n => n.id === notificationId)
        if (deletedNotification && !deletedNotification.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1))
        }
      }
    } catch (error) {
      console.error('Failed to delete notification:', error)
    }
  }

  useEffect(() => {
    fetchUnreadCount()
    fetchNotifications()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchUnreadCount()
    }, 30000)

    return () => clearInterval(interval)
  }, [user])

  const handleOpenChange = (open) => {
    setIsOpen(open)
    if (open) {
      fetchNotifications()
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-1 text-xs"
            >
              <CheckCheck size={14} className="mr-1" />
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b last:border-b-0 hover:bg-muted/50 ${
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timeAgo}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Check size={12} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}