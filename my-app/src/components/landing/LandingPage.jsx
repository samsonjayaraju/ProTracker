import { ArrowRight, CheckCircle, Users, Target, Eye, Play } from "lucide-react"
import { Button } from "../ui/button"
import { GlassCard } from "../ui/glass-card"
import { Badge } from "../ui/badge"
import { ImageWithFallback } from "../figma/ImageWithFallback"

export function LandingPage({ onGetStarted }) {
  const features = [
    {
      icon: Target,
      title: "Milestone Tracking",
      description:
        "Break down projects into manageable milestones and track progress in real-time."
    },
    {
      icon: Eye,
      title: "Public Portfolios",
      description:
        "Showcase your best work with recruiter-friendly public portfolios."
    },
    {
      icon: Users,
      title: "Faculty Dashboard",
      description:
        "Teachers can monitor student progress and provide timely feedback."
    },
    {
      icon: CheckCircle,
      title: "Media Uploads",
      description:
        "Upload images, videos, and documents to showcase your projects."
    }
  ]

  const testimonials = [
    {
      name: "Rahul Chowdary",
      role: "Computer Science Student",
      content:
        "ProTrackr helped me organize my projects and made it easy to share my work with potential employers.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Prof. Arvind Rao",
      role: "Faculty, CS Department",
      content:
        "The faculty dashboard gives me great visibility into student progress. I can provide feedback right when it's needed.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Samson Jaya Raju",
      role: "UI/UX Design Student",
      content:
        "The portfolio feature helped me land my dream internship. Recruiters love the clean, professional presentation.",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6D8BFF] via-[#8FD3FF] to-[#FFB86B] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-4xl font-bold text-white dark:text-foreground">
                ProTrackr
              </span>
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Track Progress.
              <br />
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Showcase Success.
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for students to manage projects, track
              milestones, and create stunning portfolios that get noticed by
              recruiters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-white text-[#6D8BFF] hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 h-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button> */}
            </div>

            {/* Hero Image/Demo */}
            <GlassCard className="max-w-4xl mx-auto">
              <div className="p-1">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1565687981296-535f09db714e?w=1200&h=675&fit=crop"
                    alt="ProTrackr Dashboard Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm opacity-90">
                      Student Dashboard Preview
                    </p>
                    <p className="text-xs opacity-70">
                      Real-time project tracking and portfolio management
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            Features
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From project planning to portfolio showcase, ProTrackr provides all
            the tools students and faculty need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <GlassCard key={index} className="text-center">
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <Badge className="bg-white/20 text-white border-white/30 mb-4">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Loved by students and faculty
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            See what our users are saying about ProTrackr
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <GlassCard key={index}>
              <div className="p-8">
                <p className="text-white/90 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-white/70">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <GlassCard className="text-center">
          <div className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to transform your project management?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students and faculty already using ProTrackr to
              track progress and showcase success.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="bg-white text-[#6D8BFF] hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                Start Your Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("https://mail.google.com", "_blank")}
                className="border-white/30 bg-white text-[#6D8BFF] hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-6 h-auto"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold text-white">ProTrackr</span>
              </div>
              <p className="text-white/70">
                Empowering students to track progress and showcase success.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/70">
              © 2025 ProTrackr. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
