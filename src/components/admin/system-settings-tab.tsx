/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Shield, Mail, Database, AlertCircle, CheckCircle, Save, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

export function SystemSettingsTab() {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    siteName: "SkillSphere",
    siteDescription: "Professional Learning Platform",
    adminEmail: "admin@skillsphere.com",
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    twoFactorAuth: false,
    sessionTimeout: "30",
    maxFileSize: "10",
    allowedFileTypes: "jpg,png,pdf,mp4",
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    backupFrequency: "daily",
    autoBackup: true,
  })

  const systemHealth = [
    {
      name: "Database",
      status: "healthy",
      lastCheck: "2 minutes ago",
      details: "All connections active",
    },
    {
      name: "File Storage",
      status: "healthy",
      lastCheck: "5 minutes ago",
      details: "85% capacity used",
    },
    {
      name: "Email Service",
      status: "warning",
      lastCheck: "10 minutes ago",
      details: "High queue volume",
    },
    {
      name: "CDN",
      status: "healthy",
      lastCheck: "1 minute ago",
      details: "Global distribution active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500 text-white"
      case "warning":
        return "bg-yellow-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const handleSaveSettings = () => {
    // Here you would typically save settings to your backend
    console.log("Saving settings:", settings)
    alert("Settings saved successfully!")
  }

  const handleTestEmail = () => {
    // Here you would typically test email configuration
    console.log("Testing email configuration...")
    alert("Test email sent!")
  }

  const handleBackupNow = () => {
    // Here you would typically trigger a backup
    console.log("Starting backup...")
    alert("Backup started!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-gray-400 mt-1">Configure system preferences and monitor health</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-red-600 hover:bg-red-700 text-white">
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      {/* System Health Overview */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            System Health
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemHealth.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{service.name}</h4>
                  {getStatusIcon(service.status)}
                </div>
                <Badge className={getStatusColor(service.status)}>{service.status}</Badge>
                <p className="text-gray-400 text-xs mt-2">{service.details}</p>
                <p className="text-gray-500 text-xs">Last check: {service.lastCheck}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        <Button
          variant={activeTab === "general" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "general"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("general")}
        >
          <Settings className="mr-2 h-4 w-4" />
          General
        </Button>
        <Button
          variant={activeTab === "security" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "security"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("security")}
        >
          <Shield className="mr-2 h-4 w-4" />
          Security
        </Button>
        <Button
          variant={activeTab === "email" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "email"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("email")}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
        <Button
          variant={activeTab === "backup" ? "default" : "ghost"}
          className={`flex-1 ${
            activeTab === "backup"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
          onClick={() => setActiveTab("backup")}
        >
          <Database className="mr-2 h-4 w-4" />
          Backup
        </Button>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Site Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName" className="text-gray-300">
                  Site Name
                </Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="siteDescription" className="text-gray-300">
                  Site Description
                </Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="adminEmail" className="text-gray-300">
                  Admin Email
                </Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings((prev) => ({ ...prev, adminEmail: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Maintenance Mode</Label>
                  <p className="text-gray-400 text-sm">Temporarily disable site access</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked: any) => setSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">User Registration</Label>
                  <p className="text-gray-400 text-sm">Allow new user signups</p>
                </div>
                <Switch
                  checked={settings.userRegistration}
                  onCheckedChange={(checked: any) => setSettings((prev) => ({ ...prev, userRegistration: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Email Notifications</Label>
                  <p className="text-gray-400 text-sm">Send system notifications</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked: any) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Two-Factor Authentication</Label>
                  <p className="text-gray-400 text-sm">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked: any) => setSettings((prev) => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout" className="text-gray-300">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings((prev) => ({ ...prev, sessionTimeout: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">File Upload Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxFileSize" className="text-gray-300">
                  Max File Size (MB)
                </Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => setSettings((prev) => ({ ...prev, maxFileSize: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="allowedFileTypes" className="text-gray-300">
                  Allowed File Types
                </Label>
                <Input
                  id="allowedFileTypes"
                  value={settings.allowedFileTypes}
                  onChange={(e) => setSettings((prev) => ({ ...prev, allowedFileTypes: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="jpg,png,pdf,mp4"
                />
                <p className="text-gray-400 text-xs mt-1">Comma-separated file extensions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === "email" && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              SMTP Configuration
              <Button
                onClick={handleTestEmail}
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300 bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Test Email
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="smtpHost" className="text-gray-300">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings((prev) => ({ ...prev, smtpHost: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort" className="text-gray-300">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings((prev) => ({ ...prev, smtpPort: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="smtpUsername" className="text-gray-300">
                    SMTP Username
                  </Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) => setSettings((prev) => ({ ...prev, smtpUsername: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword" className="text-gray-300">
                    SMTP Password
                  </Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => setSettings((prev) => ({ ...prev, smtpPassword: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Backup Settings */}
      {activeTab === "backup" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Backup Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">Automatic Backup</Label>
                  <p className="text-gray-400 text-sm">Enable scheduled backups</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked: any) => setSettings((prev) => ({ ...prev, autoBackup: checked }))}
                />
              </div>
              <div>
                <Label htmlFor="backupFrequency" className="text-gray-300">
                  Backup Frequency
                </Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value: any) => setSettings((prev) => ({ ...prev, backupFrequency: value }))}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Manual Backup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-400">Create an immediate backup of your system data and files.</p>
              <Button onClick={handleBackupNow} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Database className="mr-2 h-4 w-4" />
                Start Backup Now
              </Button>
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Last Backup</h4>
                <p className="text-gray-400 text-sm">January 20, 2024 at 3:00 AM</p>
                <p className="text-gray-400 text-sm">Size: 2.4 GB</p>
                <p className="text-green-400 text-sm">Status: Completed successfully</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
