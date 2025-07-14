import { UserProfileView } from "@/components/admin/user-profile-view"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, UserCheck, UserX, Edit } from "lucide-react"
import Link from "next/link"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch user data based on params.id
  const userData = {
    id: params.id,
    name: "John Smith",
    email: "john.smith@email.com",
    role: "Individual",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/users">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600">User Profile & Activity Dashboard</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
          {userData.status === "active" ? (
            <Button variant="destructive">
              <UserX className="h-4 w-4 mr-2" />
              Suspend User
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              <UserCheck className="h-4 w-4 mr-2" />
              Activate User
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Status</p>
              <Badge
                className={userData.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
              >
                {userData.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Role</p>
              <Badge variant="outline">{userData.role}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Join Date</p>
              <p className="font-medium">{new Date(userData.joinDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Last Active</p>
              <p className="font-medium">{new Date(userData.lastActive).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserProfileView userId={params.id} />
    </div>
  )
}
