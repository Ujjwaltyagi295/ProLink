"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { AlertCircle, ArrowRight, Clock, Cpu, Database, Palette } from "lucide-react"

export function ProjectRequirements() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "frontend",
      title: "Frontend Developer",
      icon: <Palette className="h-5 w-5" />,
      description: "Implement the user interface and interactions",
      skills: ["React", "TypeScript", "CSS", "UI/UX"],
      positions: 2,
      commitment: "10-15 hours/week",
    },
    {
      id: "backend",
      title: "Backend Developer",
      icon: <Database className="h-5 w-5" />,
      description: "Build the API and server-side logic",
      skills: ["Node.js", "Express", "MongoDB", "API Design"],
      positions: 1,
      commitment: "15-20 hours/week",
    },
    {
      id: "systems",
      title: "Systems Engineer",
      icon: <Cpu className="h-5 w-5" />,
      description: "Work on low-level keyboard input handling",
      skills: ["C++", "System APIs", "Input Handling", "Performance Optimization"],
      positions: 1,
      commitment: "10-15 hours/week",
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
        <h2 className="text-2xl font-bold mb-4">Project Requirements</h2>
        <p className="text-gray-700 mb-6">
          We're looking for talented individuals to join our team and help develop this extension. Below are the roles
          we're currently recruiting for:
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {roles.map((role) => (
          <motion.div key={role.id} variants={item}>
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedRole === role.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedRole(role.id === selectedRole ? null : role.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">{role.icon}</div>
                  <Badge variant="outline">{role.positions} open</Badge>
                </div>
                <CardTitle className="mt-4">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  {role.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{role.commitment}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full justify-between"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedRole(role.id)
                  }}
                >
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {selectedRole && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{roles.find((r) => r.id === selectedRole)?.title} - Detailed Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Responsibilities:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {selectedRole === "frontend" ? (
                    <>
                      <li>Develop responsive and intuitive user interfaces</li>
                      <li>Implement keyboard shortcut visualization and configuration UI</li>
                      <li>Ensure cross-browser compatibility</li>
                      <li>Work with designers to implement UI/UX improvements</li>
                      <li>Write clean, maintainable code with proper documentation</li>
                    </>
                  ) : selectedRole === "backend" ? (
                    <>
                      <li>Design and implement RESTful APIs</li>
                      <li>Develop user authentication and profile management</li>
                      <li>Create cloud sync functionality for settings</li>
                      <li>Optimize database queries and server performance</li>
                      <li>Implement security best practices</li>
                    </>
                  ) : (
                    <>
                      <li>Develop low-level keyboard input handling</li>
                      <li>Implement cross-platform compatibility (Windows/Mac)</li>
                      <li>Optimize performance for minimal system impact</li>
                      <li>Create robust error handling and recovery mechanisms</li>
                      <li>Work on system integration with various applications</li>
                    </>
                  )}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>
                    2+ years of experience in{" "}
                    {selectedRole === "frontend"
                      ? "frontend development"
                      : selectedRole === "backend"
                        ? "backend development"
                        : "systems programming"}
                  </li>
                  <li>
                    Strong knowledge of{" "}
                    {selectedRole === "frontend"
                      ? "React and TypeScript"
                      : selectedRole === "backend"
                        ? "Node.js and databases"
                        : "C++ and system APIs"}
                  </li>
                  <li>Experience with version control systems (Git)</li>
                  <li>Excellent problem-solving skills</li>
                  <li>Good communication and teamwork abilities</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Important Note</h4>
                  <p className="text-amber-700 text-sm">
                    This is a collaborative open-source project. While there is no direct monetary compensation, you'll
                    gain valuable experience, build your portfolio, and be credited as a contributor.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply for this role</Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
