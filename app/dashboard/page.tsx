import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { DashboardCampaignList } from "@/components/dashboard/dashboard-campaign-list"

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your campaigns.</p>
      </div>

      <DashboardStats />
      <div className="mb-8">
        <DashboardCampaignList />
      </div>
    </div>
  )
}
