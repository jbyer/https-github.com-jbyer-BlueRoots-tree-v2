"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CalendarIcon,
  Upload,
  X,
  Plus,
  Users,
  Target,
  Gift,
  Handshake,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface TeamMember {
  email: string
  role: string
  permissions: string[]
}

interface Milestone {
  percentage: number
  title: string
  description: string
  amount: number
}

interface RewardTier {
  minAmount: number
  title: string
  description: string
  estimatedDelivery: string
  quantityLimit?: number
}

interface MatchingDonor {
  name: string
  matchRatio: string
  maxAmount: number
  conditions: string
}

interface CustomQuestion {
  question: string
  type: string
  required: boolean
  options?: string[]
}

export function AdminCampaignCreateForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [endDate, setEndDate] = useState<Date>()
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<{ url: string; platform: string; thumbnail?: string }[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([])
  const [matchingDonors, setMatchingDonors] = useState<MatchingDonor[]>([])
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>([])

  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    category: "",
    visibility: "public",
    targetAmount: "",
    currency: "USD",
    description: "",
    coverImageUrl: "",
    coverVideoUrl: "",
    recipientName: "",
    recipientRelationship: "",
    fundDelivery: "direct",
    donorUpdates: true,
    socialSharing: {
      facebook: true,
      twitter: true,
      linkedin: false,
    },
    campaignTerms: "",
    disclaimers: "",
    indemnification: false,
    termsAgreement: false,
  })

  const totalSteps = 9
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { number: 1, title: "Basic Information", icon: "📝" },
    { number: 2, title: "Financial Details", icon: "💰" },
    { number: 3, title: "Content & Media", icon: "📸" },
    { number: 4, title: "Recipient Information", icon: "👤" },
    { number: 5, title: "Team Members", icon: "👥" },
    { number: 6, title: "Milestones", icon: "🎯" },
    { number: 7, title: "Reward Tiers", icon: "🎁" },
    { number: 8, title: "Matching Donors", icon: "🤝" },
    { number: 9, title: "Custom Questions", icon: "❓" },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSocialSharingChange = (platform: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      socialSharing: {
        ...prev.socialSharing,
        [platform]: checked,
      },
    }))
  }

  const addTeamMember = () => {
    setTeamMembers((prev) => [...prev, { email: "", role: "Collaborator", permissions: [] }])
  }

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index))
  }

  const addMilestone = () => {
    const targetAmount = Number.parseFloat(formData.targetAmount) || 0
    const newPercentage = milestones.length === 0 ? 25 : Math.min(100, (milestones.length + 1) * 25)
    setMilestones((prev) => [
      ...prev,
      {
        percentage: newPercentage,
        title: "",
        description: "",
        amount: (targetAmount * newPercentage) / 100,
      },
    ])
  }

  const removeMilestone = (index: number) => {
    setMilestones((prev) => prev.filter((_, i) => i !== index))
  }

  const addRewardTier = () => {
    setRewardTiers((prev) => [
      ...prev,
      {
        minAmount: 0,
        title: "",
        description: "",
        estimatedDelivery: "",
        quantityLimit: undefined,
      },
    ])
  }

  const removeRewardTier = (index: number) => {
    setRewardTiers((prev) => prev.filter((_, i) => i !== index))
  }

  const addMatchingDonor = () => {
    setMatchingDonors((prev) => [
      ...prev,
      {
        name: "",
        matchRatio: "1:1",
        maxAmount: 0,
        conditions: "",
      },
    ])
  }

  const removeMatchingDonor = (index: number) => {
    setMatchingDonors((prev) => prev.filter((_, i) => i !== index))
  }

  const addCustomQuestion = () => {
    setCustomQuestions((prev) => [
      ...prev,
      {
        question: "",
        type: "text",
        required: false,
        options: [],
      },
    ])
  }

  const removeCustomQuestion = (index: number) => {
    setCustomQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addVideo = () => {
    const url = prompt("Enter YouTube or Vimeo URL:")
    if (url) {
      let platform = ""
      let thumbnail = ""

      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        platform = "YouTube"
        const videoId = url.includes("youtu.be")
          ? url.split("/").pop()?.split("?")[0]
          : url.split("v=")[1]?.split("&")[0]
        if (videoId) {
          thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        }
      } else if (url.includes("vimeo.com")) {
        platform = "Vimeo"
        thumbnail = "/placeholder.svg?height=180&width=320&text=Vimeo+Video"
      }

      if (platform) {
        setVideos((prev) => [...prev, { url, platform, thumbnail }])
      }
    }
  }

  const removeVideo = (index: number) => {
    setVideos((prev) => prev.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    const campaignData = {
      ...formData,
      endDate,
      images,
      videos,
      teamMembers,
      milestones,
      rewardTiers,
      matchingDonors,
      customQuestions,
    }

    console.log("Campaign Data:", campaignData)
    alert("Campaign created successfully! (This is a demo)")
  }

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
          </h2>
          <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
        </div>
        <Progress value={progress} className="w-full" />

        {/* Step Indicators */}
        <div className="flex items-center justify-between text-sm">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "flex flex-col items-center space-y-1",
                step.number === currentStep
                  ? "text-blue-600"
                  : step.number < currentStep
                    ? "text-green-600"
                    : "text-gray-400",
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                  step.number === currentStep
                    ? "bg-blue-100 text-blue-600"
                    : step.number < currentStep
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400",
                )}
              >
                {step.number < currentStep ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span className="hidden sm:block text-center max-w-20">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Campaign Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter your campaign title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="tagline">Short Tagline *</Label>
                <Textarea
                  id="tagline"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                  placeholder="1-2 sentences describing your campaign"
                  className="mt-1"
                  rows={2}
                  maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">{formData.tagline.length}/200 characters</p>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="arts">Arts & Culture</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Visibility *</Label>
                <RadioGroup
                  value={formData.visibility}
                  onValueChange={(value) => handleInputChange("visibility", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public - Anyone can find and donate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private - Invite-only access</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Financial Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetAmount">Target Amount *</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency *</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
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
                <Label>Campaign End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full mt-1 justify-start text-left font-normal",
                        !endDate && "text-muted-foreground",
                      )}
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
            </div>
          )}

          {/* Step 3: Content & Media */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="description">Detailed Description / Story *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tell your story in detail. Explain why this campaign matters and how donations will be used."
                  className="mt-1"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="coverImageUrl">Cover Image URL</Label>
                <Input
                  id="coverImageUrl"
                  value={formData.coverImageUrl}
                  onChange={(e) => handleInputChange("coverImageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="coverVideoUrl">Cover Video URL (YouTube/Vimeo)</Label>
                <Input
                  id="coverVideoUrl"
                  value={formData.coverVideoUrl}
                  onChange={(e) => handleInputChange("coverVideoUrl", e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="mt-1"
                />
              </div>

              {/* Image Gallery */}
              <div>
                <Label>Image Gallery (up to 6 photos)</Label>
                <div className="mt-2 space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">Upload images</span>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          {index === 0 && <Badge className="absolute bottom-2 left-2">Main Photo</Badge>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Video Gallery */}
              <div>
                <Label>Videos (YouTube/Vimeo)</Label>
                <div className="mt-2 space-y-4">
                  <Button type="button" variant="outline" onClick={addVideo} className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Video URL
                  </Button>

                  {videos.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <div key={index} className="relative border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{video.platform}</Badge>
                            <button onClick={() => removeVideo(index)} className="text-red-500 hover:text-red-700">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {video.thumbnail && (
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt="Video thumbnail"
                              className="w-full h-32 object-cover rounded"
                            />
                          )}
                          <p className="text-sm text-gray-600 mt-2 truncate">{video.url}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Recipient Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="recipientName">Recipient Name or Organization *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange("recipientName", e.target.value)}
                  placeholder="Who will receive the funds?"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="recipientRelationship">Recipient Relationship to Organizer *</Label>
                <Select
                  value={formData.recipientRelationship}
                  onValueChange={(value) => handleInputChange("recipientRelationship", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Myself</SelectItem>
                    <SelectItem value="family">Family Member</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="organization">Organization I represent</SelectItem>
                    <SelectItem value="beneficiary">Beneficiary I'm helping</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Delivery of Funds *</Label>
                <RadioGroup
                  value={formData.fundDelivery}
                  onValueChange={(value) => handleInputChange("fundDelivery", value)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="direct" id="direct" />
                    <Label htmlFor="direct">Direct disbursement to recipient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="escrow" id="escrow" />
                    <Label htmlFor="escrow">Hold in escrow until goals are met</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 5: Team Members */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Team Members & Co-Organizers</h3>
                  <p className="text-sm text-gray-600">Invite collaborators to help manage your campaign</p>
                </div>
                <Button onClick={addTeamMember} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Member
                </Button>
              </div>

              {teamMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No team members added yet</p>
                  <p className="text-sm">Add team members to collaborate on your campaign</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Team Member {index + 1}</h4>
                          <Button
                            onClick={() => removeTeamMember(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Email Address</Label>
                            <Input
                              value={member.email}
                              onChange={(e) => {
                                const newMembers = [...teamMembers]
                                newMembers[index].email = e.target.value
                                setTeamMembers(newMembers)
                              }}
                              placeholder="team@example.com"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Role</Label>
                            <Select
                              value={member.role}
                              onValueChange={(value) => {
                                const newMembers = [...teamMembers]
                                newMembers[index].role = value
                                setTeamMembers(newMembers)
                              }}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Admin">Admin - Full access</SelectItem>
                                <SelectItem value="Editor">Editor - Can edit campaign</SelectItem>
                                <SelectItem value="Collaborator">Collaborator - Can view and comment</SelectItem>
                                <SelectItem value="Viewer">Viewer - Read-only access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 6: Milestones */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Campaign Milestones</h3>
                  <p className="text-sm text-gray-600">Break your goal into phases to track progress</p>
                </div>
                <Button onClick={addMilestone} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </div>

              {milestones.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Target className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No milestones added yet</p>
                  <p className="text-sm">Add milestones to track your campaign progress</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Milestone {index + 1}</h4>
                          <Button
                            onClick={() => removeMilestone(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Percentage</Label>
                            <Select
                              value={milestone.percentage.toString()}
                              onValueChange={(value) => {
                                const newMilestones = [...milestones]
                                const percentage = Number.parseInt(value)
                                newMilestones[index].percentage = percentage
                                newMilestones[index].amount =
                                  (Number.parseFloat(formData.targetAmount) * percentage) / 100
                                setMilestones(newMilestones)
                              }}
                            >
                              <SelectTrigger className="mt-1">
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
                              value={`$${milestone.amount.toLocaleString()}`}
                              readOnly
                              className="mt-1 bg-gray-50"
                            />
                          </div>
                          <div>
                            <Label>Title</Label>
                            <Input
                              value={milestone.title}
                              onChange={(e) => {
                                const newMilestones = [...milestones]
                                newMilestones[index].title = e.target.value
                                setMilestones(newMilestones)
                              }}
                              placeholder="Milestone title"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Description</Label>
                          <Textarea
                            value={milestone.description}
                            onChange={(e) => {
                              const newMilestones = [...milestones]
                              newMilestones[index].description = e.target.value
                              setMilestones(newMilestones)
                            }}
                            placeholder="What will be achieved at this milestone?"
                            className="mt-1"
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 7: Reward Tiers */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Reward Tiers</h3>
                  <p className="text-sm text-gray-600">Set thank-you gifts for different donation levels</p>
                </div>
                <Button onClick={addRewardTier} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Reward
                </Button>
              </div>

              {rewardTiers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Gift className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No reward tiers added yet</p>
                  <p className="text-sm">Add rewards to thank your donors</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {rewardTiers.map((reward, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Reward Tier {index + 1}</h4>
                          <Button
                            onClick={() => removeRewardTier(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Minimum Donation Amount</Label>
                            <Input
                              type="number"
                              value={reward.minAmount}
                              onChange={(e) => {
                                const newRewards = [...rewardTiers]
                                newRewards[index].minAmount = Number.parseFloat(e.target.value) || 0
                                setRewardTiers(newRewards)
                              }}
                              placeholder="0"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Estimated Delivery</Label>
                            <Input
                              value={reward.estimatedDelivery}
                              onChange={(e) => {
                                const newRewards = [...rewardTiers]
                                newRewards[index].estimatedDelivery = e.target.value
                                setRewardTiers(newRewards)
                              }}
                              placeholder="e.g., March 2024"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Reward Title</Label>
                          <Input
                            value={reward.title}
                            onChange={(e) => {
                              const newRewards = [...rewardTiers]
                              newRewards[index].title = e.target.value
                              setRewardTiers(newRewards)
                            }}
                            placeholder="Thank you gift name"
                            className="mt-1"
                          />
                        </div>
                        <div className="mt-4">
                          <Label>Description</Label>
                          <Textarea
                            value={reward.description}
                            onChange={(e) => {
                              const newRewards = [...rewardTiers]
                              newRewards[index].description = e.target.value
                              setRewardTiers(newRewards)
                            }}
                            placeholder="Describe the reward in detail"
                            className="mt-1"
                            rows={2}
                          />
                        </div>
                        <div className="mt-4">
                          <Label>Quantity Limit (Optional)</Label>
                          <Input
                            type="number"
                            value={reward.quantityLimit || ""}
                            onChange={(e) => {
                              const newRewards = [...rewardTiers]
                              newRewards[index].quantityLimit = e.target.value
                                ? Number.parseInt(e.target.value)
                                : undefined
                              setRewardTiers(newRewards)
                            }}
                            placeholder="Leave empty for unlimited"
                            className="mt-1"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 8: Matching Donors */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Matching Donors</h3>
                  <p className="text-sm text-gray-600">Define corporate or individual matches to amplify donations</p>
                </div>
                <Button onClick={addMatchingDonor} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Matching Donor
                </Button>
              </div>

              {matchingDonors.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Handshake className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No matching donors added yet</p>
                  <p className="text-sm">Add matching sponsors to double the impact</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matchingDonors.map((donor, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Matching Donor {index + 1}</h4>
                          <Button
                            onClick={() => removeMatchingDonor(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Sponsor Name</Label>
                            <Input
                              value={donor.name}
                              onChange={(e) => {
                                const newDonors = [...matchingDonors]
                                newDonors[index].name = e.target.value
                                setMatchingDonors(newDonors)
                              }}
                              placeholder="Company or individual name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label>Match Ratio</Label>
                            <Select
                              value={donor.matchRatio}
                              onValueChange={(value) => {
                                const newDonors = [...matchingDonors]
                                newDonors[index].matchRatio = value
                                setMatchingDonors(newDonors)
                              }}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1:1">1:1 - Match dollar for dollar</SelectItem>
                                <SelectItem value="1:2">1:2 - Match $1 for every $2</SelectItem>
                                <SelectItem value="2:1">2:1 - Match $2 for every $1</SelectItem>
                                <SelectItem value="1:3">1:3 - Match $1 for every $3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Maximum Match Amount</Label>
                            <Input
                              type="number"
                              value={donor.maxAmount}
                              onChange={(e) => {
                                const newDonors = [...matchingDonors]
                                newDonors[index].maxAmount = Number.parseFloat(e.target.value) || 0
                                setMatchingDonors(newDonors)
                              }}
                              placeholder="0"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <Label>Match Conditions</Label>
                          <Textarea
                            value={donor.conditions}
                            onChange={(e) => {
                              const newDonors = [...matchingDonors]
                              newDonors[index].conditions = e.target.value
                              setMatchingDonors(newDonors)
                            }}
                            placeholder="Any special conditions for the match (e.g., time limits, minimum amounts)"
                            className="mt-1"
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 9: Custom Questions */}
          {currentStep === 9 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Custom Questions</h3>
                  <p className="text-sm text-gray-600">Create questionnaire for donors to answer when donating</p>
                </div>
                <Button onClick={addCustomQuestion} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>

              {customQuestions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-2">No custom questions added yet</p>
                  <p className="text-sm">Add questions to gather information from donors</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customQuestions.map((question, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Question {index + 1}</h4>
                          <Button
                            onClick={() => removeCustomQuestion(index)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label>Question</Label>
                            <Input
                              value={question.question}
                              onChange={(e) => {
                                const newQuestions = [...customQuestions]
                                newQuestions[index].question = e.target.value
                                setCustomQuestions(newQuestions)
                              }}
                              placeholder="Enter your question"
                              className="mt-1"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Question Type</Label>
                              <Select
                                value={question.type}
                                onValueChange={(value) => {
                                  const newQuestions = [...customQuestions]
                                  newQuestions[index].type = value
                                  setCustomQuestions(newQuestions)
                                }}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Text Input</SelectItem>
                                  <SelectItem value="textarea">Long Text</SelectItem>
                                  <SelectItem value="select">Multiple Choice</SelectItem>
                                  <SelectItem value="checkbox">Checkbox</SelectItem>
                                  <SelectItem value="radio">Radio Buttons</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center space-x-2 mt-6">
                              <Checkbox
                                id={`required-${index}`}
                                checked={question.required}
                                onCheckedChange={(checked) => {
                                  const newQuestions = [...customQuestions]
                                  newQuestions[index].required = checked as boolean
                                  setCustomQuestions(newQuestions)
                                }}
                              />
                              <Label htmlFor={`required-${index}`}>Required</Label>
                            </div>
                          </div>
                          {(question.type === "select" || question.type === "radio") && (
                            <div>
                              <Label>Options (one per line)</Label>
                              <Textarea
                                value={question.options?.join("\n") || ""}
                                onChange={(e) => {
                                  const newQuestions = [...customQuestions]
                                  newQuestions[index].options = e.target.value.split("\n").filter((opt) => opt.trim())
                                  setCustomQuestions(newQuestions)
                                }}
                                placeholder="Option 1&#10;Option 2&#10;Option 3"
                                className="mt-1"
                                rows={3}
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Final Review Section */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Campaign Review</CardTitle>
                  <CardDescription>Review your campaign before publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Title:</strong> {formData.title || "Not set"}
                    </div>
                    <div>
                      <strong>Target:</strong> {formData.currency} {formData.targetAmount || "0"}
                    </div>
                    <div>
                      <strong>Category:</strong> {formData.category || "Not set"}
                    </div>
                    <div>
                      <strong>End Date:</strong> {endDate ? format(endDate, "PPP") : "Not set"}
                    </div>
                    <div>
                      <strong>Team Members:</strong> {teamMembers.length}
                    </div>
                    <div>
                      <strong>Milestones:</strong> {milestones.length}
                    </div>
                    <div>
                      <strong>Reward Tiers:</strong> {rewardTiers.length}
                    </div>
                    <div>
                      <strong>Custom Questions:</strong> {customQuestions.length}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="campaignTerms">Campaign Terms *</Label>
                      <Textarea
                        id="campaignTerms"
                        value={formData.campaignTerms}
                        onChange={(e) => handleInputChange("campaignTerms", e.target.value)}
                        placeholder="Refund policy, disbursement schedule, etc."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="disclaimers">Required Disclaimers</Label>
                      <Textarea
                        id="disclaimers"
                        value={formData.disclaimers}
                        onChange={(e) => handleInputChange("disclaimers", e.target.value)}
                        placeholder="Any required disclaimers for regulated causes"
                        className="mt-1"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="donorUpdates"
                          checked={formData.donorUpdates}
                          onCheckedChange={(checked) => handleInputChange("donorUpdates", checked)}
                        />
                        <Label htmlFor="donorUpdates">Opt-in for donor email updates</Label>
                      </div>

                      <div className="space-y-2">
                        <Label>Social Sharing Defaults</Label>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="facebook"
                              checked={formData.socialSharing.facebook}
                              onCheckedChange={(checked) => handleSocialSharingChange("facebook", checked as boolean)}
                            />
                            <Label htmlFor="facebook">Facebook</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="twitter"
                              checked={formData.socialSharing.twitter}
                              onCheckedChange={(checked) => handleSocialSharingChange("twitter", checked as boolean)}
                            />
                            <Label htmlFor="twitter">Twitter</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="linkedin"
                              checked={formData.socialSharing.linkedin}
                              onCheckedChange={(checked) => handleSocialSharingChange("linkedin", checked as boolean)}
                            />
                            <Label htmlFor="linkedin">LinkedIn</Label>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="indemnification"
                          checked={formData.indemnification}
                          onCheckedChange={(checked) => handleInputChange("indemnification", checked)}
                        />
                        <Label htmlFor="indemnification">I confirm the accuracy of all information provided *</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="termsAgreement"
                          checked={formData.termsAgreement}
                          onCheckedChange={(checked) => handleInputChange("termsAgreement", checked)}
                        />
                        <Label htmlFor="termsAgreement">I agree to the Terms of Service and Privacy Policy *</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button onClick={prevStep} disabled={currentStep === 1} variant="outline">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>

        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!formData.indemnification || !formData.termsAgreement}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        )}
      </div>
    </div>
  )
}
