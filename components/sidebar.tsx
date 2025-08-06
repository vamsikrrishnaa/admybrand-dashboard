"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Users,
  DollarSign,
  Settings,
  HelpCircle,
  PieChart,
  TrendingUp,
  Target,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  LogOut,
  UserCircle,
} from "lucide-react"

const navigation = [
  { 
    name: "Overview", 
    href: "/", 
    icon: BarChart3,
    badge: null,
    description: "Dashboard overview and key metrics"
  },
  { 
    name: "Analytics", 
    href: "/analytics", 
    icon: PieChart,
    badge: null,
    description: "Deep dive analytics and insights"
  },
  { 
    name: "Campaigns", 
    href: "/campaigns", 
    icon: Target,
    badge: "5",
    description: "Manage your marketing campaigns"
  },
  { 
    name: "Users", 
    href: "/users", 
    icon: Users,
    badge: null,
    description: "User management and analytics"
  },
  { 
    name: "Revenue", 
    href: "/revenue", 
    icon: DollarSign,
    badge: null,
    description: "Revenue tracking and analysis"
  },
  { 
    name: "Reports", 
    href: "/reports", 
    icon: FileText,
    badge: "2",
    description: "Generate and manage reports"
  },
  { 
    name: "Calendar", 
    href: "/calendar", 
    icon: Calendar,
    badge: null,
    description: "Schedule and manage events"
  },
  { 
    name: "Settings", 
    href: "/settings", 
    icon: Settings,
    badge: null,
    description: "Account and system settings"
  },
  { 
    name: "Help", 
    href: "/help", 
    icon: HelpCircle,
    badge: null,
    description: "Help center and support"
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const NavigationItem = ({ item }: { item: typeof navigation[0] }) => {
    const isActive = pathname === item.href
    
    const buttonContent = (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start transition-all duration-200 group relative overflow-hidden",
          collapsed ? "px-2" : "px-3",
          isActive && "bg-secondary/80 font-medium shadow-sm",
          !isActive && "hover:bg-accent/50 hover:translate-x-1",
        )}
        size={collapsed ? "icon" : "sm"}
        onMouseEnter={() => setHoveredItem(item.name)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <item.icon className={cn(
          "h-4 w-4 transition-all duration-200", 
          !collapsed && "mr-2",
          isActive && "text-primary",
          hoveredItem === item.name && "scale-110"
        )} />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.name}</span>
            {item.badge && (
              <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                {item.badge}
              </Badge>
            )}
          </>
        )}
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r-full" />
        )}
      </Button>
    )

    if (collapsed) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Link href={item.href}>
                {buttonContent}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center space-x-2">
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <Link href={item.href}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-card border-r transition-all duration-300 ease-in-out relative",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2 transition-all duration-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
              <TrendingUp className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                ADmyBRAND
              </span>
              <span className="text-xs text-muted-foreground">Insights</span>
            </div>
          </div>
        )}
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setCollapsed(!collapsed)} 
                className="h-8 w-8 hover:bg-accent transition-all duration-200 hover:scale-105"
              >
                {collapsed ? 
                  <ChevronRight className="h-4 w-4" /> : 
                  <ChevronLeft className="h-4 w-4" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent side={collapsed ? "right" : "bottom"}>
              {collapsed ? "Expand sidebar" : "Collapse sidebar"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavigationItem key={item.name} item={item} />
          ))}
        </nav>
      </ScrollArea>


    </div>
  )
}
