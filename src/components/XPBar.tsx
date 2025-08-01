interface XPBarProps {
  currentXP: number
  maxXP: number
  level: number
  className?: string
}

export function XPBar({ currentXP, maxXP, level, className }: XPBarProps) {
  const progress = (currentXP / maxXP) * 100

  return (
    <div className={`bg-card rounded-2xl p-4 border-2 border-primary/20 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-button flex items-center justify-center text-sm font-bold text-white">
            {level}
          </div>
          <span className="font-bold text-lg">Level {level}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentXP} / {maxXP} XP
        </span>
      </div>
      
      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-xp h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}