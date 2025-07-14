import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, Users, TrendingUp, Edit, Share2 } from "lucide-react"
import Link from "next/link"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  // Mock campaign data - in a real app, this would be fetched based on the ID
  const campaign = {
    id: params.id,
    title: "Support Progressive Education Reform",
    description:
      "Help us transform public education with innovative programs and increased funding for underserved communities.",
    goal: 50000,
    raised: 32500,
    donors: 156,
    daysLeft: 23,
    status: "active",
    category: "Education",
    createdAt: "2024-01-15",
  }

  const progressPercentage = (campaign.raised / campaign.goal) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
            <span className="text-gray-500">Campaign #{campaign.id}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button asChild size="sm">
            <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${campaign.raised.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% of ${campaign.goal.toLocaleString()} goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.donors}</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Left</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.daysLeft}</div>
            <p className="text-xs text-muted-foreground">Until campaign ends</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(campaign.raised / campaign.donors)}</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Progress</CardTitle>
          <CardDescription>Track your fundraising progress toward your goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${campaign.raised.toLocaleString()} raised</span>
              <span>${campaign.goal.toLocaleString()} goal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{campaign.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest contributions to your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Donation history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Analytics</CardTitle>
              <CardDescription>Detailed performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Analytics dashboard will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Settings</CardTitle>
              <CardDescription>Manage your campaign configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Campaign settings will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
