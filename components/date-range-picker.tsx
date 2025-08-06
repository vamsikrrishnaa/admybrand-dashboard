"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, X } from "lucide-react"
import { format, subDays, subMonths, subYears, startOfDay, endOfDay } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
  onDateChange?: (dateRange: DateRange | undefined) => void
  className?: string
}

const presetRanges = [
  {
    label: "Today",
    value: "today",
    getRange: () => ({
      from: startOfDay(new Date()),
      to: endOfDay(new Date())
    })
  },
  {
    label: "Yesterday",
    value: "yesterday",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 1)),
      to: endOfDay(subDays(new Date(), 1))
    })
  },
  {
    label: "Last 7 days",
    value: "last-7-days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "Last 30 days",
    value: "last-30-days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "Last 90 days",
    value: "last-90-days",
    getRange: () => ({
      from: startOfDay(subDays(new Date(), 89)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "This month",
    value: "this-month",
    getRange: () => ({
      from: startOfDay(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "Last month",
    value: "last-month",
    getRange: () => {
      const lastMonth = subMonths(new Date(), 1)
      return {
        from: startOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)),
        to: endOfDay(new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0))
      }
    }
  },
  {
    label: "Last 3 months",
    value: "last-3-months",
    getRange: () => ({
      from: startOfDay(subMonths(new Date(), 3)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "Last 6 months",
    value: "last-6-months",
    getRange: () => ({
      from: startOfDay(subMonths(new Date(), 6)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "This year",
    value: "this-year",
    getRange: () => ({
      from: startOfDay(new Date(new Date().getFullYear(), 0, 1)),
      to: endOfDay(new Date())
    })
  },
  {
    label: "Last year",
    value: "last-year",
    getRange: () => ({
      from: startOfDay(new Date(new Date().getFullYear() - 1, 0, 1)),
      to: endOfDay(new Date(new Date().getFullYear() - 1, 11, 31))
    })
  }
]

export function DateRangePicker({ onDateChange, className }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)
  const [selectedPreset, setSelectedPreset] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date)
    }
  }, [date, onDateChange])

  const handlePresetSelect = (presetValue: string) => {
    if (presetValue === "custom") {
      setSelectedPreset("custom")
      return
    }

    const preset = presetRanges.find(p => p.value === presetValue)
    if (preset) {
      const range = preset.getRange()
      setDate(range)
      setSelectedPreset(presetValue)
    }
  }

  const handleDateSelect = (newDate: DateRange | undefined) => {
    setDate(newDate)
    setSelectedPreset("custom")
  }

  const handleClear = () => {
    setDate(undefined)
    setSelectedPreset("")
  }

  const formatDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) return "Select date range"
    
    if (dateRange.to) {
      if (format(dateRange.from, "yyyy-MM-dd") === format(dateRange.to, "yyyy-MM-dd")) {
        return format(dateRange.from, "MMM dd, yyyy")
      }
      return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
    }
    
    return format(dateRange.from, "MMM dd, yyyy")
  }

  const getPresetLabel = () => {
    if (selectedPreset === "custom") return "Custom range"
    const preset = presetRanges.find(p => p.value === selectedPreset)
    return preset?.label || "Select range"
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate">{formatDateRange(date)}</span>
          {date && (
            <X 
              className="ml-auto h-4 w-4 opacity-50 hover:opacity-100" 
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Preset Options */}
          <div className="border-r p-3 w-48">
            <div className="text-sm font-medium mb-2">Quick Select</div>
            <Select value={selectedPreset} onValueChange={handlePresetSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {presetRanges.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            
            {/* Quick preset buttons */}
            <div className="mt-3 space-y-1">
              {presetRanges.slice(0, 6).map((preset) => (
                <Button
                  key={preset.value}
                  variant={selectedPreset === preset.value ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={() => handlePresetSelect(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Calendar */}
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={(date) => date > new Date()}
            />
            
            {/* Action buttons */}
            <div className="flex justify-between pt-3 border-t mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!date}
              >
                Clear
              </Button>
              <Button
                size="sm"
                onClick={() => setIsOpen(false)}
                disabled={!date?.from}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
