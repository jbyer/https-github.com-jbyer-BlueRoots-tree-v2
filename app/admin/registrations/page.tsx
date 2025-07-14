import { Card, CardContent } from "@/components/ui/card"
import { RegistrationReview } from "@/components/admin/registration-review"
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"

export default function RegistrationReviewPage() {
  const registrationStats = [
    {
      title: "Pending Review",
      value: "12",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Approved Today",
      value: "8",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Rejected",
      value: "3",
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      title: "Total Processed",
      value: "156",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Registration Document Review</h1>
        <p className="text-gray-600">Review and approve user registration documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {registrationStats.map((stat) => (
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

      <RegistrationReview />
    </div>
  )
}
