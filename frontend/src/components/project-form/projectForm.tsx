import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Loader2, Save, ChevronRight, ChevronLeft } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Progress } from "@/components/ui/progress";
import { projectSchema } from "@/lib/schema";
import { useFormStore } from "@/store/useProjectStore";
import { ProjectDetailsForm } from "./project-details-form";
import { ProjectRolesForm } from "./project-roles";
import { ProjectTechStackForm } from "./project-techRoles";
import { ProjectRequirementsForm } from "./project-requirements";
import { useMyprojectQuery } from "@/services/myProjectQuery";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { myprojects } from "@/lib/api";

const steps = [
  { id: "details", title: "Project Details" },
  { id: "roles", title: "Team Roles" },
  { id: "tech", title: "Tech Stack" },
  { id: "requirements", title: "Requirements" },
];

export default function ProjectForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const { updateProject } = useMyprojectQuery();
  const { projectData, setFormData, clearForm } = useFormStore();
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: projectData,
  });

  const { id } = useParams();
  const createProject = async (data: z.infer<typeof projectSchema>) => {
    console.log("Form submitted with data:", data);
    setIsSaving(true);
   
    try {
      let avatarUrl 
      let bannerUrl
      if(projectData.avatarFile){
      avatarUrl=  await myprojects.uploadImage(projectData.avatarFile)

      }
      if(projectData.bannerFile){
         bannerUrl=  await myprojects.uploadImage(projectData.bannerFile)
        }
      if (id) {
        updateProject({ ...data, status: "published", id: id ,banner:bannerUrl,avatar:avatarUrl});
      }

      form.reset();
      setCurrentStep(0);
      clearForm();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsDraftSaving(true);
    try {
      const isValid = await form.trigger();
      if (!isValid) return;

      const formData = form.getValues();
      console.log(formData);
      setFormData({ ...formData, status: "draft" });
      if (id) {
        updateProject({ ...formData, status: "draft", id: id });
      }
    } catch (error) {
      console.error("Draft save failed:", error);
    } finally {
      setIsDraftSaving(false);
    }
  };

  const validateCurrentStep = () => {
    const formData = form.getValues();
    switch (currentStep) {
      case 0:
        return formData.description && formData.category;
       case 1:
        return formData.roles && formData.roles.length>0
      default:
        return true;
    }
  };
  const nextStep = async () => {
    const isValid = await form.trigger();
    if (!validateCurrentStep()) {
      toast({
        title: "Validation error",
        description: "Please complete all required fields before proceeding.",
        type: "error",
      });
      return;
    }
    if (isValid && currentStep < steps.length - 1) {
      setFormData(form.getValues());
      setCurrentStep(currentStep + 1);
    }
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setFormData(form.getValues());
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-white shadow-md border border-slate-200 rounded-xl overflow-hidden">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <motion.h2
              key={currentStep}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-medium text-slate-500"
            >
              Step {currentStep + 1} of {steps.length}:{" "}
              {steps[currentStep].title}
            </motion.h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isDraftSaving}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              {isDraftSaving ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-3 w-3" />
                  Save Draft
                </>
              )}
            </Button>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ originX: 0 }}
          >
            <Progress value={progress} className="h-2 bg-slate-100" />
          </motion.div>
        </div>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Form submitted directly");
              createProject(form.getValues());
            }}
            className="space-y-8"
          >
            <FormProvider {...form}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[currentStep].id}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="min-h-[400px]"
                >
                  {currentStep === 0 && <ProjectDetailsForm />}
                  {currentStep === 1 && <ProjectRolesForm />}
                  {currentStep === 2 && <ProjectTechStackForm />}
                  {currentStep === 3 && <ProjectRequirementsForm />}
                </motion.div>
              </AnimatePresence>
            </FormProvider>
            <motion.div
              className="flex justify-between pt-6 border-t border-slate-200"
              variants={stepVariants}
            >
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="text-slate-600 hover:bg-slate-100 transition-all duration-200"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={(e)=>{e.preventDefault()  
                    nextStep()}}
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
              
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </Button>
              )}
            </motion.div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
