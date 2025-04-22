"use client"

import * as React from "react"
import { X, Maximize2, Minimize2, Users, BarChart, FileText, MessageSquare, Check, XIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  status: "online" | "offline" | "away"
  lastActive?: string
}

interface Application {
  id: string
  userId: string
  name: string
  role: string
  avatar: string
  appliedDate: string
  status: "pending" | "accepted" | "rejected"
  experience: string
}

interface ProjectAnalytics {
  views: number
  applications: number
  rolesFilled: number
  totalRoles: number
  viewsHistory: number[]
  applicationsHistory: number[]
}

interface ProjectData {
  id: string
  name: string
  summary: string
  teamMembers: TeamMember[]
  applications: Application[]
  analytics: ProjectAnalytics
  startDate: string
  endDate: string
}

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  project: ProjectData | null
  isLoading:boolean
}

// Sample data
const sampleProject: ProjectData = {
  id: "1",
  name: "Website Redesign",
  description: "Complete overhaul of the company website with new branding and improved UX",
  startDate: "2023-07-01",
  endDate: "2023-09-30",
  teamMembers: [
    {
      id: "1",
      name: "John Wilson",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "2",
      name: "Sofia Harris",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "away",
      lastActive: "2 hours ago",
    },
    {
      id: "3",
      name: "Daniel Hill",
      role: "Project Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "4",
      name: "Eva Smith",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastActive: "1 day ago",
    },
  ],
  applications: [
    {
      id: "a1",
      userId: "u1",
      name: "Alex Johnson",
      role: "Frontend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-07-15",
      status: "pending",
      experience: "3 years",
    },
    {
      id: "a2",
      userId: "u2",
      name: "Maria Garcia",
      role: "UI/UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-07-12",
      status: "pending",
      experience: "5 years",
    },
    {
      id: "a3",
      userId: "u3",
      name: "Thomas Lee",
      role: "Backend Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-07-10",
      status: "accepted",
      experience: "4 years",
    },
    {
      id: "a4",
      userId: "u4",
      name: "Sarah Williams",
      role: "QA Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      appliedDate: "2023-07-08",
      status: "rejected",
      experience: "2 years",
    },
  ],
  analytics: {
    views: 1245,
    applications: 28,
    rolesFilled: 4,
    totalRoles: 6,
    viewsHistory: [120, 145, 165, 135, 190, 210, 280],
    applicationsHistory: [3, 5, 4, 2, 6, 4, 4],
  },
 
}

export function ProjectSidebar({ isOpen, onClose, project,isLoading=false}: ProjectSidebarProps) {
  const [isFullScreen, setIsFullScreen] = React.useState(false)

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  const handleAcceptApplication = (applicationId: string) => {
    // Handle accept application logic
    console.log("Accept application:", applicationId)
  }

  const handleRejectApplication = (applicationId: string) => {
    // Handle reject application logic
    console.log("Reject application:", applicationId)
  }

  // Animation variants
  const sidebarVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const cardContainerVariants = {
    expanded: {
      flexDirection: "row",
      alignItems: "center",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    normal: {
      flexDirection: "column",
      alignItems: "flex-start",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
  }
  if (isLoading) {
    return (
      <motion.div className="fixed top-0 right-0 h-full bg-background border-l z-50 w-full sm:w-[400px] p-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center justify-center h-[80%]">
          {/* Add your preferred loading spinner here */}
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </motion.div>
    );
  }

  // Regular rendering when we have project data
  if (!project) {
   
    return null;
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed top-0 right-0 h-full bg-background border-l z-50 overflow-hidden ${
            isFullScreen ? "w-[calc(100vw-16rem)]" : "w-full sm:w-[400px]"
          }`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <motion.h2
                className="text-xl font-semibold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.name}
              </motion.h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
                  {isFullScreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <motion.p className="text-muted-foreground mb-4" variants={itemVariants}>
                {project.summary}
              </motion.p>

              <motion.div className="flex justify-between text-sm text-muted-foreground mb-6" variants={itemVariants}>
                <div>Start: {new Date(project.startDate).toLocaleDateString()}</div>
                <div>End: {new Date(project.endDate).toLocaleDateString()}</div>
              </motion.div>
            </div>

            <div className="flex-1 overflow-auto">
              <Tabs defaultValue="team" className="w-full">
                <div className="px-4 border-b">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="team" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                    </TabsTrigger>
                    <TabsTrigger value="applications" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Applications</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex items-center gap-2">
                      <BarChart className="h-4 w-4" />
                      <span>Analytics</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="team" className="p-4 space-y-4">
                  <motion.h3 className="text-lg font-medium mb-4" variants={itemVariants}>
                    Team Members
                  </motion.h3>

                  <motion.div className="space-y-4">
                    {project.teamMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        variants={itemVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>
                              {`${member.name}`
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                              member.status === "online"
                                ? "bg-green-500"
                                : member.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            {member.role}
                            {member.status !== "online" && member.lastActive && (
                              <span className="text-xs">• {member.lastActive}</span>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="applications" className="p-4">
                  <motion.h3 className="text-lg font-medium mb-4" variants={itemVariants}>
                    Applications
                  </motion.h3>

                  <motion.div className="space-y-4">
                    {project.applications.map((application, index) => (
                      <motion.div
                        key={application.id}
                        variants={itemVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border ${
                          application.status === "accepted"
                            ? "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900"
                            : application.status === "rejected"
                              ? "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900"
                              : "border-gray-200 dark:border-gray-800"
                        }`}
                      >
                        <motion.div
                          className="flex items-start gap-4"
                          variants={cardContainerVariants}
                          animate={isFullScreen ? "expanded" : "normal"}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={application.avatar || "/placeholder.svg"} alt={application.name} />
                            <AvatarFallback>
                              {application.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>

                          <div className={`flex-1 ${isFullScreen ? "flex items-center gap-4" : ""}`}>
                            <div className={isFullScreen ? "w-1/3" : ""}>
                              <div className="font-medium">{application.name}</div>
                              <div className="text-sm text-muted-foreground">Applied for: {application.role}</div>
                            </div>

                            <div className={isFullScreen ? "w-1/3" : "mt-2"}>
                              <div className="text-sm">
                                <span className="text-muted-foreground">Experience:</span> {application.experience}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Applied: {new Date(application.appliedDate).toLocaleDateString()}
                              </div>
                            </div>

                            <div className={`flex ${isFullScreen ? "w-1/3 justify-end" : "mt-3 justify-between"}`}>
                              {application.status === "pending" ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="mr-2"
                                    onClick={() => handleAcceptApplication(application.id)}
                                  >
                                    <Check className="h-4 w-4 mr-1" /> Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive border-destructive hover:bg-destructive/10"
                                    onClick={() => handleRejectApplication(application.id)}
                                  >
                                    <XIcon className="h-4 w-4 mr-1" /> Reject
                                  </Button>
                                </>
                              ) : (
                                <Badge variant={application.status === "accepted" ? "success" : "destructive"}>
                                  {application.status === "accepted" ? "Accepted" : "Rejected"}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </TabsContent>

                <TabsContent value="analytics" className="p-4">
                  <motion.h3 className="text-lg font-medium mb-4" variants={itemVariants}>
                    Project Analytics
                  </motion.h3>

                  <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" variants={itemVariants}>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Project Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{project.analytics.views}</div>
                        <div className="text-xs text-muted-foreground">Last 30 days</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{project.analytics.applications}</div>
                        <div className="text-xs text-muted-foreground">Total applications</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Roles Filled</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {project.analytics.rolesFilled}/{project.analytics.totalRoles}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((project.analytics.rolesFilled / project.analytics.totalRoles) * 100)}% complete
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div className="space-y-6" variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Weekly Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[120px] flex items-end gap-2">
                          {project.analytics.viewsHistory.map((views, i) => (
                            <motion.div
                              key={i}
                              className="bg-primary/80 rounded-t w-full"
                              style={{ height: `${(views / Math.max(...project.analytics.viewsHistory)) * 100}%` }}
                              initial={{ height: 0 }}
                              animate={{ height: `${(views / Math.max(...project.analytics.viewsHistory)) * 100}%` }}
                              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium">Weekly Applications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[120px] flex items-end gap-2">
                          {project.analytics.applicationsHistory.map((apps, i) => (
                            <motion.div
                              key={i}
                              className="bg-blue-500/80 rounded-t w-full"
                              style={{
                                height: `${(apps / Math.max(...project.analytics.applicationsHistory)) * 100}%`,
                              }}
                              initial={{ height: 0 }}
                              animate={{
                                height: `${(apps / Math.max(...project.analytics.applicationsHistory)) * 100}%`,
                              }}
                              transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
