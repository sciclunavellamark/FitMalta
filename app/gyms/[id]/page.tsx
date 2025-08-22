"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
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
  CheckCircle,
  Heart,
  Camera,
  Award,
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
      amenities: [
        { name: "Swimming Pool", description: "25m heated indoor pool with lane swimming", icon: "swimming" },
        {
          name: "Group Classes",
          description: "Over 50 classes per week including yoga, HIIT, and pilates",
          icon: "dumbbell",
        },
        {
          name: "Personal Training",
          description: "Certified trainers available for one-on-one sessions",
          icon: "award",
        },
        { name: "Sauna", description: "Traditional Finnish sauna for post-workout recovery", icon: "shield" },
        { name: "Parking", description: "Free parking available for all members", icon: "car" },
        { name: "WiFi", description: "High-speed internet throughout the facility", icon: "wifi" },
        { name: "Lockers", description: "Secure lockers with digital locks", icon: "shield" },
      ],
      description: "Premium fitness facility with state-of-the-art equipment and extensive group class schedule.",
      bio: "Fitness First Malta has been serving the Maltese fitness community for over 10 years. Our state-of-the-art facility in Sliema offers everything you need for your fitness journey, from cutting-edge equipment to expert personal trainers and a wide variety of group classes. We pride ourselves on creating a welcoming environment where members of all fitness levels can achieve their goals.",
      image: "/fitness-first-malta-gym.png",
      featured: true,
      gallery: ["/fitness-first-malta-gym.png", "/gym-interior-1.png", "/gym-pool-area.png", "/gym-group-class.png"],
      membershipPlans: [
        {
          name: "Basic",
          price: "€39",
          period: "/month",
          description: "Perfect for getting started with your fitness journey",
          features: ["Gym Access", "Locker Room", "Basic Equipment", "Free WiFi"],
          popular: false,
        },
        {
          name: "Premium",
          price: "€59",
          period: "/month",
          description: "Most popular choice with full access to facilities",
          features: ["All Basic Features", "Group Classes", "Swimming Pool", "Sauna", "Guest Passes"],
          popular: true,
        },
        {
          name: "VIP",
          price: "€89",
          period: "/month",
          description: "Ultimate fitness experience with premium services",
          features: [
            "All Premium Features",
            "Personal Training Sessions",
            "Nutrition Consultation",
            "Priority Booking",
            "Towel Service",
          ],
          popular: false,
        },
      ],
      classes: [
        {
          name: "Yoga",
          time: "Mon, Wed, Fri - 7:00 AM",
          instructor: "Sarah Johnson",
          level: "All Levels",
          duration: "60 min",
        },
        {
          name: "HIIT",
          time: "Tue, Thu - 6:30 PM",
          instructor: "Mike Wilson",
          level: "Intermediate",
          duration: "45 min",
        },
        { name: "Pilates", time: "Sat - 9:00 AM", instructor: "Lisa Martinez", level: "Beginner", duration: "50 min" },
        {
          name: "Aqua Fitness",
          time: "Sun - 10:00 AM",
          instructor: "John Smith",
          level: "All Levels",
          duration: "45 min",
        },
      ],
      trainers: [
        {
          name: "Sarah Johnson",
          specialization: "Yoga & Flexibility",
          experience: "5+ years",
          image: "/trainer-sarah.png",
        },
        { name: "Mike Wilson", specialization: "HIIT & Strength", experience: "7+ years", image: "/trainer-mike.png" },
        { name: "Lisa Martinez", specialization: "Pilates & Core", experience: "4+ years", image: "/trainer-lisa.png" },
      ],
      reviews: [
        {
          id: 1,
          name: "Emma R.",
          rating: 5,
          comment:
            "Amazing facilities and friendly staff. The pool area is fantastic! I've been a member for 2 years and couldn't be happier with the variety of classes and equipment available.",
          date: "1 week ago",
          verified: true,
        },
        {
          id: 2,
          name: "David M.",
          rating: 4,
          comment:
            "Great gym with modern equipment. Group classes are well organized and the trainers are knowledgeable. Only wish the parking was a bit larger during peak hours.",
          date: "2 weeks ago",
          verified: true,
        },
        {
          id: 3,
          name: "Sophie L.",
          rating: 5,
          comment:
            "Love the variety of classes and the convenient location in Sliema. The sauna is a great addition after intense workouts. Highly recommend the premium membership!",
          date: "3 weeks ago",
          verified: true,
        },
        {
          id: 4,
          name: "Mark T.",
          rating: 4,
          comment:
            "Excellent facilities and professional staff. The personal trainers are top-notch and really help you achieve your goals. Clean environment and well-maintained equipment.",
          date: "1 month ago",
          verified: false,
        },
      ],
      highlights: [
        "Malta's largest fitness facility",
        "Over 10 years serving the community",
        "Award-winning customer service",
        "State-of-the-art equipment",
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
        <Navigation />
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

  const getAmenityIcon = (iconType: string) => {
    switch (iconType) {
      case "swimming":
        return <Swimming className="w-5 h-5 text-primary" />
      case "car":
        return <Car className="w-5 h-5 text-primary" />
      case "wifi":
        return <Wifi className="w-5 h-5 text-primary" />
      case "shield":
        return <Shield className="w-5 h-5 text-primary" />
      case "award":
        return <Award className="w-5 h-5 text-primary" />
      default:
        return <Dumbbell className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="bg-background py-12">
      <Navigation />

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
                          {amenity.name}
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
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-primary">Exclusive Offer</span>
                  </div>
                  <p className="text-sm text-foreground mb-3">{gym.discount}</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-primary/20 text-primary px-3 py-2 rounded text-sm font-mono font-bold">
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
                <Button variant="outline" className="w-full bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Save Gym
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="trainers">Trainers</TabsTrigger>
            <TabsTrigger value="membership">Membership</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {gym.name}</CardTitle>
                  <CardDescription>Learn more about our facility and what makes us special</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">{gym.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Key Highlights</h4>
                      <div className="space-y-3">
                        {gym.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Location & Hours</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">{gym.address}</p>
                            <p className="text-xs text-muted-foreground">Easy access via public transport</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{gym.hours}</p>
                            <p className="text-xs text-muted-foreground">Extended hours for your convenience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Facility Gallery
                  </CardTitle>
                  <CardDescription>Take a virtual tour of our facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gym.gallery.map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${gym.name} facility ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
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
                <CardDescription>Everything you need for your fitness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {gym.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {getAmenityIcon(amenity.icon)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{amenity.name}</h4>
                        <p className="text-sm text-muted-foreground">{amenity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Classes</CardTitle>
                <CardDescription>Join our diverse range of fitness classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {gym.classes.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Dumbbell className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{classItem.name}</h4>
                          <p className="text-sm text-muted-foreground">{classItem.time}</p>
                          <p className="text-xs text-muted-foreground">with {classItem.instructor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {classItem.level}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{classItem.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trainers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Expert Trainers</CardTitle>
                <CardDescription>Meet the professionals who will guide your fitness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {gym.trainers.map((trainer, index) => (
                    <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                      <img
                        src={trainer.image || "/placeholder.svg"}
                        alt={trainer.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                      />
                      <h4 className="font-semibold text-foreground mb-2">{trainer.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">{trainer.specialization}</p>
                      <p className="text-xs text-muted-foreground">{trainer.experience}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="membership" className="mt-6">
            <div className="grid gap-6 md:grid-cols-3">
              {gym.membershipPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-center">{plan.name}</CardTitle>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">{plan.price}</div>
                      <div className="text-sm text-muted-foreground">{plan.period}</div>
                    </div>
                    <CardDescription className="text-center">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
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
                <CardDescription>What our members say about their experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {gym.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
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
