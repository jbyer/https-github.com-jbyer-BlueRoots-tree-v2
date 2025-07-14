import type { Metadata } from "next"
import DashboardUserProfileEdit from "@/components/dashboard/dashboard-user-profile-edit"

export const metadata: Metadata = {
  title: "Edit Profile - Dashboard",
  description: "Edit your user profile information",
}

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
        <p className="text-gray-600">Update your personal information and account settings.</p>
      </div>

      <DashboardUserProfileEdit />
    </div>
  )
}
