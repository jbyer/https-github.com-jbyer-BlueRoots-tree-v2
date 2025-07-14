"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Camera, Save, Upload, CalendarIcon, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function DashboardUserProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{
    profileImage?: string
    governmentId?: File
  }>({})

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleFileUpload = (type: "profileImage" | "governmentId", file: File) => {
    if (type === "profileImage") {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedFiles((prev) => ({
          ...prev,
          profileImage: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: file,
      }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={uploadedFiles.profileImage || "/placeholder.svg?height=80&width=80"} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="relative bg-transparent">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload("profileImage", file)
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate about community development and social causes."
                />
              </div>

              <div className="space-y-2">
                <Label>Date of Birth</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateOfBirth && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date of birth"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dateOfBirth} onSelect={setDateOfBirth} initialFocus />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-gray-500">Required for age verification</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select defaultValue="America/New_York">
                  <SelectTrigger>
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                    <SelectItem value="Pacific/Honolulu">Hawaii Time (HST)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Used to schedule updates and reminders</p>
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="individual">
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="nonprofit">Non-profit Organization</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="political">Political Organization</SelectItem>
                    <SelectItem value="campaign">Campaign Committee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input id="organizationName" placeholder="Enter organization name (if applicable)" defaultValue="" />
                <p className="text-sm text-gray-500">Leave blank if you're an individual</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website or Social Media Handle</Label>
                <Input id="website" placeholder="https://example.com or @username" defaultValue="" />
                <p className="text-sm text-gray-500">Optional - your website or main social media handle</p>
              </div>

              <div className="space-y-2">
                <Label>Incorporation Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal text-muted-foreground bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Select incorporation date (if applicable)
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-gray-500">For organizations only - when was your entity established</p>
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Identity Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Verification Required</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      To comply with financial regulations and ensure platform security, we require identity
                      verification for all users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="governmentId">Government-Issued ID</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button variant="outline" className="relative bg-transparent">
                      Upload ID Document
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload("governmentId", file)
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload driver's license, passport, or state ID (PDF, JPG, PNG)
                  </p>
                  {uploadedFiles.governmentId && (
                    <p className="text-sm text-green-600 mt-2">✓ {uploadedFiles.governmentId.name} uploaded</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input id="taxId" placeholder="XX-XXXXXXX or XXX-XX-XXXX" defaultValue="" />
                <p className="text-sm text-gray-500">Required for non-profits and businesses to enable tax receipts</p>
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Submit for Verification"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Bank Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Secure Information</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your banking information is encrypted and securely stored. This is required for campaign payouts.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  placeholder="Full name as it appears on your bank account"
                  defaultValue=""
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" placeholder="Name of your bank" defaultValue="" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <div className="relative">
                    <Input
                      id="routingNumber"
                      placeholder="9-digit routing number"
                      type={showBankDetails ? "text" : "password"}
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <div className="relative">
                    <Input
                      id="accountNumber"
                      placeholder="Your account number"
                      type={showBankDetails ? "text" : "password"}
                      defaultValue=""
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setShowBankDetails(!showBankDetails)}>
                  {showBankDetails ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show Details
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="business">Business Checking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Bank Details"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive email updates about your campaigns</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Donation Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified when someone donates to your campaigns</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Updates</Label>
                    <p className="text-sm text-gray-500">Receive updates about new features and tips</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about account security events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Scheduled Reminders</Label>
                    <p className="text-sm text-gray-500">Receive reminders based on your timezone</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
