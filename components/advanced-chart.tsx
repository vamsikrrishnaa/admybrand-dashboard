"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

const data = [
  { hour: "00:00", visitors: 120, pageViews: 340 },
  { hour: "01:00", visitors: 89, pageViews: 245 },
  { hour: "02:00", visitors: 67, pageViews: 189 },
  { hour: "03:00", visitors: 45, pageViews: 123 },
  { hour: "04:00", visitors: 34, pageViews: 98 },
  { hour: "05:00", visitors: 56, pageViews: 156 },
  { hour: "06:00", visitors: 123, pageViews: 289 },
  { hour: "07:00", visitors: 234, pageViews: 456 },
  { hour: "08:00", visitors: 345, pageViews: 678 },
  { hour: "09:00", visitors: 456, pageViews: 789 },
  { hour: "10:00", visitors: 567, pageViews: 890 },
  { hour: "11:00", visitors: 678, pageViews: 987 },
  { hour: "12:00", visitors: 789, pageViews: 1234 },
  { hour: "13:00", visitors: 698, pageViews: 1156 },
  { hour: "14:00", visitors: 587, pageViews: 1045 },
  { hour: "15:00", visitors: 476, pageViews: 934 },
  { hour: "16:00", visitors: 365, pageViews: 823 },
  { hour: "17:00", visitors: 254, pageViews: 712 },
  { hour: "18:00", visitors: 143, pageViews: 601 },
  { hour: "19:00", visitors: 198, pageViews: 490 },
  { hour: "20:00", visitors: 287, pageViews: 379 },
  { hour: "21:00", visitors: 376, pageViews: 268 },
  { hour: "22:00", visitors: 265, pageViews: 357 },
  { hour: "23:00", visitors: 154, pageViews: 246 },
]

interface AdvancedChartProps {
  type: "line" | "area" | "bar"
}

export function AdvancedChart({ type }: AdvancedChartProps) {
  const { theme } = useTheme()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="hour"
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
                      <span className="font-bold text-blue-600">Visitors: {payload[0].value}</span>
                      <span className="font-bold text-green-600">Page Views: {payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="pageViews" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
