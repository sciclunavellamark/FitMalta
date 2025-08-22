"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Users, Search, Filter, Dumbbell, Award } from "lucide-react"
import Link from "next/link"

// Mock trainer data
const trainers = [
  {
    id: "1",
    name: "John Smith",
    specialization: "Strength Training",
    location: "Valletta",
    rating: 4.9,
    reviews: 127,
    experience: "5+ years",
    price: "€45/session",
    image: "/male-fitness-trainer.png",
    certifications: ["NASM-CPT", "Nutrition Specialist"],
    description: "Specialized in strength training and muscle building with proven results.",
    availability: "Mon-Fri 6AM-8PM",
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    specialization: "Yoga & Pilates",
    location: "Sliema",
    rating: 4.8,
    reviews: 89,
    experience: "7+ years",
    price: "€40/session",
    image: "/female-yoga-instructor.png",
    certifications: ["RYT-500", "Pilates Instructor"],
    description: "Expert in yoga and pilates with focus on flexibility and mindfulness.",
    availability: "Tue-Sat 7AM-7PM",
  },
  {
    id: "3",
    name: "David Wilson",
    specialization: "HIIT & Cardio",
    location: "St. Julian's",
    rating: 4.7,
    reviews: 156,
    experience: "4+ years",
    price: "€50/session",
    image: "/fitness-trainer-hiit.png",
    certifications: ["ACSM-CPT", "HIIT Specialist"],
    description: "High-intensity training expert focused on fat loss and conditioning.",
    availability: "Mon-Sun 5AM-9PM",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    specialization: "Weight Loss",
    location: "Msida",
    rating: 4.9,
    reviews: 203,
    experience: "6+ years",
    price: "€42/session",
    image: "/female-fitness-trainer.png",
    certifications: ["NASM-CPT", "Weight Management"],
    description: "Specializes in sustainable weight loss and lifestyle transformation.",
    availability: "Mon-Fri 6AM-6PM",
  },
  {
    id: "5",
    name: "Michael Brown",
    specialization: "Bodybuilding",
    location: "Birkirkara",
    rating: 4.8,
    reviews: 94,
    experience: "8+ years",
    price: "€55/session",
    image: "/bodybuilding-trainer-male.png",
    certifications: ["IFBB Pro", "Sports Nutrition"],
    description: "Professional bodybuilder with expertise in muscle building and competition prep.",
    availability: "Mon-Sat 4AM-8PM",
  },
  {
    id: "6",
    name: "Lisa Martinez",
    specialization: "Functional Training",
    location: "Gzira",
    rating: 4.6,
    reviews: 78,
    experience: "3+ years",
    price: "€38/session",
    image: "/functional-training-female.png",
    certifications: ["FMS", "Corrective Exercise"],
    description: "Focuses on functional movement patterns and injury prevention.",
    availability: "Tue-Sun 7AM-8PM",
  },
]

export default function TrainersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = locationFilter === "all" || trainer.location === locationFilter
    const matchesSpecialization = specializationFilter === "all" || trainer.specialization === specializationFilter

    let matchesPrice = true
    if (priceFilter !== "all") {
      const price = Number.parseInt(trainer.price.replace("€", "").replace("/session", ""))
      switch (priceFilter) {
        case "under40":
          matchesPrice = price < 40
          break
        case "40to50":
          matchesPrice = price >= 40 && price <= 50
          break
        case "over50":
          matchesPrice = price > 50
          break
      }
    }

    return matchesSearch && matchesLocation && matchesSpecialization && matchesPrice
  })

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Personal Trainers in Malta</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with certified personal trainers who will help you achieve your fitness goals with personalized
            training programs.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search trainers by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Valletta">Valletta</SelectItem>
                <SelectItem value="Sliema">Sliema</SelectItem>
                <SelectItem value="St. Julian's">St. Julian's</SelectItem>
                <SelectItem value="Msida">Msida</SelectItem>
                <SelectItem value="Birkirkara">Birkirkara</SelectItem>
                <SelectItem value="Gzira">Gzira</SelectItem>
              </SelectContent>
            </Select>

            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="Strength Training">Strength Training</SelectItem>
                <SelectItem value="Yoga & Pilates">Yoga & Pilates</SelectItem>
                <SelectItem value="HIIT & Cardio">HIIT & Cardio</SelectItem>
                <SelectItem value="Weight Loss">Weight Loss</SelectItem>
                <SelectItem value="Bodybuilding">Bodybuilding</SelectItem>
                <SelectItem value="Functional Training">Functional Training</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under40">Under €40</SelectItem>
                <SelectItem value="40to50">€40 - €50</SelectItem>
                <SelectItem value="over50">Over €50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredTrainers.length} of {trainers.length} trainers
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map((trainer) => (
            <Card key={trainer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {trainer.price}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{trainer.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Dumbbell className="w-4 h-4" />
                      {trainer.specialization}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{trainer.rating}</span>
                    <span className="text-sm text-muted-foreground">({trainer.reviews})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {trainer.location}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="w-4 h-4" />
                  {trainer.experience}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {trainer.availability}
                </div>

                <div className="flex flex-wrap gap-1">
                  {trainer.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{trainer.description}</p>

                <Link href={`/trainers/${trainer.id}`}>
                  <Button className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTrainers.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No trainers found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
