import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDays, Filter, Download } from "lucide-react"
import ReportsOverview from "@/components/dashboard/reports-overview"
import CampaignAnalytics from "@/components/dashboard/campaign-analytics"
import ReportsCharts from "@/components/dashboard/reports-charts"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your campaign performance and donor engagement
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <CalendarDays className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Details</TabsTrigger>
          <TabsTrigger value="donors">Donor Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Suspense fallback={<div>Loading overview...</div>}>
            <ReportsOverview />
          </Suspense>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Suspense fallback={<div>Loading campaign analytics...</div>}>
            <CampaignAnalytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="donors" className="space-y-6">
          <Suspense fallback={<div>Loading donor analytics...</div>}>
            <ReportsCharts />
          </Suspense>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Suspense fallback={<div>Loading performance data...</div>}>
            <ReportsCharts />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
