"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Clock, Phone, Tag, Search, Filter } from "lucide-react"
import Link from "next/link"

const gyms = [
  {
    id: 1,
    name: "Fitness First Malta",
    location: "Sliema",
    address: "The Point Shopping Mall, Sliema",
    rating: 4.5,
    reviews: 324,
    priceRange: "€€€",
    promoCode: "FITMALTA20",
    discount: "20% off first month",
    phone: "+356 2133 4455",
    website: "www.fitnessfirst.com.mt",
    hours: "Mon-Sun: 6:00 - 23:00",
    amenities: ["Swimming Pool", "Group Classes", "Personal Training", "Sauna", "Parking"],
    description: "Premium fitness facility with state-of-the-art equipment and extensive group class schedule.",
    image: "/fitness-first-malta-gym.png",
    featured: true,
  },
  {
    id: 2,
    name: "Greens Health & Fitness",
    location: "St. Julian's",
    address: "Portomaso Marina, St. Julian's",
    rating: 4.7,
    reviews: 189,
    priceRange: "€€€€",
    promoCode: "GREENS15",
    discount: "15% off membership",
    phone: "+356 2138 8900",
    website: "www.greenshealthfitness.com",
    hours: "Mon-Sun: 5:30 - 23:30",
    amenities: ["Spa", "Swimming Pool", "Tennis Court", "Personal Training", "Nutrition Counseling"],
    description: "Luxury wellness center offering comprehensive fitness and spa services in a premium location.",
    image: "/greens-health-fitness-malta.png",
    featured: true,
  },
  {
    id: 3,
    name: "Energie Fitness",
    location: "Birkirkara",
    address: "Triq il-Wied, Birkirkara",
    rating: 4.3,
    reviews: 267,
    priceRange: "€€",
    promoCode: "ENERGIE25",
    discount: "25% off 6-month membership",
    phone: "+356 2144 7788",
    website: "www.energiefitness.com.mt",
    hours: "Mon-Fri: 6:00 - 22:00, Sat-Sun: 8:00 - 20:00",
    amenities: ["Group Classes", "Functional Training", "Cardio Zone", "Free Weights"],
    description: "Modern gym focusing on functional fitness with excellent group class programs.",
    image: "/energie-fitness-malta.png",
    featured: false,
  },
  {
    id: 4,
    name: "Bodybuilding Gym Malta",
    location: "Msida",
    address: "Triq il-Mediterran, Msida",
    rating: 4.6,
    reviews: 156,
    priceRange: "€€",
    promoCode: "BBGYM30",
    discount: "30% off first 3 months",
    phone: "+356 2133 9966",
    website: "www.bodybuildinggymmalta.com",
    hours: "Mon-Sun: 5:00 - 23:00",
    amenities: ["Heavy Weights", "Powerlifting", "Bodybuilding Focus", "Supplement Store"],
    description: "Serious training facility for bodybuilders and powerlifters with heavy-duty equipment.",
    image: "/bodybuilding-gym-malta.png",
    featured: false,
  },
  {
    id: 5,
    name: "Anytime Fitness Malta",
    location: "Valletta",
    address: "Merchants Street, Valletta",
    rating: 4.4,
    reviews: 298,
    priceRange: "€€€",
    promoCode: "ANYTIME10",
    discount: "10% off annual membership",
    phone: "+356 2122 5544",
    website: "www.anytimefitness.com.mt",
    hours: "24/7 Access",
    amenities: ["24/7 Access", "Security System", "Global Access", "Personal Training"],
    description: "24/7 access gym with modern equipment and global membership benefits.",
    image: "/anytime-fitness-malta.png",
    featured: false,
  },
  {
    id: 6,
    name: "CrossFit Malta",
    location: "Gzira",
    address: "Triq ix-Xatt, Gzira",
    rating: 4.8,
    reviews: 134,
    priceRange: "€€€",
    promoCode: "CROSSFIT20",
    discount: "20% off unlimited classes",
    phone: "+356 2131 7799",
    website: "www.crossfitmalta.com",
    hours: "Mon-Fri: 6:00 - 21:00, Sat-Sun: 8:00 - 18:00",
    amenities: ["CrossFit Classes", "Olympic Lifting", "Functional Training", "Nutrition Coaching"],
    description: "Dedicated CrossFit box with certified coaches and comprehensive functional fitness programs.",
    image: "/crossfit-malta-gym.png",
    featured: true,
  },
  {
    id: 7,
    name: "Pure Gym Malta",
    location: "Mosta",
    address: "Pama Shopping Village, Mosta",
    rating: 4.2,
    reviews: 412,
    priceRange: "€",
    promoCode: "PURE50",
    discount: "50% off joining fee",
    phone: "+356 2143 3322",
    website: "www.puregym.com.mt",
    hours: "Mon-Sun: 6:00 - 22:00",
    amenities: ["Budget Friendly", "No Contract", "Group Classes", "Cardio Equipment"],
    description: "Affordable gym chain offering flexible memberships and essential fitness equipment.",
    image: "/pure-gym-malta.png",
    featured: false,
  },
  {
    id: 8,
    name: "Fitness Zone Gozo",
    location: "Victoria, Gozo",
    address: "Triq ir-Repubblika, Victoria",
    rating: 4.5,
    reviews: 87,
    priceRange: "€€",
    promoCode: "GOZO15",
    discount: "15% off all memberships",
    phone: "+356 2156 4433",
    website: "www.fitnesszone.com.mt",
    hours: "Mon-Fri: 6:30 - 21:30, Sat-Sun: 8:00 - 19:00",
    amenities: ["Swimming Pool", "Group Classes", "Personal Training", "Physiotherapy"],
    description: "Gozo's premier fitness facility with comprehensive wellness services and pool.",
    image: "/fitness-zone-gozo.png",
    featured: false,
  },
]

export default function GymsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const locations = ["all", ...Array.from(new Set(gyms.map((gym) => gym.location)))]
  const priceRanges = ["all", "€", "€€", "€€€", "€€€€"]

  const filteredGyms = gyms.filter((gym) => {
    const matchesSearch =
      gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gym.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === "all" || gym.location === selectedLocation
    const matchesPrice = selectedPriceRange === "all" || gym.priceRange === selectedPriceRange

    return matchesSearch && matchesLocation && matchesPrice
  })

  const featuredGyms = filteredGyms.filter((gym) => gym.featured)
  const regularGyms = filteredGyms.filter((gym) => !gym.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Gyms in Malta</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the best fitness facilities across Malta and Gozo. Get exclusive promo codes and special offers
              when you join through our platform.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gyms by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:w-auto w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {showFilters && (
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location === "all" ? "All Locations" : location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Price Range</label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                      className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                    >
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>
                          {range === "all" ? "All Price Ranges" : range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Featured Gyms */}
          {featuredGyms.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Featured Gyms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGyms.map((gym) => (
                  <Link key={gym.id} href={`/gyms/${gym.id}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5 cursor-pointer">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={gym.image || "/placeholder.svg"}
                          alt={gym.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {gym.name}
                              </CardTitle>
                              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                                Featured
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{gym.location}</span>
                              <span className="text-sm font-medium">{gym.priceRange}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{gym.rating}</span>
                            <span className="text-muted-foreground">({gym.reviews})</span>
                          </div>
                        </div>
                        <CardDescription className="text-muted-foreground">{gym.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Promo Code */}
                        <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Tag className="h-4 w-4 text-accent" />
                            <span className="font-semibold text-accent">Exclusive Offer</span>
                          </div>
                          <p className="text-sm text-foreground">{gym.discount}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <code className="bg-accent/20 text-accent px-2 py-1 rounded text-sm font-mono">
                              {gym.promoCode}
                            </code>
                            <span className="text-xs text-muted-foreground">Use this code</span>
                          </div>
                        </div>

                        {/* Quick Info */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{gym.hours}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">{gym.phone}</span>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Amenities</h4>
                          <div className="flex flex-wrap gap-1">
                            {gym.amenities.slice(0, 3).map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {gym.amenities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{gym.amenities.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Gyms */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {featuredGyms.length > 0 ? "All Gyms" : "Gyms in Malta"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularGyms.map((gym) => (
                <Link key={gym.id} href={`/gyms/${gym.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20 cursor-pointer">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={gym.image || "/placeholder.svg"}
                        alt={gym.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {gym.name}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{gym.location}</span>
                            <span className="text-sm font-medium">{gym.priceRange}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{gym.rating}</span>
                          <span className="text-muted-foreground">({gym.reviews})</span>
                        </div>
                      </div>
                      <CardDescription className="text-muted-foreground">{gym.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Promo Code */}
                      <div className="p-3 bg-muted/30 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-primary">Special Offer</span>
                        </div>
                        <p className="text-sm text-foreground">{gym.discount}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                            {gym.promoCode}
                          </code>
                          <span className="text-xs text-muted-foreground">Use this code</span>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">{gym.hours}</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-1">
                          {gym.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {gym.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{gym.amenities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {filteredGyms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No gyms found matching your criteria.</p>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Use Our Gym Directory?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Tag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Exclusive Discounts</h3>
                <p className="text-muted-foreground">
                  Get special promo codes and discounts available only through our platform
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Complete Coverage</h3>
                <p className="text-muted-foreground">
                  Find gyms across all of Malta and Gozo with detailed information and reviews
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Verified Reviews</h3>
                <p className="text-muted-foreground">
                  Read authentic reviews from real members to make informed decisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
