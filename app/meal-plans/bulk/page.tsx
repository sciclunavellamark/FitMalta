"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MealPlanFilters, type MealPlanFilters as FilterType } from "@/components/meal-plan-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Star } from "lucide-react"
import Link from "next/link"
import { FavoriteButton } from "@/components/favorite-button"

const mealPlans = [
  {
    id: 1,
    title: "Clean Bulk Powerhouse",
    description: "High-quality whole foods for lean muscle gain",
    calories: 3200,
    protein: 180,
    approach: "slow",
    difficulty: "moderate",
    duration: "8-12 weeks",
    rating: 4.8,
    reviews: 124,
    tags: ["High Protein", "Whole Foods", "Sustainable"],
    dietaryRestrictions: [],
    image: "/healthy-meal-prep.png",
  },
  {
    id: 2,
    title: "Quick Bulk Express",
    description: "Fast muscle gain with strategic calorie loading",
    calories: 3800,
    protein: 200,
    approach: "aggressive",
    difficulty: "easy",
    duration: "4-6 weeks",
    rating: 4.6,
    reviews: 89,
    tags: ["Fast Results", "Easy Prep", "High Calorie"],
    dietaryRestrictions: [],
    image: "/placeholder-jiiot.png",
  },
  {
    id: 3,
    title: "Vegetarian Muscle Builder",
    description: "Plant-based protein for sustainable muscle growth",
    calories: 2900,
    protein: 160,
    approach: "slow",
    difficulty: "moderate",
    duration: "10-14 weeks",
    rating: 4.7,
    reviews: 67,
    tags: ["Plant-Based", "Sustainable", "Complete Proteins"],
    dietaryRestrictions: ["vegetarian"],
    image: "/placeholder-2ksd2.png",
  },
  {
    id: 4,
    title: "Gourmet Bulk Deluxe",
    description: "Restaurant-quality meals for the discerning bulker",
    calories: 3400,
    protein: 190,
    approach: "moderate",
    difficulty: "advanced",
    duration: "8-10 weeks",
    rating: 4.9,
    reviews: 156,
    tags: ["Gourmet", "Complex Flavors", "Premium"],
    dietaryRestrictions: [],
    image: "/placeholder-e1pe1.png",
  },
  {
    id: 5,
    title: "Budget Bulk Champion",
    description: "Maximum gains without breaking the bank",
    calories: 3100,
    protein: 175,
    approach: "slow",
    difficulty: "easy",
    duration: "12-16 weeks",
    rating: 4.5,
    reviews: 203,
    tags: ["Budget-Friendly", "Simple", "Effective"],
    dietaryRestrictions: [],
    image: "/budget-muscle-meals.png",
  },
  {
    id: 6,
    title: "Keto Bulk Protocol",
    description: "Low-carb muscle building for keto enthusiasts",
    calories: 3300,
    protein: 185,
    approach: "moderate",
    difficulty: "moderate",
    duration: "8-12 weeks",
    rating: 4.4,
    reviews: 78,
    tags: ["Keto", "Low Carb", "High Fat"],
    dietaryRestrictions: ["keto"],
    image: "/keto-muscle-building-meals.png",
  },
]

export default function BulkMealPlansPage() {
  const [filters, setFilters] = useState<FilterType>({
    approach: [],
    difficulty: [],
    calorieRange: [1500, 4000],
    dietaryRestrictions: [],
  })

  const filteredPlans = mealPlans.filter((plan) => {
    const matchesApproach = filters.approach.length === 0 || filters.approach.includes(plan.approach)
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(plan.difficulty)
    const matchesCalories = plan.calories >= filters.calorieRange[0] && plan.calories <= filters.calorieRange[1]
    const matchesDietary =
      filters.dietaryRestrictions.length === 0 ||
      filters.dietaryRestrictions.some((restriction) => plan.dietaryRestrictions.includes(restriction))

    return matchesApproach && matchesDifficulty && matchesCalories && matchesDietary
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Bulking Meal Plans</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Strategic nutrition plans designed to help you build muscle mass effectively. Choose from various
              approaches and difficulty levels to match your lifestyle.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <MealPlanFilters onFiltersChange={setFilters} />
            </div>

            {/* Meal Plans Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {filteredPlans.length} of {mealPlans.length} plans
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPlans.map((plan) => (
                  <Card
                    key={plan.id}
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
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {plan.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground mt-2">{plan.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <FavoriteButton
                            item={{
                              id: plan.id.toString(),
                              type: "meal-plan",
                              category: "bulk",
                              title: plan.title,
                              description: plan.description,
                              image: plan.image,
                              calories: plan.calories,
                              protein: plan.protein,
                              duration: plan.duration,
                              difficulty: plan.difficulty,
                              rating: plan.rating,
                              savedAt: new Date(),
                            }}
                          />
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{plan.rating}</span>
                            <span className="text-muted-foreground">({plan.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Nutrition Info */}
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

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {plan.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Link href={`/meal-plans/bulk/${plan.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          View Meal Plan
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPlans.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No meal plans match your current filters.</p>
                  <p className="text-muted-foreground">Try adjusting your filter criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
