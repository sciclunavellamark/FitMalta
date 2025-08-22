"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Clock, Calendar, Target, Shield, Users, Star, Eye } from "lucide-react"
import Link from "next/link"

const workoutPrograms = [
  // Official Content
  {
    id: "full-body-official",
    title: "Complete Full Body Program",
    description: "Scientifically designed full body workouts for maximum muscle growth and strength",
    category: "full-body",
    author: "FitMalta Team",
    authorType: "official",
    frequency: "3-4x per week",
    duration: "60-90 minutes",
    difficulty: "Beginner to Advanced",
    rating: 4.9,
    reviews: 456,
    views: 8920,
    benefits: ["Time Efficient", "Great for Beginners", "High Frequency"],
    muscleGroups: ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"],
    workoutCount: 12,
    image: "/full-body-workout-official.png",
    tags: ["Full Body", "Strength", "Muscle Building"],
    createdAt: "2024-01-10",
  },
  {
    id: "ppl-official",
    title: "Advanced Push Pull Legs",
    description: "Professional-grade PPL split for serious lifters seeking maximum results",
    category: "push-pull-legs",
    author: "FitMalta Team",
    authorType: "official",
    frequency: "6x per week",
    duration: "75-90 minutes",
    difficulty: "Advanced",
    rating: 4.8,
    reviews: 234,
    views: 6750,
    benefits: ["High Volume", "Balanced Training", "Advanced Techniques"],
    muscleGroups: ["Push: Chest, Shoulders, Triceps", "Pull: Back, Biceps", "Legs: Quads, Hamstrings, Glutes"],
    workoutCount: 18,
    image: "/ppl-advanced-official.png",
    tags: ["Push Pull Legs", "Advanced", "High Volume"],
    createdAt: "2024-01-15",
  },
  // Personal Trainer Content
  {
    id: "strength-trainer",
    title: "Powerlifting Foundation",
    description: "Build serious strength with this powerlifting-focused program from a certified trainer",
    category: "strength",
    author: "John Smith",
    authorType: "trainer",
    frequency: "4x per week",
    duration: "90-120 minutes",
    difficulty: "Intermediate to Advanced",
    rating: 4.7,
    reviews: 189,
    views: 4320,
    benefits: ["Strength Focus", "Competition Prep", "Progressive Overload"],
    muscleGroups: ["Squat", "Bench", "Deadlift", "Accessories"],
    workoutCount: 16,
    image: "/powerlifting-foundation.png",
    tags: ["Powerlifting", "Strength", "Competition"],
    createdAt: "2024-02-01",
  },
  {
    id: "functional-trainer",
    title: "Athletic Performance Training",
    description: "Sport-specific functional training designed by a performance coach",
    category: "functional",
    author: "Sarah Johnson",
    authorType: "trainer",
    frequency: "4-5x per week",
    duration: "60-75 minutes",
    difficulty: "Intermediate",
    rating: 4.6,
    reviews: 156,
    views: 3890,
    benefits: ["Athletic Performance", "Injury Prevention", "Sport Specific"],
    muscleGroups: ["Full Body Integration", "Core Stability", "Power Development"],
    workoutCount: 20,
    image: "/athletic-performance.png",
    tags: ["Functional", "Athletic", "Performance"],
    createdAt: "2024-02-10",
  },
  // Community Content
  {
    id: "home-community",
    title: "Home Workout Essentials",
    description: "Effective home workouts using minimal equipment, perfect for busy schedules",
    category: "functional",
    author: "Mike R.",
    authorType: "community",
    frequency: "4-5x per week",
    duration: "30-45 minutes",
    difficulty: "Beginner to Intermediate",
    rating: 4.4,
    reviews: 98,
    views: 2340,
    benefits: ["No Gym Required", "Time Efficient", "Equipment Free"],
    muscleGroups: ["Full Body", "Bodyweight", "Resistance Bands"],
    workoutCount: 14,
    image: "/home-workout-essentials.png",
    tags: ["Home Workout", "Bodyweight", "Minimal Equipment"],
    createdAt: "2024-03-01",
  },
  {
    id: "beginner-community",
    title: "Beginner's Journey",
    description: "A gentle introduction to weight training shared by a fellow beginner",
    category: "full-body",
    author: "Lisa K.",
    authorType: "community",
    frequency: "3x per week",
    duration: "45-60 minutes",
    difficulty: "Beginner",
    rating: 4.2,
    reviews: 67,
    views: 1890,
    benefits: ["Beginner Friendly", "Confidence Building", "Progressive"],
    muscleGroups: ["Full Body", "Basic Movements", "Form Focus"],
    workoutCount: 8,
    image: "/beginner-journey.png",
    tags: ["Beginner", "Confidence", "Foundation"],
    createdAt: "2024-03-05",
  },
]

export default function WorkoutsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getAuthorIcon = (authorType: string) => {
    switch (authorType) {
      case "official":
        return <Shield className="w-4 h-4 text-blue-500" />
      case "trainer":
        return <Dumbbell className="w-4 h-4 text-green-500" />
      default:
        return <Users className="w-4 h-4 text-orange-500" />
    }
  }

  const getAuthorBadge = (authorType: string) => {
    switch (authorType) {
      case "official":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Official</Badge>
      case "trainer":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Personal Trainer</Badge>
      default:
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Community</Badge>
    }
  }

  const filteredPrograms = workoutPrograms.filter((program) => {
    const matchesTab = activeTab === "all" || program.authorType === activeTab
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory
    return matchesTab && matchesCategory
  })

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "full-body", label: "Full Body" },
    { id: "push-pull-legs", label: "Push Pull Legs" },
    { id: "strength", label: "Strength" },
    { id: "functional", label: "Functional" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Workout Programs</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from scientifically-designed workout programs created by experts and the community, tailored to
              your experience level and goals.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="official">Official</TabsTrigger>
              <TabsTrigger value="trainer">Personal Trainers</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Category Filter */}
            <div className="flex justify-center mt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    size="sm"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        {getAuthorBadge(program.authorType)}
                      </div>
                      <CardDescription className="text-sm">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Author Info */}
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(program.authorType)}
                        <span className="text-sm font-medium">{program.author}</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">Frequency:</span>
                          <span className="text-muted-foreground">{program.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Duration:</span>
                          <span className="text-muted-foreground">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="font-medium">Level:</span>
                          <span className="text-muted-foreground">{program.difficulty}</span>
                        </div>
                      </div>

                      {/* Rating & Views */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{program.rating}</span>
                          <span className="text-muted-foreground">({program.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{program.views}</span>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.benefits.slice(0, 2).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {program.benefits.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{program.benefits.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button className="w-full">
                        <Link href={`/workouts/${program.category}/${program.id}`}>View Program</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="official" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content as above */}
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        {getAuthorBadge(program.authorType)}
                      </div>
                      <CardDescription className="text-sm">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(program.authorType)}
                        <span className="text-sm font-medium">{program.author}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">Frequency:</span>
                          <span className="text-muted-foreground">{program.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Duration:</span>
                          <span className="text-muted-foreground">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="font-medium">Level:</span>
                          <span className="text-muted-foreground">{program.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{program.rating}</span>
                          <span className="text-muted-foreground">({program.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{program.views}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.benefits.slice(0, 2).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {program.benefits.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{program.benefits.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button className="w-full">
                        <Link href={`/workouts/${program.category}/${program.id}`}>View Program</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trainer" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content */}
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        {getAuthorBadge(program.authorType)}
                      </div>
                      <CardDescription className="text-sm">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(program.authorType)}
                        <span className="text-sm font-medium">{program.author}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">Frequency:</span>
                          <span className="text-muted-foreground">{program.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Duration:</span>
                          <span className="text-muted-foreground">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="font-medium">Level:</span>
                          <span className="text-muted-foreground">{program.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{program.rating}</span>
                          <span className="text-muted-foreground">({program.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{program.views}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.benefits.slice(0, 2).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {program.benefits.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{program.benefits.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button className="w-full">
                        <Link href={`/workouts/${program.category}/${program.id}`}>View Program</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program) => (
                  <Card key={program.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content */}
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{program.title}</CardTitle>
                        {getAuthorBadge(program.authorType)}
                      </div>
                      <CardDescription className="text-sm">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(program.authorType)}
                        <span className="text-sm font-medium">{program.author}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">Frequency:</span>
                          <span className="text-muted-foreground">{program.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">Duration:</span>
                          <span className="text-muted-foreground">{program.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="font-medium">Level:</span>
                          <span className="text-muted-foreground">{program.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{program.rating}</span>
                          <span className="text-muted-foreground">({program.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{program.views}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 text-sm">Key Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {program.benefits.slice(0, 2).map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {program.benefits.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{program.benefits.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button className="w-full">
                        <Link href={`/workouts/${program.category}/${program.id}`}>View Program</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* No results message */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No workout programs found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more content.</p>
            </div>
          )}

          {/* Additional Info Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Workout Programs?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-foreground">Science-Based</h3>
                <p className="text-muted-foreground text-sm">
                  Programs designed using proven training principles and exercise science
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-foreground">Video Tutorials</h3>
                <p className="text-muted-foreground text-sm">
                  Every exercise includes detailed video demonstrations and form cues
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-foreground">Progressive</h3>
                <p className="text-muted-foreground text-sm">
                  Built-in progression schemes to ensure continuous improvement
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">4</span>
                </div>
                <h3 className="font-semibold text-foreground">Flexible</h3>
                <p className="text-muted-foreground text-sm">
                  Adaptable to your schedule, equipment, and experience level
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
