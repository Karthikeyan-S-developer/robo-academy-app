import { GameCard } from "@/components/GameCard"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Lessons() {
  const [searchTerm, setSearchTerm] = useState("")

  const lessons = [
    {
      id: 1,
      title: "What is AI?",
      description: "Discover the basics of Artificial Intelligence and how it helps us every day!",
      icon: "🤖",
      difficulty: "Beginner",
      duration: "15 min",
      progress: 100,
      completed: true,
      locked: false
    },
    {
      id: 2,
      title: "Machine Learning Basics",
      description: "Learn how computers can learn patterns and make predictions!",
      icon: "🧠",
      difficulty: "Beginner",
      duration: "20 min",
      progress: 100,
      completed: true,
      locked: false
    },
    {
      id: 3,
      title: "AI in Daily Life",
      description: "Explore how AI is used in apps, games, and devices around you!",
      icon: "📱",
      difficulty: "Beginner",
      duration: "18 min",
      progress: 65,
      completed: false,
      locked: false
    },
    {
      id: 4,
      title: "Voice Assistants",
      description: "Understand how Siri, Alexa, and other voice assistants work!",
      icon: "🎤",
      difficulty: "Intermediate",
      duration: "25 min",
      progress: 0,
      completed: false,
      locked: false
    },
    {
      id: 5,
      title: "Computer Vision",
      description: "Learn how computers can 'see' and recognize images!",
      icon: "👁️",
      difficulty: "Intermediate",
      duration: "30 min",
      progress: 0,
      completed: false,
      locked: false
    },
    {
      id: 6,
      title: "Neural Networks",
      description: "Discover how AI mimics the human brain to solve problems!",
      icon: "🧬",
      difficulty: "Advanced",
      duration: "35 min",
      progress: 0,
      completed: false,
      locked: true
    },
    {
      id: 7,
      title: "AI Ethics",
      description: "Learn about responsible AI development and usage!",
      icon: "⚖️",
      difficulty: "Intermediate",
      duration: "20 min",
      progress: 0,
      completed: false,
      locked: true
    },
    {
      id: 8,
      title: "Future of AI",
      description: "Explore exciting possibilities and careers in AI!",
      icon: "🚀",
      difficulty: "Advanced",
      duration: "40 min",
      progress: 0,
      completed: false,
      locked: true
    }
  ]

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-600 bg-green-100 dark:bg-green-900/30"
      case "Intermediate": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
      case "Advanced": return "text-red-600 bg-red-100 dark:bg-red-900/30"
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-4xl">📚</span>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            AI Learning Modules
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Embark on your journey to understand Artificial Intelligence!
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for lessons... 🔍"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-12 text-base rounded-xl border-2 transition-all duration-300 focus:border-primary"
        />
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-card rounded-2xl p-6 border-2 border-primary/20">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <span>📊</span>
          <span>Your Progress</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">3</div>
            <div className="text-sm text-muted-foreground">Locked</div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <GameCard
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            icon={lesson.icon}
            progress={lesson.progress}
            completed={lesson.completed}
            locked={lesson.locked}
            className="hover:scale-105 transition-all duration-300"
            onClick={() => {
              if (!lesson.locked) {
                console.log(`Starting lesson: ${lesson.title}`)
              }
            }}
          >
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-1 rounded-full font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                {lesson.difficulty}
              </span>
              <span className="text-muted-foreground">⏱️ {lesson.duration}</span>
            </div>
          </GameCard>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No lessons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms to find the perfect lesson!
          </p>
        </div>
      )}
    </div>
  )
}