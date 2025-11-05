import { GlassCard } from "../ui/glass-card"
import { Avatar } from "../ui/avatar" // if you don’t have one, you can use an <img />
import { Search, User } from "lucide-react"
import { Input } from "../ui/input"
import { sampleUsers } from "../../data/sampleData"

export function StudentsSection() {
  // Filter students from sampleUsers
  const students = sampleUsers.filter(user => user.role === "student")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search students..." className="w-64" />
          <button className="bg-gradient-to-r from-[#6D8BFF] to-[#8FD3FF] px-4 py-2 rounded-lg text-white">
            <Search className="w-4 h-4 inline-block mr-2" /> Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <GlassCard key={student.id}>
            <div className="p-6 flex flex-col items-center text-center space-y-3">
              <img
                src={student.avatarURL}
                alt={student.name}
                className="w-20 h-20 rounded-full border-2 border-white/20 object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{student.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {student.department} • {student.year}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{student.bio}</p>
              <div className="pt-2">
                <button className="text-sm text-blue-400 hover:underline">
                  View Profile
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
