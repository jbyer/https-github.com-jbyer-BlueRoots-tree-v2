"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X, Plus, Save, Eye, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface AdminEditCampaignFormProps {
  campaignId: string
}

interface TeamMember {
  id: string
  email: string
  role: string
  permissions: string[]
}

interface Milestone {
  id: string
  percentage: number
  title: string
  description: string
  amount: number
}

interface RewardTier {
  id: string
  minAmount: number
  title: string
  description: string
  deliveryDate: Date | undefined
  quantity?: number
}

interface MatchingDonor {
  id: string
  name: string
  matchRatio: string
  maxAmount: number
  conditions: string
}

interface CustomQuestion {
  id: string
  question: string
  type: string
  required: boolean
  options?: string[]
}

export function AdminEditCampaignForm({ campaignId }: AdminEditCampaignFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Basic Information
  const [title, setTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("public")

  // Financial Details
  const [targetAmount, setTargetAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [endDate, setEndDate] = useState<Date>()

  // Content & Media
  const [description, setDescription] = useState("")
  const [coverImageUrl, setCoverImageUrl] = useState("")
  const [coverVideoUrl, setCoverVideoUrl] = useState("")
  const [images, setImages] = useState<string[]>([])

  // Recipient Information
  const [recipientName, setRecipientName] = useState("")
  const [recipientRelationship, setRecipientRelationship] = useState("")
  const [fundDelivery, setFundDelivery] = useState("direct")

  // Sharing & Communication
  const [donorUpdates, setDonorUpdates] = useState(true)
  const [facebookSharing, setFacebookSharing] = useState(true)
  const [twitterSharing, setTwitterSharing] = useState(true)
  const [linkedinSharing, setLinkedinSharing] = useState(false)

  // Terms & Legal
  const [campaignTerms, setCampaignTerms] = useState("")
  const [disclaimers, setDisclaimers] = useState("")
  const [indemnification, setIndemnification] = useState(false)
  const [termsAgreement, setTermsAgreement] = useState(false)

  // Advanced Features
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([])
  const [matchingDonors, setMatchingDonors] = useState<MatchingDonor[]>([])
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([])

  // Load existing campaign data
  useEffect(() => {
    loadCampaignData()
  }, [campaignId])

  const loadCampaignData = async () => {
    setIsLoading(true)
    try {
      // Mock data - replace with actual API call
      const mockCampaignData = {
        title: "Support Climate Action Initiative",
        tagline: "Fighting for a sustainable future for all Americans",
        category: "Environment",
        visibility: "public",
        targetAmount: "50000",
        currency: "USD",
        endDate: new Date("2024-12-31"),
        description:
          "Join us in supporting comprehensive climate action legislation that will create jobs, reduce emissions, and protect our environment for future generations.",
        coverImageUrl: "/placeholder.svg?height=400&width=800",
        coverVideoUrl: "https://youtube.com/watch?v=example",
        images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
        recipientName: "Climate Action PAC",
        recipientRelationship: "Partner Organization",
        fundDelivery: "direct",
        donorUpdates: true,
        facebookSharing: true,
        twitterSharing: true,
        linkedinSharing: false,
        campaignTerms: "Funds will be used exclusively for climate action advocacy and education.",
        disclaimers: "This campaign supports political advocacy and is not tax-deductible.",
        teamMembers: [{ id: "1", email: "sarah@example.com", role: "Admin", permissions: ["edit", "view", "manage"] }],
        milestones: [
          {
            id: "1",
            percentage: 25,
            title: "Initial Outreach",
            description: "Launch awareness campaign",
            amount: 12500,
          },
          {
            id: "2",
            percentage: 50,
            title: "Community Engagement",
            description: "Organize local events",
            amount: 25000,
          },
        ],
        rewardTiers: [
          {
            id: "1",
            minAmount: 25,
            title: "Supporter",
            description: "Thank you email and updates",
            deliveryDate: undefined,
          },
          {
            id: "2",
            minAmount: 100,
            title: "Advocate",
            description: "Exclusive policy briefing",
            deliveryDate: new Date("2024-06-01"),
          },
        ],
      }

      // Set form data
      setTitle(mockCampaignData.title)
      setTagline(mockCampaignData.tagline)
      setCategory(mockCampaignData.category)
      setVisibility(mockCampaignData.visibility)
      setTargetAmount(mockCampaignData.targetAmount)
      setCurrency(mockCampaignData.currency)
      setEndDate(mockCampaignData.endDate)
      setDescription(mockCampaignData.description)
      setCoverImageUrl(mockCampaignData.coverImageUrl)
      setCoverVideoUrl(mockCampaignData.coverVideoUrl)
      setImages(mockCampaignData.images)
      setRecipientName(mockCampaignData.recipientName)
      setRecipientRelationship(mockCampaignData.recipientRelationship)
      setFundDelivery(mockCampaignData.fundDelivery)
      setDonorUpdates(mockCampaignData.donorUpdates)
      setFacebookSharing(mockCampaignData.facebookSharing)
      setTwitterSharing(mockCampaignData.twitterSharing)
      setLinkedinSharing(mockCampaignData.linkedinSharing)
      setCampaignTerms(mockCampaignData.campaignTerms)
      setDisclaimers(mockCampaignData.disclaimers)
      setTeamMembers(mockCampaignData.teamMembers)
      setMilestones(mockCampaignData.milestones)
      setRewardTiers(mockCampaignData.rewardTiers)
    } catch (error) {
      console.error("Error loading campaign data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Campaign updated successfully")
      // Redirect to campaign list or show success message
    } catch (error) {
      console.error("Error updating campaign:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: "",
      role: "Collaborator",
      permissions: ["view"],
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      percentage: 0,
      title: "",
      description: "",
      amount: 0,
    }
    setMilestones([...milestones, newMilestone])
  }

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id))
  }

  const addRewardTier = () => {
    const newTier: RewardTier = {
      id: Date.now().toString(),
      minAmount: 0,
      title: "",
      description: "",
      deliveryDate: undefined,
    }
    setRewardTiers([...rewardTiers, newTier])
  }

  const removeRewardTier = (id: string) => {
    setRewardTiers(rewardTiers.filter((tier) => tier.id !== id))
  }

  const steps = [
    { id: 1, title: "Basic Information", description: "Campaign title, category, and visibility" },
    { id: 2, title: "Financial Details", description: "Target amount, currency, and timeline" },
    { id: 3, title: "Content & Media", description: "Description, images, and videos" },
    { id: 4, title: "Recipient Information", description: "Who will receive the funds" },
    { id: 5, title: "Team Members", description: "Add collaborators and co-organizers" },
    { id: 6, title: "Milestones", description: "Break goals into phases" },
    { id: 7, title: "Reward Tiers", description: "Thank-you gifts for donors" },
    { id: 8, title: "Sharing & Communication", description: "Social sharing and donor updates" },
    { id: 9, title: "Terms & Legal", description: "Campaign terms and agreements" },
  ]

  if (isLoading && currentStep === 1) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaign data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/campaigns">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Campaigns
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Edit Campaign</h2>
            <p className="text-gray-600">Campaign ID: {campaignId}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          
          <Button onClick={handleSubmit} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Edit Progress</h3>
          <Badge variant="outline">
            {currentStep} of {steps.length}
          </Badge>
        </div>
        <div className="flex space-x-2 mb-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn("flex-1 h-2 rounded-full", step.id <= currentStep ? "bg-blue-600" : "bg-gray-200")}
            />
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{steps[currentStep - 1]?.title}</span>
          <span>{steps[currentStep - 1]?.description}</span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update your campaign's basic details and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your campaign title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Short Tagline *</Label>
                <Textarea
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="1-2 sentences describing your campaign"
                  rows={2}
                  maxLength={200}
                  required
                />
                <p className="text-sm text-gray-500">{tagline.length}/200 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                      <SelectItem value="Social Justice">Social Justice</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Arts">Arts & Culture</SelectItem>
                      <SelectItem value="Political">Political</SelectItem>
                      <SelectItem value="Emergency">Emergency Relief</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility *</Label>
                  <Select value={visibility} onValueChange={setVisibility}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private / Invite-Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Financial Details */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
              <CardDescription>Set your funding goal, currency, and campaign timeline.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount *</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency *</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Campaign End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Content & Media */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Content & Media</CardTitle>
              <CardDescription>Update your campaign story, images, and videos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description / Story *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell your campaign story in detail..."
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                  <Input
                    id="coverImageUrl"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {coverImageUrl && (
                    <div className="mt-2">
                      <img
                        src={coverImageUrl || "/placeholder.svg"}
                        alt="Cover preview"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverVideoUrl">Cover Video URL</Label>
                  <Input
                    id="coverVideoUrl"
                    value={coverVideoUrl}
                    onChange={(e) => setCoverVideoUrl(e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Image Gallery</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Add Image</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Recipient Information */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Recipient Information</CardTitle>
              <CardDescription>Update information about who will receive the funds.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name or Organization *</Label>
                <Input
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter recipient name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientRelationship">Recipient Relationship to Organizer *</Label>
                <Select value={recipientRelationship} onValueChange={setRecipientRelationship}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="organization">Partner Organization</SelectItem>
                    <SelectItem value="beneficiary">Beneficiary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundDelivery">Delivery of Funds *</Label>
                <Select value={fundDelivery} onValueChange={setFundDelivery}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct Disbursement</SelectItem>
                    <SelectItem value="escrow">Escrow Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Team Members */}
        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle>Team Members & Co-Organizers</CardTitle>
              <CardDescription>Manage collaborators who can help with your campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Team Member {index + 1}</h4>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeTeamMember(member.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        value={member.email}
                        onChange={(e) => {
                          const updated = teamMembers.map((m) =>
                            m.id === member.id ? { ...m, email: e.target.value } : m,
                          )
                          setTeamMembers(updated)
                        }}
                        placeholder="team@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select
                        value={member.role}
                        onValueChange={(value) => {
                          const updated = teamMembers.map((m) => (m.id === member.id ? { ...m, role: value } : m))
                          setTeamMembers(updated)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Collaborator">Collaborator</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addTeamMember} className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 6: Milestones */}
        {currentStep === 6 && (
          <Card>
            <CardHeader>
              <CardTitle>Milestones & Goals</CardTitle>
              <CardDescription>Break your campaign goal into achievable phases.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Milestone {index + 1}</h4>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeMilestone(milestone.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Percentage</Label>
                      <Select
                        value={milestone.percentage.toString()}
                        onValueChange={(value) => {
                          const percentage = Number.parseInt(value)
                          const amount = targetAmount ? (Number.parseInt(targetAmount) * percentage) / 100 : 0
                          const updated = milestones.map((m) =>
                            m.id === milestone.id ? { ...m, percentage, amount } : m,
                          )
                          setMilestones(updated)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="25">25%</SelectItem>
                          <SelectItem value="50">50%</SelectItem>
                          <SelectItem value="75">75%</SelectItem>
                          <SelectItem value="90">90%</SelectItem>
                          <SelectItem value="100">100%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <Input type="number" value={milestone.amount} readOnly className="bg-gray-50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={milestone.title}
                        onChange={(e) => {
                          const updated = milestones.map((m) =>
                            m.id === milestone.id ? { ...m, title: e.target.value } : m,
                          )
                          setMilestones(updated)
                        }}
                        placeholder="Milestone title"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) => {
                        const updated = milestones.map((m) =>
                          m.id === milestone.id ? { ...m, description: e.target.value } : m,
                        )
                        setMilestones(updated)
                      }}
                      placeholder="What will be accomplished at this milestone?"
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addMilestone} className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Milestone
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 7: Reward Tiers */}
        {currentStep === 7 && (
          <Card>
            <CardHeader>
              <CardTitle>Reward Tiers</CardTitle>
              <CardDescription>Set thank-you gifts for different donation levels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {rewardTiers.map((tier, index) => (
                <div key={tier.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Reward Tier {index + 1}</h4>
                    <Button type="button" variant="outline" size="sm" onClick={() => removeRewardTier(tier.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Donation Amount</Label>
                      <Input
                        type="number"
                        value={tier.minAmount}
                        onChange={(e) => {
                          const updated = rewardTiers.map((t) =>
                            t.id === tier.id ? { ...t, minAmount: Number.parseInt(e.target.value) || 0 } : t,
                          )
                          setRewardTiers(updated)
                        }}
                        placeholder="0"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Reward Title</Label>
                      <Input
                        value={tier.title}
                        onChange={(e) => {
                          const updated = rewardTiers.map((t) =>
                            t.id === tier.id ? { ...t, title: e.target.value } : t,
                          )
                          setRewardTiers(updated)
                        }}
                        placeholder="Reward name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={tier.description}
                      onChange={(e) => {
                        const updated = rewardTiers.map((t) =>
                          t.id === tier.id ? { ...t, description: e.target.value } : t,
                        )
                        setRewardTiers(updated)
                      }}
                      placeholder="Describe the reward..."
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Estimated Delivery Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !tier.deliveryDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {tier.deliveryDate ? format(tier.deliveryDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={tier.deliveryDate}
                            onSelect={(date) => {
                              const updated = rewardTiers.map((t) =>
                                t.id === tier.id ? { ...t, deliveryDate: date } : t,
                              )
                              setRewardTiers(updated)
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity Limit (Optional)</Label>
                      <Input
                        type="number"
                        value={tier.quantity || ""}
                        onChange={(e) => {
                          const updated = rewardTiers.map((t) =>
                            t.id === tier.id ? { ...t, quantity: Number.parseInt(e.target.value) || undefined } : t,
                          )
                          setRewardTiers(updated)
                        }}
                        placeholder="Unlimited"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addRewardTier} className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Reward Tier
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 8: Sharing & Communication */}
        {currentStep === 8 && (
          <Card>
            <CardHeader>
              <CardTitle>Sharing & Communication</CardTitle>
              <CardDescription>Configure social sharing and donor communication preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Donor Updates</Label>
                    <p className="text-sm text-gray-500">Send email updates to donors about campaign progress</p>
                  </div>
                  <Switch checked={donorUpdates} onCheckedChange={setDonorUpdates} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Social Sharing Defaults</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Facebook Sharing</Label>
                        <p className="text-sm text-gray-500">Enable sharing on Facebook</p>
                      </div>
                      <Switch checked={facebookSharing} onCheckedChange={setFacebookSharing} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Twitter Sharing</Label>
                        <p className="text-sm text-gray-500">Enable sharing on Twitter</p>
                      </div>
                      <Switch checked={twitterSharing} onCheckedChange={setTwitterSharing} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>LinkedIn Sharing</Label>
                        <p className="text-sm text-gray-500">Enable sharing on LinkedIn</p>
                      </div>
                      <Switch checked={linkedinSharing} onCheckedChange={setLinkedinSharing} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 9: Terms & Legal */}
        {currentStep === 9 && (
          <Card>
            <CardHeader>
              <CardTitle>Terms & Legal</CardTitle>
              <CardDescription>Update campaign terms, disclaimers, and legal agreements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaignTerms">Campaign Terms</Label>
                <Textarea
                  id="campaignTerms"
                  value={campaignTerms}
                  onChange={(e) => setCampaignTerms(e.target.value)}
                  placeholder="Refund policy, disbursement schedule, etc."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disclaimers">Required Disclaimers</Label>
                <Textarea
                  id="disclaimers"
                  value={disclaimers}
                  onChange={(e) => setDisclaimers(e.target.value)}
                  placeholder="Any required disclaimers for regulated causes"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="indemnification"
                    checked={indemnification}
                    onChange={(e) => setIndemnification(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="indemnification" className="text-sm">
                    I confirm the accuracy of all information provided and agree to indemnify the platform
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="termsAgreement"
                    checked={termsAgreement}
                    onChange={(e) => setTermsAgreement(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="termsAgreement" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
