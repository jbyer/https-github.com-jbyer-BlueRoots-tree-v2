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
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, Upload, Plus, X, Save } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DashboardEditCampaignFormProps {
  campaignId: string
}

export function DashboardEditCampaignForm({ campaignId }: DashboardEditCampaignFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [endDate, setEndDate] = useState<Date>(new Date("2024-06-15"))

  // Mock existing campaign data
  const [formData, setFormData] = useState({
    title: "Support Progressive Education Reform",
    description:
      "Help us transform public education with innovative programs and increased funding for underserved communities.",
    goal: "50000",
    category: "education",
    tags: "progressive, education, reform",
    status: "active",
    // Additional fields for comprehensive editing
    shortDescription: "Transform public education with innovative programs",
    targetAudience: "Parents, educators, and community members",
    fundingBreakdown: "60% program development, 30% community outreach, 10% administrative costs",
    teamMembers: [
      { name: "Sarah Johnson", role: "Campaign Manager", email: "sarah@example.com" },
      { name: "Mike Chen", role: "Communications Director", email: "mike@example.com" },
    ],
    milestones: [
      { amount: 10000, description: "Launch community workshops", completed: true },
      { amount: 25000, description: "Hire additional staff", completed: true },
      { amount: 40000, description: "Expand to neighboring districts", completed: false },
    ],
    rewardTiers: [
      { amount: 25, description: "Thank you email and updates" },
      { amount: 100, description: "Campaign sticker and updates" },
      { amount: 500, description: "Invitation to exclusive supporter event" },
    ],
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", role: "", email: "" }],
    }))
  }

  const removeTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index),
    }))
  }

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { amount: 0, description: "", completed: false }],
    }))
  }

  const removeMilestone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }))
  }

  const addRewardTier = () => {
    setFormData((prev) => ({
      ...prev,
      rewardTiers: [...prev.rewardTiers, { amount: 0, description: "" }],
    }))
  }

  const removeRewardTier = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      rewardTiers: prev.rewardTiers.filter((_, i) => i !== index),
    }))
  }

  const categories = [
    "Education",
    "Healthcare",
    "Environment",
    "Social Justice",
    "Economic Policy",
    "Infrastructure",
    "Technology",
    "Other",
  ]

  const steps = ["Basic Info", "Details", "Team & Milestones", "Rewards", "Review"]

  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Edit Campaign: {formData.title}</CardTitle>
              <CardDescription>Campaign ID: {campaignId}</CardDescription>
            </div>
            <Badge variant={formData.status === "active" ? "default" : "secondary"}>{formData.status}</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Step {currentStep} of {steps.length}: {steps[currentStep - 1]}
              </span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="title">Campaign Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                  placeholder="Brief one-line description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="goal">Fundraising Goal ($)</Label>
                  <Input
                    id="goal"
                    type="number"
                    value={formData.goal}
                    onChange={(e) => handleInputChange("goal", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue />
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
                <Label>Campaign End Date</Label>
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
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Campaign Details</h3>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  placeholder="Who is your primary audience?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingBreakdown">Funding Breakdown</Label>
                <Textarea
                  id="fundingBreakdown"
                  value={formData.fundingBreakdown}
                  onChange={(e) => handleInputChange("fundingBreakdown", e.target.value)}
                  placeholder="How will the funds be used?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="progressive, education, reform (comma separated)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Campaign Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <Label htmlFor="image" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700">Upload new campaign image</span>
                  </Label>
                  <Input id="image" type="file" accept="image/*" className="hidden" />
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max size 5MB.</p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Team Members & Milestones</h3>

              {/* Team Members */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Team Members</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addTeamMember}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </div>

                {formData.teamMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <Input
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => {
                        const newMembers = [...formData.teamMembers]
                        newMembers[index].name = e.target.value
                        setFormData((prev) => ({ ...prev, teamMembers: newMembers }))
                      }}
                    />
                    <Input
                      placeholder="Role"
                      value={member.role}
                      onChange={(e) => {
                        const newMembers = [...formData.teamMembers]
                        newMembers[index].role = e.target.value
                        setFormData((prev) => ({ ...prev, teamMembers: newMembers }))
                      }}
                    />
                    <Input
                      placeholder="Email"
                      value={member.email}
                      onChange={(e) => {
                        const newMembers = [...formData.teamMembers]
                        newMembers[index].email = e.target.value
                        setFormData((prev) => ({ ...prev, teamMembers: newMembers }))
                      }}
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeTeamMember(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Campaign Milestones</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Milestone
                  </Button>
                </div>

                {formData.milestones.map((milestone, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <Input
                      type="number"
                      placeholder="Amount ($)"
                      value={milestone.amount}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones]
                        newMilestones[index].amount = Number(e.target.value)
                        setFormData((prev) => ({ ...prev, milestones: newMilestones }))
                      }}
                    />
                    <Input
                      placeholder="Description"
                      value={milestone.description}
                      onChange={(e) => {
                        const newMilestones = [...formData.milestones]
                        newMilestones[index].description = e.target.value
                        setFormData((prev) => ({ ...prev, milestones: newMilestones }))
                      }}
                      className="md:col-span-2"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeMilestone(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Reward Tiers</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Supporter Rewards</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addRewardTier}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reward
                  </Button>
                </div>

                {formData.rewardTiers.map((reward, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                    <Input
                      type="number"
                      placeholder="Amount ($)"
                      value={reward.amount}
                      onChange={(e) => {
                        const newRewards = [...formData.rewardTiers]
                        newRewards[index].amount = Number(e.target.value)
                        setFormData((prev) => ({ ...prev, rewardTiers: newRewards }))
                      }}
                    />
                    <Input
                      placeholder="Reward description"
                      value={reward.description}
                      onChange={(e) => {
                        const newRewards = [...formData.rewardTiers]
                        newRewards[index].description = e.target.value
                        setFormData((prev) => ({ ...prev, rewardTiers: newRewards }))
                      }}
                      className="md:col-span-2"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeRewardTier(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Review & Save</h3>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Campaign Summary</h4>
                  <p>
                    <strong>Title:</strong> {formData.title}
                  </p>
                  <p>
                    <strong>Goal:</strong> ${Number(formData.goal).toLocaleString()}
                  </p>
                  <p>
                    <strong>Category:</strong> {formData.category}
                  </p>
                  <p>
                    <strong>Team Members:</strong> {formData.teamMembers.length}
                  </p>
                  <p>
                    <strong>Milestones:</strong> {formData.milestones.length}
                  </p>
                  <p>
                    <strong>Reward Tiers:</strong> {formData.rewardTiers.length}
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Ready to save?</strong> Your campaign changes will be updated immediately. Make sure all
                    information is accurate before proceeding.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}>Next</Button>
          ) : (
            <Button>Save Changes</Button>
          )}
        </div>
      </div>
    </div>
  )
}
