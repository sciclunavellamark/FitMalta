"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Dumbbell, TrendingUp, Calendar } from "lucide-react"
import Link from "next/link"

export default function TrackerPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In Required</CardTitle>
              <CardDescription>Please sign in to access your personal tracking features</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/account">
                <Button className="w-full">Sign In to Continue</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Tracker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your nutrition and workouts to achieve your fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Food Tracker Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Apple className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl">Food Tracker</CardTitle>
              <CardDescription className="text-base">
                Log your daily meals and track calories, macros, and nutritional goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">Track calories and macronutrients</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">View daily and historical data</span>
                </div>
                <div className="flex items-center gap-3">
                  <Apple className="w-5 h-5 text-orange-600" />
                  <span className="text-sm">Searchable food database</span>
                </div>
              </div>
              <Link href="/food-tracker" className="block">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Start Food Tracking</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Workout Tracker Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Dumbbell className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Workout Tracker</CardTitle>
              <CardDescription className="text-base">
                Log your workouts, track sets, reps, and monitor your strength progression
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Track sets, reps, and weight</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Monitor workout frequency</span>
                </div>
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Progress tracking over time</span>
                </div>
              </div>
              <Link href="/workout-tracker" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Workout Tracking</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
