import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface GameCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  progress?: number
  completed?: boolean
  locked?: boolean
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}

export function GameCard({
  title,
  description,
  icon,
  progress,
  completed = false,
  locked = false,
  children,
  className,
  onClick
}: GameCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-gradient-card border-2 transition-all duration-300 cursor-pointer",
        "hover:shadow-xl hover:scale-105 hover:border-primary/50",
        locked && "opacity-50 cursor-not-allowed",
        completed && "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        className
      )}
      onClick={!locked ? onClick : undefined}
    >
      {completed && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✓</span>
          </div>
        </div>
      )}
      
      {locked && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🔒</span>
          </div>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
              {icon}
            </div>
          )}
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        
        {progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-gradient-xp h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {children}
      </CardContent>
    </Card>
  )
}