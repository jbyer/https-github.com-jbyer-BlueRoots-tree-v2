"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Target,
  UserCheck,
  Settings,
  Shield,
  AlertTriangle,
  BarChart3,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Registration Review", href: "/admin/registrations", icon: UserCheck },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Campaign Management", href: "/admin/campaigns", icon: Target },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Reports", href: "/admin/reports", icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg border-r">
      <div className="flex items-center justify-center h-16 px-4 bg-red-600">
        <Shield className="h-6 w-6 text-white mr-2" />
        <h1 className="text-xl font-bold text-white">Super Admin</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-red-100 text-red-700 border-l-4 border-red-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t">
        <div className="flex items-center text-sm text-gray-500">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Super User Access
        </div>
      </div>
    </div>
  )
}
