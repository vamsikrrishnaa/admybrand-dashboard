"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
  Zap,
  Bell,
} from "lucide-react"
import { toast } from "sonner"

const navigation = [
  {
    name: "Overview",
    href: "/",
    icon: BarChart3,
    badge: null,
    description: "Dashboard overview and key metrics",
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: PieChart,
    badge: "New",
    description: "Advanced analytics and insights",
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Target,
    badge: "5",
    description: "Manage marketing campaigns",
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
    badge: null,
    description: "User management and analytics",
  },
  {
    name: "Revenue",
    href: "/revenue",
    icon: DollarSign,
    badge: null,
    description: "Revenue tracking and analysis",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    badge: "3",
    description: "Generate and manage reports",
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
    badge: null,
    description: "Schedule and manage events",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    badge: null,
    description: "Application settings",
  },
  {
    name: "Help",
    href: "/help",
    icon: HelpCircle,
    badge: null,
    description: "Help and support",
  },
]

export function EnhancedSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(3)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setNotifications((prev) => prev + 1)
        toast.success("New campaign performance update!", {
          description: "Your summer campaign is performing 15% above target",
          action: {
            label: "View",
            onClick: () => console.log("Navigate to campaigns"),
          },
        })
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (item: any) => {
    toast.info(`Navigating to ${item.name}`, {
      description: item.description,
      duration: 2000,
    })
  }

  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex flex-col bg-card border-r transition-all duration-300 ease-in-out relative overflow-hidden",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b relative z-10">
          {!collapsed && (
            <div className="flex items-center space-x-2 animate-in slide-in-from-left duration-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <TrendingUp className="h-4 w-4 text-primary-foreground animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  ADmyBRAND
                </span>
                <span className="text-xs text-muted-foreground">Insights</span>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setCollapsed(!collapsed)
              toast.success(collapsed ? "Sidebar expanded" : "Sidebar collapsed")
            }}
            className="h-8 w-8 hover:bg-primary/10 transition-all duration-200 hover:scale-110"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronLeft className="h-4 w-4 transition-transform duration-200" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4 relative z-10">
          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.name} delayDuration={collapsed ? 0 : 1000}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} onClick={() => handleNavClick(item)}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start transition-all duration-200 group relative overflow-hidden",
                          collapsed ? "px-2" : "px-3",
                          isActive && "bg-primary/10 text-primary font-medium shadow-sm",
                          !isActive && "hover:bg-primary/5 hover:text-primary",
                          "hover:scale-[1.02] hover:shadow-sm",
                        )}
                        size={collapsed ? "icon" : "sm"}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Animated background for active state */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent animate-pulse" />
                        )}

                        <div
                          className={cn(
                            "flex items-center space-x-2 relative z-10",
                            hoveredItem === item.name && "animate-pulse",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-4 w-4 transition-all duration-200",
                              isActive && "text-primary animate-pulse",
                              hoveredItem === item.name && "scale-110 rotate-3",
                            )}
                          />
                          {!collapsed && (
                            <>
                              <span className="transition-all duration-200">{item.name}</span>
                              {item.badge && (
                                <Badge
                                  variant={item.badge === "New" ? "default" : "secondary"}
                                  className={cn(
                                    "ml-auto text-xs animate-bounce",
                                    item.badge === "New" && "bg-green-500 text-white",
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </>
                          )}
                        </div>

                        {/* Hover effect */}
                        {hoveredItem === item.name && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse" />
                        )}
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={cn(!collapsed && "hidden")}>
                    <div className="space-y-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                      {item.badge && (
                        <Badge variant="outline" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Enhanced Footer */}
        {!collapsed && (
          <div className="border-t p-4 relative z-10 animate-in slide-in-from-bottom duration-300">
            {/* Notifications */}
            <div className="mb-3 p-2 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-medium">Notifications</span>
                <Badge variant="default" className="ml-auto animate-bounce">
                  {notifications}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">You have {notifications} new updates</p>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <span className="text-xs font-bold text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">John Doe</p>
                <div className="flex items-center space-x-1">
                  <p className="text-xs text-muted-foreground truncate">Admin</p>
                  <div className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 text-yellow-500 animate-pulse" />
                    <span className="text-xs text-yellow-600 font-medium">Pro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed state footer */}
        {collapsed && (
          <div className="border-t p-2 relative z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <span className="text-xs font-bold text-white">JD</span>
                  </div>
                  {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{notifications}</span>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <div className="space-y-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Admin • Pro Plan</p>
                  {notifications > 0 && <p className="text-xs text-primary">{notifications} new notifications</p>}
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
