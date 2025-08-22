"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Target, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface CalculatorForm {
  age: string
  gender: string
  weight: string
  height: string
  activityLevel: string
  goal: string
  goalIntensity: string
}

interface CalorieResults {
  bmr: number
  tdee: number
  goalCalories: number
  protein: number
  carbs: number
  fat: number
  weightChangePerWeek: number
}

export default function CalculatorPage() {
  const [form, setForm] = useState<CalculatorForm>({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
    goalIntensity: "",
  })

  const [results, setResults] = useState<CalorieResults | null>(null)
  const [showResults, setShowResults] = useState(false)

  const activityLevels = [
    { value: "1.2", label: "Sedentary", description: "Little or no exercise" },
    { value: "1.375", label: "Lightly Active", description: "Light exercise 1-3 days/week" },
    { value: "1.55", label: "Moderately Active", description: "Moderate exercise 3-5 days/week" },
    { value: "1.725", label: "Very Active", description: "Hard exercise 6-7 days/week" },
    { value: "1.9", label: "Extremely Active", description: "Very hard exercise, physical job" },
  ]

  const goals = [
    { value: "cut", label: "Cut (Fat Loss)", icon: TrendingDown, color: "text-red-500" },
    { value: "maintain", label: "Maintain Weight", icon: Minus, color: "text-blue-500" },
    { value: "bulk", label: "Bulk (Muscle Gain)", icon: TrendingUp, color: "text-green-500" },
  ]

  const goalIntensities = {
    cut: [
      { value: "aggressive", label: "Aggressive Cut", description: "-750 cal/day (1.5 lbs/week)" },
      { value: "moderate", label: "Moderate Cut", description: "-500 cal/day (1 lb/week)" },
      { value: "slow", label: "Slow Cut", description: "-250 cal/day (0.5 lbs/week)" },
    ],
    bulk: [
      { value: "aggressive", label: "Aggressive Bulk", description: "+750 cal/day (1.5 lbs/week)" },
      { value: "moderate", label: "Moderate Bulk", description: "+500 cal/day (1 lb/week)" },
      { value: "slow", label: "Slow Bulk", description: "+250 cal/day (0.5 lbs/week)" },
    ],
    maintain: [{ value: "maintain", label: "Maintain Weight", description: "No calorie adjustment" }],
  }

  const calculateCalories = () => {
    const age = Number.parseInt(form.age)
    const weight = Number.parseFloat(form.weight)
    const height = Number.parseFloat(form.height)
    const activityMultiplier = Number.parseFloat(form.activityLevel)

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number
    if (form.gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Calculate TDEE
    const tdee = bmr * activityMultiplier

    // Calculate goal calories
    let calorieAdjustment = 0
    let weightChangePerWeek = 0

    if (form.goal === "cut") {
      switch (form.goalIntensity) {
        case "aggressive":
          calorieAdjustment = -750
          weightChangePerWeek = -1.5
          break
        case "moderate":
          calorieAdjustment = -500
          weightChangePerWeek = -1
          break
        case "slow":
          calorieAdjustment = -250
          weightChangePerWeek = -0.5
          break
      }
    } else if (form.goal === "bulk") {
      switch (form.goalIntensity) {
        case "aggressive":
          calorieAdjustment = 750
          weightChangePerWeek = 1.5
          break
        case "moderate":
          calorieAdjustment = 500
          weightChangePerWeek = 1
          break
        case "slow":
          calorieAdjustment = 250
          weightChangePerWeek = 0.5
          break
      }
    }

    const goalCalories = tdee + calorieAdjustment

    // Calculate macronutrients
    const protein = weight * 2.2 // 1g per lb bodyweight
    const fat = (goalCalories * 0.25) / 9 // 25% of calories from fat
    const carbs = (goalCalories - protein * 4 - fat * 9) / 4 // Remaining calories from carbs

    const calculatedResults: CalorieResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      weightChangePerWeek,
    }

    setResults(calculatedResults)
    setShowResults(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      form.age &&
      form.gender &&
      form.weight &&
      form.height &&
      form.activityLevel &&
      form.goal &&
      form.goalIntensity
    ) {
      calculateCalories()
    }
  }

  const resetCalculator = () => {
    setForm({
      age: "",
      gender: "",
      weight: "",
      height: "",
      activityLevel: "",
      goal: "",
      goalIntensity: "",
    })
    setResults(null)
    setShowResults(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Calorie Calculator</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Calculate your daily caloric needs based on your goals. Whether you're cutting, bulking, or maintaining,
              get precise numbers to fuel your fitness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Enter your details to calculate your caloric needs</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={form.age}
                        onChange={(e) => setForm({ ...form, age: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup
                        value={form.gender}
                        onValueChange={(value) => setForm({ ...form, gender: value })}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="70"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={form.height}
                        onChange={(e) => setForm({ ...form, height: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="space-y-2">
                    <Label>Activity Level</Label>
                    <Select
                      value={form.activityLevel}
                      onValueChange={(value) => setForm({ ...form, activityLevel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <div>
                              <div className="font-medium">{level.label}</div>
                              <div className="text-sm text-muted-foreground">{level.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Goal Selection */}
                  <div className="space-y-2">
                    <Label>Fitness Goal</Label>
                    <RadioGroup
                      value={form.goal}
                      onValueChange={(value) => setForm({ ...form, goal: value, goalIntensity: "" })}
                      className="grid grid-cols-1 gap-2"
                    >
                      {goals.map((goal) => (
                        <div key={goal.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <RadioGroupItem value={goal.value} id={goal.value} />
                          <Label htmlFor={goal.value} className="flex items-center gap-2 cursor-pointer flex-1">
                            <goal.icon className={`h-4 w-4 ${goal.color}`} />
                            {goal.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Goal Intensity */}
                  {form.goal && (
                    <div className="space-y-2">
                      <Label>Approach</Label>
                      <RadioGroup
                        value={form.goalIntensity}
                        onValueChange={(value) => setForm({ ...form, goalIntensity: value })}
                        className="space-y-2"
                      >
                        {goalIntensities[form.goal as keyof typeof goalIntensities].map((intensity) => (
                          <div key={intensity.value} className="flex items-center space-x-2 p-3 border rounded-lg">
                            <RadioGroupItem value={intensity.value} id={intensity.value} />
                            <Label htmlFor={intensity.value} className="cursor-pointer flex-1">
                              <div className="font-medium">{intensity.label}</div>
                              <div className="text-sm text-muted-foreground">{intensity.description}</div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Calculate Calories
                    </Button>
                    {showResults && (
                      <Button type="button" variant="outline" onClick={resetCalculator}>
                        Reset
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {showResults && results ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-primary">Your Calorie Results</CardTitle>
                      <CardDescription>Based on your personal information and goals</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted/30 rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary">{results.bmr}</div>
                          <div className="text-sm text-muted-foreground">BMR (Base Metabolic Rate)</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg text-center">
                          <div className="text-2xl font-bold text-primary">{results.tdee}</div>
                          <div className="text-sm text-muted-foreground">TDEE (Total Daily Energy)</div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{results.goalCalories}</div>
                        <div className="text-foreground font-medium">Daily Calories for Your Goal</div>
                        {results.weightChangePerWeek !== 0 && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Expected: {Math.abs(results.weightChangePerWeek)} lbs/week{" "}
                            {results.weightChangePerWeek > 0 ? "gain" : "loss"}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Macronutrient Breakdown</CardTitle>
                      <CardDescription>Recommended daily macronutrient targets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="grams" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="grams">Grams</TabsTrigger>
                          <TabsTrigger value="calories">Calories</TabsTrigger>
                        </TabsList>
                        <TabsContent value="grams" className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                              <div className="text-2xl font-bold text-red-600">{results.protein}g</div>
                              <div className="text-sm text-red-700">Protein</div>
                            </div>
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                              <div className="text-2xl font-bold text-blue-600">{results.carbs}g</div>
                              <div className="text-sm text-blue-700">Carbs</div>
                            </div>
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                              <div className="text-2xl font-bold text-yellow-600">{results.fat}g</div>
                              <div className="text-sm text-yellow-700">Fat</div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="calories" className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                              <div className="text-2xl font-bold text-red-600">{results.protein * 4}</div>
                              <div className="text-sm text-red-700">Protein Calories</div>
                            </div>
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                              <div className="text-2xl font-bold text-blue-600">{results.carbs * 4}</div>
                              <div className="text-sm text-blue-700">Carb Calories</div>
                            </div>
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                              <div className="text-2xl font-bold text-yellow-600">{results.fat * 9}</div>
                              <div className="text-sm text-yellow-700">Fat Calories</div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Important Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        • These calculations are estimates based on standard formulas and should be used as a starting
                        point.
                      </p>
                      <p>• Monitor your progress and adjust calories as needed based on actual results.</p>
                      <p>• Protein recommendation is set at 1g per lb of body weight for muscle preservation/growth.</p>
                      <p>• Fat is set at 25% of total calories for hormone production and nutrient absorption.</p>
                      <p>• Remaining calories are allocated to carbohydrates for energy and performance.</p>
                      <p>• Consult with a healthcare professional before making significant dietary changes.</p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                    <CardDescription>Understanding your calorie calculation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Calculate BMR</h4>
                          <p className="text-sm text-muted-foreground">
                            Your Basal Metabolic Rate - calories burned at rest
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Apply Activity Level</h4>
                          <p className="text-sm text-muted-foreground">Multiply BMR by activity factor to get TDEE</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Adjust for Goals</h4>
                          <p className="text-sm text-muted-foreground">
                            Add or subtract calories based on your fitness goals
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Calculate Macros</h4>
                          <p className="text-sm text-muted-foreground">
                            Distribute calories across protein, carbs, and fats
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
