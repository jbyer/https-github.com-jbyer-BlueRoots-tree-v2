import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminStats } from "@/components/admin/admin-stats"
import { Badge } from "@/components/ui/badge"
import { Users, Target, FileText, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function AdminDashboardPage() {
  const recentActivity = [
    {
      id: 1,
      type: "registration",
      message: "New user registration pending review",
      user: "John Smith",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: 2,
      type: "campaign",
      message: "Campaign 'Education for All' requires approval",
      user: "Sarah Johnson",
      time: "15 minutes ago",
      status: "review",
    },
    {
      id: 3,
      type: "user",
      message: "User profile updated - verification needed",
      user: "Mike Davis",
      time: "1 hour ago",
      status: "pending",
    },
    {
      id: 4,
      type: "campaign",
      message: "Campaign 'Clean Water Initiative' approved",
      user: "Green Earth Org",
      time: "2 hours ago",
      status: "approved",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
        <p className="text-gray-600">Monitor and manage all platform activities</p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium">Registration Reviews</p>
                  <p className="text-sm text-gray-600">12 pending approvals</p>
                </div>
                <Badge variant="destructive">Urgent</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium">Campaign Approvals</p>
                  <p className="text-sm text-gray-600">8 awaiting review</p>
                </div>
                <Badge variant="secondary">Review</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium">Document Verification</p>
                  <p className="text-sm text-gray-600">5 documents to verify</p>
                </div>
                <Badge variant="outline">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.status === "pending" && <Clock className="h-4 w-4 text-orange-500 mt-1" />}
                    {activity.status === "review" && <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />}
                    {activity.status === "approved" && <CheckCircle className="h-4 w-4 text-green-500 mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Manage user accounts, profiles, and permissions</p>
            <div className="flex justify-between text-sm">
              <span>
                Active Users: <strong>1,247</strong>
              </span>
              <span>
                Pending: <strong>23</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Target className="h-5 w-5 mr-2 text-green-600" />
              Campaign Oversight
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Monitor and control campaign activities</p>
            <div className="flex justify-between text-sm">
              <span>
                Active: <strong>89</strong>
              </span>
              <span>
                Under Review: <strong>12</strong>
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              Document Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Review registration documents and verifications</p>
            <div className="flex justify-between text-sm">
              <span>
                Approved: <strong>156</strong>
              </span>
              <span>
                Pending: <strong>18</strong>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
