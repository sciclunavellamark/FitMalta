"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { useFoodTracking, type FoodItem } from "@/contexts/food-tracking-context"
import { Calendar, Plus, Utensils, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock food database
const foodDatabase: FoodItem[] = [
  { id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  { id: "2", name: "Brown Rice", calories: 112, protein: 2.6, carbs: 23, fat: 0.9, serving: "100g" },
  { id: "3", name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, serving: "100g" },
  { id: "4", name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  { id: "5", name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, serving: "100g" },
  { id: "6", name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, serving: "100g" },
  { id: "7", name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 50, serving: "100g" },
  { id: "8", name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3, serving: "1 medium" },
  { id: "9", name: "Oatmeal", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, serving: "100g" },
  { id: "10", name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: "2 large" },
]

export default function FoodTrackerPage() {
  const { getCurrentDayLog, addFoodToDay, removeFoodFromDay, currentDate, setCurrentDate, getCalendarData } =
    useFoodTracking()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [quantity, setQuantity] = useState("1")
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false)

  const currentLog = getCurrentDayLog()
  const calendarData = getCalendarData()

  const filteredFoods = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddFood = () => {
    if (selectedFood && quantity) {
      addFoodToDay(selectedFood, Number.parseFloat(quantity))
      setSelectedFood(null)
      setQuantity("1")
      setIsAddFoodOpen(false)
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Utensils className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Food Tracker</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Track your daily food intake and monitor your nutritional goals. Log meals and view your progress over
              time.
            </p>
          </div>

          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="today">Today's Log</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Summary */}
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

                  {/* Add Food Button */}
                  <Dialog open={isAddFoodOpen} onOpenChange={setIsAddFoodOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Food
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Food to Log</DialogTitle>
                        <DialogDescription>Search for foods and add them to your daily log</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search foods..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {filteredFoods.map((food) => (
                            <div
                              key={food.id}
                              className={cn(
                                "p-3 border rounded-lg cursor-pointer transition-colors",
                                selectedFood?.id === food.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50",
                              )}
                              onClick={() => setSelectedFood(food)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{food.name}</h4>
                                  <p className="text-sm text-muted-foreground">per {food.serving}</p>
                                </div>
                                <div className="text-right text-sm">
                                  <div className="font-medium">{food.calories} cal</div>
                                  <div className="text-muted-foreground">
                                    P: {food.protein}g C: {food.carbs}g F: {food.fat}g
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {selectedFood && (
                          <div className="space-y-4 pt-4 border-t">
                            <div>
                              <Label htmlFor="quantity">Quantity</Label>
                              <Input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="0.1"
                                step="0.1"
                                className="mt-1"
                              />
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <h4 className="font-medium mb-2">Nutritional Info (x{quantity})</h4>
                              <div className="grid grid-cols-4 gap-4 text-sm">
                                <div className="text-center">
                                  <div className="font-bold text-primary">
                                    {Math.round(selectedFood.calories * Number.parseFloat(quantity || "0"))}
                                  </div>
                                  <div className="text-muted-foreground">Calories</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold text-primary">
                                    {Math.round(selectedFood.protein * Number.parseFloat(quantity || "0") * 10) / 10}g
                                  </div>
                                  <div className="text-muted-foreground">Protein</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold text-primary">
                                    {Math.round(selectedFood.carbs * Number.parseFloat(quantity || "0") * 10) / 10}g
                                  </div>
                                  <div className="text-muted-foreground">Carbs</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-bold text-primary">
                                    {Math.round(selectedFood.fat * Number.parseFloat(quantity || "0") * 10) / 10}g
                                  </div>
                                  <div className="text-muted-foreground">Fat</div>
                                </div>
                              </div>
                            </div>
                            <Button onClick={handleAddFood} className="w-full">
                              Add to Log
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Food Log */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Food Log</CardTitle>
                      <CardDescription>{currentLog.foods.length} items logged</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {currentLog.foods.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Utensils className="h-12 w-12 mx-auto mb-4" />
                          <p>No foods logged for this day</p>
                          <p className="text-sm">Add your first meal to get started</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {currentLog.foods.map((food, index) => (
                            <div
                              key={`${food.id}-${index}`}
                              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                            >
                              <div className="flex-1">
                                <h4 className="font-medium">{food.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {food.quantity} x {food.serving} • {Math.round(food.calories * food.quantity)} cal
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right text-sm">
                                  <div className="text-muted-foreground">
                                    P: {Math.round(food.protein * food.quantity * 10) / 10}g • C:{" "}
                                    {Math.round(food.carbs * food.quantity * 10) / 10}g • F:{" "}
                                    {Math.round(food.fat * food.quantity * 10) / 10}g
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => removeFoodFromDay(food.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Daily Totals */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Totals</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-primary/10 rounded-lg">
                        <div className="text-3xl font-bold text-primary">{Math.round(currentLog.totalCalories)}</div>
                        <div className="text-sm text-muted-foreground">Total Calories</div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-bold text-primary">{Math.round(currentLog.totalProtein * 10) / 10}g</div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-bold text-primary">{Math.round(currentLog.totalCarbs * 10) / 10}g</div>
                          <div className="text-xs text-muted-foreground">Carbs</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-bold text-primary">{Math.round(currentLog.totalFat * 10) / 10}g</div>
                          <div className="text-xs text-muted-foreground">Fat</div>
                        </div>
                      </div>
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
                    Food Log Calendar
                  </CardTitle>
                  <CardDescription>View your food tracking history over the past 30 days</CardDescription>
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
                            !isToday && day.hasData && "bg-green-100 text-green-800 hover:bg-green-200",
                            !isToday && !day.hasData && "hover:bg-muted",
                            !isToday && !day.hasData && "text-muted-foreground",
                          )}
                        >
                          <div className="font-medium">{date.getDate()}</div>
                          {day.hasData && (
                            <div className="text-xs">
                              {day.totalCalories > 0 ? `${Math.round(day.totalCalories)}` : ""}
                            </div>
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
                      <span>Has food logged</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <span>No data</span>
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
