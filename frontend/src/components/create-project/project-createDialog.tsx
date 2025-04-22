"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/useProjectStore";
import { useToast } from "@/hooks/use-toast";
import { useMyprojectQuery } from "@/services/myProjectQuery";



export default function ProjectDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const { toast } = useToast();
 
  const {createProject} = useMyprojectQuery()
  const { projectData, setFormData } = useFormStore();
  const [joinCode, setJoinCode] = React.useState("");
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-[#1c1c1e] border border-[#2c2c2e] shadow-lg text-gray-200">
        <DialogHeader>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="bg-[#2c2c2e] text-blue-500 px-2 py-1 rounded text-xs">
              ProLink
            </span>
            <span className="text-gray-500">›</span>
            <span className="text-white">New Project</span>
          </div>
          <DialogTitle className="text-2xl font-semibold text-white mt-2">
            Join or Create a Project
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="create" className="mt-4">
          <TabsList className="bg-[#2c2c2e] border border-[#3a3a3c]">
            <TabsTrigger
              value="create"
              className="text-white data-[state=active]:bg-[#007aff] data-[state=active]:text-white"
            >
              Create
            </TabsTrigger>
            <TabsTrigger
              value="join"
              className="text-white data-[state=active]:bg-[#007aff] data-[state=active]:text-white"
            >
              Join
            </TabsTrigger>
          </TabsList>

          {/* Create Tab */}
          <TabsContent value="create" className="mt-4 space-y-4">
            <Input
              placeholder="Project name"
              value={projectData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              className="bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#007aff]"
            />

            <Textarea
              placeholder="Short summary"
              value={projectData.summary}
              onChange={(e) => {
                setFormData({ summary: e.target.value });
              }}
              className="bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#007aff] min-h-[80px]"
            />

            <DialogFooter className="mt-6 flex justify-end">
              <Button
                onClick={() => {
                  if (
                    projectData.summary.length  > 10 &&
                    projectData.summary.length < 300 &&
                    projectData.name.length > 4
                  ) {
                    createProject(projectData);
                  } else {
                    toast({
                      title: "Invalid Length",
                      description:
                        "Summary/Project name must be 10-200 characters.",
                      type: "error",
                    });
                  }
                }}
                className="bg-[#007aff] text-white hover:bg-[#005ecb]"
              >
                Create project
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* Join Tab */}
          <TabsContent value="join" className="mt-4 space-y-4">
            <Input
              placeholder="Join via code"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              className="bg-[#1c1c1e] border border-[#2c2c2e] text-white placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#007aff]"
            />

            <DialogFooter className="mt-6 flex justify-end">
              <Button className="bg-[#007aff] text-white hover:bg-[#005ecb]">
                Join project
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
