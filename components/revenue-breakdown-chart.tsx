"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Subscriptions", value: 67800, color: "#3b82f6" },
  { name: "One-time Sales", value: 18200, color: "#10b981" },
  { name: "Premium Features", value: 5850, color: "#f59e0b" },
  { name: "Consulting", value: 2400, color: "#ef4444" },
]

export function RevenueBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
                    <span className="font-medium">{data.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">${data.value.toLocaleString()}</p>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
