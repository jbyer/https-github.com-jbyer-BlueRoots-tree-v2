import { DashboardEditCampaignForm } from "@/components/dashboard/dashboard-edit-campaign-form"

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Campaign</h1>
        <p className="text-gray-600 mt-2">Update your campaign details and settings</p>
      </div>

      <DashboardEditCampaignForm campaignId={params.id} />
    </div>
  )
}
