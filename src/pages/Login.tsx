import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameButton } from "@/components/GameButton"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rocket, Loader2 } from "lucide-react"
import heroBackground from "@/assets/hero-background.jpg"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      navigate("/dashboard")
    }, 1000)
  }

  return (
    <div 
      className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(124, 58, 237, 0.4), rgba(99, 102, 241, 0.4)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/20 rounded-full animate-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-cyan-400/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-400/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <Card className="w-full max-w-md bg-gradient-card border-2 border-primary/20 shadow-2xl animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-button rounded-2xl flex items-center justify-center animate-bounce-in">
            <Rocket className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-cyan-600 bg-clip-text text-transparent">
            AI Adventure
          </CardTitle>
          <p className="text-muted-foreground">
            Welcome, young explorer! Ready to learn about AI?
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-semibold">
                Explorer Name
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-base rounded-xl border-2 transition-all duration-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">
                Secret Code
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your secret code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base rounded-xl border-2 transition-all duration-300 focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <GameButton
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Starting Adventure...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Rocket className="w-5 h-5" />
                  <span>Begin Adventure!</span>
                </div>
              )}
            </GameButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New explorer?{" "}
              <button className="text-primary hover:underline font-semibold">
                Create Account
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}