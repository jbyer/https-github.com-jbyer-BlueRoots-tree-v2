"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

export default function ReportsCharts() {
  // Monthly donations trend data
  const monthlyData = [
    { month: "Jan", donations: 12500, donors: 89, avgDonation: 140 },
    { month: "Feb", donations: 18200, donors: 124, avgDonation: 147 },
    { month: "Mar", donations: 22800, donors: 156, avgDonation: 146 },
    { month: "Apr", donations: 28500, donors: 189, avgDonation: 151 },
    { month: "May", donations: 35200, donors: 234, avgDonation: 150 },
    { month: "Jun", donations: 41800, donors: 278, avgDonation: 150 },
  ]

  // Category distribution data
  const categoryData = [
    { name: "Education", value: 85000, color: "#8B5CF6" },
    { name: "Healthcare", value: 50750, color: "#EF4444" },
    { name: "Arts", value: 18500, color: "#EC4899" },
    { name: "Environment", value: 12920, color: "#10B981" },
    { name: "Community", value: 8250, color: "#F59E0B" },
  ]

  // Donor retention data
  const retentionData = [
    { month: "Jan", newDonors: 89, returningDonors: 0 },
    { month: "Feb", newDonors: 98, returningDonors: 26 },
    { month: "Mar", newDonors: 112, returningDonors: 44 },
    { month: "Apr", newDonors: 134, returningDonors: 55 },
    { month: "May", newDonors: 156, returningDonors: 78 },
    { month: "Jun", newDonors: 178, returningDonors: 100 },
  ]

  // Campaign performance correlation
  const performanceData = [
    { name: "Education Reform", views: 12500, donations: 85000, conversionRate: 2.74 },
    { name: "Health Center", views: 8900, donations: 42000, conversionRate: 2.12 },
    { name: "Arts Program", views: 5600, donations: 18500, conversionRate: 2.79 },
    { name: "Environmental", views: 3400, donations: 12920, conversionRate: 2.88 },
    { name: "Senior Care", views: 2100, donations: 8750, conversionRate: 3.19 },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Monthly Donations Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Donations Trend</CardTitle>
          <CardDescription>Donation amounts and donor count over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="donations"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
                name="Donations ($)"
              />
              <Area
                type="monotone"
                dataKey="donors"
                stackId="2"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
                name="Donors"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Funds by Category</CardTitle>
          <CardDescription>Distribution of raised funds across campaign categories</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donor Retention */}
      <Card>
        <CardHeader>
          <CardTitle>Donor Retention</CardTitle>
          <CardDescription>New vs returning donors by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="newDonors" fill="#3B82F6" name="New Donors" />
              <Bar dataKey="returningDonors" fill="#10B981" name="Returning Donors" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Campaign Performance Correlation */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Relationship between page views and donations by campaign</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Page Views" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="donations"
                stroke="#82ca9d"
                strokeWidth={3}
                name="Donations ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
