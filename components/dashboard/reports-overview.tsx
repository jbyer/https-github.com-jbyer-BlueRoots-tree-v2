"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Users, TrendingUp, Target, Calendar, Heart } from "lucide-react"

export function ReportsOverview() {
  const overviewData = [
    {
      title: "Total Funds Raised",
      value: "$156,789",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Across all campaigns",
    },
    {
      title: "Total Donors",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      description: "Unique contributors",
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Target,
      description: "Currently running",
    },
    {
      title: "Average Goal Progress",
      value: "67%",
      change: "+15%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Across all campaigns",
    },
  ]

  const campaignProgress = [
    { name: "Education Reform Initiative", raised: 45000, goal: 50000, progress: 90 },
    { name: "Community Health Center", raised: 32000, goal: 75000, progress: 43 },
    { name: "Youth Sports Program", raised: 18500, goal: 25000, progress: 74 },
    { name: "Environmental Cleanup", raised: 8900, goal: 15000, progress: 59 },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${item.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {item.change}
                </span>{" "}
                from last month
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Campaign Progress Overview
          </CardTitle>
          <CardDescription>Current progress of your active campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignProgress.map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()} raised
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{campaign.progress}%</p>
                  </div>
                </div>
                <Progress value={campaign.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest donations and campaign updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { donor: "Anonymous", amount: 250, campaign: "Education Reform Initiative", time: "2 hours ago" },
              { donor: "Sarah Johnson", amount: 100, campaign: "Community Health Center", time: "4 hours ago" },
              { donor: "Mike Chen", amount: 75, campaign: "Youth Sports Program", time: "6 hours ago" },
              { donor: "Lisa Rodriguez", amount: 500, campaign: "Environmental Cleanup", time: "1 day ago" },
              { donor: "David Kim", amount: 150, campaign: "Education Reform Initiative", time: "1 day ago" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                  <Heart className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {activity.donor} donated ${activity.amount}
                  </p>
                  <p className="text-sm text-muted-foreground">to {activity.campaign}</p>
                </div>
                <div className="text-sm text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
