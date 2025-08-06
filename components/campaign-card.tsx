"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface Campaign {
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

interface CampaignCardProps {
  campaign: Campaign
  onEdit?: (campaign: Campaign) => void
  onStatusChange?: (campaignId: string, newStatus: "active" | "paused" | "completed") => void
  onDelete?: (campaignId: string) => void
}

export function CampaignCard({ campaign, onEdit, onStatusChange, onDelete }: CampaignCardProps) {
  const { toast } = useToast()
  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      completed: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const budgetUsed = (campaign.spent / campaign.budget) * 100

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0 pr-2">
            <CardTitle className="text-lg line-clamp-2 leading-tight">
              {campaign.name}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              {campaign.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => {
                  onEdit?.(campaign)
                  toast({
                    title: "Edit Campaign",
                    description: `Opening editor for ${campaign.name}`,
                  })
                }}
                className="cursor-pointer"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  const newStatus = campaign.status === "active" ? "paused" : "active"
                  onStatusChange?.(campaign.id, newStatus)
                  toast({
                    title: `Campaign ${newStatus === "active" ? "Resumed" : "Paused"}`,
                    description: `${campaign.name} has been ${newStatus === "active" ? "resumed" : "paused"} successfully.`,
                  })
                }}
                className="cursor-pointer"
              >
                {campaign.status === "active" ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Campaign
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Campaign
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => {
                  onDelete?.(campaign.id)
                  toast({
                    title: "Campaign Deleted",
                    description: `${campaign.name} has been deleted successfully.`,
                    variant: "destructive",
                  })
                }}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          {getStatusBadge(campaign.status)}
          <Badge variant="outline">{campaign.type}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Budget Used</span>
            <span className="font-mono text-xs">
              ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </span>
          </div>
          <Progress value={budgetUsed} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm flex-1">
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Impressions</p>
            <p className="font-medium font-mono">{campaign.impressions.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">Clicks</p>
            <p className="font-medium font-mono">{campaign.clicks.toLocaleString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">CTR</p>
            <p className="font-medium font-mono">{campaign.ctr.toFixed(2)}%</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">CPC</p>
            <p className="font-medium font-mono">${campaign.cpc.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="pt-2 border-t mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Conversions</span>
            <span className="font-medium text-green-600 font-mono">{campaign.conversions.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
