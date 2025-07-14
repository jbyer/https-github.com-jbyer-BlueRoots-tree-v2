"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DollarSign,
  Target,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Eye,
  Edit,
  Pause,
  Play,
  Trash2,
} from "lucide-react"

interface UserProfileViewProps {
  userId: string
}

export function UserProfileView({ userId }: UserProfileViewProps) {
  // Mock data - in real app, fetch based on userId
  const userProfile = {
    personalInfo: {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, CA 90210",
      website: "johnsmith.com",
      joinDate: "2024-01-15",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    stats: {
      totalCampaigns: 3,
      activeCampaigns: 2,
      totalRaised: 15420,
      totalDonors: 89,
      averageDonation: 173,
    },
    campaigns: [
      {
        id: "1",
        title: "Education for Underprivileged Children",
        status: "active",
        goal: 10000,
        raised: 7500,
        donors: 45,
        createdAt: "2024-01-10",
        endDate: "2024-03-15",
      },
      {
        id: "2",
        title: "Community Garden Project",
        status: "active",
        goal: 5000,
        raised: 3200,
        donors: 28,
        createdAt: "2024-01-05",
        endDate: "2024-02-28",
      },
      {
        id: "3",
        title: "Local Library Renovation",
        status: "completed",
        goal: 8000,
        raised: 8500,
        donors: 67,
        createdAt: "2023-11-15",
        endDate: "2023-12-31",
      },
    ],
    recentActivity: [
      {
        id: "1",
        type: "donation_received",
        description: "Received $50 donation for Education campaign",
        timestamp: "2024-01-20T10:30:00Z",
      },
      {
        id: "2",
        type: "campaign_updated",
        description: "Updated Community Garden Project description",
        timestamp: "2024-01-19T15:45:00Z",
      },
      {
        id: "3",
        type: "campaign_created",
        description: "Created new campaign: Education for Underprivileged Children",
        timestamp: "2024-01-10T09:00:00Z",
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{userProfile.stats.totalCampaigns}</p>
                  <p className="text-xs text-gray-600">Total Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{userProfile.stats.activeCampaigns}</p>
                  <p className="text-xs text-gray-600">Active Campaigns</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">${userProfile.stats.totalRaised.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Total Raised</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{userProfile.stats.totalDonors}</p>
                  <p className="text-xs text-gray-600">Total Donors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">${userProfile.stats.averageDonation}</p>
                  <p className="text-xs text-gray-600">Avg Donation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Overview of user's campaign activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProfile.campaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{campaign.title}</p>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${campaign.raised.toLocaleString()} raised</span>
                      <span>
                        {Math.round((campaign.raised / campaign.goal) * 100)}% of ${campaign.goal.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest user actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProfile.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="campaigns" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>User Campaigns</CardTitle>
            <CardDescription>Manage and monitor all campaigns created by this user</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Donors</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userProfile.campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{campaign.title}</p>
                        <p className="text-sm text-gray-500">Goal: ${campaign.goal.toLocaleString()}</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>${campaign.raised.toLocaleString()}</span>
                          <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                        </div>
                        <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>{campaign.donors}</TableCell>
                    <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {campaign.status === "active" ? (
                          <Button size="sm" variant="outline">
                            <Pause className="h-3 w-3" />
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activity" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Detailed history of user actions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {userProfile.recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    {index < userProfile.recentActivity.length - 1 && (
                      <div className="w-px h-12 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>User's personal and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile.personalInfo.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {userProfile.personalInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{userProfile.personalInfo.name}</h3>
                    <p className="text-gray-600">Individual Fundraiser</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{userProfile.personalInfo.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{userProfile.personalInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{userProfile.personalInfo.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{userProfile.personalInfo.website}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Joined {new Date(userProfile.personalInfo.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Account Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Email Verified</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Phone Verified</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Identity Verified</span>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bank Account</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
