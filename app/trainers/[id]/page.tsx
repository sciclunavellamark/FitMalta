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
  Users,
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Dumbbell,
  ArrowLeft,
  Heart,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// Mock trainer data (in real app, this would come from API)
const getTrainerById = (id: string) => {
  const trainers = [
    {
      id: "1",
      name: "John Smith",
      specialization: "Strength Training",
      location: "Valletta",
      rating: 4.9,
      reviewCount: 127,
      experience: "5+ years",
      price: "€45/session",
      image: "/male-fitness-trainer.png",
      certifications: ["NASM-CPT", "Nutrition Specialist", "Strength & Conditioning"],
      description:
        "Specialized in strength training and muscle building with proven results. I help clients build lean muscle, increase strength, and improve overall fitness through personalized training programs.",
      availability: "Mon-Fri 6AM-8PM",
      phone: "+356 2123 4567",
      email: "john.smith@fitmalta.com",
      bio: "With over 5 years of experience in the fitness industry, I've helped hundreds of clients achieve their strength and muscle-building goals. My approach combines scientific training principles with personalized attention to ensure every client gets the results they're looking for.",
      services: [
        {
          name: "Personal Training Sessions",
          description: "One-on-one customized workout sessions tailored to your specific goals and fitness level",
          icon: "dumbbell",
        },
        {
          name: "Strength Training Programs",
          description: "Comprehensive strength building programs designed to maximize muscle growth and power",
          icon: "award",
        },
        {
          name: "Nutrition Coaching",
          description: "Personalized nutrition guidance to support your training goals and optimize results",
          icon: "heart",
        },
        {
          name: "Body Composition Analysis",
          description: "Detailed body composition assessments to track progress and adjust training plans",
          icon: "users",
        },
      ],
      packages: [
        {
          name: "Single Session",
          price: "€45",
          description: "Perfect for trying out personal training",
          features: ["1-hour session", "Fitness assessment", "Custom workout plan"],
          popular: false,
        },
        {
          name: "4 Session Package",
          price: "€160",
          originalPrice: "€180",
          description: "Great for getting started with consistent training",
          features: ["4 one-hour sessions", "Nutrition consultation", "Progress tracking", "Email support"],
          popular: false,
        },
        {
          name: "8 Session Package",
          price: "€300",
          originalPrice: "€360",
          description: "Ideal for building momentum and seeing real results",
          features: ["8 one-hour sessions", "Custom meal plan", "Body composition analysis", "24/7 chat support"],
          popular: true,
        },
        {
          name: "Monthly Unlimited",
          price: "€400",
          description: "Maximum commitment for maximum results",
          features: ["Unlimited sessions", "Complete nutrition program", "Weekly check-ins", "Priority booking"],
          popular: false,
        },
      ],
      reviews: [
        {
          id: 1,
          name: "Sarah M.",
          rating: 5,
          comment:
            "John is an amazing trainer! I've gained so much strength and confidence in just 3 months. His knowledge of proper form and progressive overload has helped me avoid injuries while making incredible gains.",
          date: "2 weeks ago",
          verified: true,
        },
        {
          id: 2,
          name: "Mike R.",
          rating: 5,
          comment:
            "Professional, knowledgeable, and motivating. John's nutrition advice combined with his training programs helped me lose 15kg and build muscle I never thought possible. Highly recommend!",
          date: "1 month ago",
          verified: true,
        },
        {
          id: 3,
          name: "Lisa K.",
          rating: 4,
          comment:
            "Great trainer with excellent technique guidance. Helped me avoid injuries and taught me proper lifting form. The only reason it's not 5 stars is that sessions can be quite intense!",
          date: "2 months ago",
          verified: true,
        },
        {
          id: 4,
          name: "David P.",
          rating: 5,
          comment:
            "Been training with John for 6 months now. His personalized approach and constant motivation have transformed not just my body but my entire relationship with fitness.",
          date: "3 months ago",
          verified: true,
        },
      ],
      specialties: ["Powerlifting", "Bodybuilding", "Weight Loss", "Functional Training"],
      achievements: [
        "Certified Personal Trainer since 2019",
        "Helped 200+ clients achieve their goals",
        "Specializes in strength and muscle building",
        "Nutrition and supplement expert",
      ],
    },
    // Add more trainers as needed
  ]

  return trainers.find((trainer) => trainer.id === id)
}

export default function TrainerDetailPage() {
  const params = useParams()
  const trainerId = params.id as string
  const trainer = getTrainerById(trainerId)
  const [activeTab, setActiveTab] = useState("overview")

  if (!trainer) {
    return (
      <div className="bg-background py-12">
        <Navigation />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Trainer Not Found</h1>
          <p className="text-muted-foreground mb-6">The trainer you're looking for doesn't exist.</p>
          <Link href="/trainers">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trainers
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case "dumbbell":
        return <Dumbbell className="w-5 h-5 text-primary" />
      case "award":
        return <Award className="w-5 h-5 text-primary" />
      case "heart":
        return <Heart className="w-5 h-5 text-primary" />
      case "users":
        return <Users className="w-5 h-5 text-primary" />
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
          <Link href="/trainers">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trainers
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
                      src={trainer.image || "/placeholder.svg"}
                      alt={trainer.name}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{trainer.name}</h1>
                        <div className="flex items-center gap-2 text-lg text-muted-foreground mb-2">
                          <Dumbbell className="w-5 h-5" />
                          {trainer.specialization}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{trainer.rating}</span>
                          <span className="text-muted-foreground">({trainer.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {trainer.price}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {trainer.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Award className="w-4 h-4" />
                        {trainer.experience}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {trainer.availability}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {trainer.reviewCount} clients
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact & Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Session
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    {trainer.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    {trainer.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="specialties">Specialties</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {trainer.name}</CardTitle>
                <CardDescription>Professional background and training philosophy</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{trainer.bio}</p>

                <div>
                  <h4 className="font-semibold text-foreground mb-4">Key Achievements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {trainer.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
                <CardDescription>Comprehensive training and coaching services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {trainer.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {getServiceIcon(service.icon)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {trainer.packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? "ring-2 ring-primary" : ""}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {pkg.name}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                        {pkg.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</div>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="specialties" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Specialties</CardTitle>
                <CardDescription>Areas of expertise and specialized training methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {trainer.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                      <Award className="w-6 h-6 text-primary" />
                      <span className="font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Training Philosophy</h4>
                  <p className="text-sm text-muted-foreground">
                    I believe in combining scientific training principles with personalized attention to help each
                    client achieve their unique goals. My approach focuses on progressive overload, proper form, and
                    sustainable lifestyle changes that create lasting results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>What clients say about their training experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trainer.reviews.map((review) => (
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
