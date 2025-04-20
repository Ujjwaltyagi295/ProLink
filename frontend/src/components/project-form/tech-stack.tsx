import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "../ui/lable" 
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { TechStack, techStackEnum } from "@/lib/schema"
import { useFormStore } from "@/store/useProjectStore"

export default function TechStackStep() {
  const [searchTerm, setSearchTerm] = useState("")
  const { projectData, setFormData } = useFormStore()
  
  const formatTechName = (tech: string) =>
    tech
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

  const toggleTechStack = (tech: TechStack) => {
    const updatedTechs = projectData.techStack?.includes(tech)
      ? projectData.techStack.filter(t => t !== tech)
      : [...(projectData.techStack || []), tech]
    
    setFormData({ ...projectData, techStack: updatedTechs })
  }

  const filteredTechs = searchTerm
    ? techStackEnum.filter((tech) =>
        formatTechName(tech).toLowerCase().includes(searchTerm.toLowerCase())
      )
    : techStackEnum

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Tech Stack
      </motion.h2>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search technologies..."
          className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {(projectData.techStack?.length > 0) && (
        <div className="mb-6">
          <Label className="text-slate-700 mb-2 block">Selected Technologies</Label>
          <div className="flex flex-wrap gap-2">
            {projectData.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer px-3 py-1"
                onClick={() => toggleTechStack(tech)}
              >
                {formatTechName(tech)}
                <X size={14} className="ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredTechs.map((tech) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex items-center p-3 rounded-md border cursor-pointer transition-colors",
                projectData.techStack?.includes(tech)
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50",
              )}
              onClick={() => toggleTechStack(tech)}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                  projectData.techStack?.includes(tech)
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-slate-300",
                )}
              >
                {projectData.techStack?.includes(tech) && <Check size={12} />}
              </div>
              <span className="text-sm">{formatTechName(tech)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}