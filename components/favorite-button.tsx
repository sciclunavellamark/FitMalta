"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites, type SavedItem } from "@/contexts/favorites-context"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface FavoriteButtonProps {
  item: SavedItem
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function FavoriteButton({ item, variant = "outline", size = "icon", className }: FavoriteButtonProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const { user, setReturnTo } = useAuth()
  const pathname = usePathname()
  const isCurrentlyFavorite = isFavorite(item.id, item.type)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if button is inside a link
    e.stopPropagation()

    if (!user) {
      setReturnTo(pathname)
      window.location.href = "/account"
      return
    }

    if (isCurrentlyFavorite) {
      removeFromFavorites(item.id, item.type)
    } else {
      addToFavorites(item)
    }
  }

  if (!user) {
    return (
      <Link href="/account" onClick={() => setReturnTo(pathname)}>
        <Button variant={variant} size={size} className={cn("transition-colors", className)}>
          <Heart className="h-4 w-4" />
        </Button>
      </Link>
    )
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleFavorite}
      className={cn("transition-colors", isCurrentlyFavorite && "text-red-500 hover:text-red-600", className)}
    >
      <Heart className={cn("h-4 w-4", isCurrentlyFavorite && "fill-current")} />
    </Button>
  )
}
