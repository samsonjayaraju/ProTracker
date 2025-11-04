import { Search, Bell, Plus, Sun, Moon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { Badge } from "../ui/badge"
import { GlassCard } from "../ui/glass-card"
import { useAuth } from "../../hooks/useAuth"
import { useTheme } from "../../hooks/useTheme"
import { getNotificationsByUserId } from "../../data/sampleData"

export function Header({ onCreateProject, showSearch = true }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const notifications = user ? getNotificationsByUserId(user.id) : []
  const unreadCount = notifications.filter(n => !n.read).length

  if (!user) return null

  return (
    <GlassCard className="sticky top-4 z-50 mx-4 mb-6">
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D8BFF] to-[#8FD3FF] flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-semibold text-foreground">
              ProTrackr
            </span>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects, students..."
                className="pl-10 bg-white/50 border-white/20 backdrop-blur-sm"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </Button>

          {/* Create Project Button */}
          {user.role === "student" && (
            <Button
              onClick={onCreateProject}
              className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] hover:from-[#5A7AFF] hover:to-[#7CC8FF] text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center bg-[#FFB86B] text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-white/95 backdrop-blur-md border-white/20"
            >
              <div className="p-3">
                <h4 className="font-medium mb-2">Notifications</h4>
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No notifications
                  </p>
                ) : (
                  <div className="space-y-2">
                    {notifications.slice(0, 3).map(notification => (
                      <div
                        key={notification.id}
                        className={`p-2 rounded-lg ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                      >
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto">
                <Avatar>
                  <AvatarImage src={user.avatarURL} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map(n => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/95 backdrop-blur-md border-white/20"
            >
              <div className="p-3">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-1">
                  {user.role}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Portfolio</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </GlassCard>
  )
}
