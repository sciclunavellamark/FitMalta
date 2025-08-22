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
  Users,
  Award,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Dumbbell,
  ArrowLeft,
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
        "Personal Training Sessions",
        "Strength Training Programs",
        "Nutrition Coaching",
        "Body Composition Analysis",
      ],
      packages: [
        { name: "Single Session", price: "€45", description: "One-on-one training session" },
        { name: "4 Session Package", price: "€160", description: "Save €20 with package deal" },
        { name: "8 Session Package", price: "€300", description: "Save €60 with package deal" },
        { name: "Monthly Unlimited", price: "€400", description: "Unlimited sessions for one month" },
      ],
      reviews: [
        {
          id: 1,
          name: "Sarah M.",
          rating: 5,
          comment: "John is an amazing trainer! I've gained so much strength and confidence in just 3 months.",
          date: "2 weeks ago",
        },
        {
          id: 2,
          name: "Mike R.",
          rating: 5,
          comment: "Professional, knowledgeable, and motivating. Highly recommend!",
          date: "1 month ago",
        },
        {
          id: 3,
          name: "Lisa K.",
          rating: 4,
          comment: "Great trainer with excellent technique guidance. Helped me avoid injuries.",
          date: "2 months ago",
        },
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

  return (
    <div className="bg-background py-12">
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
                      className="w-32 h-32 rounded-full object-cover"
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {trainer.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{trainer.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {trainer.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Dumbbell className="w-5 h-5 text-primary" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {trainer.packages.map((pkg, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {pkg.name}
                      <Badge variant="secondary">{pkg.price}</Badge>
                    </CardTitle>
                    <CardDescription>{pkg.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">Select Package</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trainer.reviews.map((review) => (
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
