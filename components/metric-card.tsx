"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MoreHorizontal, Eye, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MetricCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
  description: string
  color?: "emerald" | "blue" | "amber" | "violet" | "rose"
}

export function MetricCard({ title, value, change, icon: Icon, description, color = "blue" }: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)
  const [showDetails, setShowDetails] = useState(false)
  
  const isPositive = change > 0
  const isNeutral = change === 0
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''))

  // Animate value on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = numericValue / 30
      let current = 0
      const interval = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setAnimatedValue(numericValue)
          clearInterval(interval)
        } else {
          setAnimatedValue(current)
        }
      }, 50)
      return () => clearInterval(interval)
    }, 200)
    
    return () => clearTimeout(timer)
  }, [numericValue])

  const colorClasses = {
    emerald:
      "border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900 hover:from-emerald-100/50 hover:border-emerald-300/50",
    blue: "border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900 hover:from-blue-100/50 hover:border-blue-300/50",
    amber: "border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900 hover:from-amber-100/50 hover:border-amber-300/50",
    violet:
      "border-violet-200/50 bg-gradient-to-br from-violet-50/50 to-white dark:from-violet-950/20 dark:to-gray-900 hover:from-violet-100/50 hover:border-violet-300/50",
    rose: "border-rose-200/50 bg-gradient-to-br from-rose-50/50 to-white dark:from-rose-950/20 dark:to-gray-900 hover:from-rose-100/50 hover:border-rose-300/50",
  }

  const iconColorClasses = {
    emerald: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    amber: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    violet: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-900/30",
    rose: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30",
  }

  const formatAnimatedValue = (val: number) => {
    if (value.includes('$')) return `$${Math.round(val).toLocaleString()}`
    if (value.includes('%')) return `${val.toFixed(1)}%`
    return Math.round(val).toLocaleString()
  }

  return (
    <Card
      className={cn(
        "group interactive-card metric-card-hover border cursor-pointer",
        colorClasses[color]
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <div className={cn(
            "p-2 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12", 
            iconColorClasses[color]
          )}>
            <Icon className="h-4 w-4" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-6 w-6 opacity-0 group-hover:opacity-100 transition-all duration-200",
                  isHovered && "opacity-100"
                )}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2 group-hover:text-3xl transition-all duration-300">
          {formatAnimatedValue(animatedValue)}
        </div>
        <div className="flex items-center space-x-2 text-xs">
          {!isNeutral && (
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-emerald-500 group-hover:animate-bounce" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 group-hover:animate-bounce" />
              )}
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-medium transition-all duration-300 group-hover:scale-105",
                  isPositive
                    ? "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20"
                    : "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20",
                )}
              >
                {isPositive ? "+" : ""}
                {change.toFixed(1)}%
              </Badge>
            </div>
          )}
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {description}
          </span>
        </div>
        
        {/* Progress bar that appears on hover */}
        <div className={cn(
          "mt-3 h-1 bg-muted rounded-full overflow-hidden transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              `bg-${color}-500`
            )}
            style={{ 
              width: isHovered ? `${Math.min(100, Math.abs(change) * 2)}%` : '0%' 
            }}
          />
        </div>
        
        {/* Additional details that show on click */}
        {showDetails && (
          <div className="mt-3 p-2 bg-muted/50 rounded-lg text-xs animate-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between">
              <span>Last updated:</span>
              <span className="font-medium">2 minutes ago</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Data source:</span>
              <span className="font-medium">Real-time API</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
