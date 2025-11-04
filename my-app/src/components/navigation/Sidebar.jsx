import {
  Home,
  FolderOpen,
  Target,
  User,
  Settings,
  Users,
  BarChart3,
  Search
} from "lucide-react"
import { Button } from "../ui/button"
import { GlassCard } from "../ui/glass-card"
import { useAuth } from "../../hooks/useAuth"
import { cn } from "../ui/utils"

export function Sidebar({ activeTab, onTabChange }) {
  const { user } = useAuth()

  if (!user) return null

  const studentMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "projects", label: "My Projects", icon: FolderOpen },
    { id: "milestones", label: "Milestones", icon: Target },
    { id: "portfolio", label: "Portfolio", icon: User },
    { id: "discover", label: "Discover", icon: Search },
    { id: "settings", label: "Settings", icon: Settings }
  ]

  const facultyMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "students", label: "Students", icon: Users },
    { id: "projects", label: "All Projects", icon: FolderOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "discover", label: "Discover", icon: Search },
    { id: "settings", label: "Settings", icon: Settings }
  ]

  const menuItems =
    user.role === "student" ? studentMenuItems : facultyMenuItems

  return (
    <GlassCard className="w-64 h-fit sticky top-24 ml-4">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive
                    ? "bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] text-white"
                    : "hover:bg-white/20"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </GlassCard>
  )
}
