import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

interface NavItemProps {
  icon: string
  label: string
  path: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, path, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center space-y-1 p-2 rounded-xl transition-all duration-300",
        isActive
          ? "bg-primary text-primary-foreground shadow-lg scale-105"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      )}
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { icon: "🏠", label: "Home", path: "/dashboard" },
    { icon: "📚", label: "Lessons", path: "/lessons" },
    { icon: "🎮", label: "Practice", path: "/practice" },
    { icon: "⚙️", label: "Settings", path: "/settings" }
  ]

  // Don't show on login page
  if (location.pathname === "/" || location.pathname === "/login") {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t-2 border-primary/20 p-4 z-50">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-4 gap-2">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}