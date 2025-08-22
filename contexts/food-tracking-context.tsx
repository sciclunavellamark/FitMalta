"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
}

export interface LoggedFood extends FoodItem {
  quantity: number
  loggedAt: Date
}

export interface DailyLog {
  date: string // YYYY-MM-DD format
  foods: LoggedFood[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

interface FoodTrackingContextType {
  dailyLogs: DailyLog[]
  currentDate: string
  getCurrentDayLog: () => DailyLog
  addFoodToDay: (food: FoodItem, quantity: number, date?: string) => void
  removeFoodFromDay: (foodId: string, date?: string) => void
  setCurrentDate: (date: string) => void
  getDayLog: (date: string) => DailyLog | undefined
  getCalendarData: () => { date: string; totalCalories: number; hasData: boolean }[]
}

const FoodTrackingContext = createContext<FoodTrackingContextType | undefined>(undefined)

export function FoodTrackingProvider({ children }: { children: React.ReactNode }) {
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0])

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gym-app-food-logs")
    if (saved) {
      try {
        const parsedLogs = JSON.parse(saved).map((log: any) => ({
          ...log,
          foods: log.foods.map((food: any) => ({
            ...food,
            loggedAt: new Date(food.loggedAt),
          })),
        }))
        setDailyLogs(parsedLogs)
      } catch (error) {
        console.error("Error loading food logs:", error)
      }
    }
  }, [])

  // Save to localStorage whenever dailyLogs changes
  useEffect(() => {
    localStorage.setItem("gym-app-food-logs", JSON.stringify(dailyLogs))
  }, [dailyLogs])

  const getCurrentDayLog = (): DailyLog => {
    return getDayLog(currentDate) || createEmptyDayLog(currentDate)
  }

  const getDayLog = (date: string): DailyLog | undefined => {
    return dailyLogs.find((log) => log.date === date)
  }

  const createEmptyDayLog = (date: string): DailyLog => {
    return {
      date,
      foods: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    }
  }

  const calculateTotals = (foods: LoggedFood[]) => {
    return foods.reduce(
      (totals, food) => ({
        totalCalories: totals.totalCalories + food.calories * food.quantity,
        totalProtein: totals.totalProtein + food.protein * food.quantity,
        totalCarbs: totals.totalCarbs + food.carbs * food.quantity,
        totalFat: totals.totalFat + food.fat * food.quantity,
      }),
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 },
    )
  }

  const addFoodToDay = (food: FoodItem, quantity: number, date: string = currentDate) => {
    setDailyLogs((prev) => {
      const existingLogIndex = prev.findIndex((log) => log.date === date)
      const loggedFood: LoggedFood = { ...food, quantity, loggedAt: new Date() }

      if (existingLogIndex >= 0) {
        const updatedLog = { ...prev[existingLogIndex] }
        updatedLog.foods = [...updatedLog.foods, loggedFood]
        const totals = calculateTotals(updatedLog.foods)
        updatedLog.totalCalories = totals.totalCalories
        updatedLog.totalProtein = totals.totalProtein
        updatedLog.totalCarbs = totals.totalCarbs
        updatedLog.totalFat = totals.totalFat

        const newLogs = [...prev]
        newLogs[existingLogIndex] = updatedLog
        return newLogs
      } else {
        const newLog: DailyLog = {
          date,
          foods: [loggedFood],
          ...calculateTotals([loggedFood]),
        }
        return [...prev, newLog].sort((a, b) => b.date.localeCompare(a.date))
      }
    })
  }

  const removeFoodFromDay = (foodId: string, date: string = currentDate) => {
    setDailyLogs((prev) => {
      const existingLogIndex = prev.findIndex((log) => log.date === date)
      if (existingLogIndex >= 0) {
        const updatedLog = { ...prev[existingLogIndex] }
        updatedLog.foods = updatedLog.foods.filter((food) => food.id !== foodId)
        const totals = calculateTotals(updatedLog.foods)
        updatedLog.totalCalories = totals.totalCalories
        updatedLog.totalProtein = totals.totalProtein
        updatedLog.totalCarbs = totals.totalCarbs
        updatedLog.totalFat = totals.totalFat

        const newLogs = [...prev]
        newLogs[existingLogIndex] = updatedLog
        return newLogs
      }
      return prev
    })
  }

  const getCalendarData = () => {
    const today = new Date()
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    const calendarData = []

    for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0]
      const dayLog = getDayLog(dateString)
      calendarData.push({
        date: dateString,
        totalCalories: dayLog?.totalCalories || 0,
        hasData: !!dayLog && dayLog.foods.length > 0,
      })
    }

    return calendarData
  }

  return (
    <FoodTrackingContext.Provider
      value={{
        dailyLogs,
        currentDate,
        getCurrentDayLog,
        addFoodToDay,
        removeFoodFromDay,
        setCurrentDate,
        getDayLog,
        getCalendarData,
      }}
    >
      {children}
    </FoodTrackingContext.Provider>
  )
}

export function useFoodTracking() {
  const context = useContext(FoodTrackingContext)
  if (context === undefined) {
    throw new Error("useFoodTracking must be used within a FoodTrackingProvider")
  }
  return context
}
