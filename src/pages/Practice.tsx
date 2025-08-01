import { GameCard } from "@/components/GameCard"
import { GameButton } from "@/components/GameButton"
import { Gamepad2, BarChart3, Star, Target, Rocket, Brain, Eye, Bot, Puzzle, Mic, TreePine } from "lucide-react"

export default function Practice() {
  const practiceActivities = [
    {
      id: 1,
      title: "AI Quiz Challenge",
      description: "Test your knowledge with fun multiple-choice questions!",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      type: "Quiz",
      difficulty: "Easy",
      points: 50,
      completed: true
    },
    {
      id: 2,
      title: "Image Recognition Game",
      description: "Help train an AI to recognize different objects!",
      icon: <Eye className="w-6 h-6 text-cyan-600" />,
      type: "Interactive",
      difficulty: "Medium",
      points: 100,
      completed: false
    },
    {
      id: 3,
      title: "Chatbot Builder",
      description: "Create your own simple chatbot with drag-and-drop!",
      icon: <Bot className="w-6 h-6 text-green-600" />,
      type: "Builder",
      difficulty: "Medium",
      points: 150,
      completed: false
    },
    {
      id: 4,
      title: "Pattern Matching",
      description: "Discover patterns like machine learning algorithms do!",
      icon: <Puzzle className="w-6 h-6 text-orange-600" />,
      type: "Puzzle",
      difficulty: "Easy",
      points: 75,
      completed: false
    },
    {
      id: 5,
      title: "Voice Command Training",
      description: "Teach an AI to understand voice commands!",
      icon: <Mic className="w-6 h-6 text-pink-600" />,
      type: "Interactive",
      difficulty: "Hard",
      points: 200,
      completed: false
    },
    {
      id: 6,
      title: "Decision Tree Adventure",
      description: "Navigate through an AI decision-making adventure!",
      icon: <TreePine className="w-6 h-6 text-green-700" />,
      type: "Adventure",
      difficulty: "Medium",
      points: 125,
      completed: false
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "Medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
      case "Hard": return "text-red-600 bg-red-100 dark:bg-red-900/30"
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quiz": return "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
      case "Interactive": return "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
      case "Builder": return "text-orange-600 bg-orange-100 dark:bg-orange-900/30"
      case "Puzzle": return "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30"
      case "Adventure": return "text-pink-600 bg-pink-100 dark:bg-pink-900/30"
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Gamepad2 className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            Practice Arena
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Apply your AI knowledge through fun games and activities!
        </p>
      </div>

      {/* Stats Overview */}
      <div className="bg-gradient-card rounded-2xl p-6 border-2 border-primary/20">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          <span>Practice Stats</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">350</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-6 border-2 border-yellow-400">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-600" />
              <span>Daily Challenge</span>
            </h2>
            <p className="text-muted-foreground mt-1">
              Complete today's challenge for bonus XP!
            </p>
          </div>
          <GameButton variant="magic" size="md">
            Start Challenge
          </GameButton>
        </div>
      </div>

      {/* Practice Activities */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Target className="w-6 h-6 text-primary" />
          <span>Practice Activities</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceActivities.map((activity) => (
            <GameCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              icon={activity.icon}
              completed={activity.completed}
              className="hover:scale-105 transition-all duration-300"
              onClick={() => {
                console.log(`Starting practice: ${activity.title}`)
              }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className={`px-2 py-1 rounded-full font-semibold ${getTypeColor(activity.type)}`}>
                    {activity.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full font-semibold ${getDifficultyColor(activity.difficulty)}`}>
                    {activity.difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reward:</span>
                  <span className="text-sm font-bold text-yellow-600">+{activity.points} XP</span>
                </div>
              </div>
            </GameCard>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-gradient-card rounded-2xl p-6 border-2 border-secondary/50 text-center">
        <Rocket className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-bold mb-2">More Activities Coming Soon!</h3>
        <p className="text-muted-foreground mb-4">
          We're working on exciting new practice activities for you to explore!
        </p>
        <GameButton variant="adventure" size="md">
          Suggest Ideas
        </GameButton>
      </div>
    </div>
  )
}