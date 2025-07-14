"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CalendarIcon,
  Upload,
  Eye,
  EyeOff,
  Check,
  X,
  Shield,
  Lock,
  User,
  Building,
  MapPin,
  FileText,
  CreditCard,
  Bell,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Password strength validation
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

const registrationSchema = z
  .object({
    // Step 1: Basic Information
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: passwordSchema,
    confirmPassword: z.string(),

    // Step 2: Profile & Organization
    role: z.enum(["individual", "non-profit", "business", "political-org", "campaign"]),
    organizationName: z.string().optional(),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    socialHandle: z.string().optional(),

    // Step 3: Address & Location
    streetAddress: z.string().min(5, "Please enter a valid street address"),
    city: z.string().min(2, "Please enter a valid city"),
    state: z.string().min(2, "Please select a state"),
    zipCode: z.string().min(5, "Please enter a valid ZIP code"),
    country: z.string().min(2, "Please select a country"),
    timeZone: z.string().min(1, "Please select a time zone"),

    // Step 4: Verification
    dateOfBirth: z.date().optional(),
    incorporationDate: z.date().optional(),
    taxId: z.string().optional(),

    // Step 5: Banking & Preferences
    bankAccountHolder: z.string().min(2, "Please enter the account holder name"),
    bankName: z.string().min(2, "Please enter the bank name"),
    routingNumber: z.string().min(9, "Routing number must be 9 digits").max(9, "Routing number must be 9 digits"),
    accountNumber: z.string().min(8, "Please enter a valid account number"),
    accountType: z.enum(["checking", "savings", "business"]),

    // Agreements and Preferences
    agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms"),
    agreeToPrivacy: z.boolean().refine((val) => val === true, "You must agree to the privacy policy"),
    emailNotifications: z.boolean(),
    smsNotifications: z.boolean(),
    marketingEmails: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type RegistrationFormData = z.infer<typeof registrationSchema>

const steps = [
  { id: 1, title: "Basic Information", icon: User },
  { id: 2, title: "Profile & Organization", icon: Building },
  { id: 3, title: "Address & Location", icon: MapPin },
  { id: 4, title: "Verification", icon: Shield },
  { id: 5, title: "Banking & Preferences", icon: CreditCard },
]

const roleOptions = [
  { value: "individual", label: "Individual" },
  { value: "non-profit", label: "Non-profit Organization" },
  { value: "business", label: "Business" },
  { value: "political-org", label: "Political Organization" },
  { value: "campaign", label: "Campaign Committee" },
]

const timeZones = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
]

const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" },
]

const states = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showBankDetails, setShowBankDetails] = useState(false)
  const [profileImage, setProfileImage] = useState<string>("")
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "individual",
      organizationName: "",
      website: "",
      socialHandle: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      timeZone: "America/New_York",
      taxId: "",
      bankAccountHolder: "",
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      accountType: "checking",
      agreeToTerms: false,
      agreeToPrivacy: false,
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    },
  })

  const watchedRole = form.watch("role")
  const watchedPassword = form.watch("password")

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/[a-z]/.test(password)) strength += 20
    if (/[0-9]/.test(password)) strength += 20
    if (/[^A-Za-z0-9]/.test(password)) strength += 20
    return strength
  }

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500"
    if (strength < 60) return "bg-orange-500"
    if (strength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 40) return "Weak"
    if (strength < 60) return "Fair"
    if (strength < 80) return "Good"
    return "Strong"
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

  const nextStep = () => {
    setCurrentStep(Math.min(5, currentStep + 1))
  }

  const prevStep = () => {
    setCurrentStep(Math.max(1, currentStep - 1))
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Registration data:", data)
    setIsLoading(false)

    // Redirect to dashboard or login
    window.location.href = "/dashboard"
  }

  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join our platform to start your political fundraising campaign</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-4" />
            <div className="flex justify-between">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex flex-col items-center space-y-2",
                    step.id <= currentStep ? "text-blue-600" : "text-gray-400",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2",
                      step.id <= currentStep
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-400",
                    )}
                  >
                    {step.id < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Basic Information</span>
                  </CardTitle>
                  <CardDescription>Let's start with your basic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          {watchedPassword && (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={cn(
                                      "h-2 rounded-full transition-all",
                                      getPasswordStrengthColor(getPasswordStrength(watchedPassword)),
                                    )}
                                    style={{ width: `${getPasswordStrength(watchedPassword)}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">
                                  {getPasswordStrengthText(getPasswordStrength(watchedPassword))}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600 space-y-1">
                                <div className="flex items-center space-x-2">
                                  {watchedPassword.length >= 8 ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <X className="w-3 h-3 text-red-500" />
                                  )}
                                  <span>At least 8 characters</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {/[A-Z]/.test(watchedPassword) ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <X className="w-3 h-3 text-red-500" />
                                  )}
                                  <span>One uppercase letter</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {/[a-z]/.test(watchedPassword) ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <X className="w-3 h-3 text-red-500" />
                                  )}
                                  <span>One lowercase letter</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {/[0-9]/.test(watchedPassword) ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <X className="w-3 h-3 text-red-500" />
                                  )}
                                  <span>One number</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {/[^A-Za-z0-9]/.test(watchedPassword) ? (
                                    <Check className="w-3 h-3 text-green-500" />
                                  ) : (
                                    <X className="w-3 h-3 text-red-500" />
                                  )}
                                  <span>One special character</span>
                                </div>
                              </div>
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Profile & Organization */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-5 h-5" />
                    <span>Profile & Organization</span>
                  </CardTitle>
                  <CardDescription>Tell us about yourself and your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture Upload */}
                  <div className="space-y-4">
                    <FormLabel>Profile Picture / Logo (Optional)</FormLabel>
                    <div className="flex items-center space-x-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profileImage || "/placeholder.svg"} />
                        <AvatarFallback>
                          {form.getValues("firstName")?.[0]}
                          {form.getValues("lastName")?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <label htmlFor="profile-upload" className="cursor-pointer">
                          <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Upload Photo</span>
                          </div>
                        </label>
                        <input
                          id="profile-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                        <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 5MB.</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roleOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchedRole !== "individual" && (
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter organization name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialHandle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Social Media Handle (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="@username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Address & Location */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Address & Location</span>
                  </CardTitle>
                  <CardDescription>Your mailing address and time zone preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state.value} value={state.value}>
                                  {state.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP/Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Zone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time zone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeZones.map((tz) => (
                              <SelectItem key={tz.value} value={tz.value}>
                                {tz.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-gray-500">Used to schedule updates and reminders correctly</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Verification</span>
                  </CardTitle>
                  <CardDescription>Identity verification for security and compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date of Birth / Incorporation Date */}
                  <div className="space-y-4">
                    <FormLabel>{watchedRole === "individual" ? "Date of Birth" : "Incorporation Date"}</FormLabel>
                    <FormField
                      control={form.control}
                      name={watchedRole === "individual" ? "dateOfBirth" : "incorporationDate"}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>
                                      {watchedRole === "individual"
                                        ? "Select date of birth"
                                        : "Select incorporation date"}
                                    </span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <p className="text-sm text-gray-500">
                            {watchedRole === "individual"
                              ? "Required for age verification"
                              : "Date when your organization was established"}
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Government ID Upload */}
                  <div className="space-y-4">
                    <FormLabel>Government-Issued ID</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <label htmlFor="id-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-700">Upload your ID document</span>
                      </label>
                      <input
                        id="id-upload"
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
                          <Check className="h-4 w-4" />
                          <span className="text-sm">{idDocument.name} uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tax ID */}
                  {(watchedRole === "non-profit" || watchedRole === "business") && (
                    <FormField
                      control={form.control}
                      name="taxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax ID / EIN</FormLabel>
                          <FormControl>
                            <Input placeholder="12-3456789" {...field} />
                          </FormControl>
                          <p className="text-sm text-gray-500">Required for tax-deductible receipts</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

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
            )}

            {/* Step 5: Banking & Preferences */}
            {currentStep === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Banking & Preferences</span>
                  </CardTitle>
                  <CardDescription>Banking details for payouts and notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Banking Section */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900">Bank-Level Security</h4>
                        <p className="text-sm text-green-700 mt-1">
                          Your banking information is encrypted with 256-bit SSL encryption and stored in compliance
                          with PCI DSS standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="bankAccountHolder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full name as it appears on your bank account" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name of your bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="routingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Routing Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showBankDetails ? "text" : "password"}
                                placeholder="9-digit routing number"
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowBankDetails(!showBankDetails)}
                              >
                                {showBankDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input
                              type={showBankDetails ? "text" : "password"}
                              placeholder="Your account number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select account type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="checking">Checking</SelectItem>
                            <SelectItem value="savings">Savings</SelectItem>
                            <SelectItem value="business">Business Checking</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />

                  {/* Notification Preferences */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <FormLabel className="text-base">Notification Preferences</FormLabel>
                    </div>

                    <FormField
                      control={form.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Receive email updates about your campaigns and donations
                            </div>
                          </div>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">SMS Notifications</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Receive text message alerts for urgent updates
                            </div>
                          </div>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Marketing Emails</FormLabel>
                            <div className="text-sm text-muted-foreground">
                              Receive updates about new features and platform improvements
                            </div>
                          </div>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Terms and Privacy */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <a href="/terms" className="text-blue-600 hover:underline">
                                Terms of Service
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="agreeToPrivacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <a href="/privacy" className="text-blue-600 hover:underline">
                                Privacy Policy
                              </a>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                Previous
              </Button>

              <div className="flex space-x-4">
                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
