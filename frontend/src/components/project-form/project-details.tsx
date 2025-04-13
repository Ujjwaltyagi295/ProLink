"use client"

import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  type ProjectFormData,
  projectCategoryEnum,
  ecosystemEnum,
  projectStatusEnum,
  projectStageEnum,
} from "@/lib/schema"

interface ProjectDetailsStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

export default function ProjectDetailsStep({ formData, updateFormData }: ProjectDetailsStepProps) {
  const formatEnumValue = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

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
          <Select value={formData.category} onValueChange={(value) => updateFormData({ category: value as any })}>
            <SelectTrigger className="border-slate-300 focus:ring-blue-500">
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
          <Select value={formData.ecosystem} onValueChange={(value) => updateFormData({ ecosystem: value as any })}>
            <SelectTrigger className="border-slate-300 focus:ring-blue-500">
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
          <Label htmlFor="status" className="text-slate-700">
            Status <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.status} onValueChange={(value) => updateFormData({ status: value as any })}>
            <SelectTrigger className="border-slate-300 focus:ring-blue-500">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {projectStatusEnum.map((status) => (
                <SelectItem key={status} value={status}>
                  {formatEnumValue(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage" className="text-slate-700">
            Project Stage <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.stage} onValueChange={(value) => updateFormData({ stage: value as any })}>
            <SelectTrigger className="border-slate-300 focus:ring-blue-500">
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
          <Label htmlFor="repoUrl" className="text-slate-700">
            Repository URL
          </Label>
          <Input
            id="repoUrl"
            value={formData.repoUrl}
            onChange={(e) => updateFormData({ repoUrl: e.target.value })}
            placeholder="https://github.com/username/repo"
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="liveUrl" className="text-slate-700">
            Live URL
          </Label>
          <Input
            id="liveUrl"
            value={formData.liveUrl}
            onChange={(e) => updateFormData({ liveUrl: e.target.value })}
            placeholder="https://your-project.com"
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </motion.div>
    </div>
  )
}
