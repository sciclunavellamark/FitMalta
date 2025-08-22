"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export enum UserType {
  USER = "user",
  PERSONAL_TRAINER = "personal_trainer",
  GYM = "gym",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

interface User {
  id: string
  email: string
  name: string
  userType: UserType
  isVerified?: boolean
  profileComplete?: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string, userType?: UserType) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  setReturnTo: (path: string) => void
  getReturnTo: () => string | null
  updateUserType: (newType: UserType) => void
  isUserType: (type: UserType) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    initializeMockAccounts()
    const savedUser = localStorage.getItem("gym-app-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const initializeMockAccounts = () => {
    const existingUsers = JSON.parse(localStorage.getItem("gym-app-users") || "[]")

    const mockAccounts = [
      {
        id: "admin-1",
        email: "admin@fitmalta.com",
        password: "admin123",
        name: "Admin User",
        userType: UserType.ADMIN,
        isVerified: true,
        profileComplete: true,
      },
      {
        id: "superadmin-1",
        email: "superadmin@fitmalta.com",
        password: "super123",
        name: "Super Admin",
        userType: UserType.SUPER_ADMIN,
        isVerified: true,
        profileComplete: true,
      },
      {
        id: "trainer-1",
        email: "trainer@fitmalta.com",
        password: "trainer123",
        name: "John Trainer",
        userType: UserType.PERSONAL_TRAINER,
        isVerified: true,
        profileComplete: true,
      },
      {
        id: "gym-1",
        email: "gym@fitmalta.com",
        password: "gym123",
        name: "FitZone Gym",
        userType: UserType.GYM,
        isVerified: true,
        profileComplete: true,
      },
      {
        id: "user-1",
        email: "user@fitmalta.com",
        password: "user123",
        name: "Regular User",
        userType: UserType.USER,
        isVerified: true,
        profileComplete: true,
      },
    ]

    mockAccounts.forEach((mockAccount) => {
      if (!existingUsers.find((u: any) => u.email === mockAccount.email)) {
        existingUsers.push(mockAccount)
      }
    })

    localStorage.setItem("gym-app-users", JSON.stringify(existingUsers))
  }

  const setReturnTo = (path: string) => {
    localStorage.setItem("gym-app-return-to", path)
  }

  const getReturnTo = () => {
    return localStorage.getItem("gym-app-return-to")
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = JSON.parse(localStorage.getItem("gym-app-users") || "[]")
    const existingUser = users.find((u: any) => u.email === email && u.password === password)

    if (existingUser) {
      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        userType: existingUser.userType || UserType.USER,
        isVerified: existingUser.isVerified || false,
        profileComplete: existingUser.profileComplete || false,
      }
      setUser(userData)
      localStorage.setItem("gym-app-user", JSON.stringify(userData))

      const returnTo = getReturnTo()
      if (returnTo) {
        localStorage.removeItem("gym-app-return-to")
        router.push(returnTo)
      }

      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (
    email: string,
    password: string,
    name: string,
    userType: UserType = UserType.USER,
  ): Promise<boolean> => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = JSON.parse(localStorage.getItem("gym-app-users") || "[]")
    const existingUser = users.find((u: any) => u.email === email)

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      userType,
      isVerified: false,
      profileComplete: false,
    }

    users.push(newUser)
    localStorage.setItem("gym-app-users", JSON.stringify(users))

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      userType: newUser.userType,
      isVerified: newUser.isVerified,
      profileComplete: newUser.profileComplete,
    }
    setUser(userData)
    localStorage.setItem("gym-app-user", JSON.stringify(userData))

    const returnTo = getReturnTo()
    if (returnTo) {
      localStorage.removeItem("gym-app-return-to")
      router.push(returnTo)
    }

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("gym-app-user")
  }

  const updateUserType = (newType: UserType) => {
    if (user) {
      const updatedUser = { ...user, userType: newType }
      setUser(updatedUser)
      localStorage.setItem("gym-app-user", JSON.stringify(updatedUser))

      const users = JSON.parse(localStorage.getItem("gym-app-users") || "[]")
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex].userType = newType
        localStorage.setItem("gym-app-users", JSON.stringify(users))
      }
    }
  }

  const isUserType = (type: UserType): boolean => {
    return user?.userType === type
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoading,
        setReturnTo,
        getReturnTo,
        updateUserType,
        isUserType,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
