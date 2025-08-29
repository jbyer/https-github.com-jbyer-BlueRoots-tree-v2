import { DashboardCampaignCreateForm } from "@/components/dashboard/dashboard-campaign-create-form"

export default function CreateCampaignPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
        <p className="text-gray-600 mt-2">Start your political fundraising campaign</p>
      </div>

      <div className="mb-[200px]">
        <DashboardCampaignCreateForm />
      </div>
    </div>
  )
}
