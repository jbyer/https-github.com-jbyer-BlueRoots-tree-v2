import { DashboardCampaignList } from "@/components/dashboard/dashboard-campaign-list"

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
        <p className="text-gray-600 mt-2">Manage and track all your political campaigns</p>
      </div>

      <DashboardCampaignList />
    </div>
  )
}
