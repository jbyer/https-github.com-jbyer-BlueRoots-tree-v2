import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, Target, TrendingUp, Calendar, Eye, Share2, Heart } from "lucide-react"

export default function ReportsOverview() {
  const overviewStats = [
    {
      title: "Total Funds Raised",
      value: "$158,420",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Across all campaigns",
    },
    {
      title: "Total Donors",
      value: "1,247",
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
      title: "Avg. Goal Progress",
      value: "67%",
      change: "+5.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Across all campaigns",
    },
  ]

  const campaignProgress = [
    {
      name: "Education Reform Initiative",
      raised: 85000,
      goal: 100000,
      progress: 85,
      donors: 342,
      category: "Education",
      status: "active",
    },
    {
      name: "Community Health Center",
      raised: 42000,
      goal: 75000,
      progress: 56,
      donors: 189,
      category: "Healthcare",
      status: "active",
    },
    {
      name: "Youth Arts Program",
      raised: 18500,
      goal: 25000,
      progress: 74,
      donors: 156,
      category: "Arts",
      status: "active",
    },
    {
      name: "Environmental Cleanup",
      raised: 12920,
      goal: 50000,
      progress: 26,
      donors: 98,
      category: "Environment",
      status: "active",
    },
  ]

  const recentActivity = [
    {
      type: "donation",
      message: "Sarah M. donated $250 to Education Reform Initiative",
      time: "2 minutes ago",
      icon: Heart,
    },
    {
      type: "milestone",
      message: "Community Health Center reached 50% funding goal",
      time: "1 hour ago",
      icon: Target,
    },
    {
      type: "share",
      message: "Youth Arts Program was shared 15 times on social media",
      time: "3 hours ago",
      icon: Share2,
    },
    {
      type: "view",
      message: "Environmental Cleanup received 89 new page views",
      time: "5 hours ago",
      icon: Eye,
    },
    {
      type: "donation",
      message: "Michael R. donated $100 to Youth Arts Program",
      time: "6 hours ago",
      icon: Heart,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className={`font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaign Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Progress Overview</CardTitle>
          <CardDescription>Current status of all active campaigns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {campaignProgress.map((campaign) => (
            <div key={campaign.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{campaign.name}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {campaign.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{campaign.donors} donors</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{campaign.progress}% funded</div>
                </div>
              </div>
              <Progress value={campaign.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <activity.icon className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
