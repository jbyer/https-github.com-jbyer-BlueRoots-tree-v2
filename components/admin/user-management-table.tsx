"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, UserCheck, UserX, Shield, Trash2, Edit, DollarSign } from "lucide-react"
import Link from "next/link"

export function UserManagementTable() {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Individual",
      status: "active",
      joinDate: "2024-01-15",
      campaignsCount: 3,
      totalRaised: 15420,
      lastActive: "2024-01-20",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "2",
      name: "Green Earth Foundation",
      email: "contact@greenearth.org",
      role: "Non-profit",
      status: "active",
      joinDate: "2024-01-10",
      campaignsCount: 8,
      totalRaised: 89750,
      lastActive: "2024-01-19",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      role: "Individual",
      status: "suspended",
      joinDate: "2024-01-08",
      campaignsCount: 1,
      totalRaised: 2340,
      lastActive: "2024-01-18",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "4",
      name: "Tech for Good Inc",
      email: "hello@techforgood.com",
      role: "Business",
      status: "pending",
      joinDate: "2024-01-20",
      campaignsCount: 0,
      totalRaised: 0,
      lastActive: "2024-01-20",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      Individual: "bg-blue-100 text-blue-800",
      "Non-profit": "bg-green-100 text-green-800",
      Business: "bg-purple-100 text-purple-800",
      "Political Organization": "bg-red-100 text-red-800",
    }
    return <Badge className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{role}</Badge>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Campaigns</TableHead>
            <TableHead>Total Raised</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{getStatusBadge(user.status)}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{user.campaignsCount}</span>
                  <span className="text-gray-500">campaigns</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">${user.totalRaised.toLocaleString()}</span>
                </div>
              </TableCell>
              <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
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
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/users/${user.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {user.status === "active" ? (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(user.id, "suspended")}
                        className="text-red-600"
                      >
                        <UserX className="mr-2 h-4 w-4" />
                        Suspend User
                      </DropdownMenuItem>
                    ) : user.status === "suspended" ? (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(user.id, "active")}
                        className="text-green-600"
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Activate User
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(user.id, "active")}
                        className="text-green-600"
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Approve User
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete User
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
