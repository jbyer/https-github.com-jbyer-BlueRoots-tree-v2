"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Plus, X, Mail, Users, Target, Gift, HandHeart, HelpCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TeamMember {
  email: string
  role: string
  permissions: string[]
}

interface Milestone {
  id: string
  percentage: number
  amount: number
  title: string
  description: string
}

interface RewardTier {
  id: string
  minAmount: number
  title: string
  description: string
  estimatedDelivery: string
  quantity?: number
}

interface MatchingDonor {
  id: string
  name: string
  matchAmount: number
  matchRatio: number
  conditions: string
}

interface CustomQuestion {
  id: string
  question: string
  type: "text" | "textarea" | "select" | "checkbox"
  required: boolean
  options?: string[]
}

export function DashboardCampaignCreateForm() {
  const [endDate, setEndDate] = useState<Date>()
  const [imageGallery, setImageGallery] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState("")

  // New state for optional elements
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [newTeamMember, setNewTeamMember] = useState({ email: "", role: "", permissions: [] as string[] })

  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [newMilestone, setNewMilestone] = useState({ percentage: 0, title: "", description: "" })

  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([])
  const [newRewardTier, setNewRewardTier] = useState({
    minAmount: 0,
    title: "",
    description: "",
    estimatedDelivery: "",
    quantity: undefined as number | undefined,
  })

  const [matchingDonors, setMatchingDonors] = useState<MatchingDonor[]>([])
  const [newMatchingDonor, setNewMatchingDonor] = useState({ name: "", matchAmount: 0, matchRatio: 1, conditions: "" })

  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([])
  const [newCustomQuestion, setNewCustomQuestion] = useState({
    question: "",
    type: "text" as const,
    required: false,
    options: [] as string[],
  })

  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    tagline: "",
    category: "",
    visibility: "public",

    // Financial Details
    targetAmount: "",
    currency: "USD",

    // Content & Media
    detailedDescription: "",
    coverImageUrl: "",

    // Recipient Information
    recipientName: "",
    recipientRelationship: "",

    // Fund Management
    fundDelivery: "",

    // Communication
    donorUpdatesOptIn: false,
    facebookMessage: "",
    twitterMessage: "",
    linkedinMessage: "",

    // Terms & Legal
    campaignTerms: "",
    requiredDisclaimers: "",
    indemnificationConfirmed: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addImageToGallery = () => {
    if (newImageUrl && imageGallery.length < 10) {
      setImageGallery([...imageGallery, newImageUrl])
      setNewImageUrl("")
    }
  }

  const removeImageFromGallery = (index: number) => {
    setImageGallery(imageGallery.filter((_, i) => i !== index))
  }

  // Team Members functions
  const addTeamMember = () => {
    if (newTeamMember.email && newTeamMember.role) {
      setTeamMembers([...teamMembers, { ...newTeamMember }])
      setNewTeamMember({ email: "", role: "", permissions: [] })
    }
  }

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index))
  }

  const togglePermission = (permission: string) => {
    setNewTeamMember((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  // Milestones functions
  const addMilestone = () => {
    if (newMilestone.percentage && newMilestone.title && formData.targetAmount) {
      const amount = (Number.parseFloat(formData.targetAmount) * newMilestone.percentage) / 100
      const milestone: Milestone = {
        id: Date.now().toString(),
        ...newMilestone,
        amount,
      }
      setMilestones([...milestones, milestone].sort((a, b) => a.percentage - b.percentage))
      setNewMilestone({ percentage: 0, title: "", description: "" })
    }
  }

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  // Reward Tiers functions
  const addRewardTier = () => {
    if (newRewardTier.minAmount && newRewardTier.title) {
      const rewardTier: RewardTier = {
        id: Date.now().toString(),
        ...newRewardTier,
      }
      setRewardTiers([...rewardTiers, rewardTier].sort((a, b) => a.minAmount - b.minAmount))
      setNewRewardTier({ minAmount: 0, title: "", description: "", estimatedDelivery: "", quantity: undefined })
    }
  }

  const removeRewardTier = (id: string) => {
    setRewardTiers(rewardTiers.filter((r) => r.id !== id))
  }

  // Matching Donors functions
  const addMatchingDonor = () => {
    if (newMatchingDonor.name && newMatchingDonor.matchAmount) {
      const matchingDonor: MatchingDonor = {
        id: Date.now().toString(),
        ...newMatchingDonor,
      }
      setMatchingDonors([...matchingDonors, matchingDonor])
      setNewMatchingDonor({ name: "", matchAmount: 0, matchRatio: 1, conditions: "" })
    }
  }

  const removeMatchingDonor = (id: string) => {
    setMatchingDonors(matchingDonors.filter((m) => m.id !== id))
  }

  // Custom Questions functions
  const addCustomQuestion = () => {
    if (newCustomQuestion.question) {
      const customQuestion: CustomQuestion = {
        id: Date.now().toString(),
        ...newCustomQuestion,
      }
      setCustomQuestions([...customQuestions, customQuestion])
      setNewCustomQuestion({ question: "", type: "text", required: false, options: [] })
    }
  }

  const removeCustomQuestion = (id: string) => {
    setCustomQuestions(customQuestions.filter((q) => q.id !== id))
  }

  const addQuestionOption = (option: string) => {
    if (option && !newCustomQuestion.options.includes(option)) {
      setNewCustomQuestion((prev) => ({
        ...prev,
        options: [...prev.options, option],
      }))
    }
  }

  const removeQuestionOption = (option: string) => {
    setNewCustomQuestion((prev) => ({
      ...prev,
      options: prev.options.filter((o) => o !== option),
    }))
  }

  const categories = [
    "Education",
    "Medical",
    "Community",
    "Arts",
    "Environment",
    "Social Justice",
    "Economic Policy",
    "Infrastructure",
    "Technology",
    "Emergency Relief",
    "Sports",
    "Other",
  ]

  const currencies = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
  ]

  const fundDeliveryOptions = [
    { value: "direct", label: "Direct Disbursement" },
    { value: "escrow", label: "Escrow Service" },
  ]

  const permissionOptions = ["Edit Campaign", "View Analytics", "Manage Donations", "Send Updates", "Invite Members"]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Basic Campaign Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Campaign Information</CardTitle>
          <CardDescription>Essential details about your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter your campaign title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Short Tagline</Label>
            <Textarea
              id="tagline"
              value={formData.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              placeholder="A brief 1-2 sentence description of your campaign"
              rows={2}
              maxLength={200}
            />
            <p className="text-sm text-gray-500">{formData.tagline.length}/200 characters</p>
          </div>

          <div className="space-y-3">
            <Label>Campaign Visibility *</Label>
            <RadioGroup value={formData.visibility} onValueChange={(value) => handleInputChange("visibility", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public">Public - Anyone can view and donate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private">Private / Invite-Only - Only invited people can access</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Financial Details */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
          <CardDescription>Set your fundraising goals and currency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount *</Label>
              <Input
                id="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                placeholder="50000"
                min="1"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency Type *</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Timeline</CardTitle>
          <CardDescription>Set the duration for your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Campaign End Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Content & Media */}
      <Card>
        <CardHeader>
          <CardTitle>Content & Media</CardTitle>
          <CardDescription>Tell your story with rich content and visuals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="detailedDescription">Detailed Description / Story *</Label>
            <Textarea
              id="detailedDescription"
              value={formData.detailedDescription}
              onChange={(e) => handleInputChange("detailedDescription", e.target.value)}
              placeholder="Tell your campaign story in detail. Explain why this cause matters, how funds will be used, and the impact donors can expect to make."
              rows={8}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImageUrl">Cover Image / Video URL</Label>
            <Input
              id="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={(e) => handleInputChange("coverImageUrl", e.target.value)}
              placeholder="https://example.com/cover-image.jpg"
              type="url"
            />
          </div>

          <div className="space-y-4">
            <Label>Image Gallery (Max 10 images)</Label>
            <div className="flex gap-2">
              <Input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              <Button
                type="button"
                onClick={addImageToGallery}
                disabled={!newImageUrl || imageGallery.length >= 10}
                size="sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {imageGallery.length > 0 && (
              <div className="space-y-2">
                {imageGallery.map((url, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <span className="flex-1 text-sm truncate">{url}</span>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeImageFromGallery(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Members / Co-Organizers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members / Co-Organizers
          </CardTitle>
          <CardDescription>Invite collaborators to help manage your campaign</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email Address</Label>
              <Input
                id="memberEmail"
                type="email"
                value={newTeamMember.email}
                onChange={(e) => setNewTeamMember((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="colleague@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberRole">Role</Label>
              <Input
                id="memberRole"
                value={newTeamMember.role}
                onChange={(e) => setNewTeamMember((prev) => ({ ...prev, role: e.target.value }))}
                placeholder="Co-Organizer, Marketing Lead, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {permissionOptions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={newTeamMember.permissions.includes(permission)}
                    onCheckedChange={() => togglePermission(permission)}
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="button" onClick={addTeamMember} disabled={!newTeamMember.email || !newTeamMember.role}>
            <Mail className="h-4 w-4 mr-2" />
            Send Invitation
          </Button>

          {teamMembers.length > 0 && (
            <div className="space-y-3">
              <Label>Invited Team Members</Label>
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{member.email}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                    <div className="flex gap-1 mt-1">
                      {member.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeTeamMember(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Fundraising Milestones
          </CardTitle>
          <CardDescription>Break down your goal into phases to track progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="milestonePercentage">Percentage</Label>
              <Input
                id="milestonePercentage"
                type="number"
                min="1"
                max="100"
                value={newMilestone.percentage || ""}
                onChange={(e) =>
                  setNewMilestone((prev) => ({ ...prev, percentage: Number.parseInt(e.target.value) || 0 }))
                }
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milestoneTitle">Milestone Title</Label>
              <Input
                id="milestoneTitle"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Initial Equipment Purchase"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milestoneDescription">Description</Label>
              <Input
                id="milestoneDescription"
                value={newMilestone.description}
                onChange={(e) => setNewMilestone((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="What will be accomplished"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={addMilestone}
            disabled={!newMilestone.percentage || !newMilestone.title || !formData.targetAmount}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>

          {milestones.length > 0 && (
            <div className="space-y-3">
              <Label>Campaign Milestones</Label>
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-sm text-gray-500">
                      {milestone.percentage}% - ${milestone.amount.toLocaleString()} {formData.currency}
                    </div>
                    {milestone.description && <div className="text-sm text-gray-600 mt-1">{milestone.description}</div>}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeMilestone(milestone.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reward Tiers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Reward Tiers
          </CardTitle>
          <CardDescription>Set up thank-you gifts for different donation levels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rewardAmount">Minimum Amount</Label>
              <Input
                id="rewardAmount"
                type="number"
                min="1"
                value={newRewardTier.minAmount || ""}
                onChange={(e) =>
                  setNewRewardTier((prev) => ({ ...prev, minAmount: Number.parseInt(e.target.value) || 0 }))
                }
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rewardTitle">Reward Title</Label>
              <Input
                id="rewardTitle"
                value={newRewardTier.title}
                onChange={(e) => setNewRewardTier((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Thank You Card"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rewardDescription">Reward Description</Label>
            <Textarea
              id="rewardDescription"
              value={newRewardTier.description}
              onChange={(e) => setNewRewardTier((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Personalized thank you card with campaign updates"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rewardDelivery">Estimated Delivery</Label>
              <Input
                id="rewardDelivery"
                value={newRewardTier.estimatedDelivery}
                onChange={(e) => setNewRewardTier((prev) => ({ ...prev, estimatedDelivery: e.target.value }))}
                placeholder="2-3 weeks after campaign ends"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rewardQuantity">Quantity (Optional)</Label>
              <Input
                id="rewardQuantity"
                type="number"
                min="1"
                value={newRewardTier.quantity || ""}
                onChange={(e) =>
                  setNewRewardTier((prev) => ({
                    ...prev,
                    quantity: e.target.value ? Number.parseInt(e.target.value) : undefined,
                  }))
                }
                placeholder="Limited quantity"
              />
            </div>
          </div>

          <Button type="button" onClick={addRewardTier} disabled={!newRewardTier.minAmount || !newRewardTier.title}>
            <Plus className="h-4 w-4 mr-2" />
            Add Reward Tier
          </Button>

          {rewardTiers.length > 0 && (
            <div className="space-y-3">
              <Label>Reward Tiers</Label>
              {rewardTiers.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">
                      ${reward.minAmount}+ - {reward.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{reward.description}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Delivery: {reward.estimatedDelivery}
                      {reward.quantity && ` • Limited to ${reward.quantity} items`}
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeRewardTier(reward.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Matching Donors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HandHeart className="h-5 w-5" />
            Matching Donors
          </CardTitle>
          <CardDescription>Set up corporate or individual matching donations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="matcherName">Matching Donor Name</Label>
              <Input
                id="matcherName"
                value={newMatchingDonor.name}
                onChange={(e) => setNewMatchingDonor((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="ABC Corporation or John Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="matchAmount">Total Match Amount</Label>
              <Input
                id="matchAmount"
                type="number"
                min="1"
                value={newMatchingDonor.matchAmount || ""}
                onChange={(e) =>
                  setNewMatchingDonor((prev) => ({ ...prev, matchAmount: Number.parseInt(e.target.value) || 0 }))
                }
                placeholder="5000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="matchRatio">Match Ratio</Label>
              <Select
                value={newMatchingDonor.matchRatio.toString()}
                onValueChange={(value) =>
                  setNewMatchingDonor((prev) => ({ ...prev, matchRatio: Number.parseFloat(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select match ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">50¢ for every $1 donated</SelectItem>
                  <SelectItem value="1">$1 for every $1 donated</SelectItem>
                  <SelectItem value="2">$2 for every $1 donated</SelectItem>
                  <SelectItem value="3">$3 for every $1 donated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="matchConditions">Conditions</Label>
              <Input
                id="matchConditions"
                value={newMatchingDonor.conditions}
                onChange={(e) => setNewMatchingDonor((prev) => ({ ...prev, conditions: e.target.value }))}
                placeholder="Valid until end date, minimum $10 donation"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={addMatchingDonor}
            disabled={!newMatchingDonor.name || !newMatchingDonor.matchAmount}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Matching Donor
          </Button>

          {matchingDonors.length > 0 && (
            <div className="space-y-3">
              <Label>Matching Donors</Label>
              {matchingDonors.map((matcher) => (
                <div key={matcher.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{matcher.name}</div>
                    <div className="text-sm text-gray-600">
                      Matching ${matcher.matchAmount.toLocaleString()} at {matcher.matchRatio}:1 ratio
                    </div>
                    {matcher.conditions && <div className="text-sm text-gray-500 mt-1">{matcher.conditions}</div>}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeMatchingDonor(matcher.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Custom Donor Questions
          </CardTitle>
          <CardDescription>Create custom questions for donors during the donation process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="questionText">Question</Label>
              <Input
                id="questionText"
                value={newCustomQuestion.question}
                onChange={(e) => setNewCustomQuestion((prev) => ({ ...prev, question: e.target.value }))}
                placeholder="How did you hear about this campaign?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="questionType">Question Type</Label>
              <Select
                value={newCustomQuestion.type}
                onValueChange={(value: "text" | "textarea" | "select" | "checkbox") =>
                  setNewCustomQuestion((prev) => ({
                    ...prev,
                    type: value,
                    options: value === "select" ? [] : prev.options,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Short Text</SelectItem>
                  <SelectItem value="textarea">Long Text</SelectItem>
                  <SelectItem value="select">Multiple Choice</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {newCustomQuestion.type === "select" && (
            <div className="space-y-2">
              <Label>Answer Options</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add an option"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addQuestionOption((e.target as HTMLInputElement).value)
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addQuestionOption(input.value)
                    input.value = ""
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newCustomQuestion.options.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newCustomQuestion.options.map((option, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {option}
                      <button
                        type="button"
                        onClick={() => removeQuestionOption(option)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="questionRequired"
              checked={newCustomQuestion.required}
              onCheckedChange={(checked) => setNewCustomQuestion((prev) => ({ ...prev, required: checked as boolean }))}
            />
            <Label htmlFor="questionRequired">Required question</Label>
          </div>

          <Button
            type="button"
            onClick={addCustomQuestion}
            disabled={
              !newCustomQuestion.question ||
              (newCustomQuestion.type === "select" && newCustomQuestion.options.length === 0)
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>

          {customQuestions.length > 0 && (
            <div className="space-y-3">
              <Label>Custom Questions</Label>
              {customQuestions.map((question) => (
                <div key={question.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{question.question}</div>
                    <div className="text-sm text-gray-500">
                      Type: {question.type} {question.required && "• Required"}
                    </div>
                    {question.options && question.options.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">Options: {question.options.join(", ")}</div>
                    )}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeCustomQuestion(question.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recipient Information */}
      <Card>
        <CardHeader>
          <CardTitle>Recipient Information</CardTitle>
          <CardDescription>Details about who will receive the funds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Recipient Name or Organization *</Label>
              <Input
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => handleInputChange("recipientName", e.target.value)}
                placeholder="John Doe or ABC Organization"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipientRelationship">Relationship to Organizer *</Label>
              <Input
                id="recipientRelationship"
                value={formData.recipientRelationship}
                onChange={(e) => handleInputChange("recipientRelationship", e.target.value)}
                placeholder="Self, Family Member, Friend, Organization I Support"
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fund Management */}
      <Card>
        <CardHeader>
          <CardTitle>Fund Management</CardTitle>
          <CardDescription>How funds will be delivered and managed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fundDelivery">Delivery of Funds *</Label>
            <Select value={formData.fundDelivery} onValueChange={(value) => handleInputChange("fundDelivery", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select fund delivery method" />
              </SelectTrigger>
              <SelectContent>
                {fundDeliveryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="donorUpdates"
              checked={formData.donorUpdatesOptIn}
              onCheckedChange={(checked) => handleInputChange("donorUpdatesOptIn", checked as boolean)}
            />
            <Label htmlFor="donorUpdates">Allow donors to opt-in for email updates about this campaign</Label>
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card>
        <CardHeader>
          <CardTitle>Social Sharing Defaults</CardTitle>
          <CardDescription>Configure default messages for social media sharing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="facebookMessage">Facebook Sharing Message</Label>
            <Textarea
              id="facebookMessage"
              value={formData.facebookMessage}
              onChange={(e) => handleInputChange("facebookMessage", e.target.value)}
              placeholder="Help me support this important cause..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitterMessage">Twitter Sharing Message</Label>
            <Textarea
              id="twitterMessage"
              value={formData.twitterMessage}
              onChange={(e) => handleInputChange("twitterMessage", e.target.value)}
              placeholder="Supporting an amazing cause! Please help..."
              rows={2}
              maxLength={280}
            />
            <p className="text-sm text-gray-500">{formData.twitterMessage.length}/280 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinMessage">LinkedIn Sharing Message</Label>
            <Textarea
              id="linkedinMessage"
              value={formData.linkedinMessage}
              onChange={(e) => handleInputChange("linkedinMessage", e.target.value)}
              placeholder="I'm supporting this meaningful campaign..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms & Legal */}
      <Card>
        <CardHeader>
          <CardTitle>Terms & Legal</CardTitle>
          <CardDescription>Campaign-specific terms and required disclaimers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="campaignTerms">Campaign Terms</Label>
            <Textarea
              id="campaignTerms"
              value={formData.campaignTerms}
              onChange={(e) => handleInputChange("campaignTerms", e.target.value)}
              placeholder="Specify refund policy, disbursement schedule, and other campaign-specific terms..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requiredDisclaimers">Required Disclaimers</Label>
            <Textarea
              id="requiredDisclaimers"
              value={formData.requiredDisclaimers}
              onChange={(e) => handleInputChange("requiredDisclaimers", e.target.value)}
              placeholder="Any required disclaimers, especially for regulated causes..."
              rows={3}
            />
          </div>

          <Separator />

          <div className="flex items-start space-x-2">
            <Checkbox
              id="indemnification"
              checked={formData.indemnificationConfirmed}
              onCheckedChange={(checked) => handleInputChange("indemnificationConfirmed", checked as boolean)}
              required
            />
            <Label htmlFor="indemnification" className="text-sm leading-5">
              I confirm that all information provided is accurate and complete. I understand that I am responsible for
              the accuracy of this campaign and agree to indemnify the platform against any claims arising from false or
              misleading information. *
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1 bg-transparent">
              Save as Draft
            </Button>
            <Button
              className="flex-1"
              disabled={
                !formData.title ||
                !formData.category ||
                !formData.targetAmount ||
                !formData.detailedDescription ||
                !formData.recipientName ||
                !formData.recipientRelationship ||
                !formData.fundDelivery ||
                !formData.indemnificationConfirmed
              }
            >
              Create Campaign
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            * Required fields must be completed before creating the campaign
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
