"use client"

import { useState } from "react"
import { useAuth, UserType } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Utensils, Dumbbell, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function AddContentPage() {
  const { user, isUserType } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  if (
    !isUserType(UserType.PERSONAL_TRAINER) &&
    !isUserType(UserType.GYM) &&
    !isUserType(UserType.ADMIN) &&
    !isUserType(UserType.SUPER_ADMIN)
  ) {
    return (
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            This page is only available for Personal Trainers, Gym Owners, and Administrators.
          </p>
          <Link href="/account">
            <Button>Back to Account</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/account">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Account
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Content</h1>
          <p className="text-muted-foreground">
            Share your expertise by creating meal plans and workout programs for the community
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab("meal-plans")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle>Create Meal Plan</CardTitle>
                      <CardDescription>Design nutrition programs for different goals</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Help users achieve their nutrition goals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>15-30 minutes to create</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Meal Plan
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActiveTab("workouts")}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Create Workout</CardTitle>
                      <CardDescription>Build training programs for all fitness levels</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Share your training expertise</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>20-45 minutes to create</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workout
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Content Guidelines</CardTitle>
                <CardDescription>Please follow these guidelines when creating content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Quality Standards</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Provide clear, detailed instructions</li>
                      <li>• Include proper form cues and safety tips</li>
                      <li>• Use appropriate difficulty levels</li>
                      <li>• Add nutritional information for meal plans</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Content Policy</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Original content only</li>
                      <li>• No medical claims without credentials</li>
                      <li>• Respectful and inclusive language</li>
                      <li>• Proper attribution for sources</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meal-plans" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Meal Plan Creator
                </CardTitle>
                <CardDescription>Create comprehensive meal plans for different fitness goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Utensils className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Meal Plan Creator</h3>
                  <p className="text-muted-foreground mb-6">
                    This feature is coming soon. You'll be able to create detailed meal plans with recipes, nutritional
                    information, and shopping lists.
                  </p>
                  <Button disabled>
                    <Plus className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workouts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  Workout Creator
                </CardTitle>
                <CardDescription>Design workout programs for different fitness levels and goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Workout Creator</h3>
                  <p className="text-muted-foreground mb-6">
                    This feature is coming soon. You'll be able to create detailed workout programs with exercises,
                    sets, reps, and progression plans.
                  </p>
                  <Button disabled>
                    <Plus className="w-4 h-4 mr-2" />
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
