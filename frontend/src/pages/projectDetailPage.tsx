import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, Download, ExternalLink, Github, Link2, MessageSquare, Plus, Share2 } from "lucide-react"

import { ProjectRequirements } from "@/components/project-details/project-requirements"
import { ProjectTeam } from "@/components/project-details/project-teams"


export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width on desktop */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-gray-100 p-4 rounded-xl w-24 h-24 flex items-center justify-center shrink-0">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Keyboard Win Mac Switch icon"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold">Keyboard Win Mac Switch</h1>
                <p className="text-gray-600">This extension allows you to switch alt and window keys</p>

                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg?height=24&width=24" alt="@fab_uleuh" />
                      <AvatarFallback>FU</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">fab_uleuh</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">135 Installs</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>Apply now</Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-100 rounded-full p-1">
                <TabsTrigger value="overview" className="rounded-full">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="requirements" className="rounded-full">
                  Requirements
                </TabsTrigger>
                <TabsTrigger value="team" className="rounded-full">
                  Team
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab Content */}
              <TabsContent value="overview" className="mt-6 space-y-6 animate-in fade-in-50 duration-300">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Keyboard Win Mac switch</h2>
                  <p className="text-gray-700 mb-6">
                    This Raycast extension allows you to switch alt and window keys, making it easier for users who work
                    across different operating systems to maintain consistent keyboard shortcuts.
                  </p>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Features</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Seamlessly switch between Windows and Mac keyboard layouts</li>
                      <li>Customize key mappings to your preference</li>
                      <li>Automatically detect and apply settings based on connected keyboards</li>
                      <li>Low system resource usage</li>
                      <li>Works with all major applications</li>
                    </ul>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h3 className="text-xl font-semibold">How it works</h3>
                    <p className="text-gray-700">
                      The extension intercepts keyboard inputs and remaps them according to your configuration. This is
                      particularly useful for users who frequently switch between Windows and Mac environments and want
                      to maintain muscle memory for keyboard shortcuts.
                    </p>
                  </div>
                </div>

             
              </TabsContent>

              {/* Requirements Tab Content */}
              <TabsContent value="requirements" className="mt-6">
                <ProjectRequirements />
              </TabsContent>

              {/* Team Tab Content */}
              <TabsContent value="team" className="mt-6">
                <ProjectTeam />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                  System
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                  Productivity
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-gray-800">
                  Utilities
                </Badge>
              </div>
            </div>

            {/* Source Code */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">Source code</h3>
              <Button variant="outline" className="w-full justify-start">
                <Github className="mr-2 h-4 w-4" />
                View source
                <ExternalLink className="ml-auto h-4 w-4" />
              </Button>
            </div>

            {/* Actions */}
            <div className="bg-gray-50 p-6 rounded-xl space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Report Bug
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Request Feature
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Link2 className="mr-2 h-4 w-4" />
                Copy URL
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {/* People also like */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-4">People also like</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <img
                            src={`/placeholder.svg?height=32&width=32&text=${i}`}
                            alt={`Similar project ${i}`}
                            width={32}
                            height={32}
                            className="rounded-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {i === 1 ? "Keyboard Maestro" : i === 2 ? "Key Mapper Pro" : "Shortcut Sync"}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {i === 1
                              ? "Advanced keyboard customization"
                              : i === 2
                                ? "Remap any key on your keyboard"
                                : "Sync shortcuts across devices"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
