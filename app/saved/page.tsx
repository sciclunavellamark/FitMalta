"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FavoriteButton } from "@/components/favorite-button"
import { useFavorites } from "@/contexts/favorites-context"
import { Heart, Clock, Star, TrendingUp, Dumbbell } from "lucide-react"
import Link from "next/link"

export default function SavedPage() {
  const { getSavedMealPlans, getSavedWorkouts } = useFavorites()
  const savedMealPlans = getSavedMealPlans()
  const savedWorkouts = getSavedWorkouts()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Saved Items</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Your favorite meal plans and workouts, saved for quick access. Build your personalized fitness library.
            </p>
          </div>

          <Tabs defaultValue="meal-plans" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="meal-plans" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Meal Plans ({savedMealPlans.length})
              </TabsTrigger>
              <TabsTrigger value="workouts" className="flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Workouts ({savedWorkouts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meal-plans" className="mt-6">
              {savedMealPlans.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Saved Meal Plans</h3>
                    <p className="text-muted-foreground mb-4">
                      Start saving meal plans to build your personalized nutrition library
                    </p>
                    <Link href="/meal-plans">
                      <Button>Browse Meal Plans</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedMealPlans.map((plan) => (
                    <Card
                      key={`${plan.type}-${plan.id}`}
                      className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
                    >
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={plan.image || "/placeholder.svg"}
                          alt={plan.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {plan.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">{plan.description}</CardDescription>
                          </div>
                          <FavoriteButton item={plan} />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Nutrition Info */}
                        {plan.calories && plan.protein && (
                          <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                            <div className="text-center">
                              <div className="font-bold text-primary">{plan.calories}</div>
                              <div className="text-xs text-muted-foreground">Calories</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-primary">{plan.protein}g</div>
                              <div className="text-xs text-muted-foreground">Protein</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-primary flex items-center justify-center gap-1">
                                <Clock className="h-3 w-3" />
                                {plan.duration}
                              </div>
                              <div className="text-xs text-muted-foreground">Duration</div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="capitalize">
                            {plan.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Saved {plan.savedAt.toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Button */}
                        <Link href={`/meal-plans/${plan.category}/${plan.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            View Meal Plan
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="workouts" className="mt-6">
              {savedWorkouts.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No Saved Workouts</h3>
                    <p className="text-muted-foreground mb-4">
                      Start saving workouts to build your personalized training library
                    </p>
                    <Link href="/workouts">
                      <Button>Browse Workouts</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedWorkouts.map((workout) => (
                    <Card
                      key={`${workout.type}-${workout.id}`}
                      className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20"
                    >
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={workout.image || "/placeholder.svg"}
                          alt={workout.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {workout.title}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">
                              {workout.description}
                            </CardDescription>
                          </div>
                          <FavoriteButton item={workout} />
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Workout Info */}
                        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                          <div className="text-center">
                            <div className="font-bold text-primary">{workout.duration}</div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-primary capitalize">{workout.difficulty}</div>
                            <div className="text-xs text-muted-foreground">Level</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-primary flex items-center justify-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {workout.rating}
                            </div>
                            <div className="text-xs text-muted-foreground">Rating</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="capitalize">
                            {workout.category.replace("-", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Saved {workout.savedAt.toLocaleDateString()}
                          </span>
                        </div>

                        {/* Action Button */}
                        <Link href={`/workouts/${workout.category}/${workout.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            View Workout
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
