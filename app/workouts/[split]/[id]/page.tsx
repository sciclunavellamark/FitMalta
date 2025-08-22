"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, Target, Star, Play, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock detailed workout data
const workoutDetails: Record<string, any> = {
  "1": {
    title: "Beginner Full Body Foundation",
    description: "Perfect introduction to weight training with basic compound movements",
    duration: 45,
    difficulty: "beginner",
    frequency: "3x per week",
    rating: 4.8,
    reviews: 234,
    overview: {
      warmup: "5-10 minutes light cardio + dynamic stretching",
      cooldown: "5-10 minutes static stretching",
      restBetweenSets: "60-90 seconds",
      restBetweenExercises: "2-3 minutes",
    },
    muscleGroups: [
      {
        name: "Chest",
        exercises: [
          {
            name: "Push-ups",
            sets: "3",
            reps: "8-12",
            notes: "Modify on knees if needed",
            videoId: "chest-pushups-tutorial",
          },
          {
            name: "Dumbbell Chest Press",
            sets: "3",
            reps: "10-15",
            notes: "Control the weight, full range of motion",
            videoId: "dumbbell-chest-press-tutorial",
          },
        ],
      },
      {
        name: "Back",
        exercises: [
          {
            name: "Bent-over Dumbbell Rows",
            sets: "3",
            reps: "10-15",
            notes: "Keep back straight, squeeze shoulder blades",
            videoId: "bent-over-rows-tutorial",
          },
          {
            name: "Lat Pulldowns",
            sets: "3",
            reps: "10-15",
            notes: "Pull to upper chest, control the negative",
            videoId: "lat-pulldown-tutorial",
          },
        ],
      },
      {
        name: "Shoulders",
        exercises: [
          {
            name: "Overhead Press",
            sets: "3",
            reps: "8-12",
            notes: "Press straight up, engage core",
            videoId: "overhead-press-tutorial",
          },
          {
            name: "Lateral Raises",
            sets: "3",
            reps: "12-15",
            notes: "Light weight, control the movement",
            videoId: "lateral-raises-tutorial",
          },
        ],
      },
      {
        name: "Arms",
        exercises: [
          {
            name: "Bicep Curls",
            sets: "3",
            reps: "10-15",
            notes: "No swinging, squeeze at the top",
            videoId: "bicep-curls-tutorial",
          },
          {
            name: "Tricep Dips",
            sets: "3",
            reps: "8-12",
            notes: "Use bench or chair, control the descent",
            videoId: "tricep-dips-tutorial",
          },
        ],
      },
      {
        name: "Legs",
        exercises: [
          {
            name: "Bodyweight Squats",
            sets: "3",
            reps: "15-20",
            notes: "Sit back into heels, knees track over toes",
            videoId: "bodyweight-squats-tutorial",
          },
          {
            name: "Lunges",
            sets: "3",
            reps: "10 each leg",
            notes: "Step forward, 90-degree angles",
            videoId: "lunges-tutorial",
          },
        ],
      },
      {
        name: "Core",
        exercises: [
          {
            name: "Plank",
            sets: "3",
            reps: "30-60 seconds",
            notes: "Straight line from head to heels",
            videoId: "plank-tutorial",
          },
          {
            name: "Dead Bug",
            sets: "3",
            reps: "10 each side",
            notes: "Keep lower back pressed to floor",
            videoId: "dead-bug-tutorial",
          },
        ],
      },
    ],
  },
}

export default function WorkoutDetailPage() {
  const params = useParams()
  const splitId = params.split as string
  const workoutId = params.id as string
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const workout = workoutDetails[workoutId]

  if (!workout) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Workout Not Found</h1>
            <p className="text-muted-foreground">The requested workout could not be found.</p>
            <Link href="/workouts">
              <Button className="mt-4">Back to Workouts</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/workouts" className="hover:text-primary">
              Workouts
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/workouts/${splitId}`} className="hover:text-primary">
              {splitId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{workout.title}</span>
          </div>

          {/* Back Button */}
          <Link href={`/workouts/${splitId}`}>
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {splitId.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Workouts
            </Button>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{workout.title}</h1>
                <p className="text-lg text-muted-foreground">{workout.description}</p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-lg">{workout.rating}</span>
                <span className="text-muted-foreground">({workout.reviews} reviews)</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="font-bold text-primary flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4" />
                  {workout.duration} min
                </div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-primary flex items-center justify-center gap-1">
                  <Users className="h-4 w-4" />
                  {workout.frequency}
                </div>
                <div className="text-sm text-muted-foreground">Frequency</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-primary flex items-center justify-center gap-1">
                  <Target className="h-4 w-4" />
                  {workout.difficulty}
                </div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="text-center">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Workout</Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Workout Overview</TabsTrigger>
              <TabsTrigger value="exercises">Exercise Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Structure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Warm-up</h4>
                      <p className="text-muted-foreground">{workout.overview.warmup}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Cool-down</h4>
                      <p className="text-muted-foreground">{workout.overview.cooldown}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Rest Between Sets</h4>
                      <p className="text-muted-foreground">{workout.overview.restBetweenSets}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Rest Between Exercises</h4>
                      <p className="text-muted-foreground">{workout.overview.restBetweenExercises}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Muscles Trained</CardTitle>
                  <CardDescription>Quick overview of what this workout targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {workout.muscleGroups.map((group: any, index: number) => (
                      <div key={index} className="p-3 bg-muted/30 rounded-lg text-center">
                        <h4 className="font-semibold text-foreground">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.exercises.length} exercises</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              {workout.muscleGroups.map((group: any, groupIndex: number) => (
                <Card key={groupIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {groupIndex + 1}
                      </span>
                      {group.name}
                    </CardTitle>
                    <CardDescription>
                      {group.exercises.length} exercises for {group.name.toLowerCase()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {group.exercises.map((exercise: any, exerciseIndex: number) => (
                        <div
                          key={exerciseIndex}
                          className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{exercise.name}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span>
                                <strong>Sets:</strong> {exercise.sets}
                              </span>
                              <span>
                                <strong>Reps:</strong> {exercise.reps}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{exercise.notes}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedVideo(exercise.videoId)}
                            className="ml-4"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Watch Tutorial
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Video Modal Placeholder */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-background rounded-lg p-6 max-w-2xl w-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Exercise Tutorial</h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedVideo(null)}>
                    ×
                  </Button>
                </div>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Video tutorial for {selectedVideo}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      In a real app, this would show the actual video tutorial
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
