import { Link, useParams } from "react-router-dom"
import { ArrowLeft, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ApplicationAttachments } from "./application-files"


// Mock data for a single application
const getApplication = (id: string | undefined) => {
  return {
    id,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    project: "Website Redesign",
    role: "UI/UX Designer",
    date: "Mar 15, 2025",
    status: "pending",
    avatar: "/placeholder.svg?height=80&width=80",
    resume: "alex_johnson_resume.pdf",
    joinReason:
      "I'm excited about this project because it aligns perfectly with my experience in creating user-centered designs. I've worked on similar website redesigns for companies in the same industry, and I believe my approach to UX research and UI implementation would be valuable to your team. I'm particularly interested in the challenge of balancing modern design trends with accessibility and usability principles.",
    skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Prototyping", "User Testing"],
    experience: "5 years",
    availability: "Immediate",
    trackedTime: "0h 0m",
  }
}

export default function ApplicationPage( ) {
  const {id}= useParams()
  const application= getApplication(id)
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-6 max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center gap-1 text-slate-700">
              <ArrowLeft className="h-4 w-4" /> Back to Applications
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name} />
                  <AvatarFallback>{application.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{application.name}</h1>
                  <p className="text-slate-500">{application.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{application.role}</Badge>
                    <Badge variant="outline">{application.project}</Badge>
                    {application.status === "pending" && (
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
                <Button variant="outline" className="gap-2">
                  <CheckCircle className="h-4 w-4" /> Accept
                </Button>
                <Button className="gap-2">
                  <Calendar className="h-4 w-4" /> Schedule Meeting
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Reason for Joining</h2>
                <p className="text-slate-600">{application.joinReason}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <ApplicationAttachments />
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h2 className="text-sm font-medium mb-4 text-slate-700">Application Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium capitalize text-slate-800">{application.status}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date Applied</span>
                    <span className="font-medium text-slate-800">{application.date}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-medium text-slate-800">{application.experience}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Availability</span>
                    <span className="font-medium text-slate-800">{application.availability}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Tracked time</span>
                    <span className="font-medium text-slate-800">{application.trackedTime}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h2 className="text-sm font-medium mb-4 text-slate-700">Project Information</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Project</span>
                    <span className="font-medium text-slate-800">{application.project}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Role</span>
                    <span className="font-medium text-slate-800">{application.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
