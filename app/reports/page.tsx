"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Plus, Search, Download, CalendarIcon, FileText, BarChart3, PieChart, TrendingUp, Clock, RefreshCw, Activity, Eye, Database } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { RealTimeActivityItem } from "@/components/real-time-activity-item"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

const reports = [
  {
    id: "1",
    name: "Monthly Performance Report",
    type: "Performance",
    status: "completed",
    createdAt: "2024-12-01",
    lastRun: "2024-12-01 09:00",
    schedule: "Monthly",
    format: "PDF",
    size: "2.4 MB",
    description: "Comprehensive monthly performance analysis including revenue, users, and conversions",
  },
  {
    id: "2",
    name: "Campaign ROI Analysis",
    type: "Campaign",
    status: "running",
    createdAt: "2024-11-28",
    lastRun: "2024-12-01 14:30",
    schedule: "Weekly",
    format: "Excel",
    size: "1.8 MB",
    description: "Return on investment analysis for all active campaigns",
  },
  {
    id: "3",
    name: "User Engagement Report",
    type: "User Analytics",
    status: "scheduled",
    createdAt: "2024-11-25",
    lastRun: "2024-11-30 08:00",
    schedule: "Daily",
    format: "CSV",
    size: "856 KB",
    description: "Daily user engagement metrics and behavior patterns",
  },
  {
    id: "4",
    name: "Revenue Breakdown",
    type: "Financial",
    status: "completed",
    createdAt: "2024-11-20",
    lastRun: "2024-12-01 06:00",
    schedule: "Weekly",
    format: "PDF",
    size: "3.2 MB",
    description: "Detailed revenue analysis by source, customer segment, and time period",
  },
  {
    id: "5",
    name: "Traffic Sources Analysis",
    type: "Analytics",
    status: "failed",
    createdAt: "2024-11-15",
    lastRun: "2024-11-30 12:00",
    schedule: "Bi-weekly",
    format: "Excel",
    size: "0 KB",
    description: "Analysis of traffic sources and their conversion rates",
  },
]

const reportTemplates = [
  { id: "performance", name: "Performance Report", description: "Overall performance metrics and KPIs" },
  { id: "campaign", name: "Campaign Analysis", description: "Campaign performance and ROI analysis" },
  { id: "user", name: "User Analytics", description: "User behavior and engagement metrics" },
  { id: "revenue", name: "Revenue Report", description: "Financial performance and revenue breakdown" },
  { id: "traffic", name: "Traffic Analysis", description: "Website traffic and source analysis" },
  { id: "conversion", name: "Conversion Report", description: "Conversion funnel and optimization insights" },
]

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<typeof reports[0] | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [reportName, setReportName] = useState("")
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [reportsList, setReportsList] = useState(reports)
  const [metrics, setMetrics] = useState({
    totalReports: reports.length,
    completedReports: reports.filter((r) => r.status === "completed").length,
    scheduledReports: reports.filter((r) => r.status === "scheduled").length,
    dataProcessed: 8.3
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
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
        dataProcessed: prev.dataProcessed + Math.random() * 0.5,
        completedReports: prev.completedReports + Math.floor(Math.random() * 2),
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
      title: "Reports data refreshed",
      description: "Your reports data has been updated with the latest information.",
    })
  }

  const filteredReports = reportsList.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      running: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      scheduled: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      Performance: BarChart3,
      Campaign: TrendingUp,
      "User Analytics": PieChart,
      Financial: FileText,
      Analytics: BarChart3,
    }
    const Icon = icons[type as keyof typeof icons] || FileText
    return <Icon className="h-4 w-4" />
  }

  const handleMetricToggle = (metric: string) => {
    setSelectedMetrics((prev) => (prev.includes(metric) ? prev.filter((m) => m !== metric) : [...prev, metric]))
  }

  const handleDownloadReport = (report: typeof reports[0]) => {
    // Simulate download process
    toast({
      title: "Download Started",
      description: `Downloading ${report.name} (${report.format}, ${report.size})...`,
    })

    // Simulate file download
    setTimeout(() => {
      // Create a mock download link
      const element = document.createElement('a')
      const file = new Blob([`Mock ${report.format} content for ${report.name}`], {
        type: report.format === 'PDF' ? 'application/pdf' :
          report.format === 'Excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
            'text/csv'
      })
      element.href = URL.createObjectURL(file)
      element.download = `${report.name.replace(/\s+/g, '_')}.${report.format.toLowerCase()}`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      toast({
        title: "Download Complete",
        description: `${report.name} has been downloaded successfully.`,
      })
    }, 1500)
  }

  const handleUseTemplate = (template: typeof reportTemplates[0]) => {
    // Pre-fill the create dialog with template data
    setSelectedTemplate(template.id)
    setReportName(`${template.name} - ${new Date().toLocaleDateString()}`)

    // Set default metrics based on template type
    const templateMetrics = {
      performance: ["Revenue", "Users", "Conversions"],
      campaign: ["Campaigns", "ROI", "Conversions"],
      user: ["Users", "Traffic", "Conversions"],
      revenue: ["Revenue", "ROI"],
      traffic: ["Traffic", "Users"],
      conversion: ["Conversions", "Users", "Traffic"]
    }

    setSelectedMetrics(templateMetrics[template.id as keyof typeof templateMetrics] || [])
    setIsCreateDialogOpen(true)

    toast({
      title: "Template Selected",
      description: `${template.name} template loaded with default settings.`,
    })
  }

  const handleRunNow = (report: typeof reports[0]) => {
    // First, update status to "running"
    setReportsList(prev => prev.map(r =>
      r.id === report.id
        ? { ...r, status: "running" as const }
        : r
    ))

    // Update metrics - move from scheduled to running (no change in counts yet)
    setMetrics(prev => ({
      ...prev,
      scheduledReports: Math.max(0, prev.scheduledReports - 1)
    }))

    toast({
      title: "Report Generation Started",
      description: `${report.name} is now running...`,
    })

    // Simulate report generation process with progress updates
    setTimeout(() => {
      toast({
        title: "Processing Data",
        description: `Analyzing ${report.type} metrics...`,
      })
    }, 1000)

    setTimeout(() => {
      toast({
        title: "Generating Report",
        description: `Creating ${report.format} file...`,
      })
    }, 2000)

    setTimeout(() => {
      // Finally, update status to "completed"
      setReportsList(prev => prev.map(r =>
        r.id === report.id
          ? {
            ...r,
            status: "completed" as const,
            lastRun: new Date().toLocaleString(),
            size: `${(Math.random() * 3 + 1).toFixed(1)} MB` // Random size between 1-4 MB
          }
          : r
      ))

      // Update metrics - add to completed count
      setMetrics(prev => ({
        ...prev,
        completedReports: prev.completedReports + 1
      }))

      toast({
        title: "Report Generated Successfully",
        description: `${report.name} is ready! Status updated to completed. You can now download or view it.`,
      })

      console.log(`Report ${report.name} generated at ${new Date().toLocaleString()}`)
    }, 4000)
  }

  const handleEditReport = (report: typeof reports[0]) => {
    // Show edit-specific behavior instead of opening create dialog
    toast({
      title: "Edit Report Settings",
      description: `Editing ${report.name}...`,
    })

    // Simulate editing process with realistic steps
    setTimeout(() => {
      toast({
        title: "Loading Current Settings",
        description: `Retrieving configuration for ${report.name}...`,
      })
    }, 500)

    setTimeout(() => {
      // Simulate showing edit options
      const editOptions = [
        "Schedule frequency",
        "Email recipients",
        "Export format",
        "Included metrics",
        "Date range"
      ]

      toast({
        title: "Edit Options Available",
        description: `You can modify: ${editOptions.slice(0, 3).join(", ")} and more.`,
      })
    }, 1500)

    setTimeout(() => {
      // Simulate saving changes
      toast({
        title: "Report Settings Updated",
        description: `${report.name} has been updated successfully. Changes will take effect on the next run.`,
      })

      console.log(`Edited report: ${report.name}`, {
        reportId: report.id,
        editedAt: new Date().toLocaleString(),
        changes: ["Schedule updated", "Recipients modified", "Format changed"]
      })
    }, 3000)
  }

  const handleCreateReport = () => {
    if (!reportName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a report name.",
        variant: "destructive"
      })
      return
    }

    if (!selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a report template.",
        variant: "destructive"
      })
      return
    }

    if (selectedMetrics.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one metric to include.",
        variant: "destructive"
      })
      return
    }

    // Simulate report creation
    toast({
      title: "Creating Report",
      description: `Setting up ${reportName} with ${selectedMetrics.length} metrics...`,
    })

    setTimeout(() => {
      // Create new report object
      const newReport = {
        id: (reportsList.length + 1).toString(),
        name: reportName,
        type: reportTemplates.find(t => t.id === selectedTemplate)?.name || "Custom",
        status: "scheduled" as const,
        createdAt: new Date().toISOString().split('T')[0],
        lastRun: "Not run yet",
        schedule: "Weekly", // Default schedule
        format: "PDF", // Default format
        size: "0 KB",
        description: `Custom report including ${selectedMetrics.join(", ")} metrics`,
      }

      // Add new report to the list
      setReportsList(prev => [newReport, ...prev])

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        totalReports: prev.totalReports + 1,
        scheduledReports: prev.scheduledReports + 1
      }))

      toast({
        title: "Report Created Successfully",
        description: `${reportName} has been created and added to your reports list.`,
      })

      // Reset form
      setReportName("")
      setSelectedTemplate("")
      setSelectedMetrics([])
      setDateRange(undefined)
      setIsCreateDialogOpen(false)

      console.log("New report created:", newReport)
    }, 2000)
  }

  const handleViewReport = (report: typeof reports[0]) => {
    // Simulate opening report in viewer
    toast({
      title: "Opening Report",
      description: `Loading ${report.name} in viewer...`,
    })

    // Simulate report viewing with more realistic behavior
    setTimeout(() => {
      // Create a mock report content based on format
      let reportContent = ""
      let reportUrl = ""

      if (report.format === 'PDF') {
        // For PDF, create a data URL with mock PDF content
        reportContent = `%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n\nMock PDF Report: ${report.name}\nGenerated: ${new Date().toLocaleString()}\nType: ${report.type}\nDescription: ${report.description}`
        const blob = new Blob([reportContent], { type: 'application/pdf' })
        reportUrl = URL.createObjectURL(blob)
      } else if (report.format === 'Excel') {
        // For Excel, create CSV-like content
        reportContent = `Report Name,${report.name}\nType,${report.type}\nGenerated,${new Date().toLocaleString()}\nDescription,${report.description}\n\nSample Data:\nMetric,Value,Change\nRevenue,$45000,+12%\nUsers,1250,+8%\nConversions,3.2%,+15%`
        const blob = new Blob([reportContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        reportUrl = URL.createObjectURL(blob)
      } else {
        // For CSV and others
        reportContent = `Report Name,Type,Generated,Description\n"${report.name}","${report.type}","${new Date().toLocaleString()}","${report.description}"\n\nSample Metrics:\nRevenue,45000,12\nUsers,1250,8\nConversions,3.2,15`
        const blob = new Blob([reportContent], { type: 'text/csv' })
        reportUrl = URL.createObjectURL(blob)
      }

      // Open in new tab for viewing
      const newWindow = window.open(reportUrl, '_blank')

      if (newWindow) {
        toast({
          title: "Report Opened",
          description: `${report.name} is now open in a new tab for viewing.`,
        })
      } else {
        // Fallback if popup blocked
        toast({
          title: "Report Ready",
          description: `${report.name} is ready. Click to open in new tab.`,
        })

        // Provide alternative way to open
        setTimeout(() => {
          if (confirm(`Open ${report.name} in new tab?`)) {
            window.open(reportUrl, '_blank')
          }
        }, 500)
      }

      // Clean up the URL after some time
      setTimeout(() => {
        URL.revokeObjectURL(reportUrl)
      }, 60000) // Clean up after 1 minute

      console.log(`Viewing report: ${report.name}`, report)
    }, 1000)
  }

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header - Same as home page */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage automated reports for your business insights</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <div className="group">
            <DateRangePicker />
          </div>
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
                <span className="relative z-10">Create Report</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
                <DialogDescription>
                  Configure a new automated report with your preferred metrics and schedule.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input
                      id="report-name"
                      placeholder="Enter report name"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Report Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Include Metrics</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Revenue", "Users", "Conversions", "Traffic", "Campaigns", "ROI"].map((metric) => (
                      <div key={metric} className="flex items-center space-x-2">
                        <Checkbox
                          id={metric}
                          checked={selectedMetrics.includes(metric)}
                          onCheckedChange={() => handleMetricToggle(metric)}
                        />
                        <Label htmlFor={metric} className="text-sm font-normal">
                          {metric}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date Range</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={setDateRange}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule">Schedule</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="format">Export Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Email Recipients</Label>
                    <Input id="recipients" placeholder="email@example.com" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateReport}>Create Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Cards - Same as home page */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Reports"
          value={metrics.totalReports.toString()}
          change={12.5}
          icon={FileText}
          description="active reports"
          color="blue"
        />
        <MetricCard
          title="Completed"
          value={metrics.completedReports.toString()}
          change={18.3}
          icon={BarChart3}
          description="this month"
          color="emerald"
        />
        <MetricCard
          title="Scheduled"
          value={metrics.scheduledReports.toString()}
          change={-5.2}
          icon={Clock}
          description="upcoming"
          color="amber"
        />
        <MetricCard
          title="Data Processed"
          value={`${metrics.dataProcessed.toFixed(1)} GB`}
          change={25.7}
          icon={Database}
          description="this month"
          color="violet"
        />
      </div>

      {/* Reports Section - Same tab style as home page */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "reports", label: "All Reports", icon: "📊" },
            { value: "templates", label: "Templates", icon: "📋" },
            { value: "scheduled", label: "Scheduled", icon: "⏰" }
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

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {/* Filters */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 hover:shadow-md focus:shadow-lg transition-all duration-200"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 hover:bg-accent transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reports List */}
              <div className="grid gap-4">
                {filteredReports.map((report, index) => (
                  <Card
                    key={report.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-200">
                            {getTypeIcon(report.type)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold group-hover:text-primary transition-colors">{report.name}</h3>
                              {getStatusBadge(report.status)}
                            </div>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>Type: {report.type}</span>
                              <span>Schedule: {report.schedule}</span>
                              <span>Format: {report.format}</span>
                              <span>Size: {report.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadReport(report)}
                            className="group/btn hover:scale-105 transition-all duration-200"
                          >
                            <Download className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewReport(report)}
                            className="hover:scale-105 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-muted-foreground">
                        Created: {new Date(report.createdAt).toLocaleDateString()} • Last run: {report.lastRun}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Real-time Activity Section */}
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600 group-hover:animate-pulse" />
                  <span>Real-time Report Activity</span>
                  <Badge variant="outline" className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RealTimeActivityItem
                    icon={FileText}
                    title="Reports Generated"
                    subtitle="Today"
                    initialValue={metrics.completedReports}
                    change="+18% from yesterday"
                    color="blue"
                    index={0}
                  />
                  <RealTimeActivityItem
                    icon={Database}
                    title="Data Processed"
                    subtitle="Last hour"
                    initialValue={Math.floor(metrics.dataProcessed * 100)}
                    change="+25% from last hour"
                    color="emerald"
                    index={1}
                  />
                  <RealTimeActivityItem
                    icon={Clock}
                    title="Scheduled Reports"
                    subtitle="Next 24 hours"
                    initialValue={metrics.scheduledReports}
                    change="On schedule"
                    color="violet"
                    index={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template, index) => (
              <Card
                key={template.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-200">
                      <FileText className="h-5 w-5 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">{template.name}</span>
                  </CardTitle>
                  <CardDescription className="group-hover:text-foreground transition-colors">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleUseTemplate(template)}
                    className="w-full group-hover:scale-105 transition-all duration-200"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <div className="grid gap-4">
            {reportsList
              .filter((r) => r.status === "scheduled")
              .map((report, index) => (
                <Card
                  key={report.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/20 group-hover:scale-110 transition-transform duration-200">
                          <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400 group-hover:animate-pulse" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">{report.name}</h3>
                          <p className="text-sm text-muted-foreground">Next run: {report.lastRun}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRunNow(report)}
                          className="hover:scale-105 transition-all duration-200"
                        >
                          Run Now
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditReport(report)}
                          className="hover:scale-105 transition-all duration-200"
                        >
                          Edit
                        </Button>
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
