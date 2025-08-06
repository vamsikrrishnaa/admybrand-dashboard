"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, MousePointer, Download, RefreshCw, Activity, TrendingUp, Eye } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { MobileMetricsCarousel } from "@/components/mobile-metrics-carousel"
import { RevenueChart } from "@/components/revenue-chart"
import { UserGrowthChart } from "@/components/user-growth-chart"
import { ConversionChart } from "@/components/conversion-chart"
import { EnhancedBarChart } from "@/components/enhanced-bar-chart"
import { EnhancedDataTable } from "@/components/enhanced-data-table"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { FloatingActionMenu } from "@/components/floating-action-menu"
import { RealTimeActivityItem } from "@/components/real-time-activity-item"
import { mockMetrics } from "@/lib/mock-data"
import { enhancedMockMetrics, generateChartData } from "@/lib/enhanced-mock-data"
import { differenceInDays } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState(mockMetrics)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<any>()
  const [filteredMetrics, setFilteredMetrics] = useState(mockMetrics)
  const { toast } = useToast()

  // Update metrics based on date range selection
  useEffect(() => {
    if (selectedDateRange?.from && selectedDateRange?.to) {
      const daysDiff = differenceInDays(selectedDateRange.to, selectedDateRange.from)
      
      // Simulate different metrics based on date range
      const multiplier = Math.min(daysDiff / 30, 2) // Scale based on date range
      const randomVariation = () => (Math.random() - 0.5) * 0.2 + 1 // ±20% variation
      
      setFilteredMetrics({
        revenue: {
          ...enhancedMockMetrics.revenue,
          value: enhancedMockMetrics.revenue.value * multiplier * randomVariation(),
          change: (Math.random() - 0.5) * 30, // Random change between -15% and +15%
        },
        users: {
          ...enhancedMockMetrics.users,
          value: Math.floor(enhancedMockMetrics.users.value * multiplier * randomVariation()),
          change: (Math.random() - 0.5) * 25,
        },
        conversions: {
          ...enhancedMockMetrics.conversions,
          value: Number((enhancedMockMetrics.conversions.value * randomVariation()).toFixed(2)),
          change: (Math.random() - 0.5) * 20,
        },
        growth: {
          ...enhancedMockMetrics.growth,
          value: Number((enhancedMockMetrics.growth.value * randomVariation()).toFixed(1)),
          change: (Math.random() - 0.5) * 15,
        },
      })

      toast({
        title: "Data updated",
        description: `Showing data for ${daysDiff + 1} days (${selectedDateRange.from.toLocaleDateString()} - ${selectedDateRange.to.toLocaleDateString()})`,
      })
    } else {
      setFilteredMetrics(mockMetrics)
    }
  }, [selectedDateRange, toast])

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        revenue: {
          ...prev.revenue,
          value: prev.revenue.value + Math.random() * 1000 - 500,
          change: (Math.random() - 0.5) * 20,
        },
        users: {
          ...prev.users,
          value: prev.users.value + Math.floor(Math.random() * 100 - 50),
          change: (Math.random() - 0.5) * 15,
        },
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
      title: "Data refreshed",
      description: "Your dashboard has been updated with the latest data.",
    })
  }

  const handleExport = (format: "pdf" | "csv") => {
    toast({
      title: "Export started",
      description: `Your ${format.toUpperCase()} report will be ready for download shortly.`,
    })
  }

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Analytics Overview</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Track your digital marketing performance in real-time</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <div className="sm:block group">
            <DateRangePicker onDateChange={setSelectedDateRange} />
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh} 
              disabled={isRefreshing}
              className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md flex-1 sm:flex-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : "group-hover:rotate-180"} transition-all duration-300 ${isRefreshing ? "" : "sm:mr-2"}`} />
              <span className="relative z-10 hidden sm:inline">
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </span>
            </Button>
            <ExportDialog>
              <Button 
                variant="outline" 
                size="sm"
                className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md hover:border-emerald-300 flex-1 sm:flex-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Download className="h-4 w-4 group-hover:animate-bounce transition-all duration-200 sm:mr-2" />
                <span className="relative z-10 group-hover:text-emerald-700 transition-colors hidden sm:inline">Export</span>
              </Button>
            </ExportDialog>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      {/* Mobile Carousel */}
      <div className="block sm:hidden">
        <MobileMetricsCarousel 
          metrics={[
            {
              title: "Total Revenue",
              value: `$${Math.round(filteredMetrics.revenue.value).toLocaleString()}`,
              change: metrics.revenue.change,
              icon: DollarSign,
              description: "vs last month",
              color: "emerald"
            },
            {
              title: "Active Users",
              value: filteredMetrics.users.value.toLocaleString(),
              change: filteredMetrics.users.change,
              icon: Users,
              description: selectedDateRange?.from ? "vs previous period" : "vs last month",
              color: "blue"
            },
            {
              title: "Conversion Rate",
              value: `${filteredMetrics.conversions.value}%`,
              change: filteredMetrics.conversions.change,
              icon: MousePointer,
              description: selectedDateRange?.from ? "vs previous period" : "vs last month",
              color: "amber"
            },
            {
              title: "Growth Rate",
              value: `${filteredMetrics.growth.value}%`,
              change: filteredMetrics.growth.change,
              icon: TrendingUp,
              description: selectedDateRange?.from ? "vs previous period" : "vs last month",
              color: "violet"
            }
          ]}
        />
      </div>
      {/* Desktop Grid */}
      <div className="hidden sm:grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={`$${Math.round(filteredMetrics.revenue.value).toLocaleString()}`}
          change={metrics.revenue.change}
          icon={DollarSign}
          description="vs last month"
          color="emerald"
        />
        <MetricCard
          title="Active Users"
          value={filteredMetrics.users.value.toLocaleString()}
          change={filteredMetrics.users.change}
          icon={Users}
          description={selectedDateRange?.from ? "vs previous period" : "vs last month"}
          color="blue"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${filteredMetrics.conversions.value}%`}
          change={filteredMetrics.conversions.change}
          icon={MousePointer}
          description={selectedDateRange?.from ? "vs previous period" : "vs last month"}
          color="amber"
        />
        <MetricCard
          title="Growth Rate"
          value={`${filteredMetrics.growth.value}%`}
          change={filteredMetrics.growth.change}
          icon={TrendingUp}
          description={selectedDateRange?.from ? "vs previous period" : "vs last month"}
          color="violet"
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "overview", label: "Overview", icon: "📊", shortLabel: "Overview" },
            { value: "revenue", label: "Revenue", icon: "💰", shortLabel: "Revenue" },
            { value: "users", label: "Users", icon: "👥", shortLabel: "Users" },
            { value: "conversions", label: "Sources", icon: "🎯", shortLabel: "Sources" }
          ].map((tab, index) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="group relative data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300 hover:scale-105 data-[state=active]:scale-105 text-xs sm:text-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="flex items-center space-x-1 sm:space-x-2">
                <span className="group-hover:animate-bounce transition-transform text-sm sm:text-base">{tab.icon}</span>
                <span className="font-medium hidden xs:inline sm:inline">{tab.shortLabel}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <RevenueChart />
            <ConversionChart />
          </div>
          <EnhancedBarChart />
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <UserGrowthChart />
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600 group-hover:animate-pulse" />
                  <span>Real-time Activity</span>
                  <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RealTimeActivityItem
                    icon={Eye}
                    title="Active Users"
                    subtitle="Currently browsing"
                    initialValue={1247}
                    change="+12% from yesterday"
                    color="blue"
                    index={0}
                  />
                  <RealTimeActivityItem
                    icon={MousePointer}
                    title="Page Views"
                    subtitle="Last hour"
                    initialValue={3892}
                    change="+8% from last hour"
                    color="emerald"
                    index={1}
                  />
                  <RealTimeActivityItem
                    icon={TrendingUp}
                    title="Conversions"
                    subtitle="Today"
                    initialValue={156}
                    change="+23% from yesterday"
                    color="violet"
                    index={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <RevenueChart />
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Revenue Breakdown
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>Revenue sources for this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Subscriptions", value: 28450, percentage: 62.9, color: "emerald", trend: "+12%" },
                    { name: "One-time Sales", value: 12340, percentage: 27.3, color: "blue", trend: "+8%" },
                    { name: "Premium Features", value: 3240, percentage: 7.2, color: "violet", trend: "+15%" },
                    { name: "Consulting", value: 1200, percentage: 2.6, color: "amber", trend: "-3%" }
                  ].map((item, index) => (
                    <div 
                      key={item.name}
                      className="group/item flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`h-3 w-3 rounded-full bg-${item.color}-500 group-hover/item:scale-125 transition-transform duration-200`} />
                        <span className="text-sm font-medium group-hover/item:text-primary transition-colors">{item.name}</span>
                        <Badge variant="outline" className={`text-xs ${item.trend.startsWith('+') ? 'text-emerald-600 border-emerald-200' : 'text-red-600 border-red-200'} opacity-0 group-hover/item:opacity-100 transition-opacity`}>
                          {item.trend}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold group-hover/item:text-lg transition-all duration-200">${item.value.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                          <div className={`h-1 w-12 bg-${item.color}-200 rounded-full overflow-hidden`}>
                            <div 
                              className={`h-full bg-${item.color}-500 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${item.percentage * 1.5}%` }}
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

        <TabsContent value="users" className="space-y-4">
          <UserGrowthChart />
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <ConversionChart />
        </TabsContent>
      </Tabs>

      {/* Enhanced Data Table */}
      <EnhancedDataTable />
    </div>
  )
}
