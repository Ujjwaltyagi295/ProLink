
import { ArrowLeft, Calendar, Clock, Users, Bookmark, Share2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { projects } from "@/lib/data"
import { Link } from "react-router-dom"

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the project data based on the ID
  const project = projects.find((p) => p.id === params.id) || projects[0]

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link
          to="/"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to projects
        </Link>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button size="sm">Apply Now</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Project Description</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                  <p className="mt-4 text-muted-foreground">
                    We're building a platform that helps connect talented individuals with exciting collaborative
                    projects. Our goal is to create a space where people can find opportunities that match their skills
                    and interests, while project owners can find the perfect team members to bring their vision to life.
                  </p>
                  <p className="mt-4 text-muted-foreground">
                    This project requires expertise in frontend development, UI/UX design, and backend architecture.
                    We're looking for passionate individuals who are excited about building tools that help others
                    collaborate effectively.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Project Goals</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">User Authentication System</div>
                      <div className="text-xs text-muted-foreground">80%</div>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Project Browsing Interface</div>
                      <div className="text-xs text-muted-foreground">65%</div>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Matching Algorithm</div>
                      <div className="text-xs text-muted-foreground">40%</div>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <div className="text-sm font-medium">Collaboration Tools</div>
                      <div className="text-xs text-muted-foreground">20%</div>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Project Mockups</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      width={300}
                      height={200}
                      alt="Project mockup"
                      className="rounded-md object-cover"
                    />
                    <img
                      src="/placeholder.svg?height=200&width=300"
                      width={300}
                      height={200}
                      alt="Project mockup"
                      className="rounded-md object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Current Team</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Alex Johnson</div>
                        <div className="text-sm text-muted-foreground">Project Lead</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sam Taylor" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Sam Taylor</div>
                        <div className="text-sm text-muted-foreground">Frontend Developer</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Jamie Lee" />
                        <AvatarFallback>JL</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jamie Lee</div>
                        <div className="text-sm text-muted-foreground">UI/UX Designer</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Open Positions</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="mb-2 font-medium">Backend Developer</div>
                      <p className="text-sm text-muted-foreground">
                        We're looking for a backend developer with experience in Node.js and database design.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          Node.js
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          PostgreSQL
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          API Design
                        </Badge>
                      </div>
                      <Button size="sm" className="mt-3">
                        Apply for this role
                      </Button>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="mb-2 font-medium">DevOps Engineer</div>
                      <p className="text-sm text-muted-foreground">
                        Looking for someone with experience in CI/CD pipelines and cloud infrastructure.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs">
                          AWS
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Docker
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          GitHub Actions
                        </Badge>
                      </div>
                      <Button size="sm" className="mt-3">
                        Apply for this role
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requirements" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">Application Requirements</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Time Commitment</h3>
                    <p className="text-sm text-muted-foreground">
                      This project requires a commitment of 10-15 hours per week. We have team meetings every Tuesday
                      and Thursday.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Required Skills</h3>
                    <p className="text-sm text-muted-foreground">
                      Depending on the role you're applying for, you'll need relevant technical skills and experience.
                      We value collaborative team players who can communicate effectively.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Application Process</h3>
                    <p className="text-sm text-muted-foreground">
                      After submitting your application, we'll review your profile and experience. Shortlisted
                      candidates will be invited for a brief video interview with the project lead.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <h2 className="text-xl font-semibold">How to Apply</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    To apply for this project, click the "Apply Now" button and fill out the application form. Be sure
                    to highlight your relevant experience and explain why you're interested in joining this project.
                  </p>
                  <Button className="w-full sm:w-auto">Apply Now</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Project Timeline</div>
                    <div className="text-sm text-muted-foreground">Jan 2023 - Jul 2023</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Commitment</div>
                    <div className="text-sm text-muted-foreground">{project.timeline}</div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">Team Size</div>
                    <div className="text-sm text-muted-foreground">{project.teamSize}</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="mb-2 text-sm font-medium">Required Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Project Owner</h3>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Alex Johnson" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Alex Johnson</div>
                  <div className="text-sm text-muted-foreground">Project Lead</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Contact Project Owner
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="font-semibold">Similar Projects</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.slice(0, 2).map((similarProject) => (
                <div key={similarProject.id} className="flex gap-3">
                  <img
                    src={similarProject.thumbnail || "/placeholder.svg?height=60&width=60"}
                    width={60}
                    height={60}
                    alt={similarProject.title}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <Link to={`/projects/${similarProject.id}`} className="font-medium hover:underline">
                      {similarProject.title}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {similarProject.openPositions} open position{similarProject.openPositions !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
