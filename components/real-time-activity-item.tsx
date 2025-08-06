"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { type LucideIcon } from "lucide-react"

interface RealTimeActivityItemProps {
  icon: LucideIcon
  title: string
  subtitle: string
  initialValue: number
  change: string
  color: string
  index: number
}

export function RealTimeActivityItem({
  icon: Icon,
  title,
  subtitle,
  initialValue,
  change,
  color,
  index
}: RealTimeActivityItemProps) {
  const [currentValue, setCurrentValue] = useState(initialValue)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 10) - 5
      setCurrentValue(prev => Math.max(0, prev + variation))
    }, 3000 + index * 1000)
    
    return () => clearInterval(interval)
  }, [index])

  return (
    <div 
      className="group/item flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/30 group-hover/item:scale-110 transition-transform duration-200`}>
          <Icon className={`h-4 w-4 text-${color}-600 group-hover/item:animate-bounce`} />
        </div>
        <div>
          <p className="font-medium group-hover/item:text-primary transition-colors">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-2xl font-bold text-${color}-600 group-hover/item:text-3xl transition-all duration-300`}>
          {currentValue.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground group-hover/item:font-medium transition-all">
          {change}
        </p>
        <div className={`h-1 w-16 bg-${color}-200 rounded-full mt-1 overflow-hidden opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`}>
          <div 
            className={`h-full bg-${color}-500 rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(100, (currentValue / (index === 0 ? 2000 : index === 1 ? 5000 : 200)) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}