"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChartIcon, Target } from "lucide-react"

const conversionData = [
  { name: "Organic Search", value: 35, color: "#10b981", visitors: 12500 },
  { name: "Social Media", value: 28, color: "#3b82f6", visitors: 9800 },
  { name: "Email Marketing", value: 22, color: "#8b5cf6", visitors: 7700 },
  { name: "Direct Traffic", value: 15, color: "#f59e0b", visitors: 5250 },
]

export function ConversionChart() {
  const totalVisitors = conversionData.reduce((sum, item) => sum + item.visitors, 0)
  const avgConversion = (conversionData.reduce((sum, item) => sum + item.value, 0) / conversionData.length).toFixed(1)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-violet-600" />
            Traffic Sources
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3" />
              {totalVisitors.toLocaleString()} total visitors
            </div>
            <Badge variant="outline" className="text-violet-700 border-violet-200 bg-violet-50">
              {avgConversion}% avg conversion
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value}% (${props.payload.visitors.toLocaleString()} visitors)`,
                  name,
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value, entry: any) => <span style={{ color: entry.color }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
