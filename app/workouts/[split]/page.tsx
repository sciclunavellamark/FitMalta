"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { WorkoutFilters, type WorkoutFilters as FilterType } from "@/components/workout-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Target, Star, Dumbbell } from "lucide-react"
import Link from "next/link"

// Mock workout data - in a real app this would come from an API
const workoutData: Record<string, any> = {
  "full-body": {
    title: "Full Body Workouts",
    description: "Complete workouts targeting all major muscle groups in each session",
    workouts: [
      {
        id: 1,
        title: "Beginner Full Body Foundation",
        description: "Perfect introduction to weight training with basic compound movements",
        duration: 45,
        difficulty: "beginner",
        frequency: "3x",
        equipment: ["dumbbells", "bodyweight"],
        goals: ["muscle", "strength"],
        musclesTargeted: ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"],
        rating: 4.8,
        reviews: 234,
        image: "/beginner-full-body-workout.png",
      },
      {
        id: 2,
        title: "Intermediate Full Body Power",
        description: "Step up your training with compound movements and progressive overload",
        duration: 60,
        difficulty: "intermediate",
        frequency: "4x",
        equipment: ["barbell", "dumbbells", "machines"],
        goals: ["strength", "muscle"],
        musclesTargeted: ["Full Body", "Compound Focus"],
        rating: 4.9,
        reviews: 189,
        image: "/intermediate-full-body-workout.png",
      },
      {
        id: 3,
        title: "Advanced Full Body Athlete",
        description: "High-intensity full body training for experienced lifters",
        duration: 75,
        difficulty: "advanced",
        frequency: "4x",
        equipment: ["full-gym"],
        goals: ["strength", "athletic", "muscle"],
        musclesTargeted: ["Full Body", "Athletic Performance"],
        rating: 4.7,
        reviews: 156,
        image: "/advanced-full-body-workout.png",
      },
    ],
  },
  "push-pull-legs": {
    title: "Push Pull Legs Workouts",
    description: "Split workouts by movement patterns for balanced development",
    workouts: [
      {
        id: 4,
        title: "Classic PPL Split",
        description: "Traditional push/pull/legs split for intermediate trainees",
        duration: 60,
        difficulty: "intermediate",
        frequency: "6x",
        equipment: ["barbell", "dumbbells", "machines"],
        goals: ["muscle", "strength"],
        musclesTargeted: ["Push: Chest, Shoulders, Triceps", "Pull: Back, Biceps", "Legs: Quads, Hamstrings, Glutes"],
        rating: 4.9,
        reviews: 312,
        image: "/classic-ppl-workout.png",
      },
      {
        id: 5,
        title: "High Volume PPL",
        description: "Advanced PPL with higher volume for serious muscle building",
        duration: 90,
        difficulty: "advanced",
        frequency: "6x",
        equipment: ["full-gym"],
        goals: ["muscle"],
        musclesTargeted: ["Hypertrophy Focus", "High Volume Training"],
        rating: 4.8,
        reviews: 198,
        image: "/high-volume-ppl-workout.png",
      },
    ],
  },
  // Add more splits as needed...
}

export default function WorkoutSplitPage() {
  const params = useParams()
  const splitId = params.split as string
  const splitData = workoutData[splitId]

  const [filters, setFilters] = useState<FilterType>({
    duration: [30, 90],
    frequency: [],
    difficulty: [],
    equipment: [],
    goals: [],
  })

  if (!splitData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Workout Split Not Found</h1>
            <p className="text-muted-foreground">The requested workout split could not be found.</p>
            <Link href="/workouts">
              <Button className="mt-4">Back to Workouts</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const filteredWorkouts = splitData.workouts.filter((workout: any) => {
    const matchesDuration = workout.duration >= filters.duration[0] && workout.duration <= filters.duration[1]
    const matchesFrequency = filters.frequency.length === 0 || filters.frequency.includes(workout.frequency)
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(workout.difficulty)
    const matchesEquipment =
      filters.equipment.length === 0 || filters.equipment.some((eq: string) => workout.equipment.includes(eq))
    const matchesGoals =
      filters.goals.length === 0 || filters.goals.some((goal: string) => workout.goals.includes(goal))

    return matchesDuration && matchesFrequency && matchesDifficulty && matchesEquipment && matchesGoals
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">{splitData.title}</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">{splitData.description}</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <WorkoutFilters onFiltersChange={setFilters} />
            </div>

            {/* Workouts Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted-foreground">
                  Showing {filteredWorkouts.length} of {splitData.workouts.length} workouts
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWorkouts.map((workout: any) => (
                  <Card
                    key={workout.id}
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
                          <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {workout.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground mt-2">
                            {workout.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{workout.rating}</span>
                          <span className="text-muted-foreground">({workout.reviews})</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Workout Info */}
                      <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="text-center">
                          <div className="font-bold text-primary flex items-center justify-center gap-1">
                            <Clock className="h-3 w-3" />
                            {workout.duration}m
                          </div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-primary flex items-center justify-center gap-1">
                            <Users className="h-3 w-3" />
                            {workout.frequency}
                          </div>
                          <div className="text-xs text-muted-foreground">Per Week</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-primary flex items-center justify-center gap-1">
                            <Target className="h-3 w-3" />
                            {workout.difficulty}
                          </div>
                          <div className="text-xs text-muted-foreground">Level</div>
                        </div>
                      </div>

                      {/* Muscles Targeted */}
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Muscles Targeted</h4>
                        <div className="flex flex-wrap gap-2">
                          {workout.musclesTargeted.map((muscle: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {muscle}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link href={`/workouts/${splitId}/${workout.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          View Workout Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredWorkouts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No workouts match your current filters.</p>
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
