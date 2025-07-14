import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, DollarSign, FileCheck, TrendingUp, AlertTriangle } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active registered users",
    },
    {
      title: "Active Campaigns",
      value: "89",
      change: "+8%",
      changeType: "positive" as const,
      icon: Target,
      description: "Currently running campaigns",
    },
    {
      title: "Total Raised",
      value: "$2.4M",
      change: "+23%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Platform lifetime donations",
    },
    {
      title: "Pending Reviews",
      value: "23",
      change: "+5",
      changeType: "neutral" as const,
      icon: AlertTriangle,
      description: "Awaiting admin approval",
    },
    {
      title: "Verified Documents",
      value: "156",
      change: "+18",
      changeType: "positive" as const,
      icon: FileCheck,
      description: "Approved this month",
    },
    {
      title: "Platform Growth",
      value: "15.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Monthly user growth",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              <span
                className={`font-medium ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
