import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { GlassCard } from "../ui/glass-card"
import { useAuth } from "../../hooks/useAuth"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function LoginForm() {
  const { login, signup } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "rahul@example.com",
    password: "Password123"
  })

  // Signup form state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student"
  })

  const handleLogin = async e => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        toast.success("Welcome back!")
      } else {
        toast.error(
          "Invalid credentials. Please check your email and password."
        )
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async e => {
    e.preventDefault()

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    if (signupData.password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsLoading(true)

    try {
      const success = await signup(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role
      )
      if (success) {
        toast.success("Account created successfully!")
      } else {
        toast.error("Account with this email already exists.")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D8BFF] to-[#8FD3FF] flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] bg-clip-text text-transparent">
                ProTrackr
              </span>
            </div>
            <p className="text-muted-foreground">
              Track Progress. Showcase Success.
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-sm">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginData.email}
                    onChange={e =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={e =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      className="bg-white/50 border-white/20 backdrop-blur-sm pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] hover:from-[#5A7AFF] hover:to-[#7CC8FF] text-white border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-white/10 rounded-lg">
                <p className="text-sm font-medium mb-2">Test Accounts:</p>
                <div className="text-xs space-y-1 text-muted-foreground">
                  <p>Student: rahul@example.com / Password123</p>
                  <p>Faculty: arvind@example.edu / Password123</p>
                  <p>Admin: hari@example.edu / Password123</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Your full name"
                    value={signupData.name}
                    onChange={e =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signupData.email}
                    onChange={e =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <RadioGroup
                    value={signupData.role}
                    onValueChange={value =>
                      setSignupData({ ...signupData, role: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="faculty" id="faculty" />
                      <Label htmlFor="faculty">Faculty</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={e =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={e =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value
                      })
                    }
                    required
                    className="bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] hover:from-[#5A7AFF] hover:to-[#7CC8FF] text-white border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </GlassCard>
    </div>
  )
}
