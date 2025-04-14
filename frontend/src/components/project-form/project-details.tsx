"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "../ui/lable"
import { useFormStore } from "@/store/useProjectStore"
import { ecosystemEnum, projectCategoryEnum, ProjectStage, projectStageEnum } from "@/lib/schema"

const formatEnumValue = (value: string) =>
  value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export default function ProjectDetailsStep() {
  const { projectData, setFormData } = useFormStore()

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Project Details
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <Label htmlFor="category" className="text-slate-700">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={projectData.category} onValueChange={(value) => setFormData({ category: value })}>
            <SelectTrigger className="border-slate-300 focus:ring-emerald-500">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {projectCategoryEnum.map((category) => (
                <SelectItem key={category} value={category}>
                  {formatEnumValue(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ecosystem" className="text-slate-700">
            Ecosystem <span className="text-red-500">*</span>
          </Label>
          <Select value={projectData.ecosystem} onValueChange={(value) => setFormData({ ecosystem: value })}>
            <SelectTrigger className="border-slate-300 focus:ring-emerald-500">
              <SelectValue placeholder="Select ecosystem" />
            </SelectTrigger>
            <SelectContent>
              {ecosystemEnum.map((ecosystem) => (
                <SelectItem key={ecosystem} value={ecosystem}>
                  {formatEnumValue(ecosystem)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage" className="text-slate-700">
            Project Stage <span className="text-red-500">*</span>
          </Label>
          <Select value={projectData.stage} onValueChange={(value: ProjectStage) => setFormData({ stage: value })}>
            <SelectTrigger className="border-slate-300 focus:ring-emerald-500">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {projectStageEnum.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {formatEnumValue(stage)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <Label htmlFor="liveUrl" className="text-slate-700">
            Live URL
          </Label>
          <Input
            id="liveUrl"
            value={projectData.liveUrl }
            onChange={(e) => setFormData({ liveUrl: e.target.value })}
            placeholder="https://your-project.com"
            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </motion.div>
    </div>
  )
}
