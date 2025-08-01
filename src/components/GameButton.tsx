import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface GameButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "hero" | "adventure" | "magic" | "default"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
}

const GameButton = forwardRef<HTMLButtonElement, GameButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = "relative font-bold transition-all duration-300 transform active:scale-95 shadow-lg"
    
    const variants = {
      hero: "bg-gradient-button text-primary-foreground hover:shadow-xl hover:scale-105 animate-glow",
      adventure: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-xl hover:scale-105",
      magic: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 hover:shadow-xl hover:scale-105",
      default: "bg-primary text-primary-foreground hover:bg-primary/90"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-xl",
      lg: "px-8 py-4 text-lg rounded-2xl"
    }

    return (
      <Button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

GameButton.displayName = "GameButton"

export { GameButton }