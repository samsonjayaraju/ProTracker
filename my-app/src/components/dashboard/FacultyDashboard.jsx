import {
  Users,
  FolderOpen,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { GlassCard } from "../ui/glass-card"
import { ProjectCard } from "../projects/ProjectCard"
import { useAuth } from "../../hooks/useAuth"
import {
  sampleProjects,
  sampleUsers,
  sampleFeedback,
  getUserById
} from "../../data/sampleData"

export function FacultyDashboard({ onViewProject }) {
  const { user } = useAuth()

  if (!user) return null

  const allProjects = sampleProjects
  const students = sampleUsers.filter(u => u.role === "student")
  const pendingReviews = allProjects.filter(
    p => p.visibility === "mentor-only" && !p.published
  )
  const totalFeedback = sampleFeedback.filter(f => f.authorId === user.id)

  const studentProgress = students.map(student => {
    const studentProjects = allProjects.filter(p => p.ownerId === student.id)
    const avgProgress =
      studentProjects.length > 0
        ? studentProjects.reduce((acc, p) => acc + p.progress, 0) /
          studentProjects.length
        : 0

    return {
      student,
      projectCount: studentProjects.length,
      avgProgress: Math.round(avgProgress),
      needsAttention:
        avgProgress < 50 ||
        studentProjects.some(p => p.updatedAt < "2024-09-15")
    }
  })

  const recentActivity = [
    {
      type: "submission",
      message:
        'Rahul Chowdary submitted "AI-Powered Study Assistant" for review',
      time: "2 hours ago",
      urgent: false
    },
    {
      type: "milestone",
      message: 'Samson completed "Dashboard Design" milestone',
      time: "4 hours ago",
      urgent: false
    },
    {
      type: "overdue",
      message: "Project deadline missed: Campus Navigation App",
      time: "1 day ago",
      urgent: true
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <GlassCard>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Faculty Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor student progress and provide guidance
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/20"
              >
                <Eye className="w-4 h-4 mr-2" />
                Review Queue
              </Button>
              <Button className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] hover:from-[#5A7AFF] hover:to-[#7CC8FF] text-white border-0">
                <MessageSquare className="w-4 h-4 mr-2" />
                Bulk Feedback
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#6D8BFF] to-[#8FD3FF] rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{allProjects.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-xl">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold">{pendingReviews.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Feedback Given</p>
                <p className="text-2xl font-bold">{totalFeedback.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student Progress Overview */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Student Progress</h3>
                <Button variant="ghost" size="sm">
                  Export Report
                </Button>
              </div>

              <div className="space-y-4">
                {studentProgress.map(item => (
                  <div
                    key={item.student.id}
                    className="flex items-center justify-between p-4 bg-white/30 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.student.avatarURL}
                        alt={item.student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.projectCount} projects
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right min-w-[100px]">
                        <p className="text-sm font-medium">
                          {item.avgProgress}% complete
                        </p>
                        <Progress
                          value={item.avgProgress}
                          className="w-20 h-2 mt-1"
                        />
                      </div>

                      {item.needsAttention && (
                        <Badge variant="destructive" className="text-xs">
                          Needs Attention
                        </Badge>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 hover:bg-white/20"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Recent Activity */}
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
                    className={`flex items-start space-x-4 p-4 rounded-xl ${
                      activity.urgent ? "bg-red-50" : "bg-white/30"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        activity.urgent
                          ? "bg-red-100"
                          : "bg-gradient-to-br from-[#6D8BFF] to-[#8FD3FF]"
                      }`}
                    >
                      {activity.type === "submission" && (
                        <FolderOpen
                          className={`w-4 h-4 ${
                            activity.urgent ? "text-red-600" : "text-white"
                          }`}
                        />
                      )}
                      {activity.type === "milestone" && (
                        <CheckCircle
                          className={`w-4 h-4 ${
                            activity.urgent ? "text-red-600" : "text-white"
                          }`}
                        />
                      )}
                      {activity.type === "overdue" && (
                        <AlertCircle
                          className={`w-4 h-4 ${
                            activity.urgent ? "text-red-600" : "text-white"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                    {activity.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Review Queue & Quick Actions */}
        <div className="space-y-6">
          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Review Queue</h3>

              <div className="space-y-3">
                {pendingReviews.slice(0, 3).map(project => {
                  const owner = getUserById(project.ownerId)
                  return (
                    <div
                      key={project.id}
                      className="p-3 bg-white/30 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm line-clamp-1">
                          {project.title}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          Review
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        by {owner?.name}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-muted-foreground">
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs h-6 px-2 border-white/20"
                          onClick={() => onViewProject(project)}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4 border-white/20 hover:bg-white/20"
              >
                View All Reviews
              </Button>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 hover:bg-white/20"
                >
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Bulk Feedback
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 hover:bg-white/20"
                >
                  <TrendingUp className="w-4 h-4 mr-3" />
                  Progress Report
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 hover:bg-white/20"
                >
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Review
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-white/20 hover:bg-white/20"
                >
                  <Users className="w-4 h-4 mr-3" />
                  Manage Students
                </Button>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Department Stats</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Overall Progress
                    </span>
                    <span className="text-sm text-muted-foreground">78%</span>
                  </div>
                  <Progress value={78} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">On Schedule</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">3</p>
                      <p className="text-xs text-muted-foreground">At Risk</p>
                    </div>
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
          <h2 className="text-2xl font-semibold">Student Projects</h2>
          <Button variant="ghost">View all projects</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.slice(0, 6).map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewProject={onViewProject}
              showOwner={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
