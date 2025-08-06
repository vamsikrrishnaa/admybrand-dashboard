"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ThemeToggle } from "@/components/theme-toggle"
import { InteractiveNotificationCenter } from "@/components/interactive-notification-center"
import { Bell, Search, User, Settings, LogOut, CreditCard, UserCircle, TrendingUp, Target, BarChart3, Calendar, FileText, Users, X, Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Comprehensive mock search data
const searchData = [
  // Campaigns
  { title: "Summer Sale Campaign", type: "campaign", href: "/campaigns", description: "Q3 promotional campaign", status: "Active", performance: "+23%" },
  { title: "Holiday Marketing Blitz", type: "campaign", href: "/campaigns", description: "End-of-year campaign", status: "Active", performance: "+18%" },
  { title: "Black Friday Deals", type: "campaign", href: "/campaigns", description: "November sales campaign", status: "Completed", performance: "+45%" },
  { title: "Spring Launch Campaign", type: "campaign", href: "/campaigns", description: "Product launch campaign", status: "Paused", performance: "+12%" },
  { title: "Back to School Promo", type: "campaign", href: "/campaigns", description: "August education campaign", status: "Completed", performance: "+31%" },
  
  // Analytics & Reports
  { title: "Revenue Analytics", type: "page", href: "/revenue", description: "Revenue tracking dashboard", status: "Updated", performance: "Real-time" },
  { title: "User Growth Report", type: "report", href: "/reports", description: "Monthly user acquisition", status: "Ready", performance: "+15.3%" },
  { title: "Conversion Funnel Analysis", type: "report", href: "/analytics", description: "Conversion rate optimization", status: "Ready", performance: "4.2%" },
  { title: "Monthly Performance Report", type: "report", href: "/reports", description: "Overall performance metrics", status: "Ready", performance: "+8.7%" },
  { title: "Traffic Sources Analysis", type: "report", href: "/analytics", description: "Channel performance breakdown", status: "Ready", performance: "Mixed" },
  { title: "ROI Dashboard", type: "metric", href: "/analytics", description: "Return on investment tracking", status: "Live", performance: "3.4x" },
  
  // Users & Teams
  { title: "Team Management", type: "users", href: "/users", description: "User roles and permissions", status: "Active", performance: "12 users" },
  { title: "User Segmentation", type: "users", href: "/users", description: "Customer segment analysis", status: "Updated", performance: "8 segments" },
  { title: "Customer Journey Map", type: "users", href: "/users", description: "User experience tracking", status: "Active", performance: "5 stages" },
  
  // Settings & Configuration
  { title: "Campaign Settings", type: "settings", href: "/settings", description: "Campaign configuration", status: "Active", performance: "Updated" },
  { title: "Notification Preferences", type: "settings", href: "/settings", description: "Alert and notification setup", status: "Active", performance: "Configured" },
  { title: "API Configuration", type: "settings", href: "/settings", description: "Integration settings", status: "Active", performance: "Connected" },
  { title: "Billing Settings", type: "settings", href: "/settings", description: "Payment and subscription", status: "Active", performance: "Current" },
  
  // Metrics & KPIs
  { title: "Click-Through Rate", type: "metric", href: "/analytics", description: "CTR performance tracking", status: "Live", performance: "3.2%" },
  { title: "Cost Per Acquisition", type: "metric", href: "/analytics", description: "CPA optimization metrics", status: "Live", performance: "$24.50" },
  { title: "Customer Lifetime Value", type: "metric", href: "/analytics", description: "CLV analysis", status: "Live", performance: "$450" },
  { title: "Bounce Rate Analysis", type: "metric", href: "/analytics", description: "Website engagement metrics", status: "Live", performance: "32%" },
  
  // Pages & Views
  { title: "Dashboard Overview", type: "page", href: "/", description: "Main analytics dashboard", status: "Active", performance: "Real-time" },
  { title: "Campaign Manager", type: "page", href: "/campaigns", description: "Campaign management interface", status: "Active", performance: "5 active" },
  { title: "Revenue Tracking", type: "page", href: "/revenue", description: "Financial performance dashboard", status: "Active", performance: "$45.2K" },
  { title: "User Analytics", type: "page", href: "/users", description: "User behavior analysis", status: "Active", performance: "12.3K users" }
]

const notifications = [
  {
    id: 1,
    title: "Campaign Performance Alert",
    message: "Summer Sale campaign is performing 23% above target",
    time: "2 minutes ago",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "Monthly Report Ready",
    message: "Your November performance report is ready for download",
    time: "1 hour ago",
    type: "info",
    unread: true,
  },
  {
    id: 3,
    title: "Budget Threshold Reached",
    message: "Holiday campaign has reached 80% of allocated budget",
    time: "3 hours ago",
    type: "warning",
    unread: false,
  },
  {
    id: 4,
    title: "New Team Member Added",
    message: "Sarah Johnson has been added to your team",
    time: "1 day ago",
    type: "info",
    unread: false,
  },
]

// Mobile navigation items
const mobileNavigation = [
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
    icon: TrendingUp,
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
    icon: TrendingUp,
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
]

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [notificationCount, setNotificationCount] = useState(notifications.filter(n => n.unread).length)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
      setIsSearching(false)
    }, 300)

    if (searchValue !== debouncedSearchValue) {
      setIsSearching(true)
    }

    return () => clearTimeout(timer)
  }, [searchValue, debouncedSearchValue])

  const handleSearch = (href: string, title: string) => {
    router.push(href)
    setSearchOpen(false)
    setSearchValue("")
    toast({
      title: "Navigating to " + title,
      description: "Opening the requested page...",
    })
  }

  const handleInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSearchOpen(true)
  }

  const handleInputFocus = (e: React.FocusEvent) => {
    e.preventDefault()
    setSearchOpen(true)
  }

  // Filter search results
  const getFilteredResults = () => {
    if (!debouncedSearchValue) return searchData.slice(0, 8) // Show top 8 when no search
    
    return searchData.filter(item => 
      item.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      item.type.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
      item.status.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    )
  }

  const filteredResults = getFilteredResults()

  const markAllAsRead = () => {
    setNotificationCount(0)
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return "🎉"
      case "warning": return "⚠️"
      case "info": return "ℹ️"
      default: return "📢"
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-3 sm:px-6 sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="p-6 border-b">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm">
                  <TrendingUp className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <SheetTitle className="text-sm font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    ADmyBRAND
                  </SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">
                    Insights
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>
            <div className="flex flex-col h-full">
              <nav className="flex-1 px-4 py-6 space-y-2">
                {mobileNavigation.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                        isActive 
                          ? "bg-secondary text-secondary-foreground font-medium" 
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        {/* Mobile Brand Logo */}
        <div className="flex items-center space-x-2 md:hidden">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/80">
            <TrendingUp className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">ADmyBRAND</span>
        </div>

        {/* Search - responsive */}
        <Popover open={searchOpen} onOpenChange={setSearchOpen}>
          <PopoverTrigger asChild>
            <div className="relative max-w-md flex-1 group">
              <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-200 ${searchOpen ? 'text-primary animate-pulse' : 'group-hover:text-foreground'}`} />
              <Input 
                placeholder="Search..." 
                className="pl-10 pr-4 cursor-pointer transition-all duration-200 hover:shadow-md focus:shadow-lg group-hover:border-primary/50 sm:placeholder:text-[Search campaigns, metrics, reports...]"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={handleInputClick}
                onFocus={handleInputFocus}
              />
              {searchValue && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setSearchValue("")
                    setSearchOpen(false)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent 
            className="w-96 p-0 z-[100] border-2 shadow-2xl bg-background/95 backdrop-blur-md" 
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="p-3 border-b bg-muted/20">
              <div className="text-sm font-medium text-muted-foreground">
                {searchValue ? `Results for "${searchValue}"` : "Quick Access"}
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {isSearching ? (
                // Show loading state while searching
                <div className="p-6 text-center text-muted-foreground">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
                  <p>Searching...</p>
                </div>
              ) : filteredResults.length === 0 ? (
                // Show no results found
                <div className="p-6 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No results found</p>
                  <p className="text-xs mt-1">Try searching for campaigns, reports, or metrics</p>
                </div>
              ) : (
                // Show search results
                <div className="p-2">
                  <div className="space-y-1">
                    {filteredResults.map((item, index) => (
                      <div
                        key={`${item.href}-${item.title}`}
                        onClick={() => handleSearch(item.href, item.title)}
                        className="group flex items-center space-x-3 cursor-pointer hover:bg-accent/80 transition-all duration-200 rounded-lg p-3 mx-1"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className={`p-2 rounded-lg transition-all duration-200 group-hover:scale-110 ${
                          item.type === "campaign" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" :
                          item.type === "page" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                          item.type === "report" ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                          item.type === "metric" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" :
                          item.type === "settings" ? "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400" :
                          "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        }`}>
                          {item.type === "campaign" && <Target className="h-4 w-4" />}
                          {item.type === "page" && <BarChart3 className="h-4 w-4" />}
                          {item.type === "report" && <FileText className="h-4 w-4" />}
                          {item.type === "metric" && <TrendingUp className="h-4 w-4" />}
                          {item.type === "settings" && <Settings className="h-4 w-4" />}
                          {item.type === "users" && <Users className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium group-hover:text-primary transition-colors truncate">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {item.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className={`text-xs font-medium ${
                              item.status === "Active" || item.status === "Live" ? "text-emerald-600" :
                              item.status === "Paused" ? "text-amber-600" :
                              item.status === "Completed" ? "text-blue-600" :
                              "text-muted-foreground"
                            }`}>
                              {item.status}
                            </span>
                            {item.performance && (
                              <>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs font-medium text-primary">
                                  {item.performance}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t bg-muted/20 p-2">
              <div className="text-xs text-muted-foreground text-center py-1">
                Press <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted rounded">Esc</kbd> to close
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center space-x-4">
        <InteractiveNotificationCenter />

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-accent transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
