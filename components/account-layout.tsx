"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Shield, Settings, CreditCard, UserCheck, Building, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  const navigationItems = [
    { href: "/account/details", label: "Account Details", icon: User },
    { href: "/account/security", label: "Security", icon: Shield },
    { href: "/account/settings", label: "Settings", icon: Settings },
    { href: "/account/purchases", label: "My Purchases", icon: CreditCard },
  ]

  // Add role-specific navigation items
  if (user.userType === "trainer") {
    navigationItems.push({ href: "/account/profile", label: "Edit Profile", icon: UserCheck })
  }

  if (user.userType === "gym") {
    navigationItems.push({ href: "/account/profile", label: "Gym Profile", icon: Building })
  }

  if (user.userType === "admin" || user.userType === "super_admin") {
    navigationItems.push({ href: "/admin", label: "Admin Panel", icon: Users })
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-1 mb-6">
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">{user.userType.replace("_", " ")} Account</p>
                </div>

                <nav className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                      <Link key={item.href} href={item.href}>
                        <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start">
                          <Icon className="w-4 h-4 mr-2" />
                          {item.label}
                        </Button>
                      </Link>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}
