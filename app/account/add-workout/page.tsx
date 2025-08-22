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
import { ArrowLeft, Plus, X, Upload, Dumbbell } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function AddWorkoutPage() {
  const { user } = useAuth()
  const [workout, setWorkout] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    duration: "",
    equipment: "",
    targetMuscles: [] as string[],
    tags: [] as string[],
    exercises: [] as any[],
  })
  const [newTag, setNewTag] = useState("")
  const [newMuscle, setNewMuscle] = useState("")
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
    rest: "",
    instructions: "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
              <p className="text-muted-foreground mb-6">You need to be signed in to create workouts.</p>
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
    if (newTag.trim() && !workout.tags.includes(newTag.trim())) {
      setWorkout({ ...workout, tags: [...workout.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setWorkout({ ...workout, tags: workout.tags.filter((tag) => tag !== tagToRemove) })
  }

  const addMuscle = () => {
    if (newMuscle.trim() && !workout.targetMuscles.includes(newMuscle.trim())) {
      setWorkout({ ...workout, targetMuscles: [...workout.targetMuscles, newMuscle.trim()] })
      setNewMuscle("")
    }
  }

  const removeMuscle = (muscleToRemove: string) => {
    setWorkout({ ...workout, targetMuscles: workout.targetMuscles.filter((muscle) => muscle !== muscleToRemove) })
  }

  const addExercise = () => {
    if (newExercise.name.trim()) {
      setWorkout({ ...workout, exercises: [...workout.exercises, { ...newExercise, id: Date.now() }] })
      setNewExercise({ name: "", sets: "", reps: "", weight: "", rest: "", instructions: "" })
    }
  }

  const removeExercise = (exerciseId: number) => {
    setWorkout({ ...workout, exercises: workout.exercises.filter((exercise) => exercise.id !== exerciseId) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically submit to your backend
    console.log("Submitting workout:", workout)
    alert("Workout submitted for review!")
  }

  return (
    <div className="min-h-screen bg-background">
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
                <Dumbbell className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Create Workout</h1>
              </div>
              <p className="text-lg text-muted-foreground">Share your training expertise with the community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Workout Title</Label>
                    <Input
                      id="title"
                      value={workout.title}
                      onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
                      placeholder="e.g., Advanced Push/Pull/Legs Split"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={workout.description}
                      onChange={(e) => setWorkout({ ...workout, description: e.target.value })}
                      placeholder="Describe your workout, its benefits, and who it's for..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={workout.category}
                        onValueChange={(value) => setWorkout({ ...workout, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="strength">Strength Training</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="hiit">HIIT</SelectItem>
                          <SelectItem value="bodyweight">Bodyweight</SelectItem>
                          <SelectItem value="powerlifting">Powerlifting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={workout.difficulty}
                        onValueChange={(value) => setWorkout({ ...workout, difficulty: value })}
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
                      <Input
                        id="duration"
                        value={workout.duration}
                        onChange={(e) => setWorkout({ ...workout, duration: e.target.value })}
                        placeholder="e.g., 60 minutes"
                      />
                    </div>

                    <div>
                      <Label htmlFor="equipment">Equipment</Label>
                      <Select
                        value={workout.equipment}
                        onValueChange={(value) => setWorkout({ ...workout, equipment: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select equipment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gym">Full Gym</SelectItem>
                          <SelectItem value="home">Home Gym</SelectItem>
                          <SelectItem value="bodyweight">Bodyweight Only</SelectItem>
                          <SelectItem value="minimal">Minimal Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Target Muscles */}
              <Card>
                <CardHeader>
                  <CardTitle>Target Muscles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input
                      value={newMuscle}
                      onChange={(e) => setNewMuscle(e.target.value)}
                      placeholder="Add target muscle..."
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMuscle())}
                    />
                    <Button type="button" onClick={addMuscle}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {workout.targetMuscles.map((muscle) => (
                      <Badge key={muscle} variant="secondary" className="flex items-center gap-1">
                        {muscle}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeMuscle(muscle)} />
                      </Badge>
                    ))}
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
                    {workout.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Exercises */}
              <Card>
                <CardHeader>
                  <CardTitle>Exercises</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add New Exercise */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h4 className="font-medium">Add New Exercise</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="exercise-name">Exercise Name</Label>
                        <Input
                          id="exercise-name"
                          value={newExercise.name}
                          onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                          placeholder="e.g., Bench Press"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sets">Sets</Label>
                        <Input
                          id="sets"
                          value={newExercise.sets}
                          onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                          placeholder="e.g., 3"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reps">Reps</Label>
                        <Input
                          id="reps"
                          value={newExercise.reps}
                          onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                          placeholder="e.g., 8-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          value={newExercise.weight}
                          onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                          placeholder="e.g., 80kg or RPE 8"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rest">Rest Time</Label>
                        <Input
                          id="rest"
                          value={newExercise.rest}
                          onChange={(e) => setNewExercise({ ...newExercise, rest: e.target.value })}
                          placeholder="e.g., 2-3 minutes"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="exercise-instructions">Instructions</Label>
                      <Textarea
                        id="exercise-instructions"
                        value={newExercise.instructions}
                        onChange={(e) => setNewExercise({ ...newExercise, instructions: e.target.value })}
                        placeholder="Form cues and execution notes..."
                        rows={3}
                      />
                    </div>
                    <Button type="button" onClick={addExercise}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Exercise
                    </Button>
                  </div>

                  {/* Existing Exercises */}
                  {workout.exercises.map((exercise, index) => (
                    <div key={exercise.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">
                          {index + 1}. {exercise.name}
                        </h4>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeExercise(exercise.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground mb-2">
                        <span>
                          <strong>Sets:</strong> {exercise.sets}
                        </span>
                        <span>
                          <strong>Reps:</strong> {exercise.reps}
                        </span>
                        <span>
                          <strong>Weight:</strong> {exercise.weight}
                        </span>
                        <span>
                          <strong>Rest:</strong> {exercise.rest}
                        </span>
                      </div>
                      {exercise.instructions && (
                        <p className="text-sm">
                          <strong>Instructions:</strong> {exercise.instructions}
                        </p>
                      )}
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
