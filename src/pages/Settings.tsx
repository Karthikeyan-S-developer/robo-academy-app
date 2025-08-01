import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/ui/theme-provider"
import { GameButton } from "@/components/GameButton"
import { Settings as SettingsIcon, Palette, Volume2, Bell, BookOpen, AlertTriangle, User } from "lucide-react"

export default function Settings() {
  const { theme, setTheme } = useTheme()

  const settingsCategories = [
    {
      title: "Appearance",
      icon: <Palette className="w-6 h-6 text-purple-600" />,
      settings: [
        {
          label: "Dark Mode",
          description: "Switch between light and dark themes",
          type: "toggle",
          value: theme === "dark",
          onChange: (checked: boolean) => setTheme(checked ? "dark" : "light")
        },
        {
          label: "Animations",
          description: "Enable smooth animations and effects",
          type: "toggle",
          value: true,
          onChange: () => {}
        }
      ]
    },
    {
      title: "Audio",
      icon: <Volume2 className="w-6 h-6 text-blue-600" />,
      settings: [
        {
          label: "Sound Effects",
          description: "Play sounds for interactions and achievements",
          type: "toggle",
          value: true,
          onChange: () => {}
        },
        {
          label: "Background Music",
          description: "Play ambient music while learning",
          type: "toggle",
          value: false,
          onChange: () => {}
        }
      ]
    },
    {
      title: "Notifications",
      icon: <Bell className="w-6 h-6 text-green-600" />,
      settings: [
        {
          label: "Daily Reminders",
          description: "Get reminded to continue your learning journey",
          type: "toggle",
          value: true,
          onChange: () => {}
        },
        {
          label: "Achievement Alerts",
          description: "Get notified when you earn new achievements",
          type: "toggle",
          value: true,
          onChange: () => {}
        }
      ]
    },
    {
      title: "Learning",
      icon: <BookOpen className="w-6 h-6 text-cyan-600" />,
      settings: [
        {
          label: "Difficulty Auto-Adjust",
          description: "Automatically adjust lesson difficulty based on performance",
          type: "toggle",
          value: false,
          onChange: () => {}
        },
        {
          label: "Show Hints",
          description: "Display helpful hints during activities",
          type: "toggle",
          value: true,
          onChange: () => {}
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <SettingsIcon className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Customize your AI learning experience!
        </p>
      </div>

      {/* Profile Section */}
      <Card className="bg-gradient-card border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-button flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold">Explorer</div>
              <div className="text-sm text-muted-foreground">Level 3 AI Learner</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GameButton variant="adventure" size="sm" className="w-full">
              Edit Profile
            </GameButton>
            <GameButton variant="magic" size="sm" className="w-full">
              View Achievements
            </GameButton>
            <GameButton variant="default" size="sm" className="w-full">
              Learning Stats
            </GameButton>
          </div>
        </CardContent>
      </Card>

      {/* Settings Categories */}
      <div className="space-y-6">
        {settingsCategories.map((category) => (
          <Card key={category.title} className="bg-gradient-card border-2 border-secondary/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                {category.icon}
                <span>{category.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {category.settings.map((setting) => (
                <div key={setting.label} className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                  <div className="space-y-1">
                    <div className="font-semibold">{setting.label}</div>
                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                  </div>
                  {setting.type === "toggle" && (
                    <Switch
                      checked={setting.value}
                      onCheckedChange={setting.onChange}
                      className="data-[state=checked]:bg-primary"
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Danger Zone */}
      <Card className="border-2 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GameButton
              variant="default"
              size="sm"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Reset Progress
            </GameButton>
            <GameButton
              variant="default"
              size="sm"
              className="w-full bg-red-500 hover:bg-red-600 text-white"
            >
              Delete Account
            </GameButton>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground py-8">
        <p>AI Learning Adventure v1.0.0</p>
        <p>Made with ❤️ for young explorers</p>
      </div>
    </div>
  )
}