"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"

export function ReportsCharts() {
  const monthlyData = [
    { month: "Jan", donations: 12500, donors: 89, campaigns: 3 },
    { month: "Feb", donations: 18900, donors: 134, campaigns: 4 },
    { month: "Mar", donations: 25600, donors: 178, campaigns: 5 },
    { month: "Apr", donations: 31200, donors: 223, campaigns: 6 },
    { month: "May", donations: 28800, donors: 198, campaigns: 7 },
    { month: "Jun", donations: 35400, donors: 267, campaigns: 8 },
  ]

  const categoryData = [
    { name: "Education", value: 45000, color: "#3b82f6" },
    { name: "Healthcare", value: 32000, color: "#10b981" },
    { name: "Environment", value: 18500, color: "#f59e0b" },
    { name: "Sports", value: 8900, color: "#ef4444" },
    { name: "Community", value: 15600, color: "#8b5cf6" },
  ]

  const donorRetentionData = [
    { month: "Jan", newDonors: 45, returningDonors: 23 },
    { month: "Feb", newDonors: 67, returningDonors: 34 },
    { month: "Mar", newDonors: 89, returningDonors: 45 },
    { month: "Apr", newDonors: 78, returningDonors: 56 },
    { month: "May", newDonors: 92, returningDonors: 67 },
    { month: "Jun", newDonors: 105, returningDonors: 78 },
  ]

  const campaignPerformanceData = [
    { name: "Week 1", views: 1200, donations: 450 },
    { name: "Week 2", views: 1800, donations: 680 },
    { name: "Week 3", views: 2400, donations: 920 },
    { name: "Week 4", views: 2100, donations: 780 },
    { name: "Week 5", views: 2800, donations: 1100 },
    { name: "Week 6", views: 3200, donations: 1350 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Monthly Donations Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Donations Trend</CardTitle>
          <CardDescription>Total donations and donor count over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "donations" ? `$${value.toLocaleString()}` : value,
                  name === "donations" ? "Donations" : "Donors",
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="donations"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="donors"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Donations by Category</CardTitle>
          <CardDescription>Distribution of funds across different campaign categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donor Retention */}
      <Card>
        <CardHeader>
          <CardTitle>Donor Retention</CardTitle>
          <CardDescription>New vs returning donors over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donorRetentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="newDonors" stackId="a" fill="#3b82f6" name="New Donors" />
              <Bar dataKey="returningDonors" stackId="a" fill="#10b981" name="Returning Donors" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Performance */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Views vs donations correlation over recent weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={campaignPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === "donations" ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === "donations" ? "Donations" : "Views",
                ]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="views"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                name="views"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="donations"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                name="donations"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
