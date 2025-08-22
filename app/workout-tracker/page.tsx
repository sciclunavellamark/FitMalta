"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useWorkoutTracking, type Exercise } from "@/contexts/workout-tracking-context"
import { Calendar, Plus, Dumbbell, Trash2, Play, Square, ChevronLeft, ChevronRight, Weight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock exercise database
const exerciseDatabase: Exercise[] = [
  { id: "1", name: "Bench Press", muscleGroup: "Chest", equipment: "Barbell" },
  { id: "2", name: "Squat", muscleGroup: "Legs", equipment: "Barbell" },
  { id: "3", name: "Deadlift", muscleGroup: "Back", equipment: "Barbell" },
  { id: "4", name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell" },
  { id: "5", name: "Barbell Row", muscleGroup: "Back", equipment: "Barbell" },
  { id: "6", name: "Dumbbell Curl", muscleGroup: "Arms", equipment: "Dumbbells" },
  { id: "7", name: "Tricep Dips", muscleGroup: "Arms", equipment: "Bodyweight" },
  { id: "8", name: "Pull-ups", muscleGroup: "Back", equipment: "Bodyweight" },
  { id: "9", name: "Push-ups", muscleGroup: "Chest", equipment: "Bodyweight" },
  { id: "10", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine" },
]

export default function WorkoutTrackerPage() {
  const {
    getCurrentDaySession,
    startWorkoutSession,
    addSetToSession,
    removeSetFromSession,
    completeWorkoutSession,
    currentDate,
    setCurrentDate,
    getCalendarData,
    getExerciseHistory,
  } = useWorkoutTracking()

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [reps, setReps] = useState("")
  const [weight, setWeight] = useState("")
  const [notes, setNotes] = useState("")
  const [workoutName, setWorkoutName] = useState("")
  const [isAddSetOpen, setIsAddSetOpen] = useState(false)
  const [isStartWorkoutOpen, setIsStartWorkoutOpen] = useState(false)
  const [sessionNotes, setSessionNotes] = useState("")

  const currentSession = getCurrentDaySession()
  const calendarData = getCalendarData()

  const handleStartWorkout = () => {
    if (workoutName.trim()) {
      startWorkoutSession(workoutName.trim())
      setWorkoutName("")
      setIsStartWorkoutOpen(false)
    }
  }

  const handleAddSet = () => {
    if (selectedExercise && reps && weight && currentSession) {
      addSetToSession(currentSession.id, {
        exerciseId: selectedExercise.id,
        exerciseName: selectedExercise.name,
        reps: Number.parseInt(reps),
        weight: Number.parseFloat(weight),
        notes: notes.trim() || undefined,
      })
      setReps("")
      setWeight("")
      setNotes("")
      setSelectedExercise(null)
      setIsAddSetOpen(false)
    }
  }

  const handleCompleteWorkout = () => {
    if (currentSession) {
      completeWorkoutSession(currentSession.id, sessionNotes.trim() || undefined)
      setSessionNotes("")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const current = new Date(currentDate)
    const newDate = new Date(current)
    newDate.setDate(current.getDate() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate.toISOString().split("T")[0])
  }

  const groupSetsByExercise = () => {
    if (!currentSession) return {}
    return currentSession.sets.reduce(
      (groups, set) => {
        if (!groups[set.exerciseId]) {
          groups[set.exerciseId] = {
            exerciseName: set.exerciseName,
            sets: [],
          }
        }
        groups[set.exerciseId].sets.push(set)
        return groups
      },
      {} as Record<string, { exerciseName: string; sets: typeof currentSession.sets }>,
    )
  }

  const exerciseGroups = groupSetsByExercise()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Workout Tracker</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Track your workouts, log sets and reps, and monitor your strength progression over time.
            </p>
          </div>

          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="today">Today's Workout</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Workout Session */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Date Navigation */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <CardTitle className="text-xl">{formatDate(currentDate)}</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigateDate("next")}
                          disabled={currentDate >= new Date().toISOString().split("T")[0]}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Start/Continue Workout */}
                  {!currentSession ? (
                    <Dialog open={isStartWorkoutOpen} onOpenChange={setIsStartWorkoutOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full" size="lg">
                          <Play className="h-4 w-4 mr-2" />
                          Start Workout
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Start New Workout</DialogTitle>
                          <DialogDescription>Give your workout session a name</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="workout-name">Workout Name</Label>
                            <Input
                              id="workout-name"
                              placeholder="e.g., Push Day, Leg Day, Full Body"
                              value={workoutName}
                              onChange={(e) => setWorkoutName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <Button onClick={handleStartWorkout} className="w-full" disabled={!workoutName.trim()}>
                            Start Workout
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <Play className="h-5 w-5 text-green-500" />
                              {currentSession.name}
                            </CardTitle>
                            <CardDescription>
                              {currentSession.sets.length} sets completed •{" "}
                              {Math.round((new Date().getTime() - currentSession.startedAt.getTime()) / (1000 * 60))}{" "}
                              minutes
                            </CardDescription>
                          </div>
                          <Button variant="outline" onClick={handleCompleteWorkout}>
                            <Square className="h-4 w-4 mr-2" />
                            Finish
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  )}

                  {/* Add Set Button */}
                  {currentSession && (
                    <Dialog open={isAddSetOpen} onOpenChange={setIsAddSetOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Set
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add Set</DialogTitle>
                          <DialogDescription>Log your exercise, reps, and weight</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div>
                            <Label>Select Exercise</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 max-h-60 overflow-y-auto">
                              {exerciseDatabase.map((exercise) => (
                                <div
                                  key={exercise.id}
                                  className={cn(
                                    "p-3 border rounded-lg cursor-pointer transition-colors",
                                    selectedExercise?.id === exercise.id
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50",
                                  )}
                                  onClick={() => setSelectedExercise(exercise)}
                                >
                                  <div className="font-medium">{exercise.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {exercise.muscleGroup} • {exercise.equipment}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {selectedExercise && (
                            <div className="space-y-4 pt-4 border-t">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="reps">Reps</Label>
                                  <Input
                                    id="reps"
                                    type="number"
                                    value={reps}
                                    onChange={(e) => setReps(e.target.value)}
                                    min="1"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="weight">Weight (kg)</Label>
                                  <Input
                                    id="weight"
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    min="0"
                                    step="0.5"
                                    className="mt-1"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="notes">Notes (optional)</Label>
                                <Textarea
                                  id="notes"
                                  value={notes}
                                  onChange={(e) => setNotes(e.target.value)}
                                  placeholder="Form notes, difficulty, etc."
                                  className="mt-1"
                                />
                              </div>
                              <Button onClick={handleAddSet} className="w-full" disabled={!reps || !weight}>
                                Add Set
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {/* Exercise Groups */}
                  {currentSession && Object.keys(exerciseGroups).length > 0 && (
                    <div className="space-y-4">
                      {Object.entries(exerciseGroups).map(([exerciseId, group]) => (
                        <Card key={exerciseId}>
                          <CardHeader>
                            <CardTitle className="text-lg">{group.exerciseName}</CardTitle>
                            <CardDescription>{group.sets.length} sets</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {group.sets.map((set, index) => (
                                <div
                                  key={set.id}
                                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                                >
                                  <div className="flex items-center gap-4">
                                    <Badge variant="secondary">Set {index + 1}</Badge>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Weight className="h-4 w-4" />
                                      <span>{set.weight}kg</span>
                                      <span>×</span>
                                      <span>{set.reps} reps</span>
                                    </div>
                                    {set.notes && <div className="text-sm text-muted-foreground">"{set.notes}"</div>}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSetFromSession(currentSession.id, set.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Session Notes */}
                  {currentSession && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Session Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea
                          value={sessionNotes}
                          onChange={(e) => setSessionNotes(e.target.value)}
                          placeholder="How did the workout feel? Any observations?"
                          rows={3}
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Session Summary */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Session Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentSession ? (
                        <>
                          <div className="text-center p-4 bg-primary/10 rounded-lg">
                            <div className="text-3xl font-bold text-primary">{currentSession.sets.length}</div>
                            <div className="text-sm text-muted-foreground">Total Sets</div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-center">
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <div className="font-bold text-primary">
                                {Math.round((new Date().getTime() - currentSession.startedAt.getTime()) / (1000 * 60))}
                              </div>
                              <div className="text-xs text-muted-foreground">Minutes</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <div className="font-bold text-primary">
                                {new Set(currentSession.sets.map((s) => s.exerciseId)).size}
                              </div>
                              <div className="text-xs text-muted-foreground">Exercises</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Dumbbell className="h-12 w-12 mx-auto mb-4" />
                          <p>No workout started</p>
                          <p className="text-sm">Start a workout to see your progress</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Workout Calendar
                  </CardTitle>
                  <CardDescription>View your workout history over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    {calendarData.map((day) => {
                      const date = new Date(day.date)
                      const isToday = day.date === new Date().toISOString().split("T")[0]
                      const isCurrentDate = day.date === currentDate

                      return (
                        <button
                          key={day.date}
                          onClick={() => setCurrentDate(day.date)}
                          className={cn(
                            "p-2 text-sm rounded-lg transition-colors min-h-[60px] flex flex-col items-center justify-center",
                            isCurrentDate && "ring-2 ring-primary",
                            isToday && "bg-primary text-primary-foreground",
                            !isToday && day.hasWorkout && "bg-green-100 text-green-800 hover:bg-green-200",
                            !isToday && !day.hasWorkout && "hover:bg-muted",
                            !isToday && !day.hasWorkout && "text-muted-foreground",
                          )}
                        >
                          <div className="font-medium">{date.getDate()}</div>
                          {day.hasWorkout && (
                            <div className="text-xs truncate w-full text-center">{day.sessionName}</div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-primary rounded"></div>
                      <span>Today</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
                      <span>Workout completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <span>No workout</span>
                    </div>
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
