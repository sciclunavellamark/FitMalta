"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Calendar, CreditCard, Search, Filter, Receipt, Star } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useState } from "react"
import AccountLayout from "@/components/account-layout"

const mockPurchases = [
  {
    id: "1",
    type: "Meal Plan",
    name: "Mediterranean Bulk Plan",
    author: "Chef Maria Rossi",
    price: "€29.99",
    date: "2024-01-15",
    status: "Active",
    rating: 4.8,
    downloadUrl: "/downloads/mediterranean-bulk-plan.pdf",
    description: "A comprehensive 4-week Mediterranean-style meal plan designed for clean bulking",
    category: "Bulking",
  },
  {
    id: "2",
    type: "Workout",
    name: "Advanced Push/Pull/Legs",
    author: "Trainer John Smith",
    price: "€19.99",
    date: "2024-01-10",
    status: "Active",
    rating: 4.9,
    downloadUrl: "/downloads/advanced-ppl.pdf",
    description: "6-day advanced PPL split for experienced lifters",
    category: "Strength Training",
  },
  {
    id: "3",
    type: "Trainer Session",
    name: "Personal Training Session",
    author: "Trainer Sarah Johnson",
    price: "€45.00",
    date: "2024-01-08",
    status: "Completed",
    rating: 5.0,
    downloadUrl: null,
    description: "1-hour personal training session focusing on form and technique",
    category: "Personal Training",
  },
  {
    id: "4",
    type: "Meal Plan",
    name: "Keto Cut Protocol",
    author: "Nutritionist Alex Brown",
    price: "€24.99",
    date: "2023-12-20",
    status: "Expired",
    rating: 4.6,
    downloadUrl: "/downloads/keto-cut-protocol.pdf",
    description: "8-week ketogenic cutting meal plan with macro tracking",
    category: "Cutting",
  },
]

export default function PurchasesPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredPurchases = mockPurchases.filter((purchase) => {
    const matchesSearch =
      purchase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || purchase.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || purchase.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  if (!user) {
    return (
      <AccountLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-6">You need to be signed in to view your purchases.</p>
          <Link href="/account">
            <Button>Sign In</Button>
          </Link>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              My Purchases
            </CardTitle>
            <CardDescription>View and manage your purchased content and sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">{mockPurchases.length}</div>
                <div className="text-sm text-muted-foreground">Total Purchases</div>
              </div>
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {mockPurchases.filter((p) => p.status === "Active").length}
                </div>
                <div className="text-sm text-muted-foreground">Active Items</div>
              </div>
              <div className="text-center p-4 bg-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  €{mockPurchases.reduce((sum, p) => sum + Number.parseFloat(p.price.replace("€", "")), 0).toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search purchases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="meal plan">Meal Plans</SelectItem>
                    <SelectItem value="workout">Workouts</SelectItem>
                    <SelectItem value="trainer session">Trainer Sessions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredPurchases.map((purchase) => (
            <Card key={purchase.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{purchase.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{purchase.description}</p>
                        <p className="text-sm text-muted-foreground">by {purchase.author}</p>
                      </div>
                      <Badge
                        variant={
                          purchase.status === "Active"
                            ? "default"
                            : purchase.status === "Completed"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {purchase.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(purchase.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        {purchase.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {purchase.rating}
                      </span>
                      <Badge variant="outline">{purchase.type}</Badge>
                      <Badge variant="outline">{purchase.category}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {purchase.downloadUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPurchases.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Receipt className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {mockPurchases.length === 0 ? "No purchases yet" : "No purchases match your filters"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {mockPurchases.length === 0
                  ? "Start exploring our meal plans and workouts to make your first purchase."
                  : "Try adjusting your search terms or filters to find what you're looking for."}
              </p>
              {mockPurchases.length === 0 && (
                <div className="flex gap-2 justify-center">
                  <Link href="/meal-plans">
                    <Button variant="outline">Browse Meal Plans</Button>
                  </Link>
                  <Link href="/workouts">
                    <Button>Browse Workouts</Button>
                  </Link>
                  <Link href="/trainers">
                    <Button variant="outline">Find Trainers</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AccountLayout>
  )
}
