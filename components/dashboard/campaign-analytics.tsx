"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, TrendingUp, TrendingDown, Users, DollarSign, Eye, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function CampaignAnalytics() {
  const campaigns = [
    {
      id: 1,
      title: "Education Reform Initiative",
      status: "active",
      raised: 45000,
      goal: 50000,
      donors: 234,
      daysLeft: 15,
      views: 12500,
      shares: 89,
      avgDonation: 192,
      trend: "up",
      trendValue: 12.5,
      category: "Education",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Community Health Center",
      status: "active",
      raised: 32000,
      goal: 75000,
      donors: 156,
      daysLeft: 28,
      views: 8900,
      shares: 45,
      avgDonation: 205,
      trend: "up",
      trendValue: 8.3,
      category: "Healthcare",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      title: "Youth Sports Program",
      status: "active",
      raised: 18500,
      goal: 25000,
      donors: 98,
      daysLeft: 7,
      views: 5600,
      shares: 32,
      avgDonation: 189,
      trend: "down",
      trendValue: -2.1,
      category: "Sports",
      createdAt: "2024-01-20",
    },
    {
      id: 4,
      title: "Environmental Cleanup",
      status: "paused",
      raised: 8900,
      goal: 15000,
      donors: 67,
      daysLeft: 45,
      views: 3200,
      shares: 18,
      avgDonation: 133,
      trend: "up",
      trendValue: 5.7,
      category: "Environment",
      createdAt: "2024-01-05",
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
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{campaign.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                    <Badge variant="outline">{campaign.category}</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
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
            <CardContent>
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.round((campaign.raised / campaign.goal) * 100)}% funded</span>
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Donors</span>
                    </div>
                    <p className="text-lg font-semibold">{campaign.donors}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Avg Donation</span>
                    </div>
                    <p className="text-lg font-semibold">${campaign.avgDonation}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Views</span>
                    </div>
                    <p className="text-lg font-semibold">{campaign.views.toLocaleString()}</p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Shares</span>
                    </div>
                    <p className="text-lg font-semibold">{campaign.shares}</p>
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    {campaign.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span
                      className={`text-sm font-medium ${campaign.trend === "up" ? "text-green-600" : "text-red-600"}`}
                    >
                      {campaign.trend === "up" ? "+" : ""}
                      {campaign.trendValue}% this week
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
