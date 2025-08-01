import { XPBar } from "@/components/XPBar"
import { GameCard } from "@/components/GameCard"
import { GameButton } from "@/components/GameButton"
import { useNavigate } from "react-router-dom"
import { Rocket, Target, Trophy, Zap, BookOpen, Gamepad2, User, Bot } from "lucide-react"

export default function Dashboard() {
  const navigate = useNavigate()
  
  const userStats = {
    level: 3,
    currentXP: 750,
    maxXP: 1000,
    lessonsCompleted: 5,
    totalLessons: 12,
    achievements: 8
  }

  const recentAchievements = [
    { id: 1, title: "AI Basics Master", icon: Target, earned: true },
    { id: 2, title: "Quick Learner", icon: Zap, earned: true },
    { id: 3, title: "Explorer", icon: User, earned: false }
  ]

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Rocket className="w-8 h-8 text-primary" />
            <span>Welcome back, Explorer!</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready for your next AI adventure?
          </p>
        </div>
        <div className="w-16 h-16 rounded-full bg-gradient-button flex items-center justify-center animate-float">
          <User className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* XP Bar */}
      <XPBar
        level={userStats.level}
        currentXP={userStats.currentXP}
        maxXP={userStats.maxXP}
        className="animate-fade-in"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
        <div className="bg-gradient-card rounded-2xl p-4 text-center border-2 border-primary/20">
          <div className="text-2xl font-bold text-primary">{userStats.lessonsCompleted}</div>
          <div className="text-sm text-muted-foreground">Lessons Completed</div>
        </div>
        <div className="bg-gradient-card rounded-2xl p-4 text-center border-2 border-accent/20">
          <div className="text-2xl font-bold text-accent">{userStats.achievements}</div>
          <div className="text-sm text-muted-foreground">Achievements</div>
        </div>
        <div className="bg-gradient-card rounded-2xl p-4 text-center border-2 border-cyan-500/20 col-span-2 md:col-span-1">
          <div className="text-2xl font-bold text-cyan-600">{userStats.totalLessons - userStats.lessonsCompleted}</div>
          <div className="text-sm text-muted-foreground">New Adventures</div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Target className="w-6 h-6 text-primary" />
          <span>Continue Your Journey</span>
        </h2>
        
        <GameCard
          title="AI Fundamentals - Chapter 3"
          description="Learn about machine learning and how computers can think!"
          icon={<Bot className="w-6 h-6 text-primary" />}
          progress={65}
          onClick={() => navigate("/lessons")}
          className="animate-scale-in"
        />
      </div>

      {/* Recent Achievements */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-600" />
          <span>Recent Achievements</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentAchievements.map((achievement) => {
            const IconComponent = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                  achievement.earned
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400"
                    : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 opacity-50"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <div className="font-semibold text-sm">{achievement.title}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Zap className="w-6 h-6 text-yellow-500" />
          <span>Quick Actions</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GameButton
            variant="adventure"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3"
            onClick={() => navigate("/lessons")}
          >
            <BookOpen className="w-6 h-6" />
            <span>Explore All Lessons</span>
          </GameButton>
          
          <GameButton
            variant="magic"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3"
            onClick={() => navigate("/practice")}
          >
            <Gamepad2 className="w-6 h-6" />
            <span>Practice Games</span>
          </GameButton>
        </div>
      </div>
    </div>
  )
}