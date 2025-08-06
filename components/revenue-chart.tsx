"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, ReferenceLine } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"

const revenueData = [
  { month: "Jan", revenue: 42000, target: 40000, lastYear: 35000 },
  { month: "Feb", revenue: 45000, target: 43000, lastYear: 38000 },
  { month: "Mar", revenue: 48000, target: 46000, lastYear: 41000 },
  { month: "Apr", revenue: 52000, target: 50000, lastYear: 44000 },
  { month: "May", revenue: 55000, target: 53000, lastYear: 47000 },
  { month: "Jun", revenue: 58000, target: 56000, lastYear: 50000 },
  { month: "Jul", revenue: 62000, target: 60000, lastYear: 53000 },
  { month: "Aug", revenue: 65000, target: 63000, lastYear: 56000 },
  { month: "Sep", revenue: 68000, target: 66000, lastYear: 59000 },
  { month: "Oct", revenue: 72000, target: 70000, lastYear: 62000 },
  { month: "Nov", revenue: 75000, target: 73000, lastYear: 65000 },
  { month: "Dec", revenue: 78000, target: 76000, lastYear: 68000 },
]

export function RevenueChart() {
  const [hoveredData, setHoveredData] = useState<any>(null)

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalTarget = revenueData.reduce((sum, item) => sum + item.target, 0)
  const performance = ((totalRevenue / totalTarget) * 100).toFixed(1)

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            Revenue Trends
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Last 12 months
            </div>
            <Badge variant="outline" className="text-emerald-700 border-emerald-200 bg-emerald-50">
              <TrendingUp className="h-3 w-3 mr-1" />
              {performance}% of target
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {hoveredData && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Revenue</p>
                <p className="font-semibold text-emerald-600">${hoveredData.revenue?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target</p>
                <p className="font-semibold">${hoveredData.target?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Year</p>
                <p className="font-semibold text-blue-600">${hoveredData.lastYear?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueData}
              onMouseMove={(data: any) => {
                if (data && data.activePayload) {
                  setHoveredData(data.activePayload[0].payload)
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="lastYearGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === "revenue" ? "Current Year" : name === "target" ? "Target" : "Last Year",
                ]}
              />
              <ReferenceLine y={60000} stroke="#ef4444" strokeDasharray="5 5" opacity={0.6} />
              <Area
                type="monotone"
                dataKey="lastYear"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#lastYearGradient)"
                strokeDasharray="5 5"
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
