"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, BarChart3 } from "lucide-react"
import { useState } from "react"

const performanceData = [
  { 
    channel: "Google Ads", 
    revenue: 45000, 
    cost: 12000, 
    conversions: 892, 
    color: "#3b82f6",
    roi: 275 
  },
  { 
    channel: "Facebook", 
    revenue: 32000, 
    cost: 8500, 
    conversions: 567, 
    color: "#8b5cf6",
    roi: 276 
  },
  { 
    channel: "Instagram", 
    revenue: 28000, 
    cost: 7200, 
    conversions: 445, 
    color: "#ec4899",
    roi: 289 
  },
  { 
    channel: "LinkedIn", 
    revenue: 18000, 
    cost: 5500, 
    conversions: 234, 
    color: "#06b6d4",
    roi: 227 
  },
  { 
    channel: "Twitter", 
    revenue: 12000, 
    cost: 3800, 
    conversions: 156, 
    color: "#10b981",
    roi: 216 
  },
  { 
    channel: "YouTube", 
    revenue: 22000, 
    cost: 6800, 
    conversions: 334, 
    color: "#f59e0b",
    roi: 224 
  }
]

export function EnhancedBarChart() {
  const [hoveredData, setHoveredData] = useState<any>(null)
  const [activeMetric, setActiveMetric] = useState<"revenue" | "cost" | "conversions">("revenue")

  const totalRevenue = performanceData.reduce((sum, item) => sum + item.revenue, 0)
  const totalCost = performanceData.reduce((sum, item) => sum + item.cost, 0)
  const totalROI = ((totalRevenue - totalCost) / totalCost * 100).toFixed(1)

  const metricConfig = {
    revenue: {
      label: "Revenue",
      color: "#10b981",
      formatter: (value: number) => `$${value.toLocaleString()}`
    },
    cost: {
      label: "Ad Spend",
      color: "#ef4444", 
      formatter: (value: number) => `$${value.toLocaleString()}`
    },
    conversions: {
      label: "Conversions",
      color: "#8b5cf6",
      formatter: (value: number) => value.toLocaleString()
    }
  }

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            Channel Performance
          </CardTitle>
          <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:gap-4 sm:space-y-0 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Last 30 days
            </div>
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50 w-fit">
              <TrendingUp className="h-3 w-3 mr-1" />
              {totalROI}% ROI
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
          {Object.entries(metricConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setActiveMetric(key as any)}
              className={`px-2 sm:px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap ${
                activeMetric === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {hoveredData && (
          <div className="mb-4 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Channel</p>
                <p className="font-semibold text-primary">{hoveredData.channel}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Revenue</p>
                <p className="font-semibold text-emerald-600">${hoveredData.revenue?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ad Spend</p>
                <p className="font-semibold text-red-600">${hoveredData.cost?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">ROI</p>
                <p className="font-semibold text-violet-600">{hoveredData.roi}%</p>
              </div>
            </div>
          </div>
        )}
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              onMouseMove={(data: any) => {
                if (data && data.activePayload) {
                  setHoveredData(data.activePayload[0].payload)
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={metricConfig[activeMetric].color} stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis 
                dataKey="channel" 
                stroke="#6b7280" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => 
                  activeMetric === "conversions" 
                    ? value.toLocaleString()
                    : `$${(value / 1000).toFixed(0)}k`
                }
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{
                  color: "hsl(var(--foreground))",
                  fontWeight: "600",
                  marginBottom: "4px"
                }}
                formatter={(value: number) => [
                  metricConfig[activeMetric].formatter(value),
                  metricConfig[activeMetric].label
                ]}
              />
              <Bar 
                dataKey={activeMetric} 
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                className="drop-shadow-sm"
              >
                {performanceData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={hoveredData?.channel === entry.channel ? entry.color : "url(#barGradient)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}