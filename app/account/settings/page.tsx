"use client"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Eye, Palette, Save, Settings } from "lucide-react"
import AccountLayout from "@/components/account-layout"

export default function SettingsPage() {
  const { user } = useAuth()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    workoutReminders: true,
    profileVisibility: "public",
    language: "en",
    theme: "system",
    units: "metric",
    autoSave: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setIsLoading(false)

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-lg text-muted-foreground">Customize your app preferences and privacy settings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Manage how you receive updates and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive important updates via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get real-time notifications on your device</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional content and offers</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings({ ...settings, marketingEmails: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Workout Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded about your scheduled workouts</p>
              </div>
              <Switch
                checked={settings.workoutReminders}
                onCheckedChange={(checked) => setSettings({ ...settings, workoutReminders: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Privacy & Visibility
            </CardTitle>
            <CardDescription>Control who can see your profile and activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
              <Select
                value={settings.profileVisibility}
                onValueChange={(value) => setSettings({ ...settings, profileVisibility: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone can view your profile</SelectItem>
                  <SelectItem value="members">Members Only - Only registered users can view</SelectItem>
                  <SelectItem value="private">Private - Only you can view your profile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-save Progress</Label>
                <p className="text-sm text-muted-foreground">Automatically save your workout and meal data</p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance & Language
            </CardTitle>
            <CardDescription>Customize your app experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings({ ...settings, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="mt">Maltese</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="units">Measurement Units</Label>
              <Select value={settings.units} onValueChange={(value) => setSettings({ ...settings, units: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            {success && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md mb-4">Settings saved successfully!</div>
            )}

            <Button onClick={handleSave} disabled={isLoading} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  )
}
