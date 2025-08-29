import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CalendarDays,
  DollarSign,
  Users,
  TrendingUp,
  Edit,
  Share2,
  Heart,
  Target,
  MapPin,
  Clock,
  User,
  FileText,
  Eye,
  MousePointer,
  BarChart3,
  TrendingDown,
  Settings,
  Save,
  Trash2,
  Globe,
  Bell,
  CreditCard,
  Shield,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  // Mock campaign data - in a real app, this would be fetched based on the ID
  const campaign = {
    id: params.id,
    title: "Support Progressive Education Reform",
    description:
      "Help us transform public education with innovative programs and increased funding for underserved communities.",
    goal: 50000,
    raised: 32500,
    donors: 156,
    daysLeft: 23,
    status: "active",
    category: "Education",
    createdAt: "2024-01-15",
    // Extended campaign details
    fullDescription: `Our education system is at a critical juncture. Despite decades of promises and incremental changes, millions of students in underserved communities continue to lack access to quality education resources, experienced teachers, and modern learning environments.

This campaign aims to bridge the educational equity gap by supporting three key initiatives:

**1. Technology Integration Program**
We will provide tablets, laptops, and high-speed internet access to students who lack these essential tools for modern learning. Our goal is to ensure every student has the technology they need to succeed in today's digital world.

**2. Teacher Support and Training**
We will fund professional development programs for educators in underserved schools, providing them with the latest teaching methodologies, classroom management techniques, and subject-specific training to enhance student outcomes.

**3. Infrastructure Improvements**
Many schools in our target communities lack basic amenities like proper heating, updated textbooks, and safe learning environments. This campaign will fund critical infrastructure improvements to create conducive learning spaces.`,

    objectives: [
      "Provide technology access to 500+ students in underserved communities",
      "Train 50+ teachers in modern educational methodologies",
      "Upgrade infrastructure in 10+ schools across the district",
      "Establish mentorship programs connecting students with industry professionals",
      "Create after-school programs focused on STEM education",
    ],

    timeline: [
      { phase: "Phase 1", period: "Months 1-2", description: "Technology procurement and distribution" },
      { phase: "Phase 2", period: "Months 3-4", description: "Teacher training program implementation" },
      { phase: "Phase 3", period: "Months 5-6", description: "Infrastructure improvement projects" },
      { phase: "Phase 4", period: "Months 7-8", description: "Mentorship program launch" },
      { phase: "Phase 5", period: "Months 9-12", description: "Program evaluation and expansion planning" },
    ],

    impact: {
      studentsReached: "500+",
      schoolsImpacted: "10+",
      teachersTrained: "50+",
      communityMembers: "2,000+",
    },

    location: "Metropolitan School District",
    organizer: "Progressive Education Alliance",
    contactEmail: "info@progressiveeducation.org",
    website: "www.progressiveeducation.org",

    fundingBreakdown: [
      { category: "Technology & Equipment", amount: 20000, percentage: 40 },
      { category: "Teacher Training Programs", amount: 12500, percentage: 25 },
      { category: "Infrastructure Improvements", amount: 10000, percentage: 20 },
      { category: "Program Administration", amount: 5000, percentage: 10 },
      { category: "Emergency Fund", amount: 2500, percentage: 5 },
    ],

    // Settings data
    settings: {
      isPublic: true,
      allowAnonymousDonations: true,
      showDonorList: true,
      emailNotifications: true,
      smsNotifications: false,
      weeklyReports: true,
      minimumDonation: 5,
      maximumDonation: 10000,
      allowRecurringDonations: true,
      autoThankYou: true,
      moderateComments: true,
      allowSharing: true,
      showProgress: true,
      showGoal: true,
    },
  }

  // Analytics data
  const dailyDonations = [
    { date: "Jan 15", donations: 1200, donors: 8, views: 245 },
    { date: "Jan 16", donations: 1800, donors: 12, views: 312 },
    { date: "Jan 17", donations: 2100, donors: 15, views: 398 },
    { date: "Jan 18", donations: 1650, donors: 11, views: 287 },
    { date: "Jan 19", donations: 2400, donors: 18, views: 445 },
    { date: "Jan 20", donations: 3200, donors: 22, views: 567 },
    { date: "Jan 21", donations: 2800, donors: 19, views: 489 },
    { date: "Jan 22", donations: 3500, donors: 25, views: 623 },
    { date: "Jan 23", donations: 2900, donors: 20, views: 534 },
    { date: "Jan 24", donations: 4100, donors: 28, views: 712 },
    { date: "Jan 25", donations: 3600, donors: 24, views: 645 },
    { date: "Jan 26", donations: 2200, donors: 16, views: 423 },
    { date: "Jan 27", donations: 2700, donors: 19, views: 498 },
    { date: "Jan 28", donations: 3100, donors: 21, views: 578 },
  ]

  const donationSources = [
    { name: "Direct Website", value: 45, color: "#3B82F6" },
    { name: "Social Media", value: 28, color: "#10B981" },
    { name: "Email Campaign", value: 15, color: "#F59E0B" },
    { name: "Referrals", value: 12, color: "#EF4444" },
  ]

  const donationRanges = [
    { range: "$1-$25", count: 45, percentage: 28.8 },
    { range: "$26-$50", count: 38, percentage: 24.4 },
    { range: "$51-$100", count: 32, percentage: 20.5 },
    { range: "$101-$250", count: 25, percentage: 16.0 },
    { range: "$251-$500", count: 12, percentage: 7.7 },
    { range: "$500+", count: 4, percentage: 2.6 },
  ]

  const weeklyTrends = [
    { week: "Week 1", donations: 8500, donors: 58, avgDonation: 147 },
    { week: "Week 2", donations: 12200, donors: 82, avgDonation: 149 },
    { week: "Week 3", donations: 11800, donors: 78, avgDonation: 151 },
  ]

  const topReferrers = [
    { source: "Facebook", visits: 1245, conversions: 34, rate: 2.73 },
    { source: "Twitter", visits: 892, conversions: 28, rate: 3.14 },
    { source: "Instagram", visits: 756, conversions: 19, rate: 2.51 },
    { source: "LinkedIn", visits: 423, conversions: 15, rate: 3.55 },
    { source: "Direct", visits: 2134, conversions: 67, rate: 3.14 },
  ]

  // Mock recent donations data
  const recentDonations = [
    {
      id: 1,
      donorName: "Sarah Johnson",
      amount: 250,
      timestamp: "2024-01-20T14:30:00Z",
      isAnonymous: false,
      message: "Great cause! Keep up the excellent work.",
    },
    {
      id: 2,
      donorName: "Anonymous",
      amount: 100,
      timestamp: "2024-01-20T12:15:00Z",
      isAnonymous: true,
      message: "",
    },
    {
      id: 3,
      donorName: "Michael Chen",
      amount: 500,
      timestamp: "2024-01-20T10:45:00Z",
      isAnonymous: false,
      message: "Education is the foundation of our future. Happy to support!",
    },
    {
      id: 4,
      donorName: "Emily Rodriguez",
      amount: 75,
      timestamp: "2024-01-19T16:20:00Z",
      isAnonymous: false,
      message: "",
    },
    {
      id: 5,
      donorName: "Anonymous",
      amount: 200,
      timestamp: "2024-01-19T14:10:00Z",
      isAnonymous: true,
      message: "Wishing you success in this important mission.",
    },
    {
      id: 6,
      donorName: "David Thompson",
      amount: 150,
      timestamp: "2024-01-19T11:30:00Z",
      isAnonymous: false,
      message: "",
    },
    {
      id: 7,
      donorName: "Lisa Park",
      amount: 300,
      timestamp: "2024-01-18T15:45:00Z",
      isAnonymous: false,
      message: "Education reform is crucial. Thank you for leading this effort!",
    },
    {
      id: 8,
      donorName: "Anonymous",
      amount: 50,
      timestamp: "2024-01-18T13:20:00Z",
      isAnonymous: true,
      message: "",
    },
    {
      id: 9,
      donorName: "Robert Wilson",
      amount: 400,
      timestamp: "2024-01-18T09:15:00Z",
      isAnonymous: false,
      message: "Proud to support progressive education initiatives.",
    },
    {
      id: 10,
      donorName: "Jennifer Lee",
      amount: 125,
      timestamp: "2024-01-17T17:30:00Z",
      isAnonymous: false,
      message: "",
    },
  ]

  const progressPercentage = (campaign.raised / campaign.goal) * 100

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const donationDate = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - donationDate.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`

    return formatDate(timestamp)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name === "donations" ? `$${entry.value}` : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <Badge variant={campaign.status === "active" ? "default" : "secondary"}>{campaign.status}</Badge>
            <span className="text-gray-500">Campaign #{campaign.id}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button asChild size="sm">
            <Link href={`/dashboard/campaigns/${campaign.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${campaign.raised.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(1)}% of ${campaign.goal.toLocaleString()} goal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.donors}</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Left</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaign.daysLeft}</div>
            <p className="text-xs text-muted-foreground">Until campaign ends</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Donation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(campaign.raised / campaign.donors)}</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Progress</CardTitle>
          <CardDescription>Track your fundraising progress toward your goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progressPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${campaign.raised.toLocaleString()} raised</span>
              <span>${campaign.goal.toLocaleString()} goal</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Campaign Description</TabsTrigger>
          <TabsTrigger value="donations">Recent Donations</TabsTrigger>
          <TabsTrigger value="analytics">Campaign Analytics</TabsTrigger>
          <TabsTrigger value="settings">Campaign Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-6">
          {/* Campaign Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Campaign Overview
              </CardTitle>
              <CardDescription>Comprehensive details about this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">{campaign.fullDescription}</div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Campaign Objectives
              </CardTitle>
              <CardDescription>Key goals and targets for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {campaign.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-green-600">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-600" />
                Project Timeline
              </CardTitle>
              <CardDescription>Implementation phases and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaign.timeline.map((phase, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">{index + 1}</span>
                      </div>
                      {index < campaign.timeline.length - 1 && <div className="w-0.5 h-8 bg-purple-200 mt-2"></div>}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                        <Badge variant="outline" className="text-xs w-fit">
                          {phase.period}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expected Impact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Expected Impact
              </CardTitle>
              <CardDescription>Projected outcomes and beneficiaries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{campaign.impact.studentsReached}</div>
                  <div className="text-sm text-gray-600">Students Reached</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{campaign.impact.schoolsImpacted}</div>
                  <div className="text-sm text-gray-600">Schools Impacted</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{campaign.impact.teachersTrained}</div>
                  <div className="text-sm text-gray-600">Teachers Trained</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{campaign.impact.communityMembers}</div>
                  <div className="text-sm text-gray-600">Community Members</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funding Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Funding Breakdown
              </CardTitle>
              <CardDescription>How your donations will be allocated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaign.fundingBreakdown.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{item.category}</span>
                      <div className="text-right">
                        <span className="font-semibold text-gray-900">${item.amount.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                Campaign Details
              </CardTitle>
              <CardDescription>Additional information about this campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{campaign.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Organized by</p>
                      <p className="font-medium">{campaign.organizer}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-medium">{formatDate(campaign.createdAt + "T00:00:00Z")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <Badge variant="secondary">{campaign.category}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <span>Contact Organizer</span>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <span>Visit Website</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Recent Donations
              </CardTitle>
              <CardDescription>Latest contributions to your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Mobile View - Card Layout */}
                <div className="block md:hidden space-y-3">
                  {recentDonations.map((donation) => (
                    <Card key={donation.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{donation.donorName}</p>
                          <p className="text-sm text-gray-500">{getTimeAgo(donation.timestamp)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">${donation.amount}</p>
                        </div>
                      </div>
                      {donation.message && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">"{donation.message}"</div>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Desktop View - Table Layout */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {donation.isAnonymous ? (
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-xs text-gray-500">?</span>
                                </div>
                              ) : (
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-semibold text-blue-600">
                                    {donation.donorName.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <span className="font-medium">{donation.donorName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="font-semibold text-green-600">${donation.amount}</span>
                          </TableCell>
                          <TableCell className="text-gray-600">{formatDate(donation.timestamp)}</TableCell>
                          <TableCell className="text-gray-600">{formatTime(donation.timestamp)}</TableCell>
                          <TableCell>
                            {donation.message ? (
                              <div className="max-w-xs">
                                <p className="text-sm text-gray-700 truncate" title={donation.message}>
                                  "{donation.message}"
                                </p>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No message</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{recentDonations.length}</p>
                      <p className="text-sm text-gray-500">Recent donations</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        ${recentDonations.reduce((sum, donation) => sum + donation.amount, 0)}
                      </p>
                      <p className="text-sm text-gray-500">Total from recent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        $
                        {Math.round(
                          recentDonations.reduce((sum, donation) => sum + donation.amount, 0) / recentDonations.length,
                        )}
                      </p>
                      <p className="text-sm text-gray-500">Average donation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,234</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">+12.5%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.16%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">+0.3%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shares</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                  <span className="text-red-600">-2.1%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">+1.2%</span>
                  <span className="ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Daily Performance Trends
              </CardTitle>
              <CardDescription>Donations, donors, and page views over the past 14 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyDonations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="donations"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.6}
                    name="Donations ($)"
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.4}
                    name="Page Views"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Donation Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-purple-600" />
                  Donation Sources
                </CardTitle>
                <CardDescription>Where your donors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={donationSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {donationSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Donation Ranges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Donation Ranges
                </CardTitle>
                <CardDescription>Distribution of donation amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={donationRanges} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="range" type="category" width={80} />
                    <Tooltip formatter={(value: number) => [value, "Donors"]} />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Weekly Performance Trends
              </CardTitle>
              <CardDescription>Week-over-week comparison of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="donations" stroke="#3B82F6" strokeWidth={3} name="Donations ($)" />
                  <Line type="monotone" dataKey="donors" stroke="#10B981" strokeWidth={3} name="Donors" />
                  <Line
                    type="monotone"
                    dataKey="avgDonation"
                    stroke="#F59E0B"
                    strokeWidth={3}
                    name="Avg Donation ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Referrers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-indigo-600" />
                Top Traffic Sources
              </CardTitle>
              <CardDescription>Websites and platforms driving the most traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topReferrers.map((referrer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-indigo-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{referrer.source}</p>
                        <p className="text-sm text-gray-500">{referrer.visits} visits</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{referrer.conversions} conversions</p>
                      <p className="text-sm text-gray-500">{referrer.rate}% rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Basic Campaign Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Basic Campaign Settings
              </CardTitle>
              <CardDescription>Edit your campaign's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="campaign-title">Campaign Title</Label>
                  <Input id="campaign-title" defaultValue={campaign.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-goal">Fundraising Goal ($)</Label>
                  <Input id="campaign-goal" type="number" defaultValue={campaign.goal} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-description">Campaign Description</Label>
                <Textarea
                  id="campaign-description"
                  defaultValue={campaign.description}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="campaign-category">Category</Label>
                  <Select defaultValue={campaign.category.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="social-justice">Social Justice</SelectItem>
                      <SelectItem value="economic-policy">Economic Policy</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign-location">Location</Label>
                  <Input id="campaign-location" defaultValue={campaign.location} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Basic Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Visibility Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Privacy & Visibility
              </CardTitle>
              <CardDescription>Control who can see and interact with your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Public Campaign</Label>
                  <p className="text-sm text-gray-500">Make your campaign visible to everyone</p>
                </div>
                <Switch defaultChecked={campaign.settings.isPublic} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Donor List</Label>
                  <p className="text-sm text-gray-500">Display list of donors on campaign page</p>
                </div>
                <Switch defaultChecked={campaign.settings.showDonorList} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Progress</Label>
                  <p className="text-sm text-gray-500">Display fundraising progress bar</p>
                </div>
                <Switch defaultChecked={campaign.settings.showProgress} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Goal Amount</Label>
                  <p className="text-sm text-gray-500">Display the fundraising goal publicly</p>
                </div>
                <Switch defaultChecked={campaign.settings.showGoal} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Allow Sharing</Label>
                  <p className="text-sm text-gray-500">Enable social media sharing buttons</p>
                </div>
                <Switch defaultChecked={campaign.settings.allowSharing} />
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Donation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Donation Settings
              </CardTitle>
              <CardDescription>Configure how donations work for your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="min-donation">Minimum Donation ($)</Label>
                  <Input
                    id="min-donation"
                    type="number"
                    defaultValue={campaign.settings.minimumDonation}
                    min="1"
                    max="1000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-donation">Maximum Donation ($)</Label>
                  <Input
                    id="max-donation"
                    type="number"
                    defaultValue={campaign.settings.maximumDonation}
                    min="1"
                    max="100000"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Allow Anonymous Donations</Label>
                  <p className="text-sm text-gray-500">Let donors contribute without showing their name</p>
                </div>
                <Switch defaultChecked={campaign.settings.allowAnonymousDonations} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Allow Recurring Donations</Label>
                  <p className="text-sm text-gray-500">Enable monthly recurring donation options</p>
                </div>
                <Switch defaultChecked={campaign.settings.allowRecurringDonations} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto Thank You Messages</Label>
                  <p className="text-sm text-gray-500">Automatically send thank you emails to donors</p>
                </div>
                <Switch defaultChecked={campaign.settings.autoThankYou} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Moderate Comments</Label>
                  <p className="text-sm text-gray-500">Review donor messages before they appear publicly</p>
                </div>
                <Switch defaultChecked={campaign.settings.moderateComments} />
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Donation Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                Notification Settings
              </CardTitle>
              <CardDescription>Choose how you want to be notified about campaign activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email alerts for new donations and milestones</p>
                </div>
                <Switch defaultChecked={campaign.settings.emailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Get text messages for urgent campaign updates</p>
                </div>
                <Switch defaultChecked={campaign.settings.smsNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Reports</Label>
                  <p className="text-sm text-gray-500">Receive weekly campaign performance summaries</p>
                </div>
                <Switch defaultChecked={campaign.settings.weeklyReports} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  defaultValue={campaign.contactEmail}
                  placeholder="Enter email for notifications"
                />
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-indigo-600" />
                Advanced Settings
              </CardTitle>
              <CardDescription>Advanced configuration options for your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaign-status">Campaign Status</Label>
                <Select defaultValue={campaign.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-url">Custom Campaign URL</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    blueroots.com/campaign/
                  </span>
                  <Input
                    id="campaign-url"
                    className="rounded-l-none"
                    defaultValue="progressive-education-reform"
                    placeholder="custom-url-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-tags">Campaign Tags</Label>
                <Input
                  id="campaign-tags"
                  defaultValue="progressive, education, reform, schools"
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions that affect your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Pause Campaign</h4>
                  <p className="text-sm text-red-700">Temporarily stop accepting donations</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent">
                  Pause Campaign
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Delete Campaign</h4>
                  <p className="text-sm text-red-700">Permanently delete this campaign and all its data</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete Campaign
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your campaign and remove all
                        associated data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Campaign</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
