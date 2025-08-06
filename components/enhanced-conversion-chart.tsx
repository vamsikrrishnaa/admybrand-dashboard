"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { conversionData } from "@/lib/enhanced-mock-data"

export function EnhancedConversionChart() {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 border-0 bg-gradient-to-br from-white to-violet-50/30 dark:from-gray-900 dark:to-violet-950/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Traffic Sources
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Conversion by acquisition channel</p>
          </div>
          <Badge
            variant="outline"
            className="bg-violet-100 text-violet-800 border-violet-200 dark:bg-violet-900/20 dark:text-violet-400"
          >
            <Target className="h-3 w-3 mr-1" />
            3.24% CVR
          </Badge>
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
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value}%`, "Conversion Rate"]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
