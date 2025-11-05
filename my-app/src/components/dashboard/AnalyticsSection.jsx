import { GlassCard } from "../ui/glass-card"
import { BarChart3, FolderOpen, Target, CheckCircle, Users } from "lucide-react"
import { sampleProjects, sampleUsers, sampleMilestones } from "../../data/sampleData"

export function AnalyticsSection() {
  const totalProjects = sampleProjects.length
  const publishedProjects = sampleProjects.filter(p => p.published).length
  const totalMilestones = sampleMilestones.length
  const completedMilestones = sampleMilestones.filter(
    m => m.status === "completed"
  ).length
  const totalStudents = sampleUsers.filter(u => u.role === "student").length

  const avgCompletion = Math.round(
    sampleProjects.reduce((acc, p) => acc + p.progress, 0) /
      sampleProjects.length
  )

  const stats = [
    {
      title: "Total Projects",
      value: totalProjects,
      icon: FolderOpen,
      color: "from-[#6D8BFF] to-[#8FD3FF]"
    },
    {
      title: "Published Projects",
      value: publishedProjects,
      icon: BarChart3,
      color: "from-[#FFB86B] to-[#FF9F40]"
    },
    {
      title: "Average Completion",
      value: `${avgCompletion}%`,
      icon: Target,
      color: "from-[#10B981] to-[#059669]"
    },
    {
      title: "Completed Milestones",
      value: completedMilestones,
      icon: CheckCircle,
      color: "from-[#F59E0B] to-[#D97706]"
    },
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "from-[#8B5CF6] to-[#6366F1]"
    }
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <GlassCard key={index}>
              <div className="p-6 flex items-center space-x-4">
                <div
                  className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
