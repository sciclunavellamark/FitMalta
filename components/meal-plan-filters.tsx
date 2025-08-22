"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

interface FilterProps {
  onFiltersChange: (filters: MealPlanFilters) => void
}

export interface MealPlanFilters {
  approach: string[]
  difficulty: string[]
  calorieRange: number[]
  dietaryRestrictions: string[]
}

export function MealPlanFilters({ onFiltersChange }: FilterProps) {
  const [filters, setFilters] = useState<MealPlanFilters>({
    approach: [],
    difficulty: [],
    calorieRange: [1500, 3000],
    dietaryRestrictions: [],
  })

  const updateFilters = (newFilters: Partial<MealPlanFilters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const toggleFilter = (category: keyof MealPlanFilters, value: string) => {
    if (category === "calorieRange") return

    const currentValues = filters[category] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    updateFilters({ [category]: newValues })
  }

  const approaches = [
    { id: "slow", label: "Slow & Steady", description: "Gradual approach" },
    { id: "moderate", label: "Moderate", description: "Balanced pace" },
    { id: "aggressive", label: "Aggressive", description: "Fast results" },
  ]

  const difficulties = [
    { id: "easy", label: "Easy to Cook", description: "15-30 min prep" },
    { id: "moderate", label: "Moderate", description: "30-45 min prep" },
    { id: "advanced", label: "Advanced", description: "45+ min prep" },
  ]

  const dietaryOptions = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "dairy-free", label: "Dairy Free" },
    { id: "keto", label: "Keto Friendly" },
  ]

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Filter Plans</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Approach */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Approach</h3>
          <div className="space-y-2">
            {approaches.map((approach) => (
              <Button
                key={approach.id}
                variant={filters.approach.includes(approach.id) ? "default" : "outline"}
                size="sm"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => toggleFilter("approach", approach.id)}
              >
                <div>
                  <div className="font-medium">{approach.label}</div>
                  <div className="text-xs opacity-70">{approach.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Cooking Difficulty */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Cooking Difficulty</h3>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty.id}
                variant={filters.difficulty.includes(difficulty.id) ? "default" : "outline"}
                size="sm"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => toggleFilter("difficulty", difficulty.id)}
              >
                <div>
                  <div className="font-medium">{difficulty.label}</div>
                  <div className="text-xs opacity-70">{difficulty.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Calorie Range */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Daily Calories</h3>
          <div className="px-2">
            <Slider
              value={filters.calorieRange}
              onValueChange={(value) => updateFilters({ calorieRange: value })}
              max={4000}
              min={1200}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{filters.calorieRange[0]} cal</span>
              <span>{filters.calorieRange[1]} cal</span>
            </div>
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <Badge
                key={option.id}
                variant={filters.dietaryRestrictions.includes(option.id) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => toggleFilter("dietaryRestrictions", option.id)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() =>
            updateFilters({
              approach: [],
              difficulty: [],
              calorieRange: [1500, 3000],
              dietaryRestrictions: [],
            })
          }
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
