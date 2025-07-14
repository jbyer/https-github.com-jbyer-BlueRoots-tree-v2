import type { Metadata } from "next"
import { AdminEditCampaignForm } from "@/components/admin/admin-edit-campaign-form"

export const metadata: Metadata = {
  title: "Edit Campaign - Admin Dashboard",
  description: "Edit your fundraising campaign details and settings",
}

interface EditCampaignPageProps {
  params: {
    id: string
  }
}

export default function EditCampaignPage({ params }: EditCampaignPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Campaign</h1>
          <p className="text-gray-600">Update your campaign information, goals, and settings.</p>
        </div>

        <AdminEditCampaignForm campaignId={params.id} />
      </div>
    </div>
  )
}
