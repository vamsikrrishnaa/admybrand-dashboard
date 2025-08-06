"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"

interface Campaign {
  id: string
  name: string
  conversions: number
  spend: number
  ctr: number
}

interface CampaignChartProps {
  campaigns: Campaign[]
}

export function CampaignChart({ campaigns }: CampaignChartProps) {
  const { theme } = useTheme()

  const chartData = campaigns.map((campaign) => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + "..." : campaign.name,
    conversions: campaign.conversions,
    spend: campaign.spend,
    ctr: campaign.ctr,
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
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
                      <span className="font-bold text-blue-600">Conversions: {payload[0].value}</span>
                      <span className="font-bold text-green-600">Spend: ${payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="conversions" fill="#3b82f6" radius={[2, 2, 0, 0]} />
        <Bar dataKey="spend" fill="#10b981" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
