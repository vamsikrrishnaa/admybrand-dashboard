"use client"

const funnelData = [
  { stage: "Visitors", count: 10000, percentage: 100 },
  { stage: "Page Views", count: 7500, percentage: 75 },
  { stage: "Sign Ups", count: 2500, percentage: 25 },
  { stage: "Trials", count: 1000, percentage: 10 },
  { stage: "Conversions", count: 250, percentage: 2.5 },
]

export function FunnelChart() {
  return (
    <div className="space-y-4">
      {funnelData.map((stage, index) => (
        <div key={stage.stage} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{stage.stage}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {stage.count.toLocaleString()} ({stage.percentage}%)
              </span>
              {index > 0 && (
                <span className="text-xs text-red-500">
                  -{(((funnelData[index - 1].count - stage.count) / funnelData[index - 1].count) * 100).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="w-full bg-secondary rounded-full h-8 flex items-center justify-center">
              <div
                className="bg-primary h-8 rounded-full transition-all duration-300 flex items-center justify-center text-primary-foreground text-sm font-medium"
                style={{ width: `${stage.percentage}%` }}
              >
                {stage.percentage >= 20 && `${stage.percentage}%`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
