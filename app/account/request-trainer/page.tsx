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
import { ArrowLeft, Send, Dumbbell } from "lucide-react"
import Link from "next/link"

export default function RequestTrainerPage() {
  const { user, updateUserType } = useAuth()
  const [formData, setFormData] = useState({
    specialization: "",
    experience: "",
    certifications: "",
    location: "",
    bio: "",
    hourlyRate: "",
    availability: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update user type to personal trainer (in real app, this would be pending approval)
    updateUserType(UserType.PERSONAL_TRAINER)

    setSuccess(true)
    setIsLoading(false)
  }

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  if (success) {
    return (
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Application Submitted!</CardTitle>
              <CardDescription>
                Your trainer application has been submitted successfully. You are now a Personal Trainer!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/account">
                <Button>Go to Account</Button>
              </Link>
            </CardContent>
          </Card>
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
              <Dumbbell className="w-5 h-5" />
              Become a Personal Trainer
            </CardTitle>
            <CardDescription>
              Fill out this application to become a certified personal trainer on our platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="e.g., NASM-CPT, ACSM, etc."
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
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
                    </SelectContent>
                  </Select>
                </div>

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

              <div className="space-y-2">
                <Label htmlFor="bio">Bio & Experience</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your experience, training philosophy, and what makes you unique..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? "Submitting Application..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
