import { format as formatDate } from "date-fns"

export interface ExportData {
  metrics?: any
  charts?: any
  campaigns?: any[]
  users?: any[]
  revenue?: any[]
}

export interface ExportOptions {
  format: "pdf" | "csv" | "excel"
  dateRange: {
    from: Date
    to: Date
  }
  selectedData: {
    metrics: boolean
    charts: boolean
    campaigns: boolean
    users: boolean
    revenue: boolean
  }
}

// CSV Export Functions - FIXED VERSION
export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    console.error("No data provided for CSV export")
    return
  }

  console.log("Exporting CSV data:", data)
  
  const headers = Object.keys(data[0])
  
  const csvContent = [
    headers.join(","),
    ...data.map(row => 
      headers.map(header => {
        let value = row[header]
        
        // Format numbers properly
        if (typeof value === "number") {
          // For currency values, add dollar sign
          if (header === "budget" || header === "spent" || header === "cpc") {
            value = `$${value.toLocaleString()}`
          } else if (header === "ctr") {
            value = `${value.toFixed(2)}%`
          } else if (header === "roas") {
            value = `${value.toFixed(1)}x`
          } else {
            value = value.toLocaleString()
          }
        }
        
        // Handle values that might contain commas or quotes
        if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(",")
    )
  ].join("\n")

  console.log("CSV content generated:", csvContent.substring(0, 200) + "...")
  downloadFile(csvContent, filename, "text/csv")
}

// PDF Export Functions - FIXED VERSION
export const exportToPDF = async (data: ExportData, options: ExportOptions) => {
  const htmlContent = generatePDFHTML(data, options)
  
  // Create a blob with the HTML content and download it
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = generateFilename('html', 'report')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  // Show instructions to user
  alert('HTML report downloaded! Open the file and use your browser\'s "Print to PDF" option to save as PDF.')
}

const generatePDFHTML = (data: ExportData, options: ExportOptions): string => {
  const { dateRange, selectedData } = options
  const dateRangeStr = `${formatDate(dateRange.from, "MMM dd, yyyy")} - ${formatDate(dateRange.to, "MMM dd, yyyy")}`
  
  let content = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ADmyBRAND Insights Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #2563eb; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f8f9fa; font-weight: 600; }
        .metric-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric-card { padding: 20px; border: 1px solid #ddd; border-radius: 8px; text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; color: #2563eb; }
        .metric-label { color: #666; margin-top: 5px; }
        .positive { color: #059669; }
        .negative { color: #dc2626; }
        @media print { body { margin: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>ADmyBRAND Insights Report</h1>
        <p>Generated on ${formatDate(new Date(), "PPP")} | Period: ${dateRangeStr}</p>
      </div>
  `

  if (selectedData.metrics && data.metrics) {
    content += `
      <div class="section">
        <h2>Key Metrics</h2>
        <div class="metric-grid">
          <div class="metric-card">
            <div class="metric-value">$${data.metrics.revenue.value.toLocaleString()}</div>
            <div class="metric-label">Total Revenue</div>
            <div class="${data.metrics.revenue.change > 0 ? 'positive' : 'negative'}">
              ${data.metrics.revenue.change > 0 ? '+' : ''}${data.metrics.revenue.change.toFixed(1)}%
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${data.metrics.users.value.toLocaleString()}</div>
            <div class="metric-label">Active Users</div>
            <div class="${data.metrics.users.change > 0 ? 'positive' : 'negative'}">
              ${data.metrics.users.change > 0 ? '+' : ''}${data.metrics.users.change.toFixed(1)}%
            </div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${data.metrics.conversions.value}%</div>
            <div class="metric-label">Conversion Rate</div>
            <div class="${data.metrics.conversions.change > 0 ? 'positive' : 'negative'}">
              ${data.metrics.conversions.change > 0 ? '+' : ''}${data.metrics.conversions.change.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    `
  }

  if (selectedData.campaigns && data.campaigns) {
    content += `
      <div class="section">
        <h2>Campaign Performance</h2>
        <table>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>ROAS</th>
            </tr>
          </thead>
          <tbody>
            ${data.campaigns.map(campaign => `
              <tr>
                <td>${campaign.name}</td>
                <td>${campaign.status}</td>
                <td>$${campaign.budget.toLocaleString()}</td>
                <td>$${campaign.spent.toLocaleString()}</td>
                <td>${campaign.impressions.toLocaleString()}</td>
                <td>${campaign.clicks.toLocaleString()}</td>
                <td>${campaign.ctr.toFixed(2)}%</td>
                <td>${campaign.roas.toFixed(1)}x</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `
  }

  content += `
      <div class="section">
        <p style="text-align: center; color: #666; margin-top: 40px;">
          Report generated by ADmyBRAND Insights | ${formatDate(new Date(), "PPP 'at' p")}
        </p>
      </div>
    </body>
    </html>
  `

  return content
}

// File download utility
const downloadFile = (content: string, filename: string, mimeType: string) => {
  console.log(`Downloading file: ${filename} with type: ${mimeType}`)
  console.log(`Content length: ${content.length} characters`)
  
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  console.log(`File download triggered: ${filename}`)
}

// Excel export - FIXED VERSION
export const exportToExcel = (data: ExportData, options: ExportOptions) => {
  const { dateRange, selectedData } = options
  
  // Create comprehensive data for Excel export
  let excelContent = `ADmyBRAND Insights Report\n`
  excelContent += `Generated: ${formatDate(new Date(), "PPP")}\n`
  excelContent += `Period: ${formatDate(dateRange.from, "MMM dd, yyyy")} - ${formatDate(dateRange.to, "MMM dd, yyyy")}\n\n`
  
  // Add metrics if selected
  if (selectedData.metrics && data.metrics) {
    excelContent += `KEY METRICS\n`
    excelContent += `Metric,Value,Change\n`
    excelContent += `Total Revenue,$${data.metrics.revenue.value.toLocaleString()},${data.metrics.revenue.change > 0 ? '+' : ''}${data.metrics.revenue.change.toFixed(1)}%\n`
    excelContent += `Active Users,${data.metrics.users.value.toLocaleString()},${data.metrics.users.change > 0 ? '+' : ''}${data.metrics.users.change.toFixed(1)}%\n`
    excelContent += `Conversion Rate,${data.metrics.conversions.value}%,${data.metrics.conversions.change > 0 ? '+' : ''}${data.metrics.conversions.change.toFixed(1)}%\n`
    excelContent += `Growth Rate,${data.metrics.growth.value}%,${data.metrics.growth.change > 0 ? '+' : ''}${data.metrics.growth.change.toFixed(1)}%\n\n`
  }
  
  // Add campaign data if selected
  if (selectedData.campaigns && data.campaigns) {
    excelContent += `CAMPAIGN PERFORMANCE\n`
    excelContent += `Campaign Name,Status,Budget,Spent,Impressions,Clicks,CTR,CPC,ROAS,Conversions\n`
    data.campaigns.forEach(campaign => {
      excelContent += `"${campaign.name}",${campaign.status},$${campaign.budget.toLocaleString()},$${campaign.spent.toLocaleString()},${campaign.impressions.toLocaleString()},${campaign.clicks.toLocaleString()},${campaign.ctr.toFixed(2)}%,$${campaign.cpc.toFixed(2)},${campaign.roas.toFixed(1)}x,${campaign.conversions}\n`
    })
  }
  
  // Download as CSV file (Excel can open CSV files)
  downloadFile(excelContent, generateFilename('csv', 'comprehensive-report'), "text/csv")
}

// Generate filename based on options
export const generateFilename = (formatType: string, type: string): string => {
  const timestamp = formatDate(new Date(), "yyyy-MM-dd-HHmm")
  return `admybrand-${type}-${timestamp}.${formatType}`
}