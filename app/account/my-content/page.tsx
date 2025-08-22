"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Dumbbell, Utensils, Star, Eye, Edit, Trash2 } from "lucide-react"

// Mock data for user's content
const userContent = {
  purchased: [
    {
      id: "p1",
      title: "Advanced Push Pull Legs",
      type: "workout",
      author: "FitMalta Team",
      purchaseDate: "2024-03-15",
      price: "€29.99",
      rating: 4.8,
      image: "/ppl-advanced-official.png",
    },
    {
      id: "p2",
      title: "Clean Bulk Meal Plan",
      type: "meal-plan",
      author: "FitMalta Team",
      purchaseDate: "2024-03-10",
      price: "€19.99",
      rating: 4.9,
      image: "/clean-bulk-meal-plan.png",
    },
  ],
  created: [
    {
      id: "c1",
      title: "Home Workout Essentials",
      type: "workout",
      status: "published",
      views: 234,
      rating: 4.4,
      reviews: 12,
      createdDate: "2024-02-20",
      image: "/home-workout-essentials.png",
    },
    {
      id: "c2",
      title: "Student Budget Meals",
      type: "meal-plan",
      status: "pending",
      views: 0,
      rating: 0,
      reviews: 0,
      createdDate: "2024-03-18",
      image: "/budget-meals.png",
    },
  ],
}

export default function MyContentPage() {
  const [activeTab, setActiveTab] = useState("purchased")
  const [contentFilter, setContentFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
      default:
        return <Badge variant="outline">Draft</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "workout" ? (
      <Dumbbell className="w-4 h-4 text-primary" />
    ) : (
      <Utensils className="w-4 h-4 text-primary" />
    )
  }

  const filteredPurchased = userContent.purchased.filter(
    (item) => contentFilter === "all" || item.type === contentFilter,
  )

  const filteredCreated = userContent.created.filter((item) => contentFilter === "all" || item.type === contentFilter)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">📚 My Content</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Manage your purchased content and track your created meal plans and workouts
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="purchased">Purchased Content</TabsTrigger>
              <TabsTrigger value="created">My Creations</TabsTrigger>
            </TabsList>

            {/* Content Type Filter */}
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                <Button
                  variant={contentFilter === "all" ? "default" : "outline"}
                  onClick={() => setContentFilter("all")}
                  size="sm"
                >
                  All Types
                </Button>
                <Button
                  variant={contentFilter === "workout" ? "default" : "outline"}
                  onClick={() => setContentFilter("workout")}
                  size="sm"
                >
                  <Dumbbell className="w-4 h-4 mr-2" />
                  Workouts
                </Button>
                <Button
                  variant={contentFilter === "meal-plan" ? "default" : "outline"}
                  onClick={() => setContentFilter("meal-plan")}
                  size="sm"
                >
                  <Utensils className="w-4 h-4 mr-2" />
                  Meal Plans
                </Button>
              </div>
            </div>

            <TabsContent value="purchased" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPurchased.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <div className="flex items-center gap-1">{getTypeIcon(item.type)}</div>
                      </div>
                      <CardDescription className="text-sm">By {item.author}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Purchase Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Purchased:</span>
                          <p className="text-muted-foreground">{item.purchaseDate}</p>
                        </div>
                        <div>
                          <span className="font-medium">Price:</span>
                          <p className="text-muted-foreground">{item.price}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
                      </div>

                      <Button className="w-full">Access Content</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="created" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreated.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        {getStatusBadge(item.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="text-sm text-muted-foreground">Created on {item.createdDate}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>
                            {item.rating} ({item.reviews})
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* No results message */}
          {((activeTab === "purchased" && filteredPurchased.length === 0) ||
            (activeTab === "created" && filteredCreated.length === 0)) && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No content found</h3>
              <p className="text-muted-foreground">
                {activeTab === "purchased"
                  ? "You haven't purchased any content yet. Browse our workout programs and meal plans to get started!"
                  : "You haven't created any content yet. Start sharing your expertise with the community!"}
              </p>
            </div>
          )}

          {/* Additional Info Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-6">Content Management Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-foreground">Track Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your content performance and see how it helps the community
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-foreground">Easy Access</h3>
                <p className="text-muted-foreground">All your purchased content in one place, accessible anytime</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-foreground">Share Knowledge</h3>
                <p className="text-muted-foreground">
                  Create and share your own content to help others achieve their goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
