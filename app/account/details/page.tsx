"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, User } from "lucide-react"
import AccountLayout from "@/components/account-layout"

export default function AccountDetailsPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    location: "",
    bio: "",
    fitnessGoals: "",
    experienceLevel: "",
    preferredWorkoutTime: "",
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

  return (
    <AccountLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
            <CardDescription>Update your basic account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+356 1234 5678"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your location in Malta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="valletta">Valletta</SelectItem>
                    <SelectItem value="sliema">Sliema</SelectItem>
                    <SelectItem value="st-julians">St. Julian's</SelectItem>
                    <SelectItem value="msida">Msida</SelectItem>
                    <SelectItem value="birkirkara">Birkirkara</SelectItem>
                    <SelectItem value="mosta">Mosta</SelectItem>
                    <SelectItem value="qormi">Qormi</SelectItem>
                    <SelectItem value="zabbar">Żabbar</SelectItem>
                    <SelectItem value="gozo">Gozo</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>

              {success && (
                <div className="p-3 bg-green-100 text-green-800 rounded-md">Account details updated successfully!</div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fitness Preferences</CardTitle>
            <CardDescription>Help us personalize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fitnessGoals">Primary Fitness Goals</Label>
                  <Select
                    value={formData.fitnessGoals}
                    onValueChange={(value) => setFormData({ ...formData, fitnessGoals: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight-loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="general-fitness">General Fitness</SelectItem>
                      <SelectItem value="sports-performance">Sports Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                      <SelectItem value="expert">Expert/Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredWorkoutTime">Preferred Workout Time</Label>
                <Select
                  value={formData.preferredWorkoutTime}
                  onValueChange={(value) => setFormData({ ...formData, preferredWorkoutTime: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="When do you prefer to work out?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="early-morning">Early Morning (5-8 AM)</SelectItem>
                    <SelectItem value="morning">Morning (8-11 AM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12-5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5-8 PM)</SelectItem>
                    <SelectItem value="night">Night (8-11 PM)</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  )
}
