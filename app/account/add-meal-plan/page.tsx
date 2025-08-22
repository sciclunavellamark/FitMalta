"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, Upload, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function AddMealPlanPage() {
  const { user } = useAuth()
  const [mealPlan, setMealPlan] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    duration: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    tags: [] as string[],
    meals: [] as any[],
  })
  const [newTag, setNewTag] = useState("")
  const [newMeal, setNewMeal] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    calories: "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
              <p className="text-muted-foreground mb-6">You need to be signed in to create meal plans.</p>
              <Link href="/account">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const addTag = () => {
    if (newTag.trim() && !mealPlan.tags.includes(newTag.trim())) {
      setMealPlan({ ...mealPlan, tags: [...mealPlan.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setMealPlan({ ...mealPlan, tags: mealPlan.tags.filter((tag) => tag !== tagToRemove) })
  }

  const addMeal = () => {
    if (newMeal.name.trim()) {
      setMealPlan({ ...mealPlan, meals: [...mealPlan.meals, { ...newMeal, id: Date.now() }] })
      setNewMeal({ name: "", ingredients: "", instructions: "", calories: "" })
    }
  }

  const removeMeal = (mealId: number) => {
    setMealPlan({ ...mealPlan, meals: mealPlan.meals.filter((meal) => meal.id !== mealId) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically submit to your backend
    console.log("Submitting meal plan:", mealPlan)
    alert("Meal plan submitted for review!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation component for consistent header */}
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-6">
              <Link href="/account">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Account
                </Button>
              </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Create Meal Plan</h1>
              </div>
              <p className="text-lg text-muted-foreground">Share your nutrition expertise with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Meal Plan Title</Label>
                    <Input
                      id="title"
                      value={mealPlan.title}
                      onChange={(e) => setMealPlan({ ...mealPlan, title: e.target.value })}
                      placeholder="e.g., Mediterranean Muscle Building Plan"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={mealPlan.description}
                      onChange={(e) => setMealPlan({ ...mealPlan, description: e.target.value })}
                      placeholder="Describe your meal plan, its benefits, and who it's for..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={mealPlan.category}
                        onValueChange={(value) => setMealPlan({ ...mealPlan, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bulking">Bulking</SelectItem>
                          <SelectItem value="cutting">Cutting</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={mealPlan.difficulty}
                        onValueChange={(value) => setMealPlan({ ...mealPlan, difficulty: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Select
                        value={mealPlan.duration}
                        onValueChange={(value) => setMealPlan({ ...mealPlan, duration: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="4-weeks">4 Weeks</SelectItem>
                          <SelectItem value="8-weeks">8 Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nutrition Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition Information (per day)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={mealPlan.calories}
                        onChange={(e) => setMealPlan({ ...mealPlan, calories: e.target.value })}
                        placeholder="2500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={mealPlan.protein}
                        onChange={(e) => setMealPlan({ ...mealPlan, protein: e.target.value })}
                        placeholder="150"
                      />
                    </div>
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={mealPlan.carbs}
                        onChange={(e) => setMealPlan({ ...mealPlan, carbs: e.target.value })}
                        placeholder="300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fat">Fat (g)</Label>
                      <Input
                        id="fat"
                        type="number"
                        value={mealPlan.fat}
                        onChange={(e) => setMealPlan({ ...mealPlan, fat: e.target.value })}
                        placeholder="80"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mealPlan.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Meals */}
              <Card>
                <CardHeader>
                  <CardTitle>Meals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add New Meal */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Add New Meal</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="meal-name">Meal Name</Label>
                        <Input
                          id="meal-name"
                          value={newMeal.name}
                          onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                          placeholder="e.g., Breakfast, Lunch, Snack"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meal-calories">Calories</Label>
                        <Input
                          id="meal-calories"
                          type="number"
                          value={newMeal.calories}
                          onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                          placeholder="500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="ingredients">Ingredients</Label>
                      <Textarea
                        id="ingredients"
                        value={newMeal.ingredients}
                        onChange={(e) => setNewMeal({ ...newMeal, ingredients: e.target.value })}
                        placeholder="List ingredients with quantities..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={newMeal.instructions}
                        onChange={(e) => setNewMeal({ ...newMeal, instructions: e.target.value })}
                        placeholder="Cooking instructions..."
                        rows={3}
                      />
                    </div>
                    <Button type="button" onClick={addMeal}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Meal
                    </Button>
                  </div>

                  {/* Existing Meals */}
                  {mealPlan.meals.map((meal) => (
                    <div key={meal.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{meal.name}</h4>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeMeal(meal.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{meal.calories} calories</p>
                      <p className="text-sm mb-2">
                        <strong>Ingredients:</strong> {meal.ingredients}
                      </p>
                      <p className="text-sm">
                        <strong>Instructions:</strong> {meal.instructions}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Submit */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
                <Link href="/account">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
