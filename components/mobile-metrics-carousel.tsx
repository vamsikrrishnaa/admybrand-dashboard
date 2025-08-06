"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricData {
  title: string
  value: string
  change: number
  icon: LucideIcon
  description: string
  color?: "emerald" | "blue" | "amber" | "violet" | "rose"
}

interface MobileMetricsCarouselProps {
  metrics: MetricData[]
}

export function MobileMetricsCarousel({ metrics }: MobileMetricsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % metrics.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [metrics.length, isAutoPlaying])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % metrics.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + metrics.length) % metrics.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentMetric = metrics[currentIndex]
  const Icon = currentMetric.icon
  const isPositive = currentMetric.change > 0

  const colorClasses = {
    emerald: "border-emerald-200/50 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-900",
    blue: "border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-900",
    amber: "border-amber-200/50 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-950/20 dark:to-gray-900",
    violet: "border-violet-200/50 bg-gradient-to-br from-violet-50/50 to-white dark:from-violet-950/20 dark:to-gray-900",
    rose: "border-rose-200/50 bg-gradient-to-br from-rose-50/50 to-white dark:from-rose-950/20 dark:to-gray-900",
  }

  const iconColorClasses = {
    emerald: "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30",
    blue: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
    amber: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
    violet: "text-violet-600 bg-violet-100 dark:text-violet-400 dark:bg-violet-900/30",
    rose: "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30",
  }

  return (
    <div className="relative">
      <Card className={cn("transition-all duration-500", colorClasses[currentMetric.color || "blue"])}>
        {/* Navigation Buttons */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-12">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {currentMetric.title}
          </CardTitle>
          <div className={cn(
            "p-2 rounded-lg transition-all duration-300", 
            iconColorClasses[currentMetric.color || "blue"]
          )}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>

        <CardContent className="px-12">
          <div className="text-3xl font-bold mb-2 text-center">
            {currentMetric.value}
          </div>
          <div className="flex items-center justify-center space-x-2 text-xs mb-4">
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-medium",
                  isPositive
                    ? "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20"
                    : "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20",
                )}
              >
                {isPositive ? "+" : ""}
                {currentMetric.change.toFixed(1)}%
              </Badge>
            </div>
            <span className="text-muted-foreground">
              {currentMetric.description}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {metrics.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
          style={{ 
            width: isAutoPlaying ? `${((currentIndex + 1) / metrics.length) * 100}%` : '100%',
            animation: isAutoPlaying ? 'none' : undefined
          }}
        />
      </div>
    </div>
  )
}