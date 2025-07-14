"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  XCircle,
  Eye,
  Download,
  User,
  Building,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  FileText,
} from "lucide-react"

export function RegistrationReview() {
  const [selectedRegistration, setSelectedRegistration] = useState<string | null>(null)

  const pendingRegistrations = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@email.com",
      role: "Individual",
      submittedAt: "2024-01-15T10:30:00Z",
      status: "pending",
      profileImage: "/placeholder.svg?height=40&width=40",
      documents: {
        governmentId: "drivers_license.pdf",
        bankInfo: "bank_statement.pdf",
        profilePicture: "profile.jpg",
      },
      details: {
        phone: "+1 (555) 123-4567",
        address: "123 Main St, Anytown, CA 90210",
        dateOfBirth: "1985-06-15",
        website: "johnsmith.com",
        organization: null,
      },
    },
    {
      id: "2",
      name: "Green Earth Foundation",
      email: "contact@greenearth.org",
      role: "Non-profit",
      submittedAt: "2024-01-15T09:15:00Z",
      status: "pending",
      profileImage: "/placeholder.svg?height=40&width=40",
      documents: {
        governmentId: "ein_certificate.pdf",
        bankInfo: "nonprofit_bank_info.pdf",
        profilePicture: "logo.png",
        taxId: "501c3_determination.pdf",
      },
      details: {
        phone: "+1 (555) 987-6543",
        address: "456 Green Ave, Eco City, OR 97201",
        incorporationDate: "2018-03-20",
        website: "greenearth.org",
        organization: "Green Earth Foundation",
        taxId: "12-3456789",
      },
    },
  ]

  const handleApprove = (id: string) => {
    console.log("Approving registration:", id)
    // Handle approval logic
  }

  const handleReject = (id: string) => {
    console.log("Rejecting registration:", id)
    // Handle rejection logic
  }

  const selectedReg = pendingRegistrations.find((reg) => reg.id === selectedRegistration)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Registration List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Pending Registrations</CardTitle>
            <CardDescription>Click to review details</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {pendingRegistrations.map((registration) => (
                <div
                  key={registration.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedRegistration === registration.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                  onClick={() => setSelectedRegistration(registration.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={registration.profileImage || "/placeholder.svg"} />
                      <AvatarFallback>
                        {registration.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{registration.name}</p>
                      <p className="text-sm text-gray-500 truncate">{registration.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {registration.role}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {new Date(registration.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registration Details */}
      <div className="lg:col-span-2">
        {selectedReg ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedReg.profileImage || "/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedReg.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{selectedReg.name}</span>
                  </CardTitle>
                  <CardDescription>{selectedReg.email}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => handleApprove(selectedReg.id)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => handleReject(selectedReg.id)}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Role:</span>
                        <Badge variant="outline">{selectedReg.role}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm">{selectedReg.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Phone:</span>
                        <span className="text-sm">{selectedReg.details.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Address:</span>
                        <span className="text-sm">{selectedReg.details.address}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {selectedReg.details.organization && (
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Organization:</span>
                          <span className="text-sm">{selectedReg.details.organization}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {selectedReg.role === "Individual" ? "Date of Birth:" : "Incorporation Date:"}
                        </span>
                        <span className="text-sm">
                          {selectedReg.details.dateOfBirth || selectedReg.details.incorporationDate}
                        </span>
                      </div>
                      {selectedReg.details.website && (
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Website:</span>
                          <span className="text-sm">{selectedReg.details.website}</span>
                        </div>
                      )}
                      {selectedReg.details.taxId && (
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">Tax ID:</span>
                          <span className="text-sm">{selectedReg.details.taxId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedReg.documents).map(([type, filename]) => (
                      <Card key={type} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium capitalize">{type.replace(/([A-Z])/g, " $1")}</p>
                            <p className="text-sm text-gray-500">{filename}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="space-y-4">
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Identity Verification</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Government ID submitted - pending review</span>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Financial Verification</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Bank information provided - pending verification</span>
                      </div>
                    </Card>
                    {selectedReg.role !== "Individual" && (
                      <Card className="p-4">
                        <h4 className="font-medium mb-2">Organization Verification</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm">Tax documentation submitted - pending review</span>
                        </div>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a registration to review details</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
