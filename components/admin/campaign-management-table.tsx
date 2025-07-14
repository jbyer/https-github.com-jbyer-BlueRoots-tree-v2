"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Play, Pause, CheckCircle, XCircle, Edit, Trash2, DollarSign, Users } from "lucide-react"

export function CampaignManagementTable() {
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      title: "Education for Underprivileged Children",
      creator: "John Smith",
      creatorEmail: "john.smith@email.com",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      goal: 10000,
      raised: 7500,
      donors: 45,
      progress: 75,
      createdAt: "2024-01-10",
      endDate: "2024-03-15",
      category: "Education",
    },
    {
      id: "2",
      title: "Clean Water Initiative",
      creator: "Green Earth Foundation",
      creatorEmail: "contact@greenearth.org",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      status: "active",
      goal: 25000,
      raised: 18750,
      donors: 123,
      progress: 75,
      createdAt: "2024-01-05",
      endDate: "2024-04-30",
      category: "Environment",
    },
    {
      id: "3",
      title: "Community Garden Project",
      creator: "Sarah Johnson",
      creatorEmail: "sarah.j@example.com",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      status: "paused",
      goal: 5000,
      raised: 3200,
      donors: 28,
      progress: 64,
      createdAt: "2024-01-08",
      endDate: "2024-02-28",
      category: "Community",
    },
    {
      id: "4",
      title: "Local Library Renovation",
      creator: "Mike Davis",
      creatorEmail: "mike.d@library.org",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      status: "completed",
      goal: 8000,
      raised: 8500,
      donors: 67,
      progress: 106,
      createdAt: "2023-11-15",
      endDate: "2023-12-31",
      category: "Education",
    },
    {
      id: "5",
      title: "Emergency Relief Fund",
      creator: "Relief Organization",
      creatorEmail: "help@relief.org",
      creatorAvatar: "/placeholder.svg?height=32&width=32",
      status: "under_review",
      goal: 50000,
      raised: 0,
      donors: 0,
      progress: 0,
      createdAt: "2024-01-20",
      endDate: "2024-06-30",
      category: "Emergency",
    },
  ])

  const handleStatusChange = (campaignId: string, newStatus: string) => {
    setCampaigns(
      campaigns.map((campaign) => (campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign)),
    )
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
      case "under_review":
        return <Badge className="bg-orange-100 text-orange-800">Under Review</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      Education: "bg-blue-100 text-blue-800",
      Environment: "bg-green-100 text-green-800",
      Community: "bg-purple-100 text-purple-800",
      Emergency: "bg-red-100 text-red-800",
      Health: "bg-pink-100 text-pink-800",
    }
    return <Badge className={colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{category}</Badge>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Raised</TableHead>
            <TableHead>Donors</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{campaign.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getCategoryBadge(campaign.category)}
                    <span className="text-xs text-gray-500">Goal: ${campaign.goal.toLocaleString()}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={campaign.creatorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {campaign.creator
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{campaign.creator}</p>
                    <p className="text-xs text-gray-500">{campaign.creatorEmail}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(campaign.status)}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2 w-20" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">${campaign.raised.toLocaleString()}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>{campaign.donors}</span>
                </div>
              </TableCell>
              <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Campaign
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Campaign
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {campaign.status === "active" ? (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(campaign.id, "paused")}
                        className="text-yellow-600"
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Pause Campaign
                      </DropdownMenuItem>
                    ) : campaign.status === "paused" ? (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(campaign.id, "active")}
                        className="text-green-600"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Resume Campaign
                      </DropdownMenuItem>
                    ) : campaign.status === "under_review" ? (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(campaign.id, "active")}
                          className="text-green-600"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(campaign.id, "cancelled")}
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject Campaign
                        </DropdownMenuItem>
                      </>
                    ) : null}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Campaign
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
