import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Users,
  Eye,
  Share2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CampaignAnalytics() {
  const campaigns = [
    {
      id: 1,
      title: "Education Reform Initiative",
      category: "Education",
      status: "active",
      raised: 85000,
      goal: 100000,
      progress: 85,
      donors: 342,
      avgDonation: 248,
      views: 12500,
      shares: 89,
      daysLeft: 15,
      weeklyTrend: {
        donations: 12.5,
        views: 8.3,
        shares: -2.1,
      },
    },
    {
      id: 2,
      title: "Community Health Center",
      category: "Healthcare",
      status: "active",
      raised: 42000,
      goal: 75000,
      progress: 56,
      donors: 189,
      avgDonation: 222,
      views: 8900,
      shares: 45,
      daysLeft: 28,
      weeklyTrend: {
        donations: 5.7,
        views: 15.2,
        shares: 8.9,
      },
    },
    {
      id: 3,
      title: "Youth Arts Program",
      category: "Arts",
      status: "active",
      raised: 18500,
      goal: 25000,
      progress: 74,
      donors: 156,
      avgDonation: 119,
      views: 5600,
      shares: 67,
      daysLeft: 42,
      weeklyTrend: {
        donations: -3.2,
        views: 4.1,
        shares: 12.3,
      },
    },
    {
      id: 4,
      title: "Environmental Cleanup",
      category: "Environment",
      status: "active",
      raised: 12920,
      goal: 50000,
      progress: 26,
      donors: 98,
      avgDonation: 132,
      views: 3400,
      shares: 23,
      daysLeft: 35,
      weeklyTrend: {
        donations: 18.9,
        views: 22.1,
        shares: 15.6,
      },
    },
    {
      id: 5,
      title: "Senior Care Support",
      category: "Healthcare",
      status: "paused",
      raised: 8750,
      goal: 30000,
      progress: 29,
      donors: 67,
      avgDonation: 131,
      views: 2100,
      shares: 12,
      daysLeft: 0,
      weeklyTrend: {
        donations: 0,
        views: -5.2,
        shares: -8.1,
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Education":
        return "bg-purple-100 text-purple-800"
      case "Healthcare":
        return "bg-red-100 text-red-800"
      case "Arts":
        return "bg-pink-100 text-pink-800"
      case "Environment":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const TrendIndicator = ({ value, label }: { value: number; label: string }) => (
    <div className="flex items-center space-x-1">
      {value > 0 ? (
        <TrendingUp className="h-3 w-3 text-green-600" />
      ) : value < 0 ? (
        <TrendingDown className="h-3 w-3 text-red-600" />
      ) : null}
      <span className={`text-xs ${value > 0 ? "text-green-600" : value < 0 ? "text-red-600" : "text-gray-500"}`}>
        {value > 0 ? "+" : ""}
        {value}% {label}
      </span>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Campaign Cards */}
      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{campaign.title}</CardTitle>
                    <Badge className={getCategoryColor(campaign.category)}>{campaign.category}</Badge>
                    <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : "Campaign ended"}
                    </span>
                    <span className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {campaign.progress}% of goal
                    </span>
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Campaign</DropdownMenuItem>
                    <DropdownMenuItem>Download Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">${campaign.raised.toLocaleString()} raised</span>
                  <span className="text-muted-foreground">of ${campaign.goal.toLocaleString()} goal</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Donors</span>
                  </div>
                  <div className="text-2xl font-bold">{campaign.donors}</div>
                  <TrendIndicator value={campaign.weeklyTrend.donations} label="this week" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Avg. Donation</span>
                  </div>
                  <div className="text-2xl font-bold">${campaign.avgDonation}</div>
                  <div className="text-xs text-muted-foreground">per donor</div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Views</span>
                  </div>
                  <div className="text-2xl font-bold">{campaign.views.toLocaleString()}</div>
                  <TrendIndicator value={campaign.weeklyTrend.views} label="this week" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1">
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Shares</span>
                  </div>
                  <div className="text-2xl font-bold">{campaign.shares}</div>
                  <TrendIndicator value={campaign.weeklyTrend.shares} label="this week" />
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Conversion Rate</span>
                  <span className="text-sm text-muted-foreground">
                    {((campaign.donors / campaign.views) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {campaign.donors} donors from {campaign.views.toLocaleString()} views
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
