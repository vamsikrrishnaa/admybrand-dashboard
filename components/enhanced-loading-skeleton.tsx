"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function EnhancedLoadingSkeleton() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header Skeleton with Gradient Animation */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-9 w-80 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
          <div className="h-5 w-96 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-10 w-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
          <div className="h-10 w-28 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
          <div className="h-10 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Enhanced Metrics Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 w-28 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              <div className="h-8 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse mb-3" />
              <div className="h-4 w-36 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
          ))}
        </div>

        {/* Charts Grid Skeleton */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <CardHeader>
              <div className="h-6 w-36 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[320px] bg-gradient-to-br from-muted via-muted/30 to-muted/50 rounded-lg animate-pulse" />
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <CardHeader>
              <div className="h-6 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[320px] bg-gradient-to-br from-muted via-muted/30 to-muted/50 rounded-lg animate-pulse" />
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Bar Chart Skeleton */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-6 w-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                <div className="h-4 w-56 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              </div>
              <div className="flex space-x-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-7 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-full animate-pulse" />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[380px] bg-gradient-to-br from-muted via-muted/30 to-muted/50 rounded-lg animate-pulse" />
          </CardContent>
        </Card>

        {/* Additional Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <CardHeader>
              <div className="h-6 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-44 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-[320px] bg-gradient-to-br from-muted via-muted/30 to-muted/50 rounded-lg animate-pulse" />
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="h-6 w-36 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                <div className="h-6 w-12 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                        <div className="h-3 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="h-6 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                      <div className="h-3 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Table Skeleton */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-7 w-48 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
            <div className="flex space-x-3">
              <div className="h-9 w-64 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
              <div className="h-9 w-32 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Table Header */}
            <div className="grid grid-cols-8 gap-4 pb-3 border-b">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              ))}
            </div>
            {/* Table Rows */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-8 gap-4 py-3 border-b border-muted/30">
                {Array.from({ length: 8 }).map((_, j) => (
                  <div key={j} className="h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                ))}
              </div>
            ))}
          </div>
          {/* Pagination Skeleton */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-12 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              <div className="h-8 w-16 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
              <div className="flex space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-8 w-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}