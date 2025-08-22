"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Mail,
  Tag,
  ArrowLeft,
  Users,
  Calendar,
  MessageCircle,
  Dumbbell,
  Building as Swimming,
  Car,
  Wifi,
  Shield,
} from "lucide-react"
import Link from "next/link"

const getGymById = (id: string) => {
  const gyms = [
    {
      id: "1",
      name: "Fitness First Malta",
      location: "Sliema",
      address: "The Point Shopping Mall, Sliema SLM 1549",
      rating: 4.5,
      reviewCount: 324,
      priceRange: "€€€",
      promoCode: "FITMALTA20",
      discount: "20% off first month",
      phone: "+356 2133 4455",
      email: "info@fitnessfirst.com.mt",
      website: "www.fitnessfirst.com.mt",
      hours: "Mon-Sun: 6:00 - 23:00",
      amenities: ["Swimming Pool", "Group Classes", "Personal Training", "Sauna", "Parking", "WiFi", "Lockers"],
      description: "Premium fitness facility with state-of-the-art equipment and extensive group class schedule.",
      bio: "Fitness First Malta has been serving the Maltese fitness community for over 10 years. Our state-of-the-art facility in Sliema offers everything you need for your fitness journey, from cutting-edge equipment to expert personal trainers and a wide variety of group classes. We pride ourselves on creating a welcoming environment where members of all fitness levels can achieve their goals.",
      image: "/fitness-first-malta-gym.png",
      featured: true,
      gallery: ["/fitness-first-malta-gym.png", "/gym-interior-1.png", "/gym-pool-area.png", "/gym-group-class.png"],
      membershipPlans: [
        {
          name: "Basic",
          price: "€39/month",
          features: ["Gym Access", "Locker Room", "Basic Equipment"],
          popular: false,
        },
        {
          name: "Premium",
          price: "€59/month",
          features: ["All Basic Features", "Group Classes", "Swimming Pool", "Sauna"],
          popular: true,
        },
        {
          name: "VIP",
          price: "€89/month",
          features: [
            "All Premium Features",
            "Personal Training Sessions",
            "Nutrition Consultation",
            "Priority Booking",
          ],
          popular: false,
        },
      ],
      classes: [
        { name: "Yoga", time: "Mon, Wed, Fri - 7:00 AM", instructor: "Sarah Johnson" },
        { name: "HIIT", time: "Tue, Thu - 6:30 PM", instructor: "Mike Wilson" },
        { name: "Pilates", time: "Sat - 9:00 AM", instructor: "Lisa Martinez" },
        { name: "Aqua Fitness", time: "Sun - 10:00 AM", instructor: "John Smith" },
      ],
      trainers: [
        { name: "Sarah Johnson", specialization: "Yoga & Flexibility", experience: "5+ years" },
        { name: "Mike Wilson", specialization: "HIIT & Strength", experience: "7+ years" },
        { name: "Lisa Martinez", specialization: "Pilates & Core", experience: "4+ years" },
      ],
      reviews: [
        {
          id: 1,
          name: "Emma R.",
          rating: 5,
          comment: "Amazing facilities and friendly staff. The pool area is fantastic!",
          date: "1 week ago",
        },
        {
          id: 2,
          name: "David M.",
          rating: 4,
          comment: "Great gym with modern equipment. Group classes are well organized.",
          date: "2 weeks ago",
        },
        {
          id: 3,
          name: "Sophie L.",
          rating: 5,
          comment: "Love the variety of classes and the convenient location in Sliema.",
          date: "3 weeks ago",
        },
      ],
    },
    // Add more gyms as needed
  ]

  return gyms.find((gym) => gym.id === id)
}

export default function GymDetailPage() {
  const params = useParams()
  const gymId = params.id as string
  const gym = getGymById(gymId)
  const [activeTab, setActiveTab] = useState("overview")

  if (!gym) {
    return (
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Gym Not Found</h1>
          <p className="text-muted-foreground mb-6">The gym you're looking for doesn't exist.</p>
          <Link href="/gyms">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gyms
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "swimming pool":
        return <Swimming className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "sauna":
        return <Shield className="w-4 h-4" />
      default:
        return <Dumbbell className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/gyms">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gyms
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={gym.image || "/placeholder.svg"}
                      alt={gym.name}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{gym.name}</h1>
                        <div className="flex items-center gap-2 text-lg text-muted-foreground mb-2">
                          <MapPin className="w-5 h-5" />
                          {gym.location}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{gym.rating}</span>
                          <span className="text-muted-foreground">({gym.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {gym.priceRange}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {gym.hours}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {gym.phone}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {gym.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {gym.reviewCount} members
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {gym.amenities.slice(0, 4).map((amenity, index) => (
                        <Badge key={index} variant="outline">
                          {amenity}
                        </Badge>
                      ))}
                      {gym.amenities.length > 4 && <Badge variant="outline">+{gym.amenities.length - 4} more</Badge>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Join Today</CardTitle>
                <CardDescription>Get exclusive offers through our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-accent">Exclusive Offer</span>
                  </div>
                  <p className="text-sm text-foreground mb-2">{gym.discount}</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-accent/20 text-accent px-2 py-1 rounded text-sm font-mono">
                      {gym.promoCode}
                    </code>
                    <span className="text-xs text-muted-foreground">Use this code</span>
                  </div>
                </div>

                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Get Membership
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Gym
                </Button>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    {gym.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    {gym.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4" />
                    {gym.website}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>About {gym.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">{gym.bio}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm">{gym.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm">{gym.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm">{gym.reviewCount} active members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Group Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gym.classes.map((classItem, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Dumbbell className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{classItem.name}</p>
                          <p className="text-sm text-muted-foreground">{classItem.time}</p>
                          <p className="text-xs text-muted-foreground">with {classItem.instructor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Facilities & Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {gym.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership" className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {gym.membershipPlans.map((plan, index) => (
                <Card key={index} className={plan.popular ? "border-primary border-2" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{plan.name}</CardTitle>
                      {plan.popular && <Badge className="bg-primary text-primary-foreground">Popular</Badge>}
                    </div>
                    <CardDescription className="text-2xl font-bold text-foreground">{plan.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {gym.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.name}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
