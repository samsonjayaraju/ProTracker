import {
  BarChart3,
  FolderOpen,
  Target,
  Users,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { GlassCard } from "../ui/glass-card"
import { ProjectCard } from "../projects/ProjectCard"
import { useAuth } from "../../hooks/useAuth"
import {
  getProjectsByUserId,
  getMilestonesByProjectId,
  getFeedbackByProjectId
} from "../../data/sampleData"

export function StudentDashboard({ onCreateProject, onViewProject }) {
  const { user } = useAuth()

  if (!user) return null

  const projects = getProjectsByUserId(user.id)
  const publishedProjects = projects.filter(p => p.published)
  const totalMilestones = projects.flatMap(p => getMilestonesByProjectId(p.id))
  const completedMilestones = totalMilestones.filter(
    m => m.status === "completed"
  )
  const pendingFeedback = projects
    .flatMap(p => getFeedbackByProjectId(p.id))
    .filter(f => f.status === "open")

  const avgCompletion =
    projects.length > 0
      ? Math.round(
          projects.reduce((acc, p) => acc + p.progress, 0) / projects.length
        )
      : 0

  const recentActivity = [
    {
      type: "milestone",
      message: 'Completed "AI Integration" milestone',
      time: "2 hours ago",
      project: "AI-Powered Study Assistant"
    },
    {
      type: "feedback",
      message: "Received feedback from Prof. Arvind Rao",
      time: "5 hours ago",
      project: "AI-Powered Study Assistant"
    },
    {
      type: "upload",
      message: "Uploaded demo video",
      time: "1 day ago",
      project: "Campus Navigation App"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <GlassCard>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                Ready to work on your projects today?
              </p>
            </div>
            <Button
              onClick={onCreateProject}
              size="lg"
              className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] hover:from-[#5A7AFF] hover:to-[#7CC8FF] text-white border-0"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Project
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#6D8BFF] to-[#8FD3FF] rounded-xl">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#FFB86B] to-[#FF9F40] rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{publishedProjects.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Completion</p>
                <p className="text-2xl font-bold">{avgCompletion}%</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Feedback
                </p>
                <p className="text-2xl font-bold">{pendingFeedback.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/30 rounded-xl"
                  >
                    <div className="p-2 bg-gradient-to-br from-[#6D8BFF] to-[#8FD3FF] rounded-lg">
                      {activity.type === "milestone" && (
                        <Target className="w-4 h-4 text-white" />
                      )}
                      {activity.type === "feedback" && (
                        <BarChart3 className="w-4 h-4 text-white" />
                      )}
                      {activity.type === "upload" && (
                        <FolderOpen className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.project}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Quick Actions */}
          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 border-white/20 hover:bg-white/20"
                  onClick={onCreateProject}
                >
                  <div className="text-center">
                    <Plus className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">New Project</p>
                    <p className="text-xs text-muted-foreground">
                      Start something new
                    </p>
                  </div>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 border-white/20 hover:bg-white/20"
                >
                  <div className="text-center">
                    <Target className="w-6 h-6 mx-auto mb-2" />
                    <p className="font-medium">Add Milestone</p>
                    <p className="text-xs text-muted-foreground">
                      Track progress
                    </p>
                  </div>
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Progress Overview */}
        <div className="space-y-6">
          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Progress Overview</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Overall Completion
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {avgCompletion}%
                    </span>
                  </div>
                  <Progress value={avgCompletion} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Milestones</span>
                    <span className="text-sm text-muted-foreground">
                      {completedMilestones.length}/{totalMilestones.length}
                    </span>
                  </div>
                  <Progress
                    value={
                      totalMilestones.length > 0
                        ? (completedMilestones.length /
                            totalMilestones.length) *
                          100
                        : 0
                    }
                    className="h-3"
                  />
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Completed Tasks
                    </div>
                    <span className="font-medium">
                      {completedMilestones.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Deadlines</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Testing & Deployment</p>
                    <p className="text-xs text-muted-foreground">
                      AI Study Assistant
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-yellow-600 font-medium">
                      Due in 3 days
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">AR Implementation</p>
                    <p className="text-xs text-muted-foreground">
                      Campus Navigation
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-600 font-medium">
                      Due in 1 week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Projects</h2>
          <Button variant="ghost">View all projects</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={onViewProject}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
