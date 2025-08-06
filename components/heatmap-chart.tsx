"use client"

export function HeatmapChart() {
  const heatmapData = [
    { x: 0, y: 0, value: 0.2 },
    { x: 1, y: 0, value: 0.4 },
    { x: 2, y: 0, value: 0.6 },
    { x: 3, y: 0, value: 0.8 },
    { x: 4, y: 0, value: 1.0 },
    { x: 0, y: 1, value: 0.3 },
    { x: 1, y: 1, value: 0.5 },
    { x: 2, y: 1, value: 0.7 },
    { x: 3, y: 1, value: 0.9 },
    { x: 4, y: 1, value: 0.8 },
    { x: 0, y: 2, value: 0.1 },
    { x: 1, y: 2, value: 0.3 },
    { x: 2, y: 2, value: 0.5 },
    { x: 3, y: 2, value: 0.7 },
    { x: 4, y: 2, value: 0.6 },
  ]

  const getColor = (value: number) => {
    const opacity = value
    return `rgba(59, 130, 246, ${opacity})`
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-medium mb-2">Page Interaction Intensity</h4>
        <p className="text-sm text-muted-foreground">Darker areas indicate higher user interaction</p>
      </div>
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
        {heatmapData.map((cell, index) => (
          <div
            key={index}
            className="aspect-square rounded border"
            style={{
              backgroundColor: getColor(cell.value),
              border: "1px solid #e5e7eb",
            }}
            title={`Interaction: ${(cell.value * 100).toFixed(0)}%`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground max-w-md mx-auto">
        <span>Low</span>
        <div className="flex space-x-1">
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((value, index) => (
            <div key={index} className="w-4 h-4 rounded" style={{ backgroundColor: getColor(value) }} />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  )
}
