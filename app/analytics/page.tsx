"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, Eye, MousePointer, Clock, RefreshCw, Download } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { AdvancedChart } from "@/components/advanced-chart"
import { HeatmapChart } from "@/components/heatmap-chart"
import { FunnelChart } from "@/components/funnel-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { useToast } from "@/components/ui/use-toast"

const analyticsData = {
  overview: {
    totalSessions: 45680,
    sessionChange: 12.5,
    avgSessionDuration: "3m 24s",
    durationChange: -5.2,
    bounceRate: 34.2,
    bounceChange: -8.1,
    pageViews: 156780,
    pageViewsChange: 18.3,
  },
  topPages: [
    { page: "/dashboard", views: 12450, change: 15.2 },
    { page: "/campaigns", views: 8920, change: -3.1 },
    { page: "/analytics", views: 7650, change: 22.8 },
    { page: "/reports", views: 6340, change: 8.7 },
    { page: "/settings", views: 4120, change: -12.3 },
  ],
  devices: [
    { device: "Desktop", percentage: 65.4, users: 29847 },
    { device: "Mobile", percentage: 28.2, users: 12876 },
    { device: "Tablet", percentage: 6.4, users: 2923 },
  ],
  browsers: [
    { browser: "Chrome", percentage: 68.2, users: 31124 },
    { browser: "Safari", percentage: 18.7, users: 8532 },
    { browser: "Firefox", percentage: 8.1, users: 3695 },
    { browser: "Edge", percentage: 5.0, users: 2284 },
  ],
}

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Analytics refreshed",
      description: "Your data has been updated with the latest information.",
    })
  }

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header - Same as home page */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">Deep dive into your website and campaign performance</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <DateRangePicker />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
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
        </div>
      </div>

      {/* Metrics Cards - Same as home page */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sessions"
          value={analyticsData.overview.totalSessions.toLocaleString()}
          change={analyticsData.overview.sessionChange}
          icon={Users}
          description="vs last period"
          color="blue"
        />
        <MetricCard
          title="Avg Session Duration"
          value={analyticsData.overview.avgSessionDuration}
          change={analyticsData.overview.durationChange}
          icon={Clock}
          description="vs last period"
          color="violet"
        />
        <MetricCard
          title="Bounce Rate"
          value={`${analyticsData.overview.bounceRate}%`}
          change={analyticsData.overview.bounceChange}
          icon={MousePointer}
          description="vs last period"
          color="amber"
        />
        <MetricCard
          title="Page Views"
          value={analyticsData.overview.pageViews.toLocaleString()}
          change={analyticsData.overview.pageViewsChange}
          icon={Eye}
          description="vs last period"
          color="emerald"
        />
      </div>

      {/* Charts Section - Same tab style as home page */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "traffic", label: "Traffic Analysis", icon: "📊" },
            { value: "behavior", label: "User Behavior", icon: "👥" },
            { value: "conversion", label: "Conversion Funnel", icon: "🎯" },
            { value: "heatmap", label: "Page Heatmap", icon: "🔥" }
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

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Traffic Trends</CardTitle>
                <CardDescription>Hourly traffic patterns over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <AdvancedChart type="line" />
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages and their performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div 
                    key={page.page} 
                    className="group/item flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium group-hover/item:scale-110 transition-transform duration-200">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium group-hover/item:text-primary transition-colors">{page.page}</p>
                        <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`transition-all duration-200 group-hover/item:scale-105 ${
                        page.change > 0
                          ? "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20"
                          : "text-red-700 bg-red-100 border-red-200 dark:text-red-400 dark:bg-red-900/20"
                      }`}
                    >
                      {page.change > 0 ? "+" : ""}
                      {page.change}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Traffic distribution by device type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.devices.map((device, index) => (
                  <div 
                    key={device.device} 
                    className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-3 w-3 rounded-full group-hover/item:scale-125 transition-transform duration-200 ${
                          device.device === 'Desktop' ? 'bg-blue-500' :
                          device.device === 'Mobile' ? 'bg-emerald-500' :
                          'bg-amber-500'
                        }`} />
                        <span className="font-medium group-hover/item:text-primary transition-colors">{device.device}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {device.percentage}% ({device.users.toLocaleString()} users)
                      </span>
                    </div>
                    <Progress value={device.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Browser Distribution</CardTitle>
                <CardDescription>Most popular browsers among your users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analyticsData.browsers.map((browser, index) => (
                  <div 
                    key={browser.browser} 
                    className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`h-3 w-3 rounded-full group-hover/item:scale-125 transition-transform duration-200 ${
                          browser.browser === 'Chrome' ? 'bg-red-500' :
                          browser.browser === 'Safari' ? 'bg-blue-500' :
                          browser.browser === 'Firefox' ? 'bg-orange-500' :
                          'bg-green-500'
                        }`} />
                        <span className="font-medium group-hover/item:text-primary transition-colors">{browser.browser}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {browser.percentage}% ({browser.users.toLocaleString()} users)
                      </span>
                    </div>
                    <Progress value={browser.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey from landing to conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <FunnelChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Page Interaction Heatmap</CardTitle>
              <CardDescription>Visual representation of user interactions on your pages</CardDescription>
            </CardHeader>
            <CardContent>
              <HeatmapChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}