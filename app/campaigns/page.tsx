"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Filter, BarChart3, RefreshCw, Download, DollarSign, Target, MousePointer, TrendingUp } from "lucide-react"
import { MetricCard } from "@/components/metric-card"
import { CampaignCard } from "@/components/campaign-card"
import { CampaignChart } from "@/components/campaign-chart"
import { DateRangePicker } from "@/components/date-range-picker"
import { ExportDialog } from "@/components/export-dialog"
import { sharedCampaignData } from "@/lib/shared-campaign-data"
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton"
import { useToast } from "@/components/ui/use-toast"

// Define the local campaign interface for this page
interface LocalCampaign {
  id: string
  name: string
  status: "active" | "paused" | "completed"
  type: string
  budget: number
  spent: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  startDate: string
  endDate: string
  description: string
}

// Convert shared campaign data to the format expected by this page
const campaigns: LocalCampaign[] = sharedCampaignData.map(campaign => ({
  id: campaign.id,
  name: campaign.name,
  status: campaign.status, // This is already the correct type
  type: campaign.platform, // Use platform as type
  budget: campaign.budget,
  spent: campaign.spent,
  impressions: campaign.impressions,
  clicks: campaign.clicks,
  conversions: campaign.conversions,
  ctr: campaign.ctr,
  cpc: campaign.cpc,
  startDate: campaign.createdAt,
  endDate: "2024-12-31", // Default end date
  description: `${campaign.category} campaign on ${campaign.platform}`,
}))

export default function CampaignsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [campaignsList, setCampaignsList] = useState(campaigns)
  const [editingCampaign, setEditingCampaign] = useState<LocalCampaign | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "",
    budget: "",
    duration: "",
    description: ""
  })
  const { toast } = useToast()

  const filteredCampaigns = campaignsList.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalBudget = campaignsList.reduce((sum, campaign) => sum + campaign.budget, 0)
  const totalSpent = campaignsList.reduce((sum, campaign) => sum + campaign.spent, 0)
  const totalConversions = campaignsList.reduce((sum, campaign) => sum + campaign.conversions, 0)
  const avgCTR = campaignsList.reduce((sum, campaign) => sum + campaign.ctr, 0) / campaignsList.length

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Campaigns refreshed",
      description: "Your campaign data has been updated with the latest information.",
    })
  }

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.type || !newCampaign.budget) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields to create a campaign.",
        variant: "destructive",
      })
      return
    }

    const campaign: LocalCampaign = {
      id: `campaign-${Date.now()}`,
      name: newCampaign.name,
      status: "active" as const,
      type: newCampaign.type,
      budget: parseInt(newCampaign.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
      startDate: new Date().toISOString(),
      endDate: "2024-12-31",
      description: newCampaign.description || `${newCampaign.type} campaign`,
    }

    setCampaignsList(prev => [campaign, ...prev])
    setNewCampaign({ name: "", type: "", budget: "", duration: "", description: "" })
    setIsCreateDialogOpen(false)

    toast({
      title: "Campaign created successfully",
      description: `${campaign.name} has been created and is now active.`,
    })
  }

  const handleEditCampaign = (campaign: LocalCampaign) => {
    setEditingCampaign(campaign)
    setIsEditDialogOpen(true)
  }

  const handleUpdateCampaign = () => {
    if (!editingCampaign) return

    setCampaignsList(prev =>
      prev.map(campaign =>
        campaign.id === editingCampaign.id
          ? editingCampaign
          : campaign
      )
    )

    setIsEditDialogOpen(false)
    setEditingCampaign(null)

    toast({
      title: "Campaign updated successfully",
      description: `${editingCampaign.name} has been updated.`,
    })
  }

  const handleStatusChange = (campaignId: string, newStatus: "active" | "paused" | "completed") => {
    setCampaignsList(prev =>
      prev.map(campaign =>
        campaign.id === campaignId
          ? { ...campaign, status: newStatus }
          : campaign
      )
    )

    toast({
      title: "Campaign status updated",
      description: `Campaign status changed to ${newStatus}.`,
    })
  }

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaignsList(prev => prev.filter(campaign => campaign.id !== campaignId))
  }

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <EnhancedLoadingSkeleton />
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header - Same as home page */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">Create, manage, and optimize your marketing campaigns</p>
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
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="group relative overflow-hidden hover:scale-105 transition-all duration-200 hover:shadow-md">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
                <span className="relative z-10">Create Campaign</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>Set up a new marketing campaign with your desired parameters.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter campaign name"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Search">Search</SelectItem>
                        <SelectItem value="Display">Display</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="5000"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, budget: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={newCampaign.duration} onValueChange={(value) => setNewCampaign(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1week">1 Week</SelectItem>
                        <SelectItem value="2weeks">2 Weeks</SelectItem>
                        <SelectItem value="1month">1 Month</SelectItem>
                        <SelectItem value="3months">3 Months</SelectItem>
                        <SelectItem value="6months">6 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign objectives..."
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Campaign Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit Campaign</DialogTitle>
                <DialogDescription>Update your campaign settings and parameters.</DialogDescription>
              </DialogHeader>
              {editingCampaign && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Campaign Name</Label>
                      <Input
                        id="edit-name"
                        placeholder="Enter campaign name"
                        value={editingCampaign.name}
                        onChange={(e) => setEditingCampaign(prev => prev ? { ...prev, name: e.target.value } : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-type">Campaign Type</Label>
                      <Select
                        value={editingCampaign.type}
                        onValueChange={(value) => setEditingCampaign(prev => prev ? { ...prev, type: value } : null)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Search">Search</SelectItem>
                          <SelectItem value="Display">Display</SelectItem>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Video">Video</SelectItem>
                          <SelectItem value="Email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-budget">Budget ($)</Label>
                      <Input
                        id="edit-budget"
                        type="number"
                        placeholder="5000"
                        value={editingCampaign.budget.toString()}
                        onChange={(e) => setEditingCampaign(prev => prev ? { ...prev, budget: parseInt(e.target.value) || 0 } : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <Select
                        value={editingCampaign.status}
                        onValueChange={(value: "active" | "paused" | "completed") =>
                          setEditingCampaign(prev => prev ? { ...prev, status: value } : null)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      placeholder="Describe your campaign objectives..."
                      value={editingCampaign.description}
                      onChange={(e) => setEditingCampaign(prev => prev ? { ...prev, description: e.target.value } : null)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Campaign Performance</Label>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>Spent: ${editingCampaign.spent.toLocaleString()}</div>
                        <div>Impressions: {editingCampaign.impressions.toLocaleString()}</div>
                        <div>Clicks: {editingCampaign.clicks.toLocaleString()}</div>
                        <div>Conversions: {editingCampaign.conversions.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Key Metrics</Label>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>CTR: {editingCampaign.ctr.toFixed(2)}%</div>
                        <div>CPC: ${editingCampaign.cpc.toFixed(2)}</div>
                        <div>Budget Used: {((editingCampaign.spent / editingCampaign.budget) * 100).toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {
                  setIsEditDialogOpen(false)
                  setEditingCampaign(null)
                }}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateCampaign}>Update Campaign</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metrics Cards - Same as home page */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Budget"
          value={`$${totalBudget.toLocaleString()}`}
          change={12.5}
          icon={DollarSign}
          description="vs last month"
          color="emerald"
        />
        <MetricCard
          title="Total Spent"
          value={`$${totalSpent.toLocaleString()}`}
          change={8.3}
          icon={BarChart3}
          description={`${((totalSpent / totalBudget) * 100).toFixed(1)}% of budget`}
          color="blue"
        />
        <MetricCard
          title="Total Conversions"
          value={totalConversions.toLocaleString()}
          change={15.7}
          icon={Target}
          description="vs last month"
          color="violet"
        />
        <MetricCard
          title="Average CTR"
          value={`${avgCTR.toFixed(2)}%`}
          change={-2.1}
          icon={MousePointer}
          description="vs last month"
          color="amber"
        />
      </div>

      {/* Campaigns Section - Same tab style as home page */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 rounded-xl">
          {[
            { value: "overview", label: "Overview", icon: "📊" },
            { value: "performance", label: "Performance", icon: "📈" },
            { value: "analytics", label: "Analytics", icon: "🎯" }
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
          {/* Filters */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
              <Input
                placeholder="Search campaigns..."
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
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCampaigns.map((campaign, index) => (
              <div
                key={campaign.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-in fade-in-50 duration-500"
              >
                <CampaignCard
                  campaign={campaign}
                  onEdit={handleEditCampaign}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteCampaign}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Campaign Performance Comparison</CardTitle>
              <CardDescription>Compare key metrics across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <CampaignChart campaigns={filteredCampaigns.map(c => ({ ...c, spend: c.spent }))} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Budget Utilization</CardTitle>
                <CardDescription>How much of your budget has been spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCampaigns.map((campaign, index) => (
                    <div
                      key={campaign.id}
                      className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium group-hover/item:text-primary transition-colors">{campaign.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(campaign.spent / campaign.budget) * 100}
                        className="h-2 group-hover/item:h-3 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Campaign Types Distribution</CardTitle>
                <CardDescription>Breakdown of campaigns by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Social Media", "Display", "Search", "Video"].map((type, index) => {
                    const count = campaigns.filter((c) => c.type === type).length
                    const percentage = (count / campaigns.length) * 100
                    return (
                      <div
                        key={type}
                        className="group/item space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`h-3 w-3 rounded-full group-hover/item:scale-125 transition-transform duration-200 ${type === 'Social Media' ? 'bg-blue-500' :
                              type === 'Display' ? 'bg-emerald-500' :
                                type === 'Search' ? 'bg-amber-500' :
                                  'bg-violet-500'
                              }`} />
                            <span className="font-medium group-hover/item:text-primary transition-colors">{type}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {count} campaigns ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <Progress
                          value={percentage}
                          className="h-2 group-hover/item:h-3 transition-all duration-300"
                        />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}