"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

interface FilterProps {
  onFiltersChange: (filters: WorkoutFilters) => void
}

export interface WorkoutFilters {
  duration: number[]
  frequency: string[]
  difficulty: string[]
  equipment: string[]
  goals: string[]
}

export function WorkoutFilters({ onFiltersChange }: FilterProps) {
  const [filters, setFilters] = useState<WorkoutFilters>({
    duration: [30, 90],
    frequency: [],
    difficulty: [],
    equipment: [],
    goals: [],
  })

  const updateFilters = (newFilters: Partial<WorkoutFilters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const toggleFilter = (category: keyof WorkoutFilters, value: string) => {
    if (category === "duration") return

    const currentValues = filters[category] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    updateFilters({ [category]: newValues })
  }

  const frequencies = [
    { id: "2x", label: "2x per week", description: "Minimal commitment" },
    { id: "3x", label: "3x per week", description: "Balanced approach" },
    { id: "4x", label: "4x per week", description: "Dedicated training" },
    { id: "5x", label: "5x per week", description: "High commitment" },
    { id: "6x", label: "6x per week", description: "Advanced training" },
  ]

  const difficulties = [
    { id: "beginner", label: "Beginner", description: "New to training" },
    { id: "intermediate", label: "Intermediate", description: "6+ months experience" },
    { id: "advanced", label: "Advanced", description: "2+ years experience" },
  ]

  const equipment = [
    { id: "bodyweight", label: "Bodyweight Only" },
    { id: "dumbbells", label: "Dumbbells" },
    { id: "barbell", label: "Barbell" },
    { id: "machines", label: "Machines" },
    { id: "full-gym", label: "Full Gym Access" },
  ]

  const goals = [
    { id: "strength", label: "Build Strength" },
    { id: "muscle", label: "Build Muscle" },
    { id: "endurance", label: "Endurance" },
    { id: "fat-loss", label: "Fat Loss" },
    { id: "athletic", label: "Athletic Performance" },
  ]

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Filter Workouts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Duration */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Workout Duration (minutes)</h3>
          <div className="px-2">
            <Slider
              value={filters.duration}
              onValueChange={(value) => updateFilters({ duration: value })}
              max={120}
              min={15}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{filters.duration[0]} min</span>
              <span>{filters.duration[1]} min</span>
            </div>
          </div>
        </div>

        {/* Frequency */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Training Frequency</h3>
          <div className="space-y-2">
            {frequencies.map((freq) => (
              <Button
                key={freq.id}
                variant={filters.frequency.includes(freq.id) ? "default" : "outline"}
                size="sm"
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => toggleFilter("frequency", freq.id)}
              >
                <div>
                  <div className="font-medium">{freq.label}</div>
                  <div className="text-xs opacity-70">{freq.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Experience Level</h3>
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

        {/* Equipment */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Available Equipment</h3>
          <div className="flex flex-wrap gap-2">
            {equipment.map((eq) => (
              <Badge
                key={eq.id}
                variant={filters.equipment.includes(eq.id) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => toggleFilter("equipment", eq.id)}
              >
                {eq.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <h3 className="font-medium text-foreground mb-3">Training Goals</h3>
          <div className="flex flex-wrap gap-2">
            {goals.map((goal) => (
              <Badge
                key={goal.id}
                variant={filters.goals.includes(goal.id) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => toggleFilter("goals", goal.id)}
              >
                {goal.label}
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
              duration: [30, 90],
              frequency: [],
              difficulty: [],
              equipment: [],
              goals: [],
            })
          }
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
