import { format, subDays, subMonths } from "date-fns"

// Enhanced metrics with historical data
export const enhancedMockMetrics = {
  revenue: {
    value: 45231.89,
    change: 20.1,
    previousValue: 37693.25,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), "yyyy-MM-dd"),
      value: 35000 + Math.random() * 15000 + i * 300
    }))
  },
  users: {
    value: 12234,
    change: 15.3,
    previousValue: 10612,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), "yyyy-MM-dd"),
      value: 8000 + Math.random() * 6000 + i * 100
    }))
  },
  conversions: {
    value: 3.24,
    change: -2.1,
    previousValue: 3.31,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), "yyyy-MM-dd"),
      value: 2.5 + Math.random() * 1.5
    }))
  },
  growth: {
    value: 23.8,
    change: 5.4,
    previousValue: 22.6,
    history: Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), "yyyy-MM-dd"),
      value: 15 + Math.random() * 15
    }))
  },
}

// Revenue breakdown data
export const revenueBreakdownData = [
  { name: "Subscriptions", value: 28450, color: "#10b981", percentage: 62.9 },
  { name: "One-time Sales", value: 12340, color: "#3b82f6", percentage: 27.3 },
  { name: "Premium Features", value: 3240, color: "#8b5cf6", percentage: 7.2 },
  { name: "Consulting", value: 1200, color: "#f59e0b", percentage: 2.6 },
]

// Chart data for different time periods
export const generateChartData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - 1 - i), "MMM dd"),
    revenue: 1000 + Math.random() * 2000,
    users: 200 + Math.random() * 400,
    conversions: 20 + Math.random() * 40,
    impressions: 5000 + Math.random() * 10000,
    clicks: 200 + Math.random() * 500,
  }))
}

// User activity data
export const userActivityData = [
  {
    metric: "Active Users",
    value: 1247,
    change: 12,
    icon: "eye",
    description: "Currently browsing",
    color: "blue"
  },
  {
    metric: "Page Views",
    value: 3892,
    change: 8,
    icon: "mouse-pointer",
    description: "Last hour",
    color: "emerald"
  },
  {
    metric: "Conversions",
    value: 156,
    change: 23,
    icon: "trending-up",
    description: "Today",
    color: "violet"
  },
  {
    metric: "Bounce Rate",
    value: 34.2,
    change: -5.1,
    icon: "arrow-right",
    description: "This session",
    color: "amber"
  }
]

// Traffic sources data
export const trafficSourcesData = [
  { source: "Google Ads", visitors: 12450, percentage: 42.3, color: "#4285f4" },
  { source: "Facebook Ads", visitors: 8920, percentage: 30.4, color: "#1877f2" },
  { source: "Organic Search", visitors: 4560, percentage: 15.5, color: "#34a853" },
  { source: "Direct", visitors: 2340, percentage: 8.0, color: "#ea4335" },
  { source: "Email", visitors: 1120, percentage: 3.8, color: "#fbbc04" },
]

// Device breakdown data
export const deviceBreakdownData = [
  { device: "Desktop", users: 8456, percentage: 58.2, color: "#6366f1" },
  { device: "Mobile", users: 5234, percentage: 36.1, color: "#8b5cf6" },
  { device: "Tablet", users: 834, percentage: 5.7, color: "#ec4899" },
]

// Geographic data
export const geographicData = [
  { country: "United States", users: 4567, revenue: 18234, flag: "🇺🇸" },
  { country: "United Kingdom", users: 2345, revenue: 9876, flag: "🇬🇧" },
  { country: "Canada", users: 1890, revenue: 7654, flag: "🇨🇦" },
  { country: "Germany", users: 1567, revenue: 6543, flag: "🇩🇪" },
  { country: "France", users: 1234, revenue: 5432, flag: "🇫🇷" },
  { country: "Australia", users: 987, revenue: 4321, flag: "🇦🇺" },
  { country: "Japan", users: 765, revenue: 3210, flag: "🇯🇵" },
  { country: "Other", users: 2145, revenue: 8765, flag: "🌍" },
]

// Campaign performance over time
export const campaignPerformanceData = Array.from({ length: 12 }, (_, i) => ({
  month: format(subMonths(new Date(), 11 - i), "MMM"),
  campaigns: Math.floor(Math.random() * 20) + 10,
  revenue: Math.floor(Math.random() * 50000) + 20000,
  roas: (Math.random() * 3) + 2,
}))

// Top performing keywords
export const topKeywordsData = [
  { keyword: "premium analytics", impressions: 45678, clicks: 2345, ctr: 5.13, cpc: 1.24, conversions: 234 },
  { keyword: "marketing dashboard", impressions: 38901, clicks: 1987, ctr: 5.11, cpc: 1.18, conversions: 198 },
  { keyword: "brand insights", impressions: 34567, clicks: 1789, ctr: 5.17, cpc: 1.32, conversions: 167 },
  { keyword: "digital marketing", impressions: 29876, clicks: 1456, ctr: 4.87, cpc: 1.45, conversions: 134 },
  { keyword: "analytics platform", impressions: 25432, clicks: 1234, ctr: 4.85, cpc: 1.56, conversions: 112 },
]

// Funnel data
export const funnelData = [
  { stage: "Awareness", users: 10000, percentage: 100, color: "#3b82f6" },
  { stage: "Interest", users: 7500, percentage: 75, color: "#6366f1" },
  { stage: "Consideration", users: 4500, percentage: 45, color: "#8b5cf6" },
  { stage: "Intent", users: 2250, percentage: 22.5, color: "#a855f7" },
  { stage: "Purchase", users: 900, percentage: 9, color: "#c084fc" },
  { stage: "Retention", users: 720, percentage: 7.2, color: "#d8b4fe" },
]

// Conversion data for enhanced conversion chart
export const conversionData = [
  { name: "Visitors", value: 10000, fill: "#3b82f6" },
  { name: "Leads", value: 2500, fill: "#6366f1" },
  { name: "Customers", value: 500, fill: "#8b5cf6" },
]

// Revenue chart data
export const revenueChartData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), "MMM dd"),
  revenue: 1000 + Math.random() * 2000 + i * 50,
  target: 1500 + i * 30,
}))

// User growth data
export const userGrowthData = Array.from({ length: 12 }, (_, i) => ({
  month: format(subMonths(new Date(), 11 - i), "MMM"),
  users: 1000 + Math.random() * 2000 + i * 200,
  newUsers: 200 + Math.random() * 400 + i * 30,
  returningUsers: 800 + Math.random() * 1600 + i * 170,
}))