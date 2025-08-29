"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Zod schema for validation
const registrationSchema = z.object({
  // Basic Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),

  // Profile & Organization
  profileType: z.enum(["individual", "organization"], {
    required_error: "Please select a profile type",
  }),
  organizationName: z.string().optional(),
  website: z.string().url().optional().or(z.literal("")),
  bio: z.string().min(50, "Bio must be at least 50 characters"),

  // Address & Location
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please select a state"),
  zipCode: z.string().min(5, "Please enter a valid ZIP code"),
  country: z.string().min(2, "Please select a country"),

  // Verification
  idType: z.enum(["drivers_license", "passport", "state_id"], {
    required_error: "Please select an ID type",
  }),
  idNumber: z.string().min(5, "Please enter a valid ID number"),
  ssn: z.string().min(9, "Please enter a valid SSN"),

  // Banking & Preferences
  bankName: z.string().min(2, "Please enter your bank name"),
  accountType: z.enum(["checking", "savings"], {
    required_error: "Please select an account type",
  }),
  routingNumber: z.string().min(9, "Please enter a valid routing number"),
  accountNumber: z.string().min(8, "Please enter a valid account number"),

  // Agreements
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  privacyAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
  marketingOptIn: z.boolean().optional(),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<RegistrationFormData>()

  const profileType = watch("profileType")

  const validateStep = async (step: number) => {
    const fieldsToValidate: (keyof RegistrationFormData)[] = []

    switch (step) {
      case 1:
        fieldsToValidate.push("firstName", "lastName", "email", "phone", "dateOfBirth")
        break
      case 2:
        fieldsToValidate.push("profileType", "bio")
        if (profileType === "organization") {
          fieldsToValidate.push("organizationName")
        }
        break
      case 3:
        fieldsToValidate.push("address", "city", "state", "zipCode", "country")
        break
      case 4:
        fieldsToValidate.push("idType", "idNumber", "ssn")
        break
      case 5:
        fieldsToValidate.push(
          "bankName",
          "accountType",
          "routingNumber",
          "accountNumber",
          "termsAccepted",
          "privacyAccepted",
        )
        break
    }

    return await trigger(fieldsToValidate)
  }

  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)

    try {
      // Validate the entire form
      const validatedData = registrationSchema.parse(data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Registration data:", validatedData)
      alert("Registration submitted successfully!")
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors)
      } else {
        console.error("Submission error:", error)
        alert("An error occurred during registration. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: "Basic Information", description: "Personal details and contact information" },
    { number: 2, title: "Profile & Organization", description: "Profile type and organizational details" },
    { number: 3, title: "Address & Location", description: "Physical address and location details" },
    { number: 4, title: "Verification", description: "Identity verification and documentation" },
    { number: 5, title: "Banking & Preferences", description: "Banking information and final preferences" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium",
                    currentStep >= step.number
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-500",
                  )}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className={cn("flex-1 h-0.5 mx-4", currentStep > step.number ? "bg-blue-600" : "bg-gray-300")} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Campaign Creator Registration</CardTitle>
              <CardDescription>
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateOfBirth && "text-muted-foreground",
                            errors.dateOfBirth && "border-red-500",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateOfBirth}
                          onSelect={(date) => {
                            setDateOfBirth(date)
                            setValue("dateOfBirth", date!)
                          }}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Profile & Organization */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profile Type *</Label>
                    <RadioGroup
                      onValueChange={(value) => setValue("profileType", value as "individual" | "organization")}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="individual" id="individual" />
                        <Label htmlFor="individual">Individual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organization" id="organization" />
                        <Label htmlFor="organization">Organization</Label>
                      </div>
                    </RadioGroup>
                    {errors.profileType && <p className="text-sm text-red-500">{errors.profileType.message}</p>}
                  </div>

                  {profileType === "organization" && (
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Organization Name *</Label>
                      <Input
                        id="organizationName"
                        {...register("organizationName")}
                        className={errors.organizationName ? "border-red-500" : ""}
                      />
                      {errors.organizationName && (
                        <p className="text-sm text-red-500">{errors.organizationName.message}</p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://example.com"
                      {...register("website")}
                      className={errors.website ? "border-red-500" : ""}
                    />
                    {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio/Description *</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself or your organization (minimum 50 characters)"
                      rows={4}
                      {...register("bio")}
                      className={errors.bio ? "border-red-500" : ""}
                    />
                    {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Address & Location */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
                    {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" {...register("city")} className={errors.city ? "border-red-500" : ""} />
                      {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select onValueChange={(value) => setValue("state", value)}>
                        <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AL">Alabama</SelectItem>
                          <SelectItem value="AK">Alaska</SelectItem>
                          <SelectItem value="AZ">Arizona</SelectItem>
                          <SelectItem value="AR">Arkansas</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="CO">Colorado</SelectItem>
                          <SelectItem value="CT">Connecticut</SelectItem>
                          <SelectItem value="DE">Delaware</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="GA">Georgia</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input id="zipCode" {...register("zipCode")} className={errors.zipCode ? "border-red-500" : ""} />
                      {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select onValueChange={(value) => setValue("country", value)}>
                        <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                          {/* Add more countries as needed */}
                        </SelectContent>
                      </Select>
                      {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>ID Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("idType", value as "drivers_license" | "passport" | "state_id")
                      }
                    >
                      <SelectTrigger className={errors.idType ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drivers_license">Driver's License</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="state_id">State ID</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.idType && <p className="text-sm text-red-500">{errors.idType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input
                      id="idNumber"
                      {...register("idNumber")}
                      className={errors.idNumber ? "border-red-500" : ""}
                    />
                    {errors.idNumber && <p className="text-sm text-red-500">{errors.idNumber.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ssn">Social Security Number *</Label>
                    <Input
                      id="ssn"
                      type="password"
                      placeholder="XXX-XX-XXXX"
                      {...register("ssn")}
                      className={errors.ssn ? "border-red-500" : ""}
                    />
                    {errors.ssn && <p className="text-sm text-red-500">{errors.ssn.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Upload ID Document</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <Button type="button" variant="outline">
                          Choose File
                        </Button>
                        <p className="mt-2 text-sm text-gray-500">Upload a clear photo of your ID document</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Banking & Preferences */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name *</Label>
                    <Input
                      id="bankName"
                      {...register("bankName")}
                      className={errors.bankName ? "border-red-500" : ""}
                    />
                    {errors.bankName && <p className="text-sm text-red-500">{errors.bankName.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type *</Label>
                    <RadioGroup
                      onValueChange={(value) => setValue("accountType", value as "checking" | "savings")}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="checking" id="checking" />
                        <Label htmlFor="checking">Checking</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="savings" id="savings" />
                        <Label htmlFor="savings">Savings</Label>
                      </div>
                    </RadioGroup>
                    {errors.accountType && <p className="text-sm text-red-500">{errors.accountType.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="routingNumber">Routing Number *</Label>
                      <Input
                        id="routingNumber"
                        {...register("routingNumber")}
                        className={errors.routingNumber ? "border-red-500" : ""}
                      />
                      {errors.routingNumber && <p className="text-sm text-red-500">{errors.routingNumber.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        type="password"
                        {...register("accountNumber")}
                        className={errors.accountNumber ? "border-red-500" : ""}
                      />
                      {errors.accountNumber && <p className="text-sm text-red-500">{errors.accountNumber.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="termsAccepted" {...register("termsAccepted")} />
                      <Label htmlFor="termsAccepted" className="text-sm">
                        I accept the{" "}
                        <a href="/terms" className="text-blue-600 hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        *
                      </Label>
                    </div>
                    {errors.termsAccepted && <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>}

                    <div className="flex items-center space-x-2">
                      <Checkbox id="privacyAccepted" {...register("privacyAccepted")} />
                      <Label htmlFor="privacyAccepted" className="text-sm">
                        I accept the{" "}
                        <a href="/privacy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>{" "}
                        *
                      </Label>
                    </div>
                    {errors.privacyAccepted && <p className="text-sm text-red-500">{errors.privacyAccepted.message}</p>}

                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketingOptIn" {...register("marketingOptIn")} />
                      <Label htmlFor="marketingOptIn" className="text-sm">
                        I would like to receive marketing communications and updates
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 5 ? (
              <Button type="button" onClick={nextStep} className="flex items-center">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="flex items-center">
                {isSubmitting ? "Submitting..." : "Complete Registration"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
