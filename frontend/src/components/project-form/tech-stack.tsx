"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Badge } from "@/components/ui/badge"
import { type ProjectFormData, techStackEnum, type TechStack } from "@/lib/schema"
import { cn } from "@/lib/utils"

interface TechStackStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

// Group tech stack by category
const techStackCategories = {
  Frontend: ["react", "vue", "angular", "svelte", "next_js", "tailwind", "typescript"],
  Backend: ["node_js", "express", "django", "flask", "spring", "laravel", "ruby_rails"],
  Mobile: ["react_native", "flutter", "swift", "kotlin"],
  Database: ["postgresql", "mongodb", "mysql", "redis", "dynamodb"],
  "Cloud/DevOps": ["aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci_cd"],
  Other: ["graphql", "rest", "websockets", "blockchain", "ai_ml", "other"],
}

export default function TechStackStep({ formData, updateFormData }: TechStackStepProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const formatTechName = (tech: string) => {
    return tech
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const toggleTechStack = (tech: TechStack) => {
    const currentTechStack = [...formData.techStack]
    const techIndex = currentTechStack.indexOf(tech)

    if (techIndex === -1) {
      // Add tech
      updateFormData({ techStack: [...currentTechStack, tech] })
    } else {
      // Remove tech
      currentTechStack.splice(techIndex, 1)
      updateFormData({ techStack: currentTechStack })
    }
  }

  const filteredTechStack = searchTerm
    ? techStackEnum.filter((tech) => formatTechName(tech).toLowerCase().includes(searchTerm.toLowerCase()))
    : null

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Tech Stack
      </motion.h2>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search technologies..."
            className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {formData.techStack.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <Label className="text-slate-700 mb-2 block">Selected Technologies</Label>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
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
          </motion.div>
        )}

        {searchTerm ? (
          <div className="space-y-4">
            <Label className="text-slate-700">Search Results</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredTechStack?.map((tech) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center p-3 rounded-md border cursor-pointer transition-colors",
                    formData.techStack.includes(tech)
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50",
                  )}
                  onClick={() => toggleTechStack(tech)}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                      formData.techStack.includes(tech) ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300",
                    )}
                  >
                    {formData.techStack.includes(tech) && <Check size={12} />}
                  </div>
                  <span className="text-sm">{formatTechName(tech)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(techStackCategories).map(([category, techs]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label className="text-slate-700">{category}</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {techs.map((tech) => (
                    <motion.div
                      key={tech}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "flex items-center p-3 rounded-md border cursor-pointer transition-colors",
                        formData.techStack.includes(tech as TechStack)
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50",
                      )}
                      onClick={() => toggleTechStack(tech as TechStack)}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                          formData.techStack.includes(tech as TechStack)
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-slate-300",
                        )}
                      >
                        {formData.techStack.includes(tech as TechStack) && <Check size={12} />}
                      </div>
                      <span className="text-sm">{formatTechName(tech)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
