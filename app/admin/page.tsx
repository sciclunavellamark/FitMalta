"use client"

import { useState } from "react"
import { useAuth, UserType } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Users,
  Dumbbell,
  Building,
  Shield,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Crown,
  Check,
  X,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    userType: UserType.PERSONAL_TRAINER,
    isVerified: true,
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "FitZone Gym",
    email: "info@fitzone.com",
    userType: UserType.GYM,
    isVerified: true,
    joinDate: "2024-02-01",
    status: "active",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    userType: UserType.USER,
    isVerified: false,
    joinDate: "2024-03-10",
    status: "pending",
  },
]

const mockContent = [
  {
    id: "1",
    title: "Full Body Strength Training",
    type: "workout",
    author: "John Smith",
    status: "published",
    createdDate: "2024-03-01",
    views: 1250,
  },
  {
    id: "2",
    title: "Mediterranean Diet Plan",
    type: "meal-plan",
    author: "Sarah Johnson",
    status: "pending",
    createdDate: "2024-03-15",
    views: 0,
  },
]

const mockTrainerApplications = [
  {
    id: "1",
    name: "Mike Wilson",
    email: "mike@example.com",
    experience: "5+ years",
    certifications: ["NASM-CPT", "Nutrition Specialist"],
    specialization: "Strength Training & Bodybuilding",
    bio: "Experienced trainer with focus on strength training and muscle building. Worked with 200+ clients.",
    appliedDate: "2024-03-20",
    status: "pending",
  },
  {
    id: "2",
    name: "Lisa Martinez",
    email: "lisa@example.com",
    experience: "3+ years",
    certifications: ["ACE-CPT", "Yoga Alliance RYT-200"],
    specialization: "Yoga & Flexibility",
    bio: "Certified yoga instructor and personal trainer specializing in flexibility and mindfulness.",
    appliedDate: "2024-03-18",
    status: "pending",
  },
]

const mockGymApplications = [
  {
    id: "1",
    gymName: "PowerHouse Fitness",
    ownerName: "David Thompson",
    email: "info@powerhousefitness.com",
    location: "Valletta",
    address: "123 Republic Street, Valletta VLT 1234",
    phone: "+356 2123 4567",
    description: "Modern fitness facility with state-of-the-art equipment and group classes.",
    amenities: ["Swimming Pool", "Sauna", "Group Classes", "Personal Training"],
    appliedDate: "2024-03-19",
    status: "pending",
  },
]

export default function AdminPage() {
  const { user, isUserType } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [reviewNotes, setReviewNotes] = useState("")

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  if (!isUserType(UserType.ADMIN) && !isUserType(UserType.SUPER_ADMIN)) {
    return (
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">This page is only available for Administrators.</p>
          <Link href="/account">
            <Button>Back to Account</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getUserTypeIcon = (userType: UserType) => {
    switch (userType) {
      case UserType.SUPER_ADMIN:
        return <Crown className="w-4 h-4 text-yellow-500" />
      case UserType.ADMIN:
        return <Shield className="w-4 h-4 text-red-500" />
      case UserType.PERSONAL_TRAINER:
        return <Dumbbell className="w-4 h-4 text-blue-500" />
      case UserType.GYM:
        return <Building className="w-4 h-4 text-purple-500" />
      default:
        return <Users className="w-4 h-4 text-green-500" />
    }
  }

  const getUserTypeLabel = (userType: UserType) => {
    switch (userType) {
      case UserType.SUPER_ADMIN:
        return "Super Admin"
      case UserType.ADMIN:
        return "Admin"
      case UserType.PERSONAL_TRAINER:
        return "Personal Trainer"
      case UserType.GYM:
        return "Gym Owner"
      default:
        return "User"
    }
  }

  const handleApproveTrainer = (applicationId: string) => {
    console.log("Approving trainer application:", applicationId, "Notes:", reviewNotes)
    alert("Trainer application approved!")
    setReviewNotes("")
  }

  const handleRejectTrainer = (applicationId: string) => {
    console.log("Rejecting trainer application:", applicationId, "Notes:", reviewNotes)
    alert("Trainer application rejected!")
    setReviewNotes("")
  }

  const handleApproveGym = (applicationId: string) => {
    console.log("Approving gym application:", applicationId, "Notes:", reviewNotes)
    alert("Gym application approved!")
    setReviewNotes("")
  }

  const handleRejectGym = (applicationId: string) => {
    console.log("Rejecting gym application:", applicationId, "Notes:", reviewNotes)
    alert("Gym application rejected!")
    setReviewNotes("")
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6">
          <Link href="/account">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Account
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, content, and platform settings</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="trainer-requests">Trainer Requests</TabsTrigger>
            <TabsTrigger value="gym-requests">Gym Requests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Personal Trainers</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Gyms</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+2 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-xs text-muted-foreground">+23 this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">New trainer application from Mike Wilson</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-sm">Gym registration: PowerHouse Fitness</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-sm">Content review needed: HIIT Workout Plan</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trainer Applications</span>
                      <Badge variant="secondary">{mockTrainerApplications.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Gym Registrations</span>
                      <Badge variant="secondary">{mockGymApplications.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Content Reviews</span>
                      <Badge variant="secondary">7</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getUserTypeIcon(user.userType)}
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <Badge variant={user.isVerified ? "default" : "secondary"}>
                          {getUserTypeLabel(user.userType)}
                        </Badge>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Review and manage user-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContent.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <p className="text-sm text-muted-foreground">
                            by {content.author} • {content.createdDate}
                          </p>
                        </div>
                        <Badge variant={content.type === "workout" ? "default" : "secondary"}>
                          {content.type === "workout" ? "Workout" : "Meal Plan"}
                        </Badge>
                        <Badge variant={content.status === "published" ? "default" : "secondary"}>
                          {content.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{content.views} views</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trainer-requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  Trainer Applications
                </CardTitle>
                <CardDescription>Review and approve personal trainer applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockTrainerApplications.map((application) => (
                    <Card key={application.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{application.name}</CardTitle>
                            <CardDescription>{application.email}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {application.appliedDate}
                            </Badge>
                            <Badge variant="secondary">{application.status}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Experience</h4>
                            <p className="text-sm text-muted-foreground">{application.experience}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Specialization</h4>
                            <p className="text-sm text-muted-foreground">{application.specialization}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Certifications</h4>
                          <div className="flex flex-wrap gap-2">
                            {application.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Bio</h4>
                          <p className="text-sm text-muted-foreground">{application.bio}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Review Notes</h4>
                          <Textarea
                            placeholder="Add notes about this application..."
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button
                            onClick={() => handleApproveTrainer(application.id)}
                            className="flex-1"
                            variant="default"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve Application
                          </Button>
                          <Button
                            onClick={() => handleRejectTrainer(application.id)}
                            className="flex-1"
                            variant="destructive"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject Application
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {mockTrainerApplications.length === 0 && (
                    <div className="text-center py-12">
                      <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No Pending Applications</h3>
                      <p className="text-muted-foreground">All trainer applications have been reviewed.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gym-requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Gym Applications
                </CardTitle>
                <CardDescription>Review and approve gym registration applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockGymApplications.map((application) => (
                    <Card key={application.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{application.gymName}</CardTitle>
                            <CardDescription>
                              Owner: {application.ownerName} • {application.email}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {application.appliedDate}
                            </Badge>
                            <Badge variant="secondary">{application.status}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Location</h4>
                            <p className="text-sm text-muted-foreground">{application.location}</p>
                            <p className="text-sm text-muted-foreground">{application.address}</p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Contact</h4>
                            <p className="text-sm text-muted-foreground">{application.phone}</p>
                            <p className="text-sm text-muted-foreground">{application.email}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-sm text-muted-foreground">{application.description}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {application.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Review Notes</h4>
                          <Textarea
                            placeholder="Add notes about this application..."
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button onClick={() => handleApproveGym(application.id)} className="flex-1" variant="default">
                            <Check className="w-4 h-4 mr-2" />
                            Approve Registration
                          </Button>
                          <Button
                            onClick={() => handleRejectGym(application.id)}
                            className="flex-1"
                            variant="destructive"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject Registration
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {mockGymApplications.length === 0 && (
                    <div className="text-center py-12">
                      <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No Pending Applications</h3>
                      <p className="text-muted-foreground">All gym applications have been reviewed.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Settings Panel</h3>
                  <p className="text-muted-foreground mb-6">
                    Platform settings and configuration options will be available here.
                  </p>
                  <Button disabled>Coming Soon</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
