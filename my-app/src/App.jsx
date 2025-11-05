import { useState } from "react"
import { AuthProvider, useAuth } from "./hooks/useAuth"
import { ThemeProvider } from "./hooks/useTheme"
import { LandingPage } from "./components/landing/LandingPage"
import { LoginForm } from "./components/auth/LoginForm"
import { Header } from "./components/navigation/Header"
import { Sidebar } from "./components/navigation/Sidebar"
import { StudentDashboard } from "./components/dashboard/StudentDashboard"
import { FacultyDashboard } from "./components/dashboard/FacultyDashboard"
import { ProjectDetail } from "./components/projects/ProjectDetail"
import { ProjectCard } from "./components/projects/ProjectCard"
import { GlassCard } from "./components/ui/glass-card"
import { Toaster } from "./components/ui/sonner"
import { sampleProjects, getProjectsByUserId } from "./data/sampleData"
import { PortfolioSection } from "./components/dashboard/PortfolioSection"
import { MilestonesSection } from "./components/dashboard/MilestonesSection"
import { DiscoverSection } from "./components/dashboard/DiscoverSection"
import { SettingsSection } from "./components/dashboard/SettingsSection"
import { StudentsSection } from "./components/dashboard/StudentsSection"
import { AnalyticsSection } from "./components/dashboard/AnalyticsSection"



function AppContent() {
  const { user, isAuthenticated } = useAuth()
  const [currentView, setCurrentView] = useState("landing")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedProject, setSelectedProject] = useState(null)

  // If not authenticated, show landing or login
  if (!isAuthenticated) {
    if (currentView === "login") {
      return <LoginForm />
    }
    return <LandingPage onGetStarted={() => setCurrentView("login")} />
  }

  // Handle project creation/editing
  const handleCreateProject = () => {
    // In a real app, this would open a project creation modal/form
    console.log("Create project clicked")
  }

  const handleViewProject = project => {
    setSelectedProject(project)
  }

  const handleBackToProjects = () => {
    setSelectedProject(null)
  }

  // If viewing a specific project
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6D8BFF] via-[#8FD3FF] to-[#FFB86B] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header />
        <div className="flex">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 mr-4">
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToProjects}
              onEdit={() => console.log("Edit project")}
            />
          </main>
        </div>
        <Toaster />
      </div>
    )
  }

  // Main dashboard view
  const renderMainContent = () => {
    switch (activeTab) {
      case "dashboard":
        return user?.role === "student" ? (
          <StudentDashboard
            onCreateProject={handleCreateProject}
            onViewProject={handleViewProject}
          />
        ) : (
          <FacultyDashboard onViewProject={handleViewProject} />
        )

      case "projects":
        if (user?.role === "student") {
          const userProjects = getProjectsByUserId(user.id)
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Projects</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewProject={handleViewProject}
                  />
                ))}
              </div>
            </div>
          )
        } else {
          return (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Projects</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewProject={handleViewProject}
                    showOwner={true}
                  />
                ))}
              </div>
            </div>
          )
        }

      case "milestones":
  return <MilestonesSection />


      case "portfolio":
  return <PortfolioSection />

      case "discover":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Discover Projects</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProjects
                .filter(p => p.published)
                .map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewProject={handleViewProject}
                    showOwner={true}
                  />
                ))}
            </div>
          </div>
        )

      case "students":
  return <StudentsSection />

      case "analytics":
  return <AnalyticsSection />

      case "settings":
  return <SettingsSection />

      default:
        return (
          <GlassCard>
            <div className="p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
              <p className="text-muted-foreground">
                The requested page could not be found.
              </p>
            </div>
          </GlassCard>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6D8BFF] via-[#8FD3FF] to-[#FFB86B] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header onCreateProject={handleCreateProject} />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 ml-64 p-8 mr-4">{renderMainContent()}</main>
      </div>
      <Toaster />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}
