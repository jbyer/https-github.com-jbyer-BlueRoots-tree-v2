"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Upload,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Calendar,
  CreditCard,
  Shield,
  Bell,
  Globe,
  FileText,
  AlertTriangle,
} from "lucide-react"

export function AdminUserProfileEdit() {
  const [activeTab, setActiveTab] = useState("personal")
  const [showPassword, setShowPassword] = useState(false)

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    profilePicture: null as File | null,
  })

  // Organization Information State
  const [organizationInfo, setOrganizationInfo] = useState({
    role: "Non-profit",
    organizationName: "Democracy Action Fund",
    website: "https://democracyaction.org",
    socialHandle: "@democracyaction",
    incorporationDate: "2020-03-15",
    taxId: "12-3456789",
  })

  // Address Information State
  const [addressInfo, setAddressInfo] = useState({
    street: "123 Democracy Ave",
    city: "Washington",
    state: "DC",
    zipCode: "20001",
    country: "United States",
    timezone: "America/New_York",
  })

  // Banking Information State
  const [bankingInfo, setBankingInfo] = useState({
    accountNumber: "****1234",
    routingNumber: "****5678",
    bankName: "First National Bank",
  })

  // Verification Documents State
  const [verificationInfo, setVerificationInfo] = useState({
    governmentId: null as File | null,
    idType: "Driver's License",
    idNumber: "****6789",
    verificationStatus: "Verified",
  })

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    campaignUpdates: true,
    donationReceipts: true,
    weeklyDigest: false,
  })

  // Privacy & Terms State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "Public",
    dataSharing: false,
    termsAccepted: true,
    privacyAccepted: true,
  })

  const handlePersonalInfoUpdate = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleOrganizationUpdate = (field: string, value: string) => {
    setOrganizationInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressUpdate = (field: string, value: string) => {
    setAddressInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleBankingUpdate = (field: string, value: string) => {
    setBankingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handlePrivacyUpdate = (field: string, value: string | boolean) => {
    setPrivacySettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File | null) => {
    if (field === "profilePicture") {
      setPersonalInfo((prev) => ({ ...prev, profilePicture: file }))
    } else if (field === "governmentId") {
      setVerificationInfo((prev) => ({ ...prev, governmentId: file }))
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                    <AvatarFallback className="text-lg">
                      {personalInfo.firstName[0]}
                      {personalInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Photo
                    </Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => handlePersonalInfoUpdate("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => handlePersonalInfoUpdate("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handlePersonalInfoUpdate("email", e.target.value)}
                    required
                  />
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoUpdate("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => handlePersonalInfoUpdate("dateOfBirth", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Change */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-medium">Change Password</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Information Tab */}
        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Organization Information
              </CardTitle>
              <CardDescription>Update your organization details and professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={organizationInfo.role}
                  onValueChange={(value) => handleOrganizationUpdate("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Non-profit">Non-profit</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Organization Name */}
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input
                  id="organizationName"
                  value={organizationInfo.organizationName}
                  onChange={(e) => handleOrganizationUpdate("organizationName", e.target.value)}
                  placeholder="Enter organization name (if applicable)"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={organizationInfo.website}
                    onChange={(e) => handleOrganizationUpdate("website", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Social Media Handle */}
              <div className="space-y-2">
                <Label htmlFor="socialHandle">Social Media Handle</Label>
                <Input
                  id="socialHandle"
                  value={organizationInfo.socialHandle}
                  onChange={(e) => handleOrganizationUpdate("socialHandle", e.target.value)}
                  placeholder="@username"
                />
              </div>

              {/* Incorporation Date */}
              <div className="space-y-2">
                <Label htmlFor="incorporationDate">Incorporation Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="incorporationDate"
                    type="date"
                    value={organizationInfo.incorporationDate}
                    onChange={(e) => handleOrganizationUpdate("incorporationDate", e.target.value)}
                  />
                </div>
              </div>

              {/* Tax ID */}
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="taxId"
                    value={organizationInfo.taxId}
                    onChange={(e) => handleOrganizationUpdate("taxId", e.target.value)}
                    placeholder="12-3456789"
                  />
                  <Badge variant="secondary" className="text-green-600">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Address Information Tab */}
        <TabsContent value="address" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Mailing Address
              </CardTitle>
              <CardDescription>Update your mailing address and location information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Street Address */}
              <div className="space-y-2">
                <Label htmlFor="street">Street Address *</Label>
                <Input
                  id="street"
                  value={addressInfo.street}
                  onChange={(e) => handleAddressUpdate("street", e.target.value)}
                  required
                />
              </div>

              {/* City, State, ZIP */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={addressInfo.city}
                    onChange={(e) => handleAddressUpdate("city", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={addressInfo.state}
                    onChange={(e) => handleAddressUpdate("state", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    value={addressInfo.zipCode}
                    onChange={(e) => handleAddressUpdate("zipCode", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={addressInfo.country} onValueChange={(value) => handleAddressUpdate("country", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone *</Label>
                <Select value={addressInfo.timezone} onValueChange={(value) => handleAddressUpdate("timezone", value)}>
                  <SelectTrigger>
                    <SelectValue />
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banking Information Tab */}
        <TabsContent value="banking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Banking Information
              </CardTitle>
              <CardDescription>Update your bank account details for payouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Secure Information</h4>
                    <p className="text-sm text-yellow-700">
                      Your banking information is encrypted and securely stored. We never store your full account
                      details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Name */}
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  value={bankingInfo.bankName}
                  onChange={(e) => handleBankingUpdate("bankName", e.target.value)}
                  required
                />
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={bankingInfo.accountNumber}
                  onChange={(e) => handleBankingUpdate("accountNumber", e.target.value)}
                  placeholder="Account number ending in 1234"
                  required
                />
              </div>

              {/* Routing Number */}
              <div className="space-y-2">
                <Label htmlFor="routingNumber">Routing Number *</Label>
                <Input
                  id="routingNumber"
                  value={bankingInfo.routingNumber}
                  onChange={(e) => handleBankingUpdate("routingNumber", e.target.value)}
                  placeholder="9-digit routing number"
                  required
                />
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full bg-transparent">
                  <Shield className="mr-2 h-4 w-4" />
                  Verify Bank Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verification Tab */}
        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Identity Verification
              </CardTitle>
              <CardDescription>Update your identity verification documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ID Type */}
              <div className="space-y-2">
                <Label htmlFor="idType">Government-Issued ID Type *</Label>
                <Select
                  value={verificationInfo.idType}
                  onValueChange={(value) => setVerificationInfo((prev) => ({ ...prev, idType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Driver's License">Driver's License</SelectItem>
                    <SelectItem value="Passport">Passport</SelectItem>
                    <SelectItem value="State ID">State ID</SelectItem>
                    <SelectItem value="Military ID">Military ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ID Number */}
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input
                  id="idNumber"
                  value={verificationInfo.idNumber}
                  onChange={(e) => setVerificationInfo((prev) => ({ ...prev, idNumber: e.target.value }))}
                  placeholder="Last 4 digits: 6789"
                />
              </div>

              {/* ID Upload */}
              <div className="space-y-2">
                <Label>Upload Government ID *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Button variant="outline">Choose File</Button>
                    <p className="mt-2 text-sm text-gray-500">Upload a clear photo of your government-issued ID</p>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Identity Verified</span>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  Verified
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <div className="grid gap-6">
            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive updates and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationUpdate("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive urgent alerts via text message</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationUpdate("smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive promotional content and updates</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationUpdate("marketingEmails", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Campaign Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified about campaign progress</p>
                    </div>
                    <Switch
                      checked={notifications.campaignUpdates}
                      onCheckedChange={(checked) => handleNotificationUpdate("campaignUpdates", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Donation Receipts</p>
                      <p className="text-sm text-muted-foreground">Receive receipts for tax purposes</p>
                    </div>
                    <Switch
                      checked={notifications.donationReceipts}
                      onCheckedChange={(checked) => handleNotificationUpdate("donationReceipts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">Summary of weekly activity</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationUpdate("weeklyDigest", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Terms</CardTitle>
                <CardDescription>Manage your privacy settings and agreements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={(value) => handlePrivacyUpdate("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                      <SelectItem value="Donors Only">Donors Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Data Sharing</p>
                    <p className="text-sm text-muted-foreground">Allow sharing anonymized data for research</p>
                  </div>
                  <Switch
                    checked={privacySettings.dataSharing}
                    onCheckedChange={(checked) => handlePrivacyUpdate("dataSharing", checked)}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="termsAccepted"
                      checked={privacySettings.termsAccepted}
                      onCheckedChange={(checked) => handlePrivacyUpdate("termsAccepted", checked)}
                    />
                    <Label htmlFor="termsAccepted" className="text-sm">
                      I agree to the Terms of Service and Privacy Policy
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}
