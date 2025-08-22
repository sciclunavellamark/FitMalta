"use client"

import type React from "react"

import { useState } from "react"
import { useAuth, UserType } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Upload, Dumbbell, Building } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, isUserType } = useAuth()
  const [formData, setFormData] = useState({
    bio: "",
    specialization: "",
    experience: "",
    certifications: "",
    location: "",
    hourlyRate: "",
    availability: "",
    phone: "",
    website: "",
    socialMedia: "",
    // Gym specific fields
    gymName: "",
    amenities: "",
    membershipTypes: "",
    hours: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => setSuccess(false), 3000)
  }

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  if (!isUserType(UserType.PERSONAL_TRAINER) && !isUserType(UserType.GYM)) {
    return (
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            This page is only available for Personal Trainers and Gym Owners.
          </p>
          <Link href="/account">
            <Button>Back to Account</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-6">
          <Link href="/account">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Account
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isUserType(UserType.PERSONAL_TRAINER) ? (
                <Dumbbell className="w-5 h-5" />
              ) : (
                <Building className="w-5 h-5" />
              )}
              Edit Your Profile
            </CardTitle>
            <CardDescription>
              Update your public profile information that will be displayed to potential clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="space-y-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    {isUserType(UserType.PERSONAL_TRAINER) ? (
                      <Dumbbell className="w-8 h-8 text-muted-foreground" />
                    ) : (
                      <Building className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <Button variant="outline" type="button">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio & Description</Label>
                <Textarea
                  id="bio"
                  placeholder={
                    isUserType(UserType.PERSONAL_TRAINER)
                      ? "Tell potential clients about your training philosophy, experience, and what makes you unique..."
                      : "Describe your gym, facilities, atmosphere, and what makes it special..."
                  }
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valletta">Valletta</SelectItem>
                      <SelectItem value="sliema">Sliema</SelectItem>
                      <SelectItem value="st-julians">St. Julian's</SelectItem>
                      <SelectItem value="msida">Msida</SelectItem>
                      <SelectItem value="birkirkara">Birkirkara</SelectItem>
                      <SelectItem value="gzira">Gzira</SelectItem>
                      <SelectItem value="mosta">Mosta</SelectItem>
                      <SelectItem value="gozo">Gozo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+356 2123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Personal Trainer Specific Fields */}
              {isUserType(UserType.PERSONAL_TRAINER) && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select
                        value={formData.specialization}
                        onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strength">Strength Training</SelectItem>
                          <SelectItem value="cardio">Cardio & HIIT</SelectItem>
                          <SelectItem value="yoga">Yoga & Pilates</SelectItem>
                          <SelectItem value="weightloss">Weight Loss</SelectItem>
                          <SelectItem value="bodybuilding">Bodybuilding</SelectItem>
                          <SelectItem value="functional">Functional Training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => setFormData({ ...formData, experience: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Input
                      id="certifications"
                      placeholder="e.g., NASM-CPT, ACSM, Nutrition Specialist"
                      value={formData.certifications}
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">Hourly Rate (€)</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="45"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        placeholder="e.g., Mon-Fri 6AM-8PM"
                        value={formData.availability}
                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Gym Specific Fields */}
              {isUserType(UserType.GYM) && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="gymName">Gym Name</Label>
                    <Input
                      id="gymName"
                      placeholder="Your gym name"
                      value={formData.gymName}
                      onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amenities">Amenities & Facilities</Label>
                    <Textarea
                      id="amenities"
                      placeholder="e.g., Swimming Pool, Sauna, Group Classes, Personal Training, Parking..."
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hours">Operating Hours</Label>
                      <Input
                        id="hours"
                        placeholder="e.g., Mon-Sun: 6:00 - 22:00"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="membershipTypes">Membership Types</Label>
                      <Input
                        id="membershipTypes"
                        placeholder="e.g., Basic, Premium, VIP"
                        value={formData.membershipTypes}
                        onChange={(e) => setFormData({ ...formData, membershipTypes: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    placeholder="www.yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialMedia">Social Media (Optional)</Label>
                  <Input
                    id="socialMedia"
                    placeholder="@yourusername"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                  />
                </div>
              </div>

              {success && (
                <div className="p-3 bg-green-100 text-green-800 rounded-md">Profile updated successfully!</div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
