import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Edit, Eye, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const campaigns = [
  {
    id: "1",
    title: "Support Progressive Education Reform",
    description: "Help us transform public education with innovative programs and increased funding.",
    goal: 50000,
    raised: 32500,
    donors: 156,
    daysLeft: 23,
    status: "active",
    category: "Education",
  },
  {
    id: "2",
    title: "Clean Energy Initiative",
    description: "Promoting renewable energy solutions for a sustainable future.",
    goal: 75000,
    raised: 45200,
    donors: 203,
    daysLeft: 45,
    status: "active",
    category: "Environment",
  },
  {
    id: "3",
    title: "Healthcare Access for All",
    description: "Ensuring quality healthcare is accessible to every community member.",
    goal: 100000,
    raised: 89750,
    donors: 412,
    daysLeft: 12,
    status: "active",
    category: "Healthcare",
  },
]

export function DashboardCampaignList() {
  return (
    <div className="space-y-6 mb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Campaigns</h2>
        <Button asChild>
          <Link href="/dashboard/create-campaign">Create New Campaign</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-8">
        {campaigns.map((campaign) => {
          const progressPercentage = (campaign.raised / campaign.goal) * 100

          return (
            <Card key={campaign.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg line-clamp-2">{campaign.title}</CardTitle>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/campaigns/${campaign.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Campaign
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Campaign
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${campaign.raised.toLocaleString()} raised</span>
                    <span>${campaign.goal.toLocaleString()} goal</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{campaign.donors} donors</span>
                  <span className="text-gray-500">{campaign.daysLeft} days left</span>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/dashboard/campaigns/${campaign.id}`}>View Details</Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
