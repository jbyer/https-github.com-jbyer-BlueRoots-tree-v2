import { DashboardCampaignCreateForm } from "@/components/dashboard/dashboard-campaign-create-form"

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 space-y-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600 mt-2">Start your political fundraising campaign</p>
        </div>

        {/* Campaign Creation Form */}
        <DashboardCampaignCreateForm />

        {/* Support Section */}
        {/*<div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help Getting Started?</h3>
              <p className="text-blue-700 mb-4">
                Our campaign specialists are here to help you succeed. Get personalized guidance on strategy, messaging,
                and fundraising best practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Schedule Consultation
                </button>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  View Resources
                </button>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  )
}
