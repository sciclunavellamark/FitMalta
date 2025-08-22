"use client"

import type React from "react"
import { useState } from "react"
import { useAuth, UserType } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  LogOut,
  Mail,
  Lock,
  UserPlus,
  Settings,
  Shield,
  Edit,
  Plus,
  Building,
  Dumbbell,
  Crown,
} from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  const { user, login, register, logout, isLoading, isUserType } = useAuth()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", name: "", userType: UserType.USER })
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(loginForm.email, loginForm.password)
    if (!success) {
      setError("Invalid email or password")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await register(registerForm.email, registerForm.password, registerForm.name, registerForm.userType)
    if (!success) {
      setError("User with this email already exists")
    }
  }

  const getUserTypeIcon = (userType: UserType) => {
    switch (userType) {
      case UserType.SUPER_ADMIN:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case UserType.ADMIN:
        return <Shield className="w-5 h-5 text-red-500" />
      case UserType.PERSONAL_TRAINER:
        return <Dumbbell className="w-5 h-5 text-blue-500" />
      case UserType.GYM:
        return <Building className="w-5 h-5 text-purple-500" />
      default:
        return <User className="w-5 h-5 text-green-500" />
    }
  }

  const getUserTypeLabel = (userType: UserType) => {
    switch (userType) {
      case UserType.SUPER_ADMIN:
        return "Super Admin"
      case UserType.ADMIN:
        return "Admin"
      case UserType.PERSONAL_TRAINER:
        return "Personal Trainer"
      case UserType.GYM:
        return "Gym Owner"
      default:
        return "User"
    }
  }

  if (user) {
    return (
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {getUserTypeIcon(user.userType)}
              </div>
              <CardTitle className="text-2xl">Welcome back, {user.name}!</CardTitle>
              <CardDescription>
                {getUserTypeLabel(user.userType)} Account • Manage your profile and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Info */}
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  {getUserTypeIcon(user.userType)}
                  <div>
                    <p className="font-medium">Account Type</p>
                    <p className="text-sm text-muted-foreground">{getUserTypeLabel(user.userType)}</p>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/account/details">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Account Details</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Update your personal information</span>
                  </Button>
                </Link>

                <Link href="/account/security">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Security</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Password and security settings</span>
                  </Button>
                </Link>

                {isUserType(UserType.USER) && (
                  <>
                    <Link href="/account/request-trainer">
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                      >
                        <div className="flex items-center gap-2">
                          <Dumbbell className="w-4 h-4" />
                          <span className="font-medium">Become a Trainer</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Apply to be a personal trainer</span>
                      </Button>
                    </Link>

                    <Link href="/account/request-gym">
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                      >
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">Register Gym</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Register your gym business</span>
                      </Button>
                    </Link>
                  </>
                )}

                {(isUserType(UserType.PERSONAL_TRAINER) || isUserType(UserType.GYM)) && (
                  <Link href="/account/profile">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                    >
                      <div className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        <span className="font-medium">Edit Profile</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Customize your public profile</span>
                    </Button>
                  </Link>
                )}

                {(isUserType(UserType.PERSONAL_TRAINER) ||
                  isUserType(UserType.GYM) ||
                  isUserType(UserType.ADMIN) ||
                  isUserType(UserType.SUPER_ADMIN)) && (
                  <>
                    <Link href="/account/add-content">
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          <span className="font-medium">Add Content</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Create meal plans and workouts</span>
                      </Button>
                    </Link>
                  </>
                )}

                {(isUserType(UserType.ADMIN) || isUserType(UserType.SUPER_ADMIN)) && (
                  <Link href="/admin">
                    <Button
                      variant="outline"
                      className="w-full h-auto p-4 flex flex-col items-start gap-2 bg-transparent"
                    >
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        <span className="font-medium">Admin Panel</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Manage users and content</span>
                    </Button>
                  </Link>
                )}
              </div>

              <Button onClick={logout} variant="outline" className="w-full bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to FitMalta</h1>
          <p className="text-muted-foreground">Sign in to save your progress and access personalized features</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    <Lock className="w-4 h-4 mr-2" />
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-type">Account Type</Label>
                    <Select
                      value={registerForm.userType}
                      onValueChange={(value: UserType) => setRegisterForm({ ...registerForm, userType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserType.USER}>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Regular User
                          </div>
                        </SelectItem>
                        <SelectItem value={UserType.PERSONAL_TRAINER}>
                          <div className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4" />
                            Personal Trainer
                          </div>
                        </SelectItem>
                        <SelectItem value={UserType.GYM}>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            Gym Owner
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
