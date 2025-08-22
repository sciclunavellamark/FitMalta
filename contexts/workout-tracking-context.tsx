"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Exercise {
  id: string
  name: string
  muscleGroup: string
  equipment: string
}

export interface WorkoutSet {
  id: string
  exerciseId: string
  exerciseName: string
  reps: number
  weight: number
  restTime?: number
  notes?: string
  completedAt: Date
}

export interface WorkoutSession {
  id: string
  date: string // YYYY-MM-DD format
  name: string
  duration: number // in minutes
  sets: WorkoutSet[]
  notes?: string
  startedAt: Date
  completedAt: Date
}

interface WorkoutTrackingContextType {
  workoutSessions: WorkoutSession[]
  currentDate: string
  getCurrentDaySession: () => WorkoutSession | undefined
  startWorkoutSession: (name: string, date?: string) => string
  addSetToSession: (sessionId: string, set: Omit<WorkoutSet, "id" | "completedAt">) => void
  removeSetFromSession: (sessionId: string, setId: string) => void
  completeWorkoutSession: (sessionId: string, notes?: string) => void
  setCurrentDate: (date: string) => void
  getSessionByDate: (date: string) => WorkoutSession | undefined
  getCalendarData: () => { date: string; hasWorkout: boolean; sessionName?: string }[]
  getExerciseHistory: (exerciseId: string) => WorkoutSet[]
}

const WorkoutTrackingContext = createContext<WorkoutTrackingContextType | undefined>(undefined)

export function WorkoutTrackingProvider({ children }: { children: React.ReactNode }) {
  const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([])
  const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split("T")[0])

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gym-app-workout-sessions")
    if (saved) {
      try {
        const parsedSessions = JSON.parse(saved).map((session: any) => ({
          ...session,
          startedAt: new Date(session.startedAt),
          completedAt: new Date(session.completedAt),
          sets: session.sets.map((set: any) => ({
            ...set,
            completedAt: new Date(set.completedAt),
          })),
        }))
        setWorkoutSessions(parsedSessions)
      } catch (error) {
        console.error("Error loading workout sessions:", error)
      }
    }
  }, [])

  // Save to localStorage whenever workoutSessions changes
  useEffect(() => {
    localStorage.setItem("gym-app-workout-sessions", JSON.stringify(workoutSessions))
  }, [workoutSessions])

  const getCurrentDaySession = (): WorkoutSession | undefined => {
    return getSessionByDate(currentDate)
  }

  const getSessionByDate = (date: string): WorkoutSession | undefined => {
    return workoutSessions.find((session) => session.date === date)
  }

  const startWorkoutSession = (name: string, date: string = currentDate): string => {
    const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newSession: WorkoutSession = {
      id: sessionId,
      date,
      name,
      duration: 0,
      sets: [],
      startedAt: new Date(),
      completedAt: new Date(), // Will be updated when completed
    }

    setWorkoutSessions((prev) => [...prev, newSession].sort((a, b) => b.date.localeCompare(a.date)))
    return sessionId
  }

  const addSetToSession = (sessionId: string, set: Omit<WorkoutSet, "id" | "completedAt">) => {
    const setId = `set-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newSet: WorkoutSet = {
      ...set,
      id: setId,
      completedAt: new Date(),
    }

    setWorkoutSessions((prev) =>
      prev.map((session) => (session.id === sessionId ? { ...session, sets: [...session.sets, newSet] } : session)),
    )
  }

  const removeSetFromSession = (sessionId: string, setId: string) => {
    setWorkoutSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId ? { ...session, sets: session.sets.filter((set) => set.id !== setId) } : session,
      ),
    )
  }

  const completeWorkoutSession = (sessionId: string, notes?: string) => {
    setWorkoutSessions((prev) =>
      prev.map((session) => {
        if (session.id === sessionId) {
          const completedAt = new Date()
          const duration = Math.round((completedAt.getTime() - session.startedAt.getTime()) / (1000 * 60))
          return {
            ...session,
            duration,
            notes,
            completedAt,
          }
        }
        return session
      }),
    )
  }

  const getCalendarData = () => {
    const today = new Date()
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    const calendarData = []

    for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0]
      const session = getSessionByDate(dateString)
      calendarData.push({
        date: dateString,
        hasWorkout: !!session && session.sets.length > 0,
        sessionName: session?.name,
      })
    }

    return calendarData
  }

  const getExerciseHistory = (exerciseId: string): WorkoutSet[] => {
    const allSets = workoutSessions.flatMap((session) => session.sets)
    return allSets
      .filter((set) => set.exerciseId === exerciseId)
      .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
  }

  return (
    <WorkoutTrackingContext.Provider
      value={{
        workoutSessions,
        currentDate,
        getCurrentDaySession,
        startWorkoutSession,
        addSetToSession,
        removeSetFromSession,
        completeWorkoutSession,
        setCurrentDate,
        getSessionByDate,
        getCalendarData,
        getExerciseHistory,
      }}
    >
      {children}
    </WorkoutTrackingContext.Provider>
  )
}

export function useWorkoutTracking() {
  const context = useContext(WorkoutTrackingContext)
  if (context === undefined) {
    throw new Error("useWorkoutTracking must be used within a WorkoutTrackingProvider")
  }
  return context
}
