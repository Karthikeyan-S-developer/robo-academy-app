import { useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Home, BookOpen, Gamepad2, Settings } from "lucide-react"

interface NavItemProps {
  icon: React.ReactNode
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
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/dashboard" },
    { icon: <BookOpen className="w-6 h-6" />, label: "Lessons", path: "/lessons" },
    { icon: <Gamepad2 className="w-6 h-6" />, label: "Practice", path: "/practice" },
    { icon: <Settings className="w-6 h-6" />, label: "Settings", path: "/settings" }
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