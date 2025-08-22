"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Utensils, Shield, Dumbbell, Users, Star, Eye } from "lucide-react"

const mealPlans = [
  // Official Content
  {
    id: "1",
    title: "Clean Bulk Meal Plan",
    description: "A scientifically designed meal plan for lean muscle gain with minimal fat accumulation",
    type: "bulk",
    author: "FitMalta Team",
    authorType: "official",
    calories: "3200-3500",
    protein: "180g",
    duration: "8 weeks",
    difficulty: "Intermediate",
    rating: 4.9,
    reviews: 234,
    views: 5420,
    image: "/clean-bulk-meal-plan.png",
    tags: ["High Protein", "Clean Eating", "Muscle Building"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Sustainable Cut Protocol",
    description: "Evidence-based cutting approach that preserves muscle while promoting fat loss",
    type: "cut",
    author: "FitMalta Team",
    authorType: "official",
    calories: "1800-2200",
    protein: "150g",
    duration: "12 weeks",
    difficulty: "Intermediate",
    rating: 4.8,
    reviews: 189,
    views: 4230,
    image: "/sustainable-cut-meal-plan.png",
    tags: ["Fat Loss", "Muscle Preservation", "Sustainable"],
    createdAt: "2024-01-20",
  },
  // Personal Trainer Content
  {
    id: "3",
    title: "Mediterranean Bulk",
    description: "Healthy bulking using Mediterranean diet principles with local Maltese ingredients",
    type: "bulk",
    author: "John Smith",
    authorType: "trainer",
    calories: "3000-3400",
    protein: "170g",
    duration: "10 weeks",
    difficulty: "Beginner",
    rating: 4.7,
    reviews: 156,
    views: 3120,
    image: "/mediterranean-bulk-plan.png",
    tags: ["Mediterranean", "Local Ingredients", "Heart Healthy"],
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    title: "Quick Cut for Summer",
    description: "Accelerated fat loss plan designed for beach season preparation",
    type: "cut",
    author: "Sarah Johnson",
    authorType: "trainer",
    calories: "1600-2000",
    protein: "140g",
    duration: "6 weeks",
    difficulty: "Advanced",
    rating: 4.6,
    reviews: 98,
    views: 2890,
    image: "/quick-cut-summer-plan.png",
    tags: ["Rapid Results", "Summer Ready", "High Intensity"],
    createdAt: "2024-02-15",
  },
  // Community Content
  {
    id: "5",
    title: "Student Budget Bulk",
    description: "Affordable bulking meal plan perfect for students and tight budgets",
    type: "bulk",
    author: "Mike R.",
    authorType: "community",
    calories: "2800-3200",
    protein: "160g",
    duration: "12 weeks",
    difficulty: "Beginner",
    rating: 4.4,
    reviews: 67,
    views: 1890,
    image: "/budget-bulk-meal-plan.png",
    tags: ["Budget Friendly", "Student Life", "Simple Meals"],
    createdAt: "2024-03-01",
  },
  {
    id: "6",
    title: "Busy Parent Cut",
    description: "Time-efficient cutting plan designed for busy parents with meal prep focus",
    type: "cut",
    author: "Lisa K.",
    authorType: "community",
    calories: "1700-2100",
    protein: "130g",
    duration: "8 weeks",
    difficulty: "Beginner",
    rating: 4.3,
    reviews: 45,
    views: 1560,
    image: "/busy-parent-cut-plan.png",
    tags: ["Time Efficient", "Meal Prep", "Family Friendly"],
    createdAt: "2024-03-10",
  },
]

export default function MealPlansPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

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

  const filteredPlans = mealPlans.filter((plan) => {
    const matchesTab = activeTab === "all" || plan.authorType === activeTab
    const matchesType = selectedType === "all" || plan.type === selectedType
    return matchesTab && matchesType
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Utensils className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Meal Plans</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose your nutrition strategy from our collection of scientifically-backed meal plans created by experts
              and the community.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="official">Official</TabsTrigger>
              <TabsTrigger value="trainer">Personal Trainers</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            {/* Type Filter */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                <Button
                  variant={selectedType === "all" ? "default" : "outline"}
                  onClick={() => setSelectedType("all")}
                  size="sm"
                >
                  All Types
                </Button>
                <Button
                  variant={selectedType === "bulk" ? "default" : "outline"}
                  onClick={() => setSelectedType("bulk")}
                  size="sm"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Bulking
                </Button>
                <Button
                  variant={selectedType === "cut" ? "default" : "outline"}
                  onClick={() => setSelectedType("cut")}
                  size="sm"
                >
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Cutting
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                        {getAuthorBadge(plan.authorType)}
                      </div>
                      <CardDescription className="text-sm">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Author Info */}
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(plan.authorType)}
                        <span className="text-sm font-medium">{plan.author}</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Calories:</span>
                          <p className="text-muted-foreground">{plan.calories}</p>
                        </div>
                        <div>
                          <span className="font-medium">Protein:</span>
                          <p className="text-muted-foreground">{plan.protein}</p>
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>
                          <p className="text-muted-foreground">{plan.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium">Level:</span>
                          <p className="text-muted-foreground">{plan.difficulty}</p>
                        </div>
                      </div>

                      {/* Rating & Views */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{plan.rating}</span>
                          <span className="text-muted-foreground">({plan.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{plan.views}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {plan.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {plan.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full">View Meal Plan</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="official" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content as above */}
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                        {getAuthorBadge(plan.authorType)}
                      </div>
                      <CardDescription className="text-sm">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(plan.authorType)}
                        <span className="text-sm font-medium">{plan.author}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Calories:</span>
                          <p className="text-muted-foreground">{plan.calories}</p>
                        </div>
                        <div>
                          <span className="font-medium">Protein:</span>
                          <p className="text-muted-foreground">{plan.protein}</p>
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>
                          <p className="text-muted-foreground">{plan.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium">Level:</span>
                          <p className="text-muted-foreground">{plan.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{plan.rating}</span>
                          <span className="text-muted-foreground">({plan.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{plan.views}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {plan.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full">View Meal Plan</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trainer" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content */}
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                        {getAuthorBadge(plan.authorType)}
                      </div>
                      <CardDescription className="text-sm">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(plan.authorType)}
                        <span className="text-sm font-medium">{plan.author}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Calories:</span>
                          <p className="text-muted-foreground">{plan.calories}</p>
                        </div>
                        <div>
                          <span className="font-medium">Protein:</span>
                          <p className="text-muted-foreground">{plan.protein}</p>
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>
                          <p className="text-muted-foreground">{plan.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium">Level:</span>
                          <p className="text-muted-foreground">{plan.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{plan.rating}</span>
                          <span className="text-muted-foreground">({plan.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{plan.views}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {plan.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full">View Meal Plan</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map((plan) => (
                  <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                    {/* Same card content */}
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={plan.image || "/placeholder.svg"}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{plan.title}</CardTitle>
                        {getAuthorBadge(plan.authorType)}
                      </div>
                      <CardDescription className="text-sm">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        {getAuthorIcon(plan.authorType)}
                        <span className="text-sm font-medium">{plan.author}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Calories:</span>
                          <p className="text-muted-foreground">{plan.calories}</p>
                        </div>
                        <div>
                          <span className="font-medium">Protein:</span>
                          <p className="text-muted-foreground">{plan.protein}</p>
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>
                          <p className="text-muted-foreground">{plan.duration}</p>
                        </div>
                        <div>
                          <span className="font-medium">Level:</span>
                          <p className="text-muted-foreground">{plan.difficulty}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{plan.rating}</span>
                          <span className="text-muted-foreground">({plan.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{plan.views}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {plan.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {plan.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      <Button className="w-full">View Meal Plan</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* No results message */}
          {filteredPlans.length === 0 && (
            <div className="text-center py-12">
              <Utensils className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No meal plans found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more content.</p>
            </div>
          )}

          {/* Additional Info Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Meal Plans?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-foreground">Science-Based</h3>
                <p className="text-muted-foreground">
                  All plans are based on proven nutritional science and macronutrient optimization
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-foreground">Flexible Options</h3>
                <p className="text-muted-foreground">
                  Choose from quick or slow approaches, simple or complex recipes to fit your lifestyle
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-foreground">Local Ingredients</h3>
                <p className="text-muted-foreground">
                  All recipes use ingredients easily available in Malta for convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
