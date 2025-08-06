"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserPlus, UserCheck, Search, Filter, MapPin, Calendar, RefreshCw, Download, TrendingUp, Activity, Eye } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { UserSegmentChart } from "@/components/user-segment-chart"
import { UserActivityChart } from "@/components/user-activity-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { RealTimeActivityItem } from "@/components/real-time-activity-item"
import { useToast } from "@/components/ui/use-toast"

const userStats = {
  totalUsers: 24680,
  newUsers: 1240,
  activeUsers: 18450,
  churnedUsers: 320,
  avgSessionTime: "4m 32s",
  retentionRate: 78.5,
}

const userSegments = [
  { name: "New Users", count: 1240, percentage: 15.2, color: "#3b82f6" },
  { name: "Active Users", count: 6890, percentage: 84.3, color: "#10b981" },
  { name: "Returning Users", count: 4320, percentage: 52.8, color: "#f59e0b" },
  { name: "VIP Users", count: 890, percentage: 10.9, color: "#8b5cf6" },
]

const recentUsers = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastSeen: "2 hours ago",
    location: "New York, US",
    joinDate: "2024-01-15",
    sessions: 45,
    revenue: 1250,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "inactive",
    lastSeen: "3 days ago",
    location: "London, UK",
    joinDate: "2024-02-20",
    sessions: 23,
    revenue: 890,
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastSeen: "1 hour ago",
    location: "Toronto, CA",
    joinDate: "2024-03-10",
    sessions: 67,
    revenue: 2100,
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "new",
    lastSeen: "30 minutes ago",
    location: "Sydney, AU",
    joinDate: "2024-12-01",
    sessions: 3,
    revenue: 150,
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    lastSeen: "5 hours ago",
    location: "Madrid, ES",
    joinDate: "2024-01-30",
    sessions: 89,
    revenue: 3200,
  },
]

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [metrics, setMetrics] = useState(userStats)
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
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10 - 5),
        newUsers: prev.newUsers + Math.floor(Math.random() * 5 - 2),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const filteredUsers = recentUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Users data refreshed",
      description: "Your user data has been updated with the latest information.",
    })
  }

  const handleInviteUsers = () => {
    toast({
      title: "Invite users",
      description: "Opening user invitation dialog...",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      inactive: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
      new: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header - Same as home page */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Analyze and manage your user base and engagement</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <DateRangePicker />
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
          <Button
            onClick={handleInviteUsers}
            className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <UserPlus className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
            <span className="relative z-10">Invite Users</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards - Same as home page */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={userStats.totalUsers.toLocaleString()}
          change={12.3}
          icon={Users}
          description="vs last month"
          color="blue"
        />
        <MetricCard
          title="New Users"
          value={userStats.newUsers.toLocaleString()}
          change={18.7}
          icon={UserPlus}
          description="vs last month"
          color="emerald"
        />
        <MetricCard
          title="Active Users"
          value={userStats.activeUsers.toLocaleString()}
          change={8.2}
          icon={UserCheck}
          description="vs last month"
          color="violet"
        />
        <MetricCard
          title="Retention Rate"
          value={`${userStats.retentionRate}%`}
          change={-2.1}
          icon={TrendingUp}
          description="vs last month"
          color="amber"
        />
      </div>

      {/* User Analytics - Same tab style as home page */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "overview", label: "Overview", icon: "📊" },
            { value: "segments", label: "Segments", icon: "👥" },
            { value: "activity", label: "Activity", icon: "📈" },
            { value: "directory", label: "Directory", icon: "📋" }
          ].map((tab, index) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="group relative data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:scale-105 data-[state=active]:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="flex items-center space-x-2">
                <span className="group-hover:animate-bounce transition-transform">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>User acquisition and retention over time</CardDescription>
              </CardHeader>
              <CardContent>
                <UserActivityChart />
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>User Segments</CardTitle>
                <CardDescription>Distribution of users by engagement level</CardDescription>
              </CardHeader>
              <CardContent>
                <UserSegmentChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600 group-hover:animate-pulse" />
                  <span>Real-time User Activity</span>
                  <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RealTimeActivityItem
                    icon={Users}
                    title="Online Users"
                    subtitle="Currently active"
                    initialValue={metrics.activeUsers}
                    change="+5% from yesterday"
                    color="blue"
                    index={0}
                  />
                  <RealTimeActivityItem
                    icon={UserPlus}
                    title="New Signups"
                    subtitle="Last hour"
                    initialValue={23}
                    change="+12% from last hour"
                    color="emerald"
                    index={1}
                  />
                  <RealTimeActivityItem
                    icon={Eye}
                    title="Profile Views"
                    subtitle="Today"
                    initialValue={892}
                    change="+18% from yesterday"
                    color="violet"
                    index={2}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>User Engagement Trends</CardTitle>
                <CardDescription>Key engagement metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Session Duration", value: "4m 32s", change: "+8%", color: "emerald", trend: "up" },
                    { name: "Pages per Session", value: "3.2", change: "+12%", color: "blue", trend: "up" },
                    { name: "Bounce Rate", value: "34.2%", change: "-5%", color: "violet", trend: "down" },
                    { name: "Return Visitors", value: "68.5%", change: "+15%", color: "amber", trend: "up" }
                  ].map((item, index) => (
                    <div
                      key={item.name}
                      className="group/item flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`h-3 w-3 rounded-full bg-${item.color}-500 group-hover/item:scale-125 transition-transform duration-200`} />
                        <span className="text-sm font-medium group-hover/item:text-primary transition-colors">{item.name}</span>
                        <Badge variant="outline" className={`text-xs ${item.change.startsWith('+') ? 'text-emerald-600 border-emerald-200' : 'text-red-600 border-red-200'} opacity-0 group-hover/item:opacity-100 transition-opacity`}>
                          {item.change}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold group-hover/item:text-lg transition-all duration-200">{item.value}</p>
                        <div className="flex items-center space-x-2">
                          <div className={`h-1 w-12 bg-${item.color}-200 rounded-full overflow-hidden`}>
                            <div
                              className={`h-full bg-${item.color}-500 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>User Segments</CardTitle>
                <CardDescription>Breakdown of users by behavior and engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userSegments.map((segment, index) => (
                  <div
                    key={segment.name}
                    className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-3 w-3 rounded-full group-hover/item:scale-125 transition-transform duration-200"
                          style={{ backgroundColor: segment.color }}
                        />
                        <span className="font-medium group-hover/item:text-primary transition-colors">{segment.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {segment.count.toLocaleString()} users ({segment.percentage}%)
                      </span>
                    </div>
                    <Progress
                      value={segment.percentage}
                      className="h-2 group-hover/item:h-3 transition-all duration-300"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Key engagement indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Average Session Time", value: userStats.avgSessionTime, progress: 75 },
                  { label: "Daily Active Users", value: "68.2%", progress: 68.2 },
                  { label: "Weekly Active Users", value: "84.5%", progress: 84.5 },
                  { label: "Monthly Active Users", value: "92.1%", progress: 92.1 }
                ].map((metric, index) => (
                  <div
                    key={metric.label}
                    className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium group-hover/item:text-primary transition-colors">{metric.label}</span>
                      <span className="text-sm text-muted-foreground font-mono">{metric.value}</span>
                    </div>
                    <Progress
                      value={metric.progress}
                      className="h-2 group-hover/item:h-3 transition-all duration-300"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>User Activity Timeline</CardTitle>
              <CardDescription>Real-time user activity and engagement patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <UserActivityChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="directory" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 hover:shadow-md focus:shadow-lg transition-all duration-200"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 hover:bg-accent transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="new">New</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Directory */}
          <div className="grid gap-4">
            {filteredUsers.map((user, index) => (
              <Card
                key={user.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 group-hover:scale-110 transition-transform duration-200">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{user.name}</h3>
                          {getStatusBadge(user.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{user.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Last seen: {user.lastSeen}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-mono">
                        {user.sessions} sessions • ${user.revenue.toLocaleString()} revenue
                      </div>
                    </div>
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