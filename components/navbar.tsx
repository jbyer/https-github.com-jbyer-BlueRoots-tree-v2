"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Settings, LogOut, BarChart3 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth state

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">BlueRoots</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/fundraisers" className="text-gray-700 hover:text-blue-600 transition-colors">
              Campaigns
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-blue-600 transition-colors">
              Help
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/register">Register</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="/fundraisers"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fundraisers
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/help"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Help
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setIsMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
