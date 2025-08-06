"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Download, 
  RefreshCw, 
  Settings, 
  HelpCircle, 
  Zap,
  X,
  ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

const quickActions = [
  { 
    icon: Download, 
    label: "Export Data", 
    color: "bg-blue-500 hover:bg-blue-600", 
    action: "export" 
  },
  { 
    icon: RefreshCw, 
    label: "Refresh All", 
    color: "bg-emerald-500 hover:bg-emerald-600", 
    action: "refresh" 
  },
  { 
    icon: Settings, 
    label: "Quick Settings", 
    color: "bg-violet-500 hover:bg-violet-600", 
    action: "settings" 
  },
  { 
    icon: HelpCircle, 
    label: "Get Help", 
    color: "bg-amber-500 hover:bg-amber-600", 
    action: "help" 
  }
]

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { toast } = useToast()

  const handleToggle = () => {
    setIsAnimating(true)
    setIsOpen(!isOpen)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleAction = (action: string, label: string) => {
    toast({
      title: `${label} triggered`,
      description: `Quick action: ${label} has been initiated.`,
    })
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={cn(
        "flex flex-col space-y-3 mb-4 transition-all duration-300 ease-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <div
              key={action.action}
              className="flex items-center space-x-3 group"
              style={{ 
                animationDelay: isOpen ? `${index * 50}ms` : `${(quickActions.length - index) * 50}ms`,
                transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.3s ease-out'
              }}
            >
              <Badge 
                variant="secondary" 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-background/90 backdrop-blur-sm border shadow-lg"
              >
                {action.label}
              </Badge>
              <Button
                size="icon"
                className={cn(
                  "h-12 w-12 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl",
                  action.color
                )}
                onClick={() => handleAction(action.action, action.label)}
              >
                <Icon className="h-5 w-5 text-white" />
              </Button>
            </div>
          )
        })}
      </div>

      {/* Main toggle button */}
      <Button
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
          "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70",
          isOpen && "rotate-45",
          isAnimating && "animate-pulse"
        )}
        onClick={handleToggle}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground transition-transform duration-200" />
        ) : (
          <div className="relative">
            <Plus className="h-6 w-6 text-primary-foreground" />
            <div className="absolute -top-1 -right-1">
              <div className="h-3 w-3 bg-emerald-500 rounded-full animate-ping" />
              <div className="absolute top-0 right-0 h-3 w-3 bg-emerald-500 rounded-full" />
            </div>
          </div>
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}