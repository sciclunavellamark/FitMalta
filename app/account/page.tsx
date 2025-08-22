"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { useAuth, UserType } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Lock, UserPlus, Building, Dumbbell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AccountPage() {
  const { user, login, register, isLoading } = useAuth()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ email: "", password: "", name: "", userType: UserType.USER })
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(loginForm.email, loginForm.password)
    if (!success) {
      setError("Invalid email or password")
    } else {
      router.push("/")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await register(registerForm.email, registerForm.password, registerForm.name, registerForm.userType)
    if (!success) {
      setError("User with this email already exists")
    } else {
      router.push("/")
    }
  }

  if (user) {
    router.push("/")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Dumbbell className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome to FitMalta</h1>
              </div>
              <p className="text-lg text-muted-foreground text-center">
                Sign in to save your progress and access personalized features
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Sign In
                    </CardTitle>
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
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5" />
                      Sign Up
                    </CardTitle>
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
      </main>
    </div>
  )
}
