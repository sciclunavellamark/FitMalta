"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, Shield, LogOut, ShoppingBag, ChevronDown, Utensils, Dumbbell } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function AccountDropdown() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <Link href="/account">
        <Button className="bg-primary hover:bg-primary/90">
          <User className="h-4 w-4 mr-2" />
          Account
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <User className="h-4 w-4 mr-2" />
          {user.name}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/account/details" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Account Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/security" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/purchases" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            My Purchases
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Add Content</DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <Link href="/account/add-meal-plan" className="flex items-center">
            <Utensils className="mr-2 h-4 w-4" />
            Add Meal Plan
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/account/add-workout" className="flex items-center">
            <Dumbbell className="mr-2 h-4 w-4" />
            Add Workout
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
