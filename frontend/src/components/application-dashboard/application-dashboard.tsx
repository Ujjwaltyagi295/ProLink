import { useState } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { ApplicationsTable } from "./application-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatisticsPanel } from "./stats-panel";
import { motion, AnimatePresence } from "framer-motion";
import { useMyprojectQuery } from "@/services/myProjectQuery";
import { ProjectData } from "@/types/project";
import { formatData } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
interface userData{
  id:string
}
export function ApplicationsDashboard() {
  const [filter, setFilter] = useState("all");
  const [showStats, setShowStats] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { projects,isLoading,error } = useMyprojectQuery();
  const {user}= useAuth()
  const userId = user as userData
 
    const projectData = projects as ProjectData[];
    const visibleProjects = projectData?.filter(project => {
  
      if (project.ownerId === userId.id) return true;
    
      const isMember = project.members.some(m => m.userId === userId.id);
    
      return !isMember;
    });

  if(isLoading){
    return (<>loading</>)
  }
  if(error){
    return (<div>Something went wrong </div>)
  }
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">
            Project Applications
          </h1>
          <div className="flex items-center gap-2">
            <div className="relative"></div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {visibleProjects?.map((p) => (
                  <SelectItem key={p.id} value={p.name || ""}>
                    {formatData(p.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-slate-700">
            Dashboard Overview
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-1 text-slate-600"
          >
            {showStats ? (
              <>
                Hide Statistics <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show Statistics <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <StatisticsPanel />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All Applications</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "all" && (
                  <ApplicationsTable projects={visibleProjects} filter={filter} status="all" />
                )}
                {activeTab === "pending" && (
                  <ApplicationsTable projects={visibleProjects} filter={filter} status="pending" />
                )}
                {activeTab === "accepted" && (
                  <ApplicationsTable projects={visibleProjects} filter={filter} status="accepted" />
                )}
                {activeTab === "rejected" && (
                  <ApplicationsTable  projects={visibleProjects} filter={filter} status="rejected" />
                )}
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
