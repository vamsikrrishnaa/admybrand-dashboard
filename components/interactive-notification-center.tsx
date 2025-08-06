"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Clock,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "alert"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  category: "performance" | "system" | "campaign" | "user"
  actionable?: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Campaign Performance Boost",
    message: "Your 'Summer Sale' campaign is performing 23% above target with a ROAS of 4.2x",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    isRead: false,
    category: "performance",
    actionable: true
  },
  {
    id: "2",
    type: "warning",
    title: "Budget Threshold Reached",
    message: "Holiday campaign has reached 80% of allocated budget. Consider increasing or optimizing.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    category: "campaign",
    actionable: true
  },
  {
    id: "3",
    type: "info",
    title: "Weekly Report Ready",
    message: "Your weekly performance report is ready for download and review.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    isRead: true,
    category: "system",
    actionable: true
  },
  {
    id: "4",
    type: "alert",
    title: "Conversion Rate Drop",
    message: "Conversion rate has dropped by 15% in the last 24 hours. Immediate attention required.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    isRead: false,
    category: "performance",
    actionable: true
  },
  {
    id: "5",
    type: "success",
    title: "New User Milestone",
    message: "Congratulations! You've reached 10,000 active users this month.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: true,
    category: "user"
  }
]

export function InteractiveNotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "unread" | "actionable">("all")
  const { toast } = useToast()

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["success", "warning", "info"][Math.floor(Math.random() * 3)] as any,
          title: "Real-time Update",
          message: "New activity detected in your campaigns",
          timestamp: new Date(),
          isRead: false,
          category: "performance",
          actionable: true
        }
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 9)])
        
        if (!isOpen) {
          toast({
            title: "New notification",
            description: newNotification.message,
          })
        }
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isOpen, toast])

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been cleared.",
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success": return CheckCircle
      case "warning": return AlertTriangle
      case "info": return Info
      case "alert": return AlertTriangle
    }
  }

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "success": return "text-emerald-500"
      case "warning": return "text-amber-500"
      case "info": return "text-blue-500"
      case "alert": return "text-red-500"
    }
  }

  const getCategoryIcon = (category: Notification["category"]) => {
    switch (category) {
      case "performance": return TrendingUp
      case "campaign": return Target
      case "user": return Users
      case "system": return Info
    }
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.isRead
    if (filter === "actionable") return n.actionable
    return true
  })

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-accent transition-colors"
      >
        <Bell className={cn(
          "h-5 w-5 transition-all duration-200",
          unreadCount > 0 && "animate-pulse"
        )} />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-bounce">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute right-0 top-12 w-96 z-50 shadow-xl border-2 animate-in slide-in-from-top-2 duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="secondary">{unreadCount}</Badge>
                  )}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex space-x-1 mt-3">
                {[
                  { key: "all", label: "All" },
                  { key: "unread", label: "Unread" },
                  { key: "actionable", label: "Action Required" }
                ].map((filterOption) => (
                  <Button
                    key={filterOption.key}
                    variant={filter === filterOption.key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setFilter(filterOption.key as any)}
                    className="text-xs h-7"
                  >
                    {filterOption.label}
                  </Button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1 p-4">
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications found</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification, index) => {
                      const Icon = getIcon(notification.type)
                      const CategoryIcon = getCategoryIcon(notification.category)
                      
                      return (
                        <div
                          key={notification.id}
                          className={cn(
                            "group p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md",
                            notification.isRead 
                              ? "bg-muted/30 border-muted" 
                              : "bg-background border-border shadow-sm hover:border-primary/20"
                          )}
                          style={{ animationDelay: `${index * 50}ms` }}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "p-1.5 rounded-full transition-transform duration-200 group-hover:scale-110",
                              notification.type === "success" && "bg-emerald-100 dark:bg-emerald-900/30",
                              notification.type === "warning" && "bg-amber-100 dark:bg-amber-900/30",
                              notification.type === "info" && "bg-blue-100 dark:bg-blue-900/30",
                              notification.type === "alert" && "bg-red-100 dark:bg-red-900/30"
                            )}>
                              <Icon className={cn("h-4 w-4", getIconColor(notification.type))} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={cn(
                                  "text-sm font-medium truncate transition-colors",
                                  !notification.isRead && "text-foreground",
                                  notification.isRead && "text-muted-foreground"
                                )}>
                                  {notification.title}
                                </h4>
                                <div className="flex items-center space-x-1 ml-2">
                                  <CategoryIcon className="h-3 w-3 text-muted-foreground" />
                                  {!notification.isRead && (
                                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                                  )}
                                </div>
                              </div>
                              
                              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatTimestamp(notification.timestamp)}</span>
                                </div>
                                
                                {notification.actionable && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toast({
                                        title: "Action triggered",
                                        description: `Taking action on: ${notification.title}`,
                                      })
                                    }}
                                  >
                                    Action
                                    <ChevronRight className="h-3 w-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </ScrollArea>
              
              {unreadCount > 0 && (
                <div className="border-t p-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="w-full text-xs"
                  >
                    Mark all as read
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}