"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Save, Loader2, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { ProjectFormData } from "@/lib/schema"
import BasicInfoStep from "./project-form/initial-info"
import ProjectDetailsStep from "./project-form/project-details"
import TechStackStep from "./project-form/tech-stack"
import ProjectRolesStep from "./project-form/project-roles"
import { cn } from "@/lib/utils"

const steps = [
  { id: "basic-info", title: "Basic Information" },
  { id: "project-details", title: "Project Details" },
  { id: "tech-stack", title: "Tech Stack" },
  { id: "project-roles", title: "Project Roles" },
]

const initialFormData: ProjectFormData = {
  name: "",
  description: "",
  banner: "",
  avatar: "",
  category: "",
  ecosystem: "",
  status: "draft",
  stage: "",
  repoUrl: "",
  liveUrl: "",
  techStack: [],
  roles: [],
}

export default function ProjectForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)

  const updateFormData = (data: Partial<ProjectFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", formData)

      // Reset form after successful submission
      setFormData(initialFormData)
      setCurrentStep(0)

      // Show success message or redirect
      alert("Project created successfully!")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to create project. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Draft saved:", formData)

      // Show success message
      alert("Draft saved successfully!")
    } catch (error) {
      console.error("Error saving draft:", error)
      alert("Failed to save draft. Please try again.")
    } finally {
      setIsSavingDraft(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />
      case 1:
        return <ProjectDetailsStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <TechStackStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <ProjectRolesStep formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm",
                index <= currentStep ? "border-blue-500 bg-blue-500 text-white" : "border-slate-300 text-slate-500",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => index < currentStep && setCurrentStep(index)}
              style={{ cursor: index < currentStep ? "pointer" : "default" }}
            >
              {index + 1}
            </motion.div>
            <span className="ml-2 hidden sm:block text-sm font-medium text-slate-700">{step.title}</span>
            {index < steps.length - 1 && (
              <div className="w-12 sm:w-24 h-1 mx-2 bg-slate-200">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: index < currentStep ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <Card className="border-slate-200 shadow-lg">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className={cn("flex items-center gap-2", isFirstStep ? "opacity-50" : "")}
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSavingDraft}
            className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center gap-2"
          >
            {isSavingDraft ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FileDown size={16} />
                Save Draft
              </>
            )}
          </Button>

          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Project
                </>
              )}
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              Next
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
