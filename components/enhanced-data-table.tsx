"use client"

import { useState, useMemo, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, MoreHorizontal, ArrowUpDown, Eye, Edit, Trash2, Play, Pause, ChevronLeft, ChevronRight, Download, SlidersHorizontal, X, Calendar, DollarSign, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, isWithinInterval, parseISO } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Campaign, sharedCampaignData } from "@/lib/shared-campaign-data"

interface EnhancedDataTableProps {
  data?: Campaign[]
}

export function EnhancedDataTable({ data = sharedCampaignData }: EnhancedDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof Campaign>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [platformFilter, setPlatformFilter] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Modal states
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>(data)
  const { toast } = useToast()

  // Get unique values for filters
  const uniqueStatuses = [...new Set(data.map(item => item.status))]
  const uniqueCategories = [...new Set(data.map(item => item.category))]
  const uniquePlatforms = [...new Set(data.map(item => item.platform))]

  // Update active filters count
  useEffect(() => {
    let count = 0
    if (searchTerm) count++
    if (statusFilter.length > 0) count++
    if (categoryFilter.length > 0) count++
    if (platformFilter.length > 0) count++
    if (dateRange?.from) count++
    setActiveFiltersCount(count)
  }, [searchTerm, statusFilter, categoryFilter, platformFilter, dateRange])

  const filteredData = useMemo(() => {
    return data.filter((campaign) => {
      // Search filter
      const matchesSearch = !searchTerm || 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.platform.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(campaign.status)

      // Category filter
      const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(campaign.category)

      // Platform filter
      const matchesPlatform = platformFilter.length === 0 || platformFilter.includes(campaign.platform)

      // Date range filter
      const matchesDateRange = !dateRange?.from || !dateRange?.to || 
        isWithinInterval(parseISO(campaign.createdAt), { start: dateRange.from, end: dateRange.to })

      return matchesSearch && matchesStatus && matchesCategory && matchesPlatform && matchesDateRange
    })
  }, [data, searchTerm, statusFilter, categoryFilter, platformFilter, dateRange])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }, [filteredData, sortField, sortDirection])

  // Pagination logic
  const totalItems = sortedData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sortedData.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
  }

  const handleSort = (field: keyof Campaign) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setStatusFilter([])
    setCategoryFilter([])
    setPlatformFilter([])
    setDateRange(undefined)
    setCurrentPage(1)
  }

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    switch (filterType) {
      case "status":
        setStatusFilter(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
      case "category":
        setCategoryFilter(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
      case "platform":
        setPlatformFilter(prev => 
          checked ? [...prev, value] : prev.filter(item => item !== value)
        )
        break
    }
    setCurrentPage(1)
  }

  const getStatusBadge = (status: Campaign["status"]) => {
    const variants = {
      active: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400",
      paused: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400",
      completed: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400",
    }

    const icons = {
      active: <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse mr-1" />,
      paused: <Pause className="h-3 w-3 mr-1" />,
      completed: <div className="h-2 w-2 rounded-full bg-gray-500 mr-1" />,
    }

    return (
      <Badge variant="outline" className={cn("capitalize flex items-center", variants[status])}>
        {icons[status]}
        {status}
      </Badge>
    )
  }

  const handleAction = (action: string, campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (!campaign) return

    setSelectedCampaign(campaign)

    switch (action) {
      case "view":
        setViewDialogOpen(true)
        break
      case "edit":
        setEditDialogOpen(true)
        break
      case "delete":
        setDeleteDialogOpen(true)
        break
      case "pause":
        handleStatusChange(campaignId, "paused")
        break
      case "resume":
        handleStatusChange(campaignId, "active")
        break
    }
  }

  const handleStatusChange = (campaignId: string, newStatus: Campaign["status"]) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, status: newStatus }
          : campaign
      )
    )
    
    const actionText = newStatus === "paused" ? "paused" : "resumed"
    toast({
      title: `Campaign ${actionText}`,
      description: `The campaign has been successfully ${actionText}.`,
    })
  }

  const handleDeleteCampaign = () => {
    if (!selectedCampaign) return
    
    setCampaigns(prev => prev.filter(campaign => campaign.id !== selectedCampaign.id))
    setDeleteDialogOpen(false)
    setSelectedCampaign(null)
    
    toast({
      title: "Campaign deleted",
      description: "The campaign has been permanently deleted.",
      variant: "destructive"
    })
  }

  const handleEditCampaign = (updatedCampaign: Partial<Campaign>) => {
    if (!selectedCampaign) return
    
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === selectedCampaign.id 
          ? { ...campaign, ...updatedCampaign }
          : campaign
      )
    )
    
    setEditDialogOpen(false)
    setSelectedCampaign(null)
    
    toast({
      title: "Campaign updated",
      description: "The campaign has been successfully updated.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="text-lg font-semibold">Campaign Performance</CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <ExportDialog>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </ExportDialog>
          </div>
        </div>
        
        {/* Enhanced Filters */}
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns, categories, platforms..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Date Range Picker */}
            <DateRangePicker 
              onDateChange={setDateRange}
              className="w-full sm:w-[280px]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Advanced Filters */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="p-2">
                  <div className="text-sm font-medium mb-2">Status</div>
                  {uniqueStatuses.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={statusFilter.includes(status)}
                      onCheckedChange={(checked) => handleFilterChange("status", status, checked)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="text-sm font-medium mb-2">Category</div>
                  {uniqueCategories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={categoryFilter.includes(category)}
                      onCheckedChange={(checked) => handleFilterChange("category", category, checked)}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="text-sm font-medium mb-2">Platform</div>
                  {uniquePlatforms.map((platform) => (
                    <DropdownMenuCheckboxItem
                      key={platform}
                      checked={platformFilter.includes(platform)}
                      onCheckedChange={(checked) => handleFilterChange("platform", platform, checked)}
                    >
                      {platform}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                {activeFiltersCount > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={clearAllFilters}>
                      <X className="h-4 w-4 mr-2" />
                      Clear all filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Active Filter Tags */}
            {statusFilter.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                Status: {statusFilter.join(", ")}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setStatusFilter([])}
                />
              </Badge>
            )}
            {categoryFilter.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                Category: {categoryFilter.join(", ")}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setCategoryFilter([])}
                />
              </Badge>
            )}
            {platformFilter.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                Platform: {platformFilter.join(", ")}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => setPlatformFilter([])}
                />
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="h-auto p-0 font-medium hover:text-primary"
                  >
                    Campaign Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("budget")}
                    className="h-auto p-0 font-medium hover:text-primary"
                  >
                    Budget
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("impressions")}
                    className="h-auto p-0 font-medium hover:text-primary"
                  >
                    Impressions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("roas")}
                    className="h-auto p-0 font-medium hover:text-primary"
                  >
                    ROAS
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium max-w-[200px]">
                    <div className="truncate" title={campaign.name}>
                      {campaign.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created: {format(parseISO(campaign.createdAt), "MMM dd, yyyy")}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {campaign.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {campaign.platform}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">${campaign.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">
                    <div className="flex flex-col">
                      <span>${campaign.spent.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">
                        {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono">{campaign.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-mono">
                    <span
                      className={cn(
                        "font-medium",
                        campaign.ctr > 5 ? "text-emerald-600" : campaign.ctr > 3 ? "text-amber-600" : "text-red-600",
                      )}
                    >
                      {campaign.ctr.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    <span
                      className={cn(
                        "font-medium",
                        campaign.roas > 4 ? "text-emerald-600" : campaign.roas > 2 ? "text-amber-600" : "text-red-600",
                      )}
                    >
                      {campaign.roas.toFixed(1)}x
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAction("view", campaign.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction("edit", campaign.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Campaign
                        </DropdownMenuItem>
                        {campaign.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleAction("pause", campaign.id)}>
                            <Pause className="h-4 w-4 mr-2" />
                            Pause Campaign
                          </DropdownMenuItem>
                        ) : campaign.status === "paused" ? (
                          <DropdownMenuItem onClick={() => handleAction("resume", campaign.id)}>
                            <Play className="h-4 w-4 mr-2" />
                            Resume Campaign
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem
                          onClick={() => handleAction("delete", campaign.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Campaign
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {sortedData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="text-lg font-medium mb-2">No campaigns found</div>
            <div className="text-sm">Try adjusting your search or filter criteria</div>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" className="mt-3" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            )}
          </div>
        )}
        
        {/* Pagination */}
        {totalItems > 0 && (
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-4 border-t">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Show</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                of {totalItems} results
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className="h-8 w-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* View Campaign Details Modal */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Campaign Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about {selectedCampaign?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              {/* Campaign Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Campaign Name</Label>
                  <p className="font-medium">{selectedCampaign.name}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <div>{getStatusBadge(selectedCampaign.status)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                  <Badge variant="outline">{selectedCampaign.category}</Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Platform</Label>
                  <Badge variant="outline">{selectedCampaign.platform}</Badge>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium">Budget</span>
                    </div>
                    <p className="text-lg font-bold">${selectedCampaign.budget.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-red-600" />
                      <span className="text-sm font-medium">Spent</span>
                    </div>
                    <p className="text-lg font-bold">${selectedCampaign.spent.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {((selectedCampaign.spent / selectedCampaign.budget) * 100).toFixed(1)}% of budget
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Impressions</span>
                    </div>
                    <p className="text-lg font-bold">{selectedCampaign.impressions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Clicks</span>
                    </div>
                    <p className="text-lg font-bold">{selectedCampaign.clicks.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="space-y-3">
                <h4 className="font-medium">Key Performance Indicators</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-emerald-600">{selectedCampaign.ctr.toFixed(2)}%</p>
                    <p className="text-sm text-muted-foreground">Click-through Rate</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-blue-600">${selectedCampaign.cpc.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">Cost per Click</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-purple-600">{selectedCampaign.roas.toFixed(1)}x</p>
                    <p className="text-sm text-muted-foreground">Return on Ad Spend</p>
                  </div>
                </div>
              </div>

              {/* Campaign Timeline */}
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Campaign Timeline
                </h4>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm">
                    <span className="font-medium">Created:</span> {format(parseISO(selectedCampaign.createdAt), "MMMM dd, yyyy")}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Duration:</span> {Math.floor((new Date().getTime() - parseISO(selectedCampaign.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days active
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Modal */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Campaign
            </DialogTitle>
            <DialogDescription>
              Make changes to {selectedCampaign?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  defaultValue={selectedCampaign.name}
                  onChange={(e) => {
                    if (selectedCampaign) {
                      setSelectedCampaign({ ...selectedCampaign, name: e.target.value })
                    }
                  }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    defaultValue={selectedCampaign.budget}
                    onChange={(e) => {
                      if (selectedCampaign) {
                        setSelectedCampaign({ ...selectedCampaign, budget: Number(e.target.value) })
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={selectedCampaign.status}
                    onValueChange={(value: Campaign["status"]) => {
                      if (selectedCampaign) {
                        setSelectedCampaign({ ...selectedCampaign, status: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    defaultValue={selectedCampaign.category}
                    onValueChange={(value) => {
                      if (selectedCampaign) {
                        setSelectedCampaign({ ...selectedCampaign, category: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Seasonal">Seasonal</SelectItem>
                      <SelectItem value="Brand">Brand</SelectItem>
                      <SelectItem value="Product Launch">Product Launch</SelectItem>
                      <SelectItem value="Retargeting">Retargeting</SelectItem>
                      <SelectItem value="Influencer">Influencer</SelectItem>
                      <SelectItem value="App Install">App Install</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select
                    defaultValue={selectedCampaign.platform}
                    onValueChange={(value) => {
                      if (selectedCampaign) {
                        setSelectedCampaign({ ...selectedCampaign, platform: value })
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google Ads">Google Ads</SelectItem>
                      <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                      <SelectItem value="Instagram Ads">Instagram Ads</SelectItem>
                      <SelectItem value="Microsoft Ads">Microsoft Ads</SelectItem>
                      <SelectItem value="TikTok Ads">TikTok Ads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleEditCampaign(selectedCampaign)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Campaign Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete Campaign
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedCampaign?.name}"? This action cannot be undone and will permanently remove all campaign data and performance history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCampaign}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Delete Campaign
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}