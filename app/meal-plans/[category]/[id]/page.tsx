"use client"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Star, Clock, Users, ChefHat, ShoppingCart, Calendar, Play, Heart } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app this would come from a database
const mealPlanData = {
  bulk: {
    1: {
      id: 1,
      title: "Clean Bulk Powerhouse",
      description: "High-quality whole foods for lean muscle gain",
      calories: 3200,
      protein: 180,
      carbs: 400,
      fat: 107,
      approach: "slow",
      difficulty: "moderate",
      duration: "8-12 weeks",
      rating: 4.8,
      reviews: 124,
      tags: ["High Protein", "Whole Foods", "Sustainable"],
      dietaryRestrictions: [],
      image: "/healthy-meal-prep.png",
      overview:
        "This comprehensive bulking plan focuses on clean, nutrient-dense foods to support lean muscle growth while minimizing fat gain. Perfect for those who want sustainable results.",
      dailyMeals: [
        {
          meal: "Breakfast",
          time: "7:00 AM",
          calories: 650,
          items: ["Oatmeal with berries", "Greek yogurt", "Almonds", "Protein powder"],
        },
        {
          meal: "Mid-Morning Snack",
          time: "10:00 AM",
          calories: 300,
          items: ["Banana", "Peanut butter", "Whole grain toast"],
        },
        {
          meal: "Lunch",
          time: "1:00 PM",
          calories: 800,
          items: ["Grilled chicken breast", "Brown rice", "Mixed vegetables", "Avocado"],
        },
        {
          meal: "Pre-Workout",
          time: "4:00 PM",
          calories: 250,
          items: ["Apple", "Whey protein shake"],
        },
        {
          meal: "Post-Workout",
          time: "6:00 PM",
          calories: 400,
          items: ["Chocolate milk", "Banana", "Protein bar"],
        },
        {
          meal: "Dinner",
          time: "8:00 PM",
          calories: 800,
          items: ["Salmon fillet", "Sweet potato", "Quinoa", "Green salad"],
        },
      ],
      recipes: [
        {
          id: 1,
          name: "Power Breakfast Bowl",
          prepTime: "10 minutes",
          cookTime: "5 minutes",
          servings: 1,
          calories: 650,
          ingredients: [
            "1 cup rolled oats",
            "1 cup Greek yogurt",
            "1/2 cup mixed berries",
            "1 scoop vanilla protein powder",
            "2 tbsp almonds, chopped",
            "1 tbsp honey",
          ],
          instructions: [
            "Cook oats according to package directions",
            "Mix protein powder with Greek yogurt",
            "Layer oats, yogurt mixture, and berries in bowl",
            "Top with almonds and drizzle with honey",
          ],
          videoUrl: "https://example.com/breakfast-bowl-tutorial",
        },
        {
          id: 2,
          name: "Muscle-Building Lunch Plate",
          prepTime: "15 minutes",
          cookTime: "20 minutes",
          servings: 1,
          calories: 800,
          ingredients: [
            "6 oz chicken breast",
            "1 cup brown rice, cooked",
            "2 cups mixed vegetables",
            "1/2 avocado",
            "2 tbsp olive oil",
            "Salt and pepper to taste",
          ],
          instructions: [
            "Season and grill chicken breast until cooked through",
            "Steam mixed vegetables until tender",
            "Serve chicken over brown rice",
            "Add steamed vegetables and sliced avocado",
            "Drizzle with olive oil and season",
          ],
          videoUrl: "https://example.com/lunch-plate-tutorial",
        },
      ],
      shoppingList: {
        proteins: [
          "Chicken breast (3 lbs)",
          "Salmon fillets (1 lb)",
          "Greek yogurt (32 oz)",
          "Whey protein powder",
          "Eggs (2 dozen)",
        ],
        carbs: [
          "Rolled oats (2 lbs)",
          "Brown rice (2 lbs)",
          "Sweet potatoes (3 lbs)",
          "Quinoa (1 lb)",
          "Whole grain bread",
        ],
        fats: ["Almonds (1 lb)", "Peanut butter", "Avocados (6)", "Olive oil", "Mixed nuts"],
        vegetables: [
          "Mixed berries (2 lbs)",
          "Bananas (8)",
          "Apples (6)",
          "Mixed vegetables (frozen)",
          "Spinach",
          "Broccoli",
        ],
        other: ["Honey", "Chocolate milk", "Protein bars (12)"],
      },
    },
  },
  cut: {
    // Similar structure for cutting meal plans
  },
}

export default function MealPlanDetailPage() {
  const params = useParams()
  const category = params.category as string
  const id = Number.parseInt(params.id as string)

  const mealPlan = mealPlanData[category as keyof typeof mealPlanData]?.[id]

  if (!mealPlan) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Meal Plan Not Found</h1>
          <Link href="/meal-plans">
            <Button>Back to Meal Plans</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href={`/meal-plans/${category}`}>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {category === "bulk" ? "Bulking" : "Cutting"} Plans
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={mealPlan.image || "/placeholder.svg"}
                    alt={mealPlan.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{mealPlan.title}</h1>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-lg text-muted-foreground">{mealPlan.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mealPlan.rating}</span>
                    <span className="text-muted-foreground">({mealPlan.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{mealPlan.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mealPlan.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Nutrition Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Nutrition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.calories}</div>
                        <div className="text-sm text-muted-foreground">Calories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.protein}g</div>
                        <div className="text-sm text-muted-foreground">Protein</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.carbs}g</div>
                        <div className="text-sm text-muted-foreground">Carbs</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{mealPlan.fat}g</div>
                        <div className="text-sm text-muted-foreground">Fat</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="meals">Daily Meals</TabsTrigger>
              <TabsTrigger value="recipes">Recipes</TabsTrigger>
              <TabsTrigger value="shopping">Shopping List</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{mealPlan.overview}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">Difficulty</div>
                      <div className="text-sm text-muted-foreground capitalize">{mealPlan.difficulty}</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">Duration</div>
                      <div className="text-sm text-muted-foreground">{mealPlan.duration}</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">Approach</div>
                      <div className="text-sm text-muted-foreground capitalize">{mealPlan.approach}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meals" className="mt-6">
              <div className="space-y-4">
                {mealPlan.dailyMeals.map((meal, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{meal.meal}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{meal.time}</span>
                          <span>{meal.calories} cal</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {meal.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="p-2 bg-muted/30 rounded text-sm">
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recipes" className="mt-6">
              <div className="space-y-6">
                {mealPlan.recipes.map((recipe) => (
                  <Card key={recipe.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{recipe.name}</CardTitle>
                          <CardDescription className="mt-2">
                            Prep: {recipe.prepTime} • Cook: {recipe.cookTime} • Serves: {recipe.servings} •{" "}
                            {recipe.calories} cal
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Video
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Ingredients</h4>
                          <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                • {ingredient}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Instructions</h4>
                          <ol className="space-y-2">
                            {recipe.instructions.map((instruction, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {index + 1}. {instruction}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shopping" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Weekly Shopping List
                  </CardTitle>
                  <CardDescription>Everything you need for one week of this meal plan</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(mealPlan.shoppingList).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-semibold mb-3 capitalize">{category}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {items.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                      {category !== "other" && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Track Your Progress</CardTitle>
                  <CardDescription>Monitor your results and make adjustments as needed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Progress tracking features coming soon!</p>
                    <p className="text-sm">Track weight, measurements, and photos</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
