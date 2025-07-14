import { CampaignManagementTable } from "@/components/admin/campaign-management-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Target, Play, Pause, CheckCircle, Search, Filter } from "lucide-react"

export default function CampaignManagementPage() {
  const campaignStats = [
    {
      title: "Total Campaigns",
      value: "89",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Campaigns",
      value: "67",
      icon: Play,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Paused Campaigns",
      value: "15",
      icon: Pause,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completed Campaigns",
      value: "7",
      icon: CheckCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600">Monitor and control all platform campaigns</p>
        </div>
        <Button>
          <Target className="h-4 w-4 mr-2" />
          Export Campaigns
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {campaignStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>Manage campaign status and monitor performance</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search campaigns..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CampaignManagementTable />
        </CardContent>
      </Card>
    </div>
  )
}
