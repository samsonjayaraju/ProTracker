import { GlassCard } from "../ui/glass-card"
import { Search } from "lucide-react"
import { Input } from "../ui/input"

export function DiscoverSection() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Discover Projects</h1>

      <div className="flex items-center space-x-2">
        <Input placeholder="Search projects, tags, or students..." className="flex-1" />
        <button className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] px-4 py-2 rounded-lg text-white">
          <Search className="w-4 h-4 inline-block mr-2" /> Search
        </button>
      </div>

      <GlassCard>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">
            Explore trending projects, popular tags, and top student portfolios here.
          </p>
        </div>
      </GlassCard>
    </div>
  )
}
