import { GlassCard } from "../ui/glass-card"
import { Button } from "../ui/button"
import { FolderOpen, UploadCloud } from "lucide-react"

export function PortfolioSection() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Portfolio</h1>

      <GlassCard>
        <div className="p-8 text-center">
          <FolderOpen className="w-10 h-10 text-blue-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No portfolio yet</h2>
          <p className="text-muted-foreground mb-4">
            Start building your portfolio by adding your best projects and achievements.
          </p>
          <Button className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF]">
            <UploadCloud className="w-4 h-4 mr-2" /> Upload Work
          </Button>
        </div>
      </GlassCard>
    </div>
  )
}
