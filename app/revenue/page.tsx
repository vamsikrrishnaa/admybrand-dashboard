"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, TrendingDown, Target, CreditCard, Banknote, RefreshCw, Download, Activity, Eye, BarChart3 } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { RevenueChart } from "@/components/revenue-chart"
import { RevenueBreakdownChart } from "@/components/revenue-breakdown-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { RealTimeActivityItem } from "@/components/real-time-activity-item"
import { useToast } from "@/components/ui/use-toast"

const revenueData = {
  totalRevenue: 94250,
  monthlyGrowth: 12.5,
  quarterlyGrowth: 28.3,
  yearlyGrowth: 145.7,
  avgOrderValue: 127.5,
  totalTransactions: 739,
  recurringRevenue: 67800,
  oneTimeRevenue: 26450,
}

const revenueStreams = [
  { name: "Subscription Plans", amount: 67800, percentage: 71.9, growth: 15.2 },
  { name: "One-time Purchases", amount: 18200, percentage: 19.3, growth: 8.7 },
  { name: "Premium Features", amount: 5850, percentage: 6.2, growth: 22.1 },
  { name: "Consulting Services", amount: 2400, percentage: 2.5, growth: -3.4 },
]

const monthlyTargets = [
  { month: "Jan", target: 75000, actual: 72000, percentage: 96 },
  { month: "Feb", target: 78000, actual: 81000, percentage: 104 },
  { month: "Mar", target: 80000, actual: 76000, percentage: 95 },
  { month: "Apr", target: 82000, actual: 89000, percentage: 109 },
  { month: "May", target: 85000, actual: 87000, percentage: 102 },
  { month: "Jun", target: 88000, actual: 94250, percentage: 107 },
]

const topCustomers = [
  { name: "Enterprise Corp", revenue: 12500, growth: 18.5, plan: "Enterprise" },
  { name: "Tech Solutions Inc", revenue: 8900, growth: 12.3, plan: "Professional" },
  { name: "Digital Agency LLC", revenue: 7200, growth: -2.1, plan: "Professional" },
  { name: "Startup Hub", revenue: 5600, growth: 34.7, plan: "Growth" },
  { name: "Marketing Pro", revenue: 4800, growth: 8.9, plan: "Growth" },
]

export default function RevenuePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [metrics, setMetrics] = useState(revenueData)
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
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000 - 500),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 10 - 5),
        avgOrderValue: prev.avgOrderValue + Math.floor(Math.random() * 20 - 10),
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
      title: "Revenue data refreshed",
      description: "Your revenue data has been updated with the latest information.",
    })
  }

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header - Same as home page */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your revenue performance and growth</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <div className="group">
            <DateRangePicker />
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 hover:bg-accent transition-colors">
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
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toLocaleString()}`}
          change={revenueData.monthlyGrowth}
          icon={DollarSign}
          description="vs last month"
          color="emerald"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${metrics.avgOrderValue}`}
          change={8.2}
          icon={CreditCard}
          description="vs last month"
          color="blue"
        />
        <MetricCard
          title="Transactions"
          value={metrics.totalTransactions.toLocaleString()}
          change={15.7}
          icon={Banknote}
          description="vs last month"
          color="violet"
        />
        <MetricCard
          title="Yearly Growth"
          value={`${revenueData.yearlyGrowth}%`}
          change={12.3}
          icon={Target}
          description="excellent performance"
          color="amber"
        />
      </div>

      {/* Revenue Analysis - Same tab style as home page */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "overview", label: "Overview", icon: "📊" },
            { value: "streams", label: "Revenue Streams", icon: "💰" },
            { value: "targets", label: "Targets", icon: "🎯" },
            { value: "customers", label: "Top Customers", icon: "👑" }
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
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Distribution of revenue by source</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueBreakdownChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-emerald-600 group-hover:animate-pulse" />
                  <span>Real-time Revenue Activity</span>
                  <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RealTimeActivityItem
                    icon={DollarSign}
                    title="Revenue Today"
                    subtitle="Current daily total"
                    initialValue={metrics.totalRevenue}
                    change="+12% from yesterday"
                    color="emerald"
                    index={0}
                  />
                  <RealTimeActivityItem
                    icon={CreditCard}
                    title="New Transactions"
                    subtitle="Last hour"
                    initialValue={15}
                    change="+8% from last hour"
                    color="blue"
                    index={1}
                  />
                  <RealTimeActivityItem
                    icon={BarChart3}
                    title="Avg Order Value"
                    subtitle="Current session"
                    initialValue={Math.floor(metrics.avgOrderValue)}
                    change="+5% from yesterday"
                    color="violet"
                    index={2}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Revenue Composition</CardTitle>
                <CardDescription>Breakdown of revenue sources with trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Recurring Revenue", value: revenueData.recurringRevenue, percentage: 71.9, change: "+15%", color: "emerald" },
                    { name: "One-time Revenue", value: revenueData.oneTimeRevenue, percentage: 28.1, change: "+8%", color: "blue" },
                    { name: "Premium Features", value: 5850, percentage: 6.2, change: "+22%", color: "violet" },
                    { name: "Consulting", value: 2400, percentage: 2.5, change: "-3%", color: "amber" }
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
                        <p className="font-semibold group-hover/item:text-lg transition-all duration-200">${item.value.toLocaleString()}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                          <div className={`h-1 w-12 bg-${item.color}-200 rounded-full overflow-hidden`}>
                            <div 
                              className={`h-full bg-${item.color}-500 rounded-full transition-all duration-1000 ease-out`}
                              style={{ width: `${item.percentage * 1.2}%` }}
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

        <TabsContent value="streams" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Revenue Streams Analysis</CardTitle>
              <CardDescription>Breakdown of revenue by different sources and their growth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {revenueStreams.map((stream, index) => (
                <div 
                  key={stream.name} 
                  className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover/item:text-primary transition-colors">{stream.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground font-mono">
                        ${stream.amount.toLocaleString()} ({stream.percentage}%)
                      </span>
                      <Badge
                        className={`transition-all duration-200 group-hover/item:scale-105 ${
                          stream.growth > 0
                            ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
                            : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
                        }`}
                      >
                        {stream.growth > 0 ? "+" : ""}
                        {stream.growth}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={stream.percentage} 
                    className="h-2 group-hover/item:h-3 transition-all duration-300" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Monthly Targets vs Actual</CardTitle>
              <CardDescription>Performance against monthly revenue targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {monthlyTargets.map((month, index) => (
                <div 
                  key={month.month} 
                  className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover/item:text-primary transition-colors">{month.month} 2024</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground font-mono">
                        ${month.actual.toLocaleString()} / ${month.target.toLocaleString()}
                      </span>
                      <Badge
                        className={`transition-all duration-200 group-hover/item:scale-105 ${
                          month.percentage >= 100
                            ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
                            : "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20"
                        }`}
                      >
                        {month.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={month.percentage} 
                    className="h-2 group-hover/item:h-3 transition-all duration-300" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Top Revenue Customers</CardTitle>
              <CardDescription>Highest contributing customers and their growth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div 
                  key={customer.name} 
                  className="group/item flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium group-hover/item:scale-110 transition-transform duration-200">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium group-hover/item:text-primary transition-colors">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.plan} Plan</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium group-hover/item:text-lg transition-all duration-200">${customer.revenue.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      {customer.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 group-hover/item:animate-bounce" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 group-hover/item:animate-bounce" />
                      )}
                      <Badge
                        className={`transition-all duration-200 group-hover/item:scale-105 ${
                          customer.growth > 0
                            ? "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
                            : "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
                        }`}
                      >
                        {customer.growth > 0 ? "+" : ""}
                        {customer.growth}%
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
