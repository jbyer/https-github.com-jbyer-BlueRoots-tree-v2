import { UserManagementTable } from "@/components/admin/user-management-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, UserCheck, UserX, Search, Filter } from "lucide-react"

export default function UserManagementPage() {
  const userStats = [
    {
      title: "Total Users",
      value: "1,247",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Users",
      value: "1,198",
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Suspended Users",
      value: "49",
      icon: UserX,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Monitor and manage user accounts and activities</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Export Users
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userStats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage user accounts, profiles, and permissions</CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UserManagementTable />
        </CardContent>
      </Card>
    </div>
  )
}
