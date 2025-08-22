"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, Search, Filter, Dumbbell, Award, Eye } from "lucide-react"
import Link from "next/link"

const trainers = [
  {
    id: "1",
    name: "John Smith",
    specialization: "Strength Training",
    location: "Valletta",
    rating: 4.9,
    reviews: 127,
    views: 2340,
    experience: "5+ years",
    price: "€45/session",
    image: "/male-fitness-trainer.png",
    certifications: ["NASM-CPT", "Nutrition Specialist"],
    description: "Specialized in strength training and muscle building with proven results.",
    availability: "Mon-Fri 6AM-8PM",
    tags: ["Strength", "Muscle Building", "Powerlifting"],
  },
  {
    id: "2",
    name: "Maria Gonzalez",
    specialization: "Yoga & Pilates",
    location: "Sliema",
    rating: 4.8,
    reviews: 89,
    views: 1890,
    experience: "7+ years",
    price: "€40/session",
    image: "/female-yoga-instructor.png",
    certifications: ["RYT-500", "Pilates Instructor"],
    description: "Expert in yoga and pilates with focus on flexibility and mindfulness.",
    availability: "Tue-Sat 7AM-7PM",
    tags: ["Yoga", "Pilates", "Flexibility"],
  },
  {
    id: "3",
    name: "David Wilson",
    specialization: "HIIT & Cardio",
    location: "St. Julian's",
    rating: 4.7,
    reviews: 156,
    views: 3120,
    experience: "4+ years",
    price: "€50/session",
    image: "/fitness-trainer-hiit.png",
    certifications: ["ACSM-CPT", "HIIT Specialist"],
    description: "High-intensity training expert focused on fat loss and conditioning.",
    availability: "Mon-Sun 5AM-9PM",
    tags: ["HIIT", "Fat Loss", "Conditioning"],
  },
  {
    id: "4",
    name: "Sarah Johnson",
    specialization: "Weight Loss",
    location: "Msida",
    rating: 4.9,
    reviews: 203,
    views: 4560,
    experience: "6+ years",
    price: "€42/session",
    image: "/female-fitness-trainer.png",
    certifications: ["NASM-CPT", "Weight Management"],
    description: "Specializes in sustainable weight loss and lifestyle transformation.",
    availability: "Mon-Fri 6AM-6PM",
    tags: ["Weight Loss", "Lifestyle", "Nutrition"],
  },
  {
    id: "5",
    name: "Michael Brown",
    specialization: "Bodybuilding",
    location: "Birkirkara",
    rating: 4.8,
    reviews: 94,
    views: 1670,
    experience: "8+ years",
    price: "€55/session",
    image: "/bodybuilding-trainer-male.png",
    certifications: ["IFBB Pro", "Sports Nutrition"],
    description: "Professional bodybuilder with expertise in muscle building and competition prep.",
    availability: "Mon-Sat 4AM-8PM",
    tags: ["Bodybuilding", "Competition Prep", "Advanced"],
  },
  {
    id: "6",
    name: "Lisa Martinez",
    specialization: "Functional Training",
    location: "Gzira",
    rating: 4.6,
    reviews: 78,
    views: 1230,
    experience: "3+ years",
    price: "€38/session",
    image: "/functional-training-female.png",
    certifications: ["FMS", "Corrective Exercise"],
    description: "Focuses on functional movement patterns and injury prevention.",
    availability: "Tue-Sun 7AM-8PM",
    tags: ["Functional", "Movement", "Injury Prevention"],
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
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">🏋️ Personal Trainers in Malta</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with certified personal trainers who will help you achieve your fitness goals with personalized
              training programs and expert guidance.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trainers by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="md:w-auto w-full bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Location</label>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Specialization</label>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price Range</label>
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
            </Card>
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
              <Link key={trainer.id} href={`/trainers/${trainer.id}`}>
                <Card className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={trainer.image || "/placeholder.svg"}
                      alt={trainer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{trainer.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Personal Trainer</Badge>
                    </div>
                    <CardDescription className="text-sm">{trainer.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Specialization Info */}
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{trainer.specialization}</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">Location:</span>
                        <span className="text-muted-foreground">{trainer.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-medium">Experience:</span>
                        <span className="text-muted-foreground">{trainer.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">Price:</span>
                        <span className="text-muted-foreground">{trainer.price}</span>
                      </div>
                    </div>

                    {/* Rating & Views */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{trainer.rating}</span>
                        <span className="text-muted-foreground">({trainer.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>{trainer.views}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {trainer.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {trainer.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{trainer.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button className="w-full">View Trainer</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredTrainers.length === 0 && (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No trainers found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more trainers.</p>
            </div>
          )}

          {/* Additional Info Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Personal Trainers?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-foreground">Certified Professionals</h3>
                <p className="text-muted-foreground">
                  All trainers are certified with recognized qualifications and proven experience
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-foreground">Personalized Programs</h3>
                <p className="text-muted-foreground">
                  Get customized workout plans tailored to your specific goals and fitness level
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-foreground">Proven Results</h3>
                <p className="text-muted-foreground">
                  Read verified reviews from real clients who achieved their fitness goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
