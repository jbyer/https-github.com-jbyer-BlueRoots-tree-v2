"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Upload, Eye, EyeOff, Shield, Lock, AlertCircle, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function DashboardUserProfileEdit() {
  const [activeTab, setActiveTab] = useState("profile")
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [incorporationDate, setIncorporationDate] = useState<Date>()
  const [showAccountNumber, setShowAccountNumber] = useState(false)
  const [showRoutingNumber, setShowRoutingNumber] = useState(false)
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg?height=100&width=100")
  const [idDocument, setIdDocument] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Passionate about political change and community engagement.",
    organizationName: "Progressive Action Committee",
    website: "https://progressiveaction.org",
    role: "non-profit",
    taxId: "12-3456789",
    bankAccountHolder: "John Doe",
    bankName: "First National Bank",
    routingNumber: "123456789",
    accountNumber: "9876543210",
    accountType: "checking",
    timeZone: "America/New_York",
    notifications: {
      emailUpdates: true,
      donationAlerts: true,
      weeklyReports: false,
      marketingUpdates: true,
      securityAlerts: true,
      scheduledReminders: true,
    },
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIdDocument(file)
    }
  }

  const timeZones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
              <CardDescription>Update your personal details and profile photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage || "/placeholder.svg"} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="profile-photo" className="cursor-pointer">
                    <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span>Upload Photo</span>
                    </div>
                  </Label>
                  <Input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
                </div>
              </div>

              <Separator />

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
              </div>

              {/* Date of Birth */}
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

              {/* Time Zone */}
              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select value={formData.timeZone} onValueChange={(value) => handleInputChange("timeZone", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">Used to schedule updates and reminders correctly</p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  rows={4}
                  placeholder="Tell us about yourself and your political interests..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>Information about your organization or professional role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="non-profit">Non-profit Organization</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="political-org">Political Organization</SelectItem>
                    <SelectItem value="campaign">Campaign Committee</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Organization Name */}
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  placeholder="Enter organization name (if applicable)"
                />
                <p className="text-sm text-gray-500">Leave blank if you're registering as an individual</p>
              </div>

              {/* Website/Social Media */}
              <div className="space-y-2">
                <Label htmlFor="website">Website or Social Media Handle</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://example.com or @username"
                />
                <p className="text-sm text-gray-500">Optional: Your website, Twitter, or other social media handle</p>
              </div>

              {/* Incorporation Date */}
              <div className="space-y-2">
                <Label>Incorporation Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !incorporationDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {incorporationDate ? format(incorporationDate, "PPP") : "Select incorporation date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={incorporationDate} onSelect={setIncorporationDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-gray-500">For organizations: Date of incorporation or establishment</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Identity Verification</span>
              </CardTitle>
              <CardDescription>Secure verification for compliance and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Government ID Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="government-id">Government-Issued ID</Label>
                  <Badge variant="secondary">Required</Badge>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Label htmlFor="government-id" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700">Upload your ID document</span>
                  </Label>
                  <Input
                    id="government-id"
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    className="hidden"
                    onChange={handleIdUpload}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Driver's license, passport, or state ID. JPG, PNG, or PDF. Max 10MB.
                  </p>
                  {idDocument && (
                    <div className="mt-3 flex items-center justify-center space-x-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">{idDocument.name} uploaded</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tax ID */}
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                  placeholder="12-3456789 or 12-3456789"
                />
                <p className="text-sm text-gray-500">
                  For non-profits and businesses to enable tax-deductible receipts
                </p>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Information</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      All verification documents are encrypted and stored securely. We use bank-level security to
                      protect your personal information and comply with federal regulations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-green-600" />
                <span>Banking Information</span>
              </CardTitle>
              <CardDescription>Secure banking details for campaign payouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Holder */}
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name</Label>
                <Input
                  id="accountHolder"
                  value={formData.bankAccountHolder}
                  onChange={(e) => handleInputChange("bankAccountHolder", e.target.value)}
                />
              </div>

              {/* Bank Name */}
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange("bankName", e.target.value)}
                />
              </div>

              {/* Account Type */}
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange("accountType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                    <SelectItem value="business-checking">Business Checking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Routing Number */}
              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number</Label>
                <div className="relative">
                  <Input
                    id="routingNumber"
                    type={showRoutingNumber ? "text" : "password"}
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowRoutingNumber(!showRoutingNumber)}
                  >
                    {showRoutingNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <div className="relative">
                  <Input
                    id="accountNumber"
                    type={showAccountNumber ? "text" : "password"}
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                  >
                    {showAccountNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Bank-Level Security</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your banking information is encrypted with 256-bit SSL encryption and stored in compliance with
                      PCI DSS standards. We never store your full account details in plain text.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Email Notifications</h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailUpdates">Campaign Updates</Label>
                      <p className="text-sm text-gray-500">Important updates about your campaigns</p>
                    </div>
                    <Switch
                      id="emailUpdates"
                      checked={formData.notifications.emailUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("emailUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="donationAlerts">Donation Alerts</Label>
                      <p className="text-sm text-gray-500">Real-time notifications when you receive donations</p>
                    </div>
                    <Switch
                      id="donationAlerts"
                      checked={formData.notifications.donationAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("donationAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-gray-500">Weekly performance summaries and analytics</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={formData.notifications.weeklyReports}
                      onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingUpdates">Platform Updates</Label>
                      <p className="text-sm text-gray-500">New features, tips, and platform announcements</p>
                    </div>
                    <Switch
                      id="marketingUpdates"
                      checked={formData.notifications.marketingUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("marketingUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="securityAlerts">Security Alerts</Label>
                      <p className="text-sm text-gray-500">Important security notifications (always enabled)</p>
                    </div>
                    <Switch
                      id="securityAlerts"
                      checked={formData.notifications.securityAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("securityAlerts", checked)}
                      disabled
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="scheduledReminders">Scheduled Reminders</Label>
                      <p className="text-sm text-gray-500">Timezone-based reminders for campaign milestones</p>
                    </div>
                    <Switch
                      id="scheduledReminders"
                      checked={formData.notifications.scheduledReminders}
                      onCheckedChange={(checked) => handleNotificationChange("scheduledReminders", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Notification Schedule */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Notification Timing</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      All notifications will be sent according to your selected time zone:{" "}
                      <span className="font-medium">
                        {timeZones.find((tz) => tz.value === formData.timeZone)?.label || "Eastern Time (ET)"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
