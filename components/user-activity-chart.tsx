"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

const data = [
  { date: "Jan", newUsers: 1200, activeUsers: 4500 },
  { date: "Feb", newUsers: 1400, activeUsers: 4800 },
  { date: "Mar", newUsers: 1100, activeUsers: 4600 },
  { date: "Apr", newUsers: 1800, activeUsers: 5200 },
  { date: "May", newUsers: 1600, activeUsers: 5400 },
  { date: "Jun", newUsers: 2100, activeUsers: 5800 },
  { date: "Jul", newUsers: 1900, activeUsers: 5600 },
  { date: "Aug", newUsers: 2200, activeUsers: 6000 },
  { date: "Sep", newUsers: 2400, activeUsers: 6200 },
  { date: "Oct", newUsers: 2100, activeUsers: 5900 },
  { date: "Nov", newUsers: 2600, activeUsers: 6400 },
  { date: "Dec", newUsers: 2800, activeUsers: 6800 },
]

export function UserActivityChart() {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: theme === "dark" ? "#888" : "#666" }}
        />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: theme === "dark" ? "#888" : "#666" }} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                      <span className="font-bold text-blue-600">New: {payload[0].value?.toLocaleString()}</span>
                      <span className="font-bold text-green-600">Active: {payload[1].value?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="newUsers"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorNew)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="activeUsers"
          stroke="#10b981"
          fillOpacity={1}
          fill="url(#colorActive)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
