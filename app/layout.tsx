import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { FoodTrackingProvider } from "@/contexts/food-tracking-context"
import { WorkoutTrackingProvider } from "@/contexts/workout-tracking-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Malta Gym Hub",
  description: "Your complete fitness companion for Malta - workouts, meal plans, gyms, and more",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <FoodTrackingProvider>
              <WorkoutTrackingProvider>{children}</WorkoutTrackingProvider>
            </FoodTrackingProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
