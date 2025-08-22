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
import { ArrowLeft, Send, Building } from "lucide-react"
import Link from "next/link"

export default function RequestGymPage() {
  const { user, updateUserType } = useAuth()
  const [formData, setFormData] = useState({
    gymName: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    amenities: "",
    membershipTypes: "",
    hours: "",
    priceRange: "",
    capacity: "",
    yearEstablished: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update user type to gym owner (in real app, this would be pending approval)
    updateUserType(UserType.GYM)

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
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Gym Registration Submitted!</CardTitle>
              <CardDescription>
                Your gym registration has been submitted successfully. You are now a Gym Owner!
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
              <Building className="w-5 h-5" />
              Register Your Gym
            </CardTitle>
            <CardDescription>
              Register your gym business to be featured on our platform and attract new members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gymName">Gym Name</Label>
                  <Input
                    id="gymName"
                    placeholder="e.g., FitZone Gym"
                    value={formData.gymName}
                    onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                    required
                  />
                </div>

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
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="Street address, postal code"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="info@yourgym.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  placeholder="www.yourgym.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Gym Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your gym, facilities, and what makes it unique..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
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
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Select
                    value={formData.priceRange}
                    onValueChange={(value) => setFormData({ ...formData, priceRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="€">€ - Budget Friendly</SelectItem>
                      <SelectItem value="€€">€€ - Moderate</SelectItem>
                      <SelectItem value="€€€">€€€ - Premium</SelectItem>
                      <SelectItem value="€€€€">€€€€ - Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Member Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 500"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    placeholder="e.g., 2015"
                    value={formData.yearEstablished}
                    onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? "Submitting Registration..." : "Register Gym"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
