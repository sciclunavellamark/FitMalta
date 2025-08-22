"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Clock, Users, Target, Play, Calendar, Heart } from "lucide-react"
import Link from "next/link"

// Mock detailed workout data - enhanced to match trainer detail page structure
const workoutDetails: Record<string, any> = {
  "full-body-official": {
    id: "full-body-official",
    title: "Complete Full Body Program",
    description: "Scientifically designed full body workouts for maximum muscle growth and strength",
    category: "full-body",
    author: "FitMalta Team",
    authorType: "official",
    frequency: "3-4x per week",
    duration: "60-90 minutes",
    difficulty: "Beginner to Advanced",
    rating: 4.9,
    reviews: 456,
    views: 8920,
    image: "/full-body-workout-official.png",
    tags: ["Full Body", "Strength", "Muscle Building"],
    overview:
      "This comprehensive full body program is designed using proven exercise science principles to maximize muscle growth and strength development. Perfect for those who want efficient, effective workouts that target all major muscle groups in each session.",
    weeklySchedule: [
      {
        day: "Monday",
        workout: "Full Body A",
        duration: "75 minutes",
        focus: "Upper Body Emphasis",
      },
      {
        day: "Tuesday",
        workout: "Rest or Light Cardio",
        duration: "30 minutes",
        focus: "Recovery",
      },
      {
        day: "Wednesday",
        workout: "Full Body B",
        duration: "75 minutes",
        focus: "Lower Body Emphasis",
      },
      {
        day: "Thursday",
        workout: "Rest or Light Cardio",
        duration: "30 minutes",
        focus: "Recovery",
      },
      {
        day: "Friday",
        workout: "Full Body C",
        duration: "75 minutes",
        focus: "Power & Conditioning",
      },
      {
        day: "Saturday",
        workout: "Optional Full Body D",
        duration: "60 minutes",
        focus: "Volume & Accessories",
      },
      {
        day: "Sunday",
        workout: "Rest",
        duration: "0 minutes",
        focus: "Complete Recovery",
      },
    ],
    exerciseLibrary: [
      {
        name: "Compound Movements",
        exercises: [
          {
            name: "Barbell Squat",
            sets: "4",
            reps: "6-8",
            notes: "Focus on depth and control, progressive overload weekly",
            videoId: "barbell-squat-tutorial",
            muscleGroups: ["Quadriceps", "Glutes", "Core"],
          },
          {
            name: "Deadlift",
            sets: "3",
            reps: "5-6",
            notes: "Maintain neutral spine, drive through heels",
            videoId: "deadlift-tutorial",
            muscleGroups: ["Hamstrings", "Glutes", "Back", "Core"],
          },
          {
            name: "Bench Press",
            sets: "4",
            reps: "6-8",
            notes: "Control the negative, pause at chest",
            videoId: "bench-press-tutorial",
            muscleGroups: ["Chest", "Shoulders", "Triceps"],
          },
          {
            name: "Pull-ups/Lat Pulldown",
            sets: "3",
            reps: "8-12",
            notes: "Full range of motion, squeeze shoulder blades",
            videoId: "pullups-tutorial",
            muscleGroups: ["Lats", "Rhomboids", "Biceps"],
          },
        ],
      },
      {
        name: "Accessory Movements",
        exercises: [
          {
            name: "Overhead Press",
            sets: "3",
            reps: "8-10",
            notes: "Press straight up, engage core throughout",
            videoId: "overhead-press-tutorial",
            muscleGroups: ["Shoulders", "Triceps", "Core"],
          },
          {
            name: "Barbell Rows",
            sets: "3",
            reps: "8-10",
            notes: "Pull to lower chest, control the weight",
            videoId: "barbell-rows-tutorial",
            muscleGroups: ["Lats", "Rhomboids", "Rear Delts"],
          },
          {
            name: "Dips",
            sets: "3",
            reps: "10-15",
            notes: "Lean forward slightly for chest emphasis",
            videoId: "dips-tutorial",
            muscleGroups: ["Chest", "Triceps", "Front Delts"],
          },
          {
            name: "Romanian Deadlifts",
            sets: "3",
            reps: "10-12",
            notes: "Feel the stretch in hamstrings, control the descent",
            videoId: "rdl-tutorial",
            muscleGroups: ["Hamstrings", "Glutes", "Lower Back"],
          },
        ],
      },
    ],
    progressionPlan: {
      weeks1to4:
        "Focus on form and establishing baseline strength. Increase weight by 2.5-5lbs when you can complete all sets with perfect form.",
      weeks5to8:
        "Increase intensity. Add weight more aggressively and consider adding extra sets to lagging muscle groups.",
      weeks9to12:
        "Peak phase. Focus on personal records while maintaining perfect form. Consider deload week every 4th week.",
    },
    equipment: ["Barbell", "Dumbbells", "Pull-up Bar", "Bench", "Squat Rack"],
    benefits: ["Time Efficient", "Great for Beginners", "High Frequency", "Full Body Development"],
  },
  // Add more workout details as needed...
}

export default function WorkoutDetailPage() {
  const params = useParams()
  const splitId = params.split as string
  const workoutId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const workout = workoutDetails[workoutId]

  if (!workout) {
    return (
      <div className="bg-background py-12">
        <Navigation />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Workout Program Not Found</h1>
          <p className="text-muted-foreground mb-6">The workout program you're looking for doesn't exist.</p>
          <Link href="/workouts">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workouts
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-12">
      <Navigation />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/workouts">
            <Button variant="ghost">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workouts
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={workout.image || "/placeholder.svg"}
                      alt={workout.title}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">{workout.title}</h1>
                        <p className="text-lg text-muted-foreground mb-2">{workout.description}</p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{workout.rating}</span>
                          <span className="text-muted-foreground">({workout.reviews} reviews)</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {workout.frequency}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {workout.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Target className="w-4 h-4" />
                        {workout.difficulty}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {workout.author}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {workout.views} views
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {workout.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Card */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Start Training</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Begin Program
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  Save Program
                </Button>
                <div className="pt-4 border-t space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Equipment Needed:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workout.equipment.map((item: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="exercises">Exercise Library</TabsTrigger>
            <TabsTrigger value="progression">Progression</TabsTrigger>
            <TabsTrigger value="videos">Workout Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">{workout.overview}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Duration</div>
                    <div className="text-sm text-muted-foreground">{workout.duration}</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Frequency</div>
                    <div className="text-sm text-muted-foreground">{workout.frequency}</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-semibold">Level</div>
                    <div className="text-sm text-muted-foreground">{workout.difficulty}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <div className="space-y-4">
              {workout.weeklySchedule.map((day: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{day.day}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{day.duration}</span>
                        <span>{day.focus}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="p-3 bg-muted/30 rounded text-sm font-medium">{day.workout}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <div className="space-y-6">
              {workout.exerciseLibrary.map((group: any, groupIndex: number) => (
                <Card key={groupIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {groupIndex + 1}
                      </span>
                      {group.name}
                    </CardTitle>
                    <CardDescription>{group.exercises.length} exercises in this category</CardDescription>
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
                            <div className="flex flex-wrap gap-1 mt-2">
                              {exercise.muscleGroups.map((muscle: string, muscleIndex: number) => (
                                <Badge key={muscleIndex} variant="outline" className="text-xs">
                                  {muscle}
                                </Badge>
                              ))}
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
            </div>
          </TabsContent>

          <TabsContent value="progression" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Progression Plan</CardTitle>
                <CardDescription>How to advance through this program for maximum results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Weeks 1-4: Foundation Phase</h4>
                  <p className="text-muted-foreground">{workout.progressionPlan.weeks1to4}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Weeks 5-8: Development Phase</h4>
                  <p className="text-muted-foreground">{workout.progressionPlan.weeks5to8}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Weeks 9-12: Peak Phase</h4>
                  <p className="text-muted-foreground">{workout.progressionPlan.weeks9to12}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Workout Videos</CardTitle>
                <CardDescription>Complete video tutorials for each workout session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Play className="h-12 w-12 mx-auto mb-4" />
                  <p>Workout video library coming soon!</p>
                  <p className="text-sm">Full workout demonstrations and follow-along videos</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Video Modal */}
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
    </div>
  )
}
