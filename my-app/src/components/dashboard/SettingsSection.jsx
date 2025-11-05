import { GlassCard } from "../ui/glass-card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { User } from "lucide-react"

export function SettingsSection() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <GlassCard>
        <div className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <User className="w-10 h-10 text-blue-400" />
            <div>
              <h2 className="text-xl font-semibold">Profile Settings</h2>
              <p className="text-muted-foreground">Update your personal info and preferences.</p>
            </div>
          </div>

          <form className="space-y-4 mt-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Your full name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="your.email@example.com" />
            </div>
            <Button className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF]">Save Changes</Button>
          </form>
        </div>
      </GlassCard>
    </div>
  )
}
