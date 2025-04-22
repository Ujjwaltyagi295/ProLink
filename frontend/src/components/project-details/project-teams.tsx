"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Code2 } from "lucide-react"

export function ProjectTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Project Lead",
      avatar: "/placeholder.svg?height=100&width=100&text=AJ",
      bio: "Full-stack developer with 8 years of experience. Passionate about creating tools that improve developer productivity.",
      skills: ["React", "TypeScript", "Node.js", "System Architecture"],
      social: {
        github: "#",
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=100&width=100&text=SC",
      bio: "UI/UX specialist with a background in design. Loves creating intuitive and beautiful interfaces.",
      skills: ["React", "CSS", "UI/UX", "Animation"],
      social: {
        github: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "Marcus Williams",
      role: "Systems Engineer",
      avatar: "/placeholder.svg?height=100&width=100&text=MW",
      bio: "Low-level systems programmer with expertise in keyboard input handling and OS integration.",
      skills: ["C++", "System APIs", "Performance Optimization"],
      social: {
        github: "#",
        twitter: "#",
      },
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Project Team</h2>
        <p className="text-gray-700 mb-6">
          Meet the talented individuals behind this project. Our team is dedicated to creating a seamless keyboard
          experience across different operating systems.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {teamMembers.map((member) => (
          <motion.div key={member.id} variants={item}>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant="outline" className="h-fit">
                    {member.role}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{member.name}</CardTitle>
                <CardDescription>{member.bio}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {member.social.github && (
                    <a href={member.social.github} className="p-2 rounded-full hover:bg-gray-100">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="p-2 rounded-full hover:bg-gray-100">
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="p-2 rounded-full hover:bg-gray-100">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={`mailto:${member.name.toLowerCase().replace(" ", ".")}@example.com`}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Open Position Card */}
        <motion.div variants={item}>
          <Card className="border-dashed bg-gray-50/50 flex flex-col justify-center items-center p-8 h-full">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full mx-auto">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-lg">Join Our Team</h3>
              <p className="text-gray-600 text-sm">
                We're looking for talented developers to help us improve this project. Check out our open positions!
              </p>
              <Badge variant="outline" className="mx-auto">
                3 open positions
              </Badge>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
