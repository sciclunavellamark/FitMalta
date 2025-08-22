"use client"

import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Dumbbell, TrendingUp, Calendar, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function TrackerPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
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
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Tracker</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Track your nutrition and workouts to achieve your fitness goals with our comprehensive tracking tools
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

          <div className="mt-16 bg-muted/30 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Track Your Progress?</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Consistent tracking is the key to achieving your fitness goals. Our comprehensive tracking tools help
                you stay accountable and make data-driven decisions about your health and fitness journey.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Goal Achievement</h3>
                <p className="text-sm text-muted-foreground">
                  Set and track specific fitness and nutrition goals with measurable progress indicators.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Data Insights</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze trends and patterns in your nutrition and workout data to optimize your routine.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Continuous Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  Make informed adjustments to your diet and training based on real performance data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
