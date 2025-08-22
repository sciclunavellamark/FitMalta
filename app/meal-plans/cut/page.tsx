"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { MealPlanFilters, type MealPlanFilters as FilterType } from "@/components/meal-plan-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, Clock, Star } from "lucide-react"
import Link from "next/link"
import { FavoriteButton } from "@/components/favorite-button"

const mealPlans = [
  {
    id: 1,
    title: "Sustainable Fat Loss",
    description: "Gradual fat loss while preserving muscle mass",
    calories: 1800,
    protein: 140,
    approach: "slow",
    difficulty: "easy",
    duration: "12-16 weeks",
    rating: 4.9,
    reviews: 187,
    tags: ["Sustainable", "Muscle Preserving", "Easy Prep"],
    dietaryRestrictions: [],
    image: "/healthy-low-calorie-meal-prep.png",
  },
  {
    id: 2,
    title: "Rapid Cut Protocol",
    description: "Aggressive fat loss for quick results",
    calories: 1400,
    protein: 160,
    approach: "aggressive",
    difficulty: "moderate",
    duration: "6-8 weeks",
    rating: 4.5,
    reviews: 134,
    tags: ["Fast Results", "High Protein", "Intensive"],
    dietaryRestrictions: [],
    image: "/low-calorie-high-protein-meals.png",
  },
  {
    id: 3,
    title: "Plant-Based Cut",
    description: "Vegan-friendly fat loss with complete nutrition",
    calories: 1600,
    protein: 120,
    approach: "slow",
    difficulty: "moderate",
    duration: "10-14 weeks",
    rating: 4.7,
    reviews: 92,
    tags: ["Vegan", "Plant-Based", "Nutrient Dense"],
    dietaryRestrictions: ["vegan", "vegetarian"],
    image: "/vegan-low-calorie-high-protein-meals.png",
  },
  {
    id: 4,
    title: "Gourmet Cut Cuisine",
    description: "Delicious low-calorie meals that don't feel like dieting",
    calories: 1700,
    protein: 135,
    approach: "moderate",
    difficulty: "advanced",
    duration: "8-12 weeks",
    rating: 4.8,
    reviews: 156,
    tags: ["Gourmet", "Satisfying", "Complex Flavors"],
    dietaryRestrictions: [],
    image: "/gourmet-low-calorie-meals.png",
  },
  {
    id: 5,
    title: "Volume Eating Master",
    description: "High-volume, low-calorie foods to stay full",
    calories: 1500,
    protein: 130,
    approach: "moderate",
    difficulty: "easy",
    duration: "8-12 weeks",
    rating: 4.6,
    reviews: 203,
    tags: ["High Volume", "Filling", "Low Calorie"],
    dietaryRestrictions: [],
    image: "/high-volume-low-calorie-meals.png",
  },
  {
    id: 6,
    title: "Keto Cut Revolution",
    description: "Ketogenic approach to fat loss",
    calories: 1600,
    protein: 125,
    approach: "moderate",
    difficulty: "moderate",
    duration: "8-10 weeks",
    rating: 4.4,
    reviews: 89,
    tags: ["Keto", "Low Carb", "Fat Adapted"],
    dietaryRestrictions: ["keto"],
    image: "/keto-low-calorie-high-fat-meals.png",
  },
  {
    id: 7,
    title: "Intermittent Fasting Cut",
    description: "Combine IF with strategic meal timing",
    calories: 1650,
    protein: 145,
    approach: "moderate",
    difficulty: "easy",
    duration: "10-12 weeks",
    rating: 4.7,
    reviews: 167,
    tags: ["Intermittent Fasting", "Time Restricted", "Flexible"],
    dietaryRestrictions: [],
    image: "/intermittent-fasting-meal-prep.png",
  },
  {
    id: 8,
    title: "Contest Prep Elite",
    description: "Competition-level cutting for serious athletes",
    calories: 1300,
    protein: 170,
    approach: "aggressive",
    difficulty: "advanced",
    duration: "12-20 weeks",
    rating: 4.9,
    reviews: 78,
    tags: ["Contest Prep", "Elite Level", "Precision"],
    dietaryRestrictions: [],
    image: "/bodybuilding-prep-meals.png",
  },
]

export default function CutMealPlansPage() {
  const [filters, setFilters] = useState<FilterType>({
    approach: [],
    difficulty: [],
    calorieRange: [1200, 2500],
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
              <TrendingDown className="h-8 w-8 text-accent" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Cutting Meal Plans</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Strategic nutrition plans designed to help you lose fat while preserving muscle mass. Choose from various
              approaches and difficulty levels to match your goals.
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
                    className="group hover:shadow-lg transition-all duration-300 border-border hover:border-accent/20"
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
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                            {plan.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground mt-2">{plan.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <FavoriteButton
                            item={{
                              id: plan.id.toString(),
                              type: "meal-plan",
                              category: "cut",
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
                          <div className="font-bold text-accent">{plan.calories}</div>
                          <div className="text-xs text-muted-foreground">Calories</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-accent">{plan.protein}g</div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-accent flex items-center justify-center gap-1">
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
                      <Link href={`/meal-plans/cut/${plan.id}`}>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
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
