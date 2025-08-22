"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Shield, UserCheck, Building, Smartphone, Key } from "lucide-react"
import Link from "next/link"
import AccountLayout from "@/components/account-layout"

export default function SecurityPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords don't match")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setIsLoading(false)
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })

    setTimeout(() => setSuccess(false), 3000)
  }

  if (!user) {
    return <div>Please log in to access this page.</div>
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <Link href="/account">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Account
            </Button>
          </Link>
        </div>

        {/* Password Security Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Password Security
            </CardTitle>
            <CardDescription>Update your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              {error && <div className="p-3 bg-red-100 text-red-800 rounded-md">{error}</div>}

              {success && (
                <div className="p-3 bg-green-100 text-green-800 rounded-md">Password updated successfully!</div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Advanced Security Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Advanced Security
            </CardTitle>
            <CardDescription>Additional security measures for your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security with 2FA</p>
              </div>
              <Switch
                checked={securitySettings.twoFactorAuth}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
              </div>
              <Switch
                checked={securitySettings.loginAlerts}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, loginAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Session Timeout</Label>
                <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
              </div>
              <Switch
                checked={securitySettings.sessionTimeout}
                onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, sessionTimeout: checked })}
              />
            </div>

            {securitySettings.twoFactorAuth && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">2FA Setup Required</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Download an authenticator app and scan the QR code to complete setup.
                </p>
                <Button size="sm" variant="outline">
                  Setup 2FA
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Upgrade Applications Section */}
        {user.userType === "user" && (
          <Card>
            <CardHeader>
              <CardTitle>Account Upgrades</CardTitle>
              <CardDescription>Apply to upgrade your account and unlock additional features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Become a Personal Trainer</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share your expertise, create workout programs, and offer training services to the community.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Create and sell workout programs</li>
                    <li>• Offer personal training sessions</li>
                    <li>• Build your professional profile</li>
                    <li>• Connect with clients</li>
                  </ul>
                  <Link href="/account/request-trainer">
                    <Button className="w-full">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Apply to be a Trainer
                    </Button>
                  </Link>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Register Your Gym</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    List your gym business, attract new members, and manage your facility through our platform.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• List your gym in our directory</li>
                    <li>• Manage membership offers</li>
                    <li>• Connect with potential members</li>
                    <li>• Showcase your facilities</li>
                  </ul>
                  <Link href="/account/request-gym">
                    <Button className="w-full bg-transparent" variant="outline">
                      <Building className="w-4 h-4 mr-2" />
                      Register Your Gym
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Application Process</h4>
                <p className="text-sm text-muted-foreground">
                  All applications are reviewed by our team to ensure quality and authenticity. You'll receive an email
                  notification once your application has been processed. The review process typically takes 2-3 business
                  days.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Display for Non-User Account Types */}
        {user.userType !== "user" && (
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
              <CardDescription>Your current account type and privileges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                {user.userType === "trainer" && <UserCheck className="w-6 h-6 text-primary" />}
                {user.userType === "gym" && <Building className="w-6 h-6 text-primary" />}
                {(user.userType === "admin" || user.userType === "super_admin") && (
                  <Shield className="w-6 h-6 text-primary" />
                )}
                <div>
                  <h3 className="font-semibold capitalize">{user.userType.replace("_", " ")} Account</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.userType === "trainer" && "You can create content and offer training services"}
                    {user.userType === "gym" && "You can manage your gym listing and member offers"}
                    {user.userType === "admin" && "You have administrative privileges"}
                    {user.userType === "super_admin" && "You have full system administrative access"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AccountLayout>
  )
}
