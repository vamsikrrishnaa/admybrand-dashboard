"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, CalendarIcon, Clock, Users, Target, RefreshCw, Download, Activity, Eye, Edit, Trash2 } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { RealTimeActivityItem } from "@/components/real-time-activity-item"
import { useToast } from "@/components/ui/use-toast"
import { format, isSameDay } from "date-fns"

const events = [
  {
    id: "1",
    title: "Summer Sale Campaign Launch",
    type: "campaign",
    date: new Date(2024, 11, 5),
    time: "09:00",
    duration: "All day",
    status: "active",
    description: "Launch the summer sale campaign across all channels",
    attendees: ["Marketing Team", "Design Team"],
  },
  {
    id: "2",
    title: "Monthly Performance Review",
    type: "meeting",
    date: new Date(2024, 11, 8),
    time: "14:00",
    duration: "2 hours",
    status: "scheduled",
    description: "Review monthly KPIs and performance metrics",
    attendees: ["Management", "Analytics Team"],
  },
  {
    id: "3",
    title: "Q4 Budget Planning",
    type: "meeting",
    date: new Date(2024, 11, 12),
    time: "10:00",
    duration: "3 hours",
    status: "scheduled",
    description: "Plan budget allocation for Q4 campaigns",
    attendees: ["Finance", "Marketing", "Sales"],
  },
  {
    id: "4",
    title: "Holiday Campaign End",
    type: "campaign",
    date: new Date(2024, 11, 25),
    time: "23:59",
    duration: "End of day",
    status: "scheduled",
    description: "End of holiday promotional campaign",
    attendees: ["Marketing Team"],
  },
  {
    id: "5",
    title: "Year-end Analytics Report",
    type: "report",
    date: new Date(2024, 11, 31),
    time: "08:00",
    duration: "Auto-generated",
    status: "scheduled",
    description: "Automated year-end performance report generation",
    attendees: ["Analytics Team"],
  },
]

const upcomingEvents = events
  .filter((event) => event.date >= new Date())
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 5)

export default function CalendarPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<typeof events[0] | null>(null)
  const [viewMode, setViewMode] = useState("month")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [eventsList, setEventsList] = useState(events)
  const [eventTitle, setEventTitle] = useState("")
  const [eventType, setEventType] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventDuration, setEventDuration] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventAttendees, setEventAttendees] = useState("")
  const [metrics, setMetrics] = useState({
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.date >= new Date()).length,
    activeEvents: events.filter(e => e.status === "active").length,
    completedEvents: events.filter(e => e.status === "completed").length
  })
  const { toast } = useToast()

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeEvents: prev.activeEvents + Math.floor(Math.random() * 2 - 1),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Calendar refreshed",
      description: "Your calendar data has been updated with the latest information.",
    })
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      campaign: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      meeting: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      report: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      deadline: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    return colors[type as keyof typeof colors] || colors.meeting
  }

  const getEventTypeIcon = (type: string) => {
    const icons = {
      campaign: Target,
      meeting: Users,
      report: CalendarIcon,
      deadline: Clock,
    }
    const Icon = icons[type as keyof typeof icons] || CalendarIcon
    return <Icon className="h-4 w-4" />
  }

  const handleCreateEvent = () => {
    if (!eventTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter an event title.",
        variant: "destructive"
      })
      return
    }
    
    if (!eventType) {
      toast({
        title: "Error", 
        description: "Please select an event type.",
        variant: "destructive"
      })
      return
    }
    
    // Create new event
    const newEvent = {
      id: (eventsList.length + 1).toString(),
      title: eventTitle,
      type: eventType,
      date: eventDate ? new Date(eventDate) : new Date(),
      time: eventTime || "09:00",
      duration: eventDuration || "1 hour",
      status: "scheduled" as const,
      description: eventDescription || `${eventType} event: ${eventTitle}`,
      attendees: eventAttendees ? eventAttendees.split(",").map(a => a.trim()) : ["Team"],
    }

    // Add new event to the list
    setEventsList(prev => [newEvent, ...prev])
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalEvents: prev.totalEvents + 1,
      upcomingEvents: prev.upcomingEvents + 1
    }))

    toast({
      title: "Event Created Successfully",
      description: `${eventTitle} has been added to your calendar.`,
    })

    // Reset form
    setEventTitle("")
    setEventType("")
    setEventDate("")
    setEventTime("")
    setEventDuration("")
    setEventDescription("")
    setEventAttendees("")
    setIsCreateDialogOpen(false)
  }

  const handleEditEvent = (event: typeof events[0]) => {
    setEditingEvent(event)
    setEventTitle(event.title)
    setEventType(event.type)
    setEventDate(event.date.toISOString().split('T')[0])
    setEventTime(event.time)
    setEventDuration(event.duration)
    setEventDescription(event.description)
    setEventAttendees(event.attendees.join(", "))
    setIsEditDialogOpen(true)
    
    toast({
      title: "Editing Event",
      description: `Loading ${event.title} for editing.`,
    })
  }

  const handleUpdateEvent = () => {
    if (!editingEvent) return
    
    // Update event in the list
    setEventsList(prev => prev.map(e => 
      e.id === editingEvent.id 
        ? {
            ...e,
            title: eventTitle,
            type: eventType,
            date: eventDate ? new Date(eventDate) : e.date,
            time: eventTime,
            duration: eventDuration,
            description: eventDescription,
            attendees: eventAttendees ? eventAttendees.split(",").map(a => a.trim()) : e.attendees,
          }
        : e
    ))

    toast({
      title: "Event Updated",
      description: `${eventTitle} has been updated successfully.`,
    })

    // Reset form
    setEventTitle("")
    setEventType("")
    setEventDate("")
    setEventTime("")
    setEventDuration("")
    setEventDescription("")
    setEventAttendees("")
    setEditingEvent(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteEvent = (event: typeof events[0]) => {
    // Remove event from the list
    setEventsList(prev => prev.filter(e => e.id !== event.id))
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      totalEvents: prev.totalEvents - 1,
      upcomingEvents: event.date >= new Date() ? prev.upcomingEvents - 1 : prev.upcomingEvents
    }))

    toast({
      title: "Event Deleted",
      description: `${event.title} has been removed from your calendar.`,
    })
  }

  const getEventsForDate = (date: Date) => {
    return eventsList.filter((event) => isSameDay(event.date, date))
  }

  const hasEventsOnDate = (date: Date) => {
    return eventsList.some((event) => isSameDay(event.date, date))
  }

  const upcomingEventsList = eventsList
    .filter((event) => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header - Same as home page */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Calendar & Events</h1>
          <p className="text-muted-foreground">Manage campaigns, meetings, and important deadlines</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-32 hover:bg-accent transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <RefreshCw className={`h-4 w-4 mr-2 transition-all duration-300 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180"}`} />
            <span className="relative z-10">
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </span>
          </Button>
          <ExportDialog>
            <Button 
              variant="outline" 
              size="sm"
              className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md hover:border-emerald-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Download className="h-4 w-4 mr-2 group-hover:animate-bounce transition-all duration-200" />
              <span className="relative z-10 group-hover:text-emerald-700 transition-colors">Export</span>
            </Button>
          </ExportDialog>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                <span className="relative z-10">Add Event</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>Add a new event, meeting, or campaign deadline to your calendar.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter event title" 
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Event Type</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="campaign">Campaign</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={eventDuration} onValueChange={setEventDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="2hours">2 hours</SelectItem>
                        <SelectItem value="halfday">Half day</SelectItem>
                        <SelectItem value="fullday">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Event description..." 
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Attendees</Label>
                  <Input 
                    id="attendees" 
                    placeholder="Add attendees (comma separated)" 
                    value={eventAttendees}
                    onChange={(e) => setEventAttendees(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateEvent}>Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {/* Edit Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>Update event details and settings.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Event Title</Label>
                    <Input 
                      id="edit-title" 
                      placeholder="Enter event title" 
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-type">Event Type</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="campaign">Campaign</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="report">Report</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input 
                      id="edit-date" 
                      type="date" 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input 
                      id="edit-time" 
                      type="time" 
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-duration">Duration</Label>
                    <Select value={eventDuration} onValueChange={setEventDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30min">30 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                        <SelectItem value="2hours">2 hours</SelectItem>
                        <SelectItem value="halfday">Half day</SelectItem>
                        <SelectItem value="fullday">Full day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    placeholder="Event description..." 
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-attendees">Attendees</Label>
                  <Input 
                    id="edit-attendees" 
                    placeholder="Add attendees (comma separated)" 
                    value={eventAttendees}
                    onChange={(e) => setEventAttendees(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateEvent}>Update Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Cards - Same as home page */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Events"
          value={metrics.totalEvents.toString()}
          change={12.5}
          icon={CalendarIcon}
          description="all events"
          color="blue"
        />
        <MetricCard
          title="Upcoming Events"
          value={metrics.upcomingEvents.toString()}
          change={18.3}
          icon={Clock}
          description="next 30 days"
          color="emerald"
        />
        <MetricCard
          title="Active Events"
          value={metrics.activeEvents.toString()}
          change={-5.2}
          icon={Activity}
          description="currently running"
          color="violet"
        />
        <MetricCard
          title="Completed Events"
          value={metrics.completedEvents.toString()}
          change={25.7}
          icon={Target}
          description="this month"
          color="amber"
        />
      </div>

      {/* Calendar Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>
                {selectedDate ? format(selectedDate, "MMMM yyyy") : "Select a date to view events"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasEvents: (date) => hasEventsOnDate(date),
                }}
                modifiersStyles={{
                  hasEvents: {
                    backgroundColor: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontWeight: "bold",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <span>{format(selectedDate, "MMM dd, yyyy")}</span>
                </CardTitle>
                <CardDescription>Events for selected date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getEventsForDate(selectedDate).length > 0 ? (
                    getEventsForDate(selectedDate).map((event) => (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {getEventTypeIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium truncate">{event.title}</h4>
                            <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {event.time} • {event.duration}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No events scheduled for this date</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Next 5 scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium truncate">{event.title}</h4>
                        <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(event.date, "MMM dd")} • {event.time}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event Types Overview */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {eventsList.map((event) => (
              <Card key={event.id} className="transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{format(event.date, "MMM dd, yyyy")}</span>
                          <span>{event.time}</span>
                          <span>{event.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>{event.attendees.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                        className="group/btn hover:scale-105 transition-all duration-200"
                      >
                        <Edit className="h-4 w-4 mr-2 group-hover/btn:animate-pulse" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteEvent(event)}
                        className="hover:scale-105 transition-all duration-200 hover:border-red-300 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4">
            {eventsList
              .filter((e) => e.type === "campaign")
              .map((event) => (
                <Card key={event.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{format(event.date, "MMM dd, yyyy")}</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        Campaign
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-4">
          <div className="grid gap-4">
            {eventsList
              .filter((e) => e.type === "meeting")
              .map((event) => (
                <Card key={event.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20">
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{format(event.date, "MMM dd, yyyy")}</span>
                            <span>{event.time}</span>
                            <span>{event.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{event.attendees.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Meeting
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {eventsList
              .filter((e) => e.type === "report")
              .map((event) => (
                <Card key={event.id} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                          <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{format(event.date, "MMM dd, yyyy")}</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        Report
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
