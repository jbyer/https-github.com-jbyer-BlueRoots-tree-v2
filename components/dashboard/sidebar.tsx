"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LayoutDashboard, LogOut, Menu, X, Plus, FileText, User, Mic, MessageSquare, ExternalLink } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create Campaign", href: "/dashboard/create-campaign", icon: Plus },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Voice", href: "https://voice.blueroots.io/", icon: Mic },
  { name: "Text", href: "https://text.blueroots.io/pricing", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showRedirectDialog, setShowRedirectDialog] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState("")
  const [redirectTitle, setRedirectTitle] = useState("")
  const [countdown, setCountdown] = useState(5)
  const pathname = usePathname()

  const handleExternalLinkClick = (e: React.MouseEvent, href: string, title: string) => {
    e.preventDefault()
    setRedirectUrl(href)
    setRedirectTitle(title)
    setShowRedirectDialog(true)
    setCountdown(5)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (showRedirectDialog && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (showRedirectDialog && countdown === 0) {
      window.open(redirectUrl, "_blank", "noopener,noreferrer")
      setShowRedirectDialog(false)
      setCountdown(5)
    }
    return () => clearTimeout(timer)
  }, [showRedirectDialog, countdown, redirectUrl])

  const handleCancelRedirect = () => {
    setShowRedirectDialog(false)
    setCountdown(5)
  }

  const handleRedirectNow = () => {
    window.open(redirectUrl, "_blank", "noopener,noreferrer")
    setShowRedirectDialog(false)
    setCountdown(5)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-sm text-gray-500 truncate">Campaign Manager</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4 bg-blue-50">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                const isExternalLink = item.href.startsWith("http")

                if (isExternalLink) {
                  return (
                    <button
                      key={item.name}
                      onClick={(e) => handleExternalLinkClick(e, item.href, item.name)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors group text-left",
                        "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 transition-colors",
                          item.name === "Create Campaign" && "text-red-500 group-hover:text-red-600",
                          item.name === "Voice" && "text-purple-500 group-hover:text-purple-600",
                          item.name === "Text" && "text-green-500 group-hover:text-green-600",
                          item.name !== "Create Campaign" &&
                            item.name !== "Voice" &&
                            item.name !== "Text" &&
                            "text-current",
                        )}
                      />
                      <span className="flex-1">{item.name}</span>
                      <ExternalLink className="ml-2 h-3 w-3 text-gray-400" />
                    </button>
                  )
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group",
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        item.name === "Create Campaign" && "text-red-500 group-hover:text-red-600",
                        item.name === "Voice" && "text-purple-500 group-hover:text-purple-600",
                        item.name === "Text" && "text-green-500 group-hover:text-green-600",
                        item.name !== "Create Campaign" &&
                          item.name !== "Voice" &&
                          item.name !== "Text" &&
                          "text-current",
                      )}
                    />
                    <span className="flex-1">{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* External Link Redirect Dialog */}
      <Dialog open={showRedirectDialog} onOpenChange={setShowRedirectDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-blue-500" />
              External Website Redirect
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              You are being redirected to <span className="font-semibold text-gray-900">{redirectTitle}</span>, an
              external website.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-6">
            <div className="relative w-20 h-20 mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (countdown / 5)}`}
                  className="text-blue-500 transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">{countdown}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Redirecting in <span className="font-semibold">{countdown}</span> second{countdown !== 1 ? "s" : ""}...
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCancelRedirect} className="w-full sm:w-auto bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleRedirectNow} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="mr-2 h-4 w-4" />
              Go Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
