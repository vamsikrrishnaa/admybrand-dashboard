"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, FileSpreadsheet, Calendar, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { exportToCSV, exportToPDF, exportToExcel, generateFilename } from "@/lib/export-utils"
import { mockMetrics } from "@/lib/mock-data"
import { sharedCampaignData } from "@/lib/shared-campaign-data"
import { format, subDays } from "date-fns"

interface ExportDialogProps {
  children: React.ReactNode
}

export function ExportDialog({ children }: ExportDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<"pdf" | "csv" | "excel">("pdf")
  const [dateRange, setDateRange] = useState("last-30-days")
  const [isExporting, setIsExporting] = useState(false)
  const [exportComplete, setExportComplete] = useState(false)
  const { toast } = useToast()

  const [selectedData, setSelectedData] = useState({
    metrics: true,
    charts: true,
    campaigns: true,
    users: false,
    revenue: true
  })

  const getDateRangeFromSelection = () => {
    const now = new Date()
    switch (dateRange) {
      case "last-7-days":
        return { from: subDays(now, 7), to: now }
      case "last-30-days":
        return { from: subDays(now, 30), to: now }
      case "last-90-days":
        return { from: subDays(now, 90), to: now }
      case "last-year":
        return { from: subDays(now, 365), to: now }
      default:
        return { from: subDays(now, 30), to: now }
    }
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const dateRangeData = getDateRangeFromSelection()

      // Prepare export data based on selections
      const exportData = {
        metrics: selectedData.metrics ? mockMetrics : undefined,
        campaigns: selectedData.campaigns ? sharedCampaignData : undefined,
        users: selectedData.users ? [] : undefined, // Add user data when available
        revenue: selectedData.revenue ? [] : undefined, // Add revenue data when available
        charts: selectedData.charts ? {} : undefined, // Add chart data when available
      }

      const exportOptions = {
        format: exportFormat,
        dateRange: dateRangeData,
        selectedData
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Perform actual export
      switch (exportFormat) {
        case "csv":
          if (selectedData.campaigns && exportData.campaigns) {
            const filename = generateFilename("csv", "campaigns")
            exportToCSV(exportData.campaigns, filename)
          }
          break
        case "pdf":
          await exportToPDF(exportData, exportOptions)
          break
        case "excel":
          exportToExcel(exportData, exportOptions)
          break
      }

      setIsExporting(false)
      setExportComplete(true)

      toast({
        title: "Export completed!",
        description: `Your ${exportFormat.toUpperCase()} report has been generated and downloaded.`,
      })

      // Reset after showing success
      setTimeout(() => {
        setExportComplete(false)
        setIsOpen(false)
      }, 2000)
    } catch (error) {
      setIsExporting(false)
      toast({
        title: "Export failed",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive"
      })
    }
  }

  const formatOptions = [
    { value: "pdf", label: "PDF Report", icon: FileText, description: "Formatted report with charts" },
    { value: "csv", label: "CSV Data", icon: FileSpreadsheet, description: "Raw data for analysis" },
    { value: "excel", label: "Excel Workbook", icon: FileSpreadsheet, description: "Multiple sheets with data" }
  ]

  const dateRangeOptions = [
    { value: "last-7-days", label: "Last 7 days" },
    { value: "last-30-days", label: "Last 30 days" },
    { value: "last-90-days", label: "Last 90 days" },
    { value: "last-year", label: "Last year" },
    { value: "custom", label: "Custom range" }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Dashboard Data
          </DialogTitle>
          {React.createElement(DialogDescription, {},
            'Choose your export format and select the data you want to include in your report.'
          )}
        </DialogHeader>

        {!exportComplete ? (
          <div className="space-y-6">
            {/* Format Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Export Format</label>
              <div className="grid gap-3">
                {formatOptions.map((format) => {
                  const Icon = format.icon
                  return (
                    <div
                      key={format.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${exportFormat === format.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                        }`}
                      onClick={() => setExportFormat(format.value as any)}
                    >
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">{format.label}</div>
                        <div className="text-sm text-muted-foreground">{format.description}</div>
                      </div>
                      <div className={`h-4 w-4 rounded-full border-2 ${exportFormat === format.value
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                        }`}>
                        {exportFormat === format.value && (
                          <div className="h-full w-full rounded-full bg-white scale-50" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Data Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Include Data</label>
              <div className="space-y-3">
                {Object.entries(selectedData).map(([key, checked]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <Checkbox
                      id={key}
                      checked={checked}
                      onCheckedChange={(checked) =>
                        setSelectedData(prev => ({ ...prev, [key]: !!checked }))
                      }
                    />
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {key === "campaigns" ? "Campaign Data" : key}
                    </label>
                    {key === "charts" && exportFormat === "csv" && (
                      <Badge variant="outline" className="text-xs">
                        Data only
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export {exportFormat.toUpperCase()}
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Export Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Your {exportFormat.toUpperCase()} report has been generated and will download shortly.
            </p>
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ready for download
            </Badge>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}