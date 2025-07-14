"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Camera,
  Video,
  Globe,
  Users,
  Plus,
  X,
  Target,
  Gift,
  UserPlus,
  HelpCircle,
} from "lucide-react"

interface TeamMember {
  id: string
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
  matchRatio: string
  conditions: string
}

interface CustomQuestion {
  id: string
  question: string
  type: string
  required: boolean
  options?: string[]
}

interface CampaignFormData {
  // Basic Information
  title: string
  tagline: string
  category: string
  visibility: string

  // Financial Details
  targetAmount: string
  currency: string
  endDate: string

  // Content
  description: string
  coverImageUrl: string
  coverVideoUrl: string

  // Recipient Information
  recipientName: string
  recipientRelationship: string
  fundDelivery: string

  // Communication & Sharing
  donorUpdates: boolean
  facebookSharing: boolean
  twitterSharing: boolean
  linkedinSharing: boolean

  // Legal & Compliance
  campaignTerms: string
  disclaimers: string
  indemnificationAgreed: boolean
  termsAgreed: boolean
}

export default function CampaignCreateForm() {
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    tagline: "",
    category: "",
    visibility: "public",
    targetAmount: "",
    currency: "USD",
    endDate: "",
    description: "",
    coverImageUrl: "",
    coverVideoUrl: "",
    recipientName: "",
    recipientRelationship: "",
    fundDelivery: "direct",
    donorUpdates: true,
    facebookSharing: true,
    twitterSharing: true,
    linkedinSharing: false,
    campaignTerms: "",
    disclaimers: "",
    indemnificationAgreed: false,
    termsAgreed: false,
  })

  const [images, setImages] = useState<string[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([])
  const [matchingDonors, setMatchingDonors] = useState<MatchingDonor[]>([])
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 9

  // Team Members Functions
  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      email: "",
      role: "collaborator",
      permissions: ["view", "edit"],
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const updateTeamMember = (id: string, field: keyof TeamMember, value: any) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, [field]: value } : member)))
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  // Milestones Functions
  const addMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      percentage: 25,
      amount: 0,
      title: "",
      description: "",
    }
    setMilestones([...milestones, newMilestone])
  }

  const updateMilestone = (id: string, field: keyof Milestone, value: any) => {
    setMilestones(
      milestones.map((milestone) => {
        if (milestone.id === id) {
          const updated = { ...milestone, [field]: value }
          if (field === "percentage" && formData.targetAmount) {
            updated.amount = (Number(formData.targetAmount) * Number(value)) / 100
          }
          return updated
        }
        return milestone
      }),
    )
  }

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((milestone) => milestone.id !== id))
  }

  // Reward Tiers Functions
  const addRewardTier = () => {
    const newTier: RewardTier = {
      id: Date.now().toString(),
      minAmount: 25,
      title: "",
      description: "",
      estimatedDelivery: "",
    }
    setRewardTiers([...rewardTiers, newTier])
  }

  const updateRewardTier = (id: string, field: keyof RewardTier, value: any) => {
    setRewardTiers(rewardTiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)))
  }

  const removeRewardTier = (id: string) => {
    setRewardTiers(rewardTiers.filter((tier) => tier.id !== id))
  }

  // Matching Donors Functions
  const addMatchingDonor = () => {
    const newDonor: MatchingDonor = {
      id: Date.now().toString(),
      name: "",
      matchAmount: 1000,
      matchRatio: "1:1",
      conditions: "",
    }
    setMatchingDonors([...matchingDonors, newDonor])
  }

  const updateMatchingDonor = (id: string, field: keyof MatchingDonor, value: any) => {
    setMatchingDonors(matchingDonors.map((donor) => (donor.id === id ? { ...donor, [field]: value } : donor)))
  }

  const removeMatchingDonor = (id: string) => {
    setMatchingDonors(matchingDonors.filter((donor) => donor.id !== id))
  }

  // Custom Questions Functions
  const addCustomQuestion = () => {
    const newQuestion: CustomQuestion = {
      id: Date.now().toString(),
      question: "",
      type: "text",
      required: false,
      options: [],
    }
    setCustomQuestions([...customQuestions, newQuestion])
  }

  const updateCustomQuestion = (id: string, field: keyof CustomQuestion, value: any) => {
    setCustomQuestions(
      customQuestions.map((question) => (question.id === id ? { ...question, [field]: value } : question)),
    )
  }

  const removeCustomQuestion = (id: string) => {
    setCustomQuestions(customQuestions.filter((question) => question.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])

    if (images.length + files.length > 6) {
      alert("Maximum 6 images allowed")
      return
    }

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 10MB.`)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (field: keyof CampaignFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Campaign Data:", formData)
    console.log("Images:", images)
    console.log("Team Members:", teamMembers)
    console.log("Milestones:", milestones)
    console.log("Reward Tiers:", rewardTiers)
    console.log("Matching Donors:", matchingDonors)
    console.log("Custom Questions:", customQuestions)
    alert("Campaign created successfully! (This is a demo)")
  }

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = [
    "Basic Information",
    "Financial Details",
    "Content & Media",
    "Team & Collaboration",
    "Milestones & Goals",
    "Reward Tiers",
    "Matching Donors",
    "Custom Questions",
    "Terms & Legal",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-1 mx-1 ${index + 1 < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
        </p>
      </div>

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Tell us about your campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Campaign Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Help Sarah Rebuild After Fire"
                required
              />
            </div>

            <div>
              <Label htmlFor="tagline">Short Tagline *</Label>
              <Textarea
                id="tagline"
                value={formData.tagline}
                onChange={(e) => handleInputChange("tagline", e.target.value)}
                placeholder="A compelling 1-2 sentence summary of your campaign"
                maxLength={200}
                rows={2}
                required
              />
              <p className="text-sm text-gray-500 mt-1">{formData.tagline.length}/200 characters</p>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                  <SelectItem value="environment">Environment</SelectItem>
                  <SelectItem value="emergency">Emergency Relief</SelectItem>
                  <SelectItem value="sports">Sports & Recreation</SelectItem>
                  <SelectItem value="business">Business & Entrepreneurship</SelectItem>
                  <SelectItem value="nonprofit">Non-profit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">Campaign Visibility *</Label>
              <RadioGroup
                value={formData.visibility}
                onValueChange={(value) => handleInputChange("visibility", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Public - Anyone can find and view your campaign
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Private - Only people with the link can view your campaign
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Financial Details */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Financial Details
            </CardTitle>
            <CardDescription>Set your fundraising goals and timeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetAmount">Target Amount *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="targetAmount"
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                    placeholder="10000"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currency">Currency Type *</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
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

            <div>
              <Label htmlFor="endDate">Campaign End Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Leave blank for ongoing campaigns</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Content & Media */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Content & Media
            </CardTitle>
            <CardDescription>Tell your story and add visual content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="description">Detailed Description / Story *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Tell your story in detail. Explain why you're raising funds, how the money will be used, and why people should support your cause..."
                rows={8}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Be specific and compelling. Include details about your situation, goals, and impact.
              </p>
            </div>

            <div>
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <Input
                id="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={(e) => handleInputChange("coverImageUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Main image that will represent your campaign. Use a high-quality, relevant image.
              </p>
            </div>

            <div>
              <Label htmlFor="coverVideoUrl">Cover Video URL (YouTube/Vimeo)</Label>
              <div className="relative">
                <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="coverVideoUrl"
                  value={formData.coverVideoUrl}
                  onChange={(e) => handleInputChange("coverVideoUrl", e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Optional video to tell your story. Videos can significantly increase donations.
              </p>
            </div>

            {/* Image Gallery */}
            <div>
              <Label className="text-base font-medium">Image Gallery (up to 6 photos)</Label>
              <p className="text-sm text-gray-500 mb-4">Additional photos to support your campaign story</p>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="imageUpload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="imageUpload" className="cursor-pointer">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Upload Additional Images</p>
                    <p className="text-sm text-gray-500">Click to browse or drag and drop images here</p>
                    <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Team & Collaboration */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Team Members & Co-Organizers
            </CardTitle>
            <CardDescription>Invite collaborators to help manage your campaign (Optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Team Members</h4>
                <p className="text-sm text-gray-500">Add team members who can help manage your campaign</p>
              </div>
              <Button type="button" onClick={addTeamMember} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </div>

            {teamMembers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <UserPlus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No team members added yet</p>
                <p className="text-sm">You can manage your campaign solo or invite collaborators</p>
              </div>
            ) : (
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Email Address</Label>
                        <Input
                          value={member.email}
                          onChange={(e) => updateTeamMember(member.id, "email", e.target.value)}
                          placeholder="colleague@example.com"
                        />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Select
                          value={member.role}
                          onValueChange={(value) => updateTeamMember(member.id, "role", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="collaborator">Collaborator</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeTeamMember(member.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Team Member Permissions</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • <strong>Admin:</strong> Full access including financial settings
                </li>
                <li>
                  • <strong>Editor:</strong> Can edit campaign content and respond to donors
                </li>
                <li>
                  • <strong>Collaborator:</strong> Can edit content but not financial settings
                </li>
                <li>
                  • <strong>Viewer:</strong> Can view campaign analytics and donor information
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Milestones & Goals */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Milestones & Goals
            </CardTitle>
            <CardDescription>Break your goal into phases to track progress (Optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Campaign Milestones</h4>
                <p className="text-sm text-gray-500">
                  Set intermediate goals to celebrate progress with your supporters
                </p>
              </div>
              <Button type="button" onClick={addMilestone} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </div>

            {milestones.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No milestones added yet</p>
                <p className="text-sm">Milestones help track progress and motivate donors</p>
              </div>
            ) : (
              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <Card key={milestone.id} className="p-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label>Percentage</Label>
                        <Select
                          value={milestone.percentage.toString()}
                          onValueChange={(value) => updateMilestone(milestone.id, "percentage", Number(value))}
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
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Amount</Label>
                        <Input
                          value={milestone.amount}
                          readOnly
                          className="bg-gray-50"
                          placeholder={
                            formData.targetAmount
                              ? `${formData.currency} ${milestone.amount.toLocaleString()}`
                              : "Set target amount first"
                          }
                        />
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={milestone.title}
                          onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                          placeholder="Milestone title"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeMilestone(milestone.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <Textarea
                        value={milestone.description}
                        onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                        placeholder="What will this milestone achieve?"
                        rows={2}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 6: Reward Tiers */}
      {currentStep === 6 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Reward Tiers
            </CardTitle>
            <CardDescription>Set thank-you gifts for different donor levels (Optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Thank-You Rewards</h4>
                <p className="text-sm text-gray-500">Offer special rewards to encourage larger donations</p>
              </div>
              <Button type="button" onClick={addRewardTier} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Reward
              </Button>
            </div>

            {rewardTiers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Gift className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No reward tiers added yet</p>
                <p className="text-sm">Rewards can increase donation amounts and engagement</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rewardTiers.map((tier) => (
                  <Card key={tier.id} className="p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Minimum Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="number"
                            value={tier.minAmount}
                            onChange={(e) => updateRewardTier(tier.id, "minAmount", Number(e.target.value))}
                            className="pl-10"
                            placeholder="25"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Reward Title</Label>
                        <Input
                          value={tier.title}
                          onChange={(e) => updateRewardTier(tier.id, "title", e.target.value)}
                          placeholder="Thank you card"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeRewardTier(tier.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={tier.description}
                          onChange={(e) => updateRewardTier(tier.id, "description", e.target.value)}
                          placeholder="Detailed description of the reward"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label>Estimated Delivery</Label>
                          <Input
                            value={tier.estimatedDelivery}
                            onChange={(e) => updateRewardTier(tier.id, "estimatedDelivery", e.target.value)}
                            placeholder="e.g., 2 weeks after campaign ends"
                          />
                        </div>
                        <div>
                          <Label>Quantity (Optional)</Label>
                          <Input
                            type="number"
                            value={tier.quantity || ""}
                            onChange={(e) =>
                              updateRewardTier(tier.id, "quantity", e.target.value ? Number(e.target.value) : undefined)
                            }
                            placeholder="Limited quantity"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 7: Matching Donors */}
      {currentStep === 7 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Matching Donors
            </CardTitle>
            <CardDescription>Define corporate or individual donation matches (Optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Matching Donations</h4>
                <p className="text-sm text-gray-500">Add sponsors who will match donations to amplify impact</p>
              </div>
              <Button type="button" onClick={addMatchingDonor} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Match
              </Button>
            </div>

            {matchingDonors.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No matching donors added yet</p>
                <p className="text-sm">Matching donations can double or triple your fundraising impact</p>
              </div>
            ) : (
              <div className="space-y-4">
                {matchingDonors.map((donor) => (
                  <Card key={donor.id} className="p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Donor/Sponsor Name</Label>
                        <Input
                          value={donor.name}
                          onChange={(e) => updateMatchingDonor(donor.id, "name", e.target.value)}
                          placeholder="Company or Individual Name"
                        />
                      </div>
                      <div>
                        <Label>Match Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type="number"
                            value={donor.matchAmount}
                            onChange={(e) => updateMatchingDonor(donor.id, "matchAmount", Number(e.target.value))}
                            className="pl-10"
                            placeholder="1000"
                          />
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeMatchingDonor(donor.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Match Ratio</Label>
                        <Select
                          value={donor.matchRatio}
                          onValueChange={(value) => updateMatchingDonor(donor.id, "matchRatio", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1:1">1:1 - Dollar for dollar</SelectItem>
                            <SelectItem value="1:2">1:2 - $1 match for every $2 donated</SelectItem>
                            <SelectItem value="2:1">2:1 - $2 match for every $1 donated</SelectItem>
                            <SelectItem value="1:3">1:3 - $1 match for every $3 donated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Conditions</Label>
                        <Input
                          value={donor.conditions}
                          onChange={(e) => updateMatchingDonor(donor.id, "conditions", e.target.value)}
                          placeholder="e.g., First 100 donations, Until Dec 31"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Matching Donation Benefits</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Doubles or triples the impact of individual donations</li>
                <li>• Creates urgency and motivation for donors to give</li>
                <li>• Provides social proof and credibility to your campaign</li>
                <li>• Can significantly accelerate your fundraising timeline</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 8: Custom Questions */}
      {currentStep === 8 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Custom Questions
            </CardTitle>
            <CardDescription>Add questionnaire that donors must answer (Optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Donor Questions</h4>
                <p className="text-sm text-gray-500">Collect additional information from your donors</p>
              </div>
              <Button type="button" onClick={addCustomQuestion} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {customQuestions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No custom questions added yet</p>
                <p className="text-sm">Custom questions help you learn more about your supporters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customQuestions.map((question) => (
                  <Card key={question.id} className="p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label>Question</Label>
                        <Input
                          value={question.question}
                          onChange={(e) => updateCustomQuestion(question.id, "question", e.target.value)}
                          placeholder="What motivated you to donate?"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          type="button"
                          onClick={() => removeCustomQuestion(question.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Question Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value) => updateCustomQuestion(question.id, "type", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text Input</SelectItem>
                            <SelectItem value="textarea">Long Text</SelectItem>
                            <SelectItem value="select">Multiple Choice</SelectItem>
                            <SelectItem value="checkbox">Checkboxes</SelectItem>
                            <SelectItem value="radio">Radio Buttons</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`required-${question.id}`}
                          checked={question.required}
                          onChange={(e) => updateCustomQuestion(question.id, "required", e.target.checked)}
                        />
                        <Label htmlFor={`required-${question.id}`}>Required</Label>
                      </div>
                    </div>
                    {(question.type === "select" || question.type === "checkbox" || question.type === "radio") && (
                      <div className="mt-4">
                        <Label>Options (one per line)</Label>
                        <Textarea
                          value={question.options?.join("\n") || ""}
                          onChange={(e) =>
                            updateCustomQuestion(
                              question.id,
                              "options",
                              e.target.value.split("\n").filter((opt) => opt.trim()),
                            )
                          }
                          placeholder="Option 1&#10;Option 2&#10;Option 3"
                          rows={3}
                        />
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 9: Terms & Legal */}
      {currentStep === 9 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Terms & Legal
            </CardTitle>
            <CardDescription>Review and agree to the legal requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="campaignTerms">Campaign Terms</Label>
              <Textarea
                id="campaignTerms"
                value={formData.campaignTerms}
                onChange={(e) => handleInputChange("campaignTerms", e.target.value)}
                placeholder="Specify your refund policy, disbursement schedule, and any other terms..."
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                Include refund policy, disbursement schedule, and any conditions
              </p>
            </div>

            <div>
              <Label htmlFor="disclaimers">Required Disclaimers</Label>
              <Textarea
                id="disclaimers"
                value={formData.disclaimers}
                onChange={(e) => handleInputChange("disclaimers", e.target.value)}
                placeholder="Any required disclaimers for regulated causes or special circumstances..."
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                Include any disclaimers required for your specific cause or jurisdiction
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Campaign Review</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>Title:</strong> {formData.title || "Not specified"}
                </p>
                <p>
                  <strong>Category:</strong> {formData.category || "Not specified"}
                </p>
                <p>
                  <strong>Target:</strong> {formData.currency}{" "}
                  {formData.targetAmount ? Number(formData.targetAmount).toLocaleString() : "Not specified"}
                </p>
                <p>
                  <strong>Team Members:</strong> {teamMembers.length}
                </p>
                <p>
                  <strong>Milestones:</strong> {milestones.length}
                </p>
                <p>
                  <strong>Reward Tiers:</strong> {rewardTiers.length}
                </p>
                <p>
                  <strong>Matching Donors:</strong> {matchingDonors.length}
                </p>
                <p>
                  <strong>Custom Questions:</strong> {customQuestions.length}
                </p>
                <p>
                  <strong>Media:</strong> {images.length} additional images
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="indemnificationAgreed"
                  checked={formData.indemnificationAgreed}
                  onChange={(e) => handleInputChange("indemnificationAgreed", e.target.checked)}
                  className="mt-1"
                  required
                />
                <Label htmlFor="indemnificationAgreed" className="text-sm leading-relaxed">
                  <strong>Indemnification Agreement:</strong> I confirm that all information provided is accurate and
                  complete. I understand that I am responsible for the proper use of funds and compliance with all
                  applicable laws. I agree to indemnify and hold harmless the platform from any claims arising from my
                  campaign.
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="termsAgreed"
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange("termsAgreed", e.target.checked)}
                  className="mt-1"
                  required
                />
                <Label htmlFor="termsAgreed" className="text-sm leading-relaxed">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                  . I understand the platform fees, processing requirements, and my obligations as a campaign organizer.
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          Previous
        </Button>

        <div className="flex gap-3">
          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Campaign
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
