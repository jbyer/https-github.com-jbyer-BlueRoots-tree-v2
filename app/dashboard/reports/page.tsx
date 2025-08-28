import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReportsOverview } from "@/components/dashboard/reports-overview"
import { CampaignAnalytics } from "@/components/dashboard/campaign-analytics"
import { ReportsCharts } from "@/components/dashboard/reports-charts"
import { Button } from "@/components/ui/button"
import { Download, Calendar, Filter } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your campaign performance and donor engagement
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <Suspense fallback={<div>Loading overview...</div>}>
        <ReportsOverview />
      </Suspense>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Details</TabsTrigger>
          <TabsTrigger value="donors">Donor Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<div>Loading charts...</div>}>
            <ReportsCharts />
          </Suspense>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Suspense fallback={<div>Loading campaign analytics...</div>}>
            <CampaignAnalytics />
          </Suspense>
        </TabsContent>

        <TabsContent value="donors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donor Analytics</CardTitle>
              <CardDescription>Detailed insights into your donor base and giving patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Repeat Donors</p>
                  <p className="text-2xl font-bold">456</p>
                  <p className="text-xs text-green-600">+8% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Donation</p>
                  <p className="text-2xl font-bold">$127</p>
                  <p className="text-xs text-red-600">-3% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Retention Rate</p>
                  <p className="text-2xl font-bold">68%</p>
                  <p className="text-xs text-green-600">+5% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators for your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-xs text-green-600">+0.5% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                  <p className="text-2xl font-bold">45,678</p>
                  <p className="text-xs text-green-600">+15% from last month</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Social Shares</p>
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-xs text-green-600">+22% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
