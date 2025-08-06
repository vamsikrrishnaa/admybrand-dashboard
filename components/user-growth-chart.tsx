"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, ArrowUpRight } from "lucide-react"

const userGrowthData = [
  { month: "Jan", totalUsers: 8500, newUsers: 1200, activeUsers: 7300 },
  { month: "Feb", totalUsers: 9200, newUsers: 1400, activeUsers: 7800 },
  { month: "Mar", totalUsers: 10100, newUsers: 1600, activeUsers: 8500 },
  { month: "Apr", totalUsers: 11300, newUsers: 1800, activeUsers: 9200 },
  { month: "May", totalUsers: 12234, newUsers: 2100, activeUsers: 9800 },
  { month: "Jun", totalUsers: 13500, newUsers: 2300, activeUsers: 10400 },
]

export function UserGrowthChart() {
  const totalGrowth = (((13500 - 8500) / 8500) * 100).toFixed(1)
  const avgNewUsers = Math.round(userGrowthData.reduce((sum, item) => sum + item.newUsers, 0) / userGrowthData.length)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            User Growth
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <UserPlus className="h-3 w-3" />
              {avgNewUsers} avg new/month
            </div>
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
              <ArrowUpRight className="h-3 w-3 mr-1" />+{totalGrowth}% growth
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userGrowthData} barGap={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number, name: string) => [
                  value.toLocaleString(),
                  name === "totalUsers" ? "Total Users" : name === "newUsers" ? "New Users" : "Active Users",
                ]}
              />
              <Legend />
              <Bar dataKey="totalUsers" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Users" />
              <Bar dataKey="newUsers" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
