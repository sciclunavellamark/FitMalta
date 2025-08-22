"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface SavedItem {
  id: string
  type: "meal-plan" | "workout"
  category: string // bulk/cut for meal plans, split type for workouts
  title: string
  description: string
  image: string
  calories?: number
  protein?: number
  duration?: string
  difficulty?: string
  rating?: number
  savedAt: Date
}

interface FavoritesContextType {
  savedItems: SavedItem[]
  addToFavorites: (item: SavedItem) => void
  removeFromFavorites: (id: string, type: "meal-plan" | "workout") => void
  isFavorite: (id: string, type: "meal-plan" | "workout") => boolean
  getSavedMealPlans: () => SavedItem[]
  getSavedWorkouts: () => SavedItem[]
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([])

  // Load saved items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gym-app-favorites")
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved).map((item: any) => ({
          ...item,
          savedAt: new Date(item.savedAt),
        }))
        setSavedItems(parsedItems)
      } catch (error) {
        console.error("Error loading saved items:", error)
      }
    }
  }, [])

  // Save to localStorage whenever savedItems changes
  useEffect(() => {
    localStorage.setItem("gym-app-favorites", JSON.stringify(savedItems))
  }, [savedItems])

  const addToFavorites = (item: SavedItem) => {
    setSavedItems((prev) => {
      const exists = prev.find((saved) => saved.id === item.id && saved.type === item.type)
      if (exists) return prev
      return [...prev, { ...item, savedAt: new Date() }]
    })
  }

  const removeFromFavorites = (id: string, type: "meal-plan" | "workout") => {
    setSavedItems((prev) => prev.filter((item) => !(item.id === id && item.type === type)))
  }

  const isFavorite = (id: string, type: "meal-plan" | "workout") => {
    return savedItems.some((item) => item.id === id && item.type === type)
  }

  const getSavedMealPlans = () => {
    return savedItems
      .filter((item) => item.type === "meal-plan")
      .sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime())
  }

  const getSavedWorkouts = () => {
    return savedItems
      .filter((item) => item.type === "workout")
      .sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime())
  }

  return (
    <FavoritesContext.Provider
      value={{
        savedItems,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getSavedMealPlans,
        getSavedWorkouts,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
