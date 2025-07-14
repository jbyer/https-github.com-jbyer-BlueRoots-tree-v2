import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export const metadata: Metadata = {
  title: "Super Admin Dashboard - BlueRoot",
  description: "Administrative control panel for managing users, campaigns, and registrations",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
