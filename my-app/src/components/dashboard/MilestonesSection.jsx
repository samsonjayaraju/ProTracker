import { GlassCard } from "../ui/glass-card"
import { Target, Plus } from "lucide-react"
import { Button } from "../ui/button"

export function MilestonesSection() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Milestones</h1>

      <GlassCard>
        <div className="p-8 flex flex-col items-center text-center">
          <Target className="w-10 h-10 text-purple-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Track your project milestones</h2>
          <p className="text-muted-foreground mb-4">
            Add milestones to measure progress and stay on schedule.
          </p>
          <Button className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF]">
            <Plus className="w-4 h-4 mr-2" /> Add Milestone
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
