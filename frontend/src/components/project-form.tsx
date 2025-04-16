import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import BasicInfoStep from "./project-form/initial-info";
import ProjectDetailsStep from "./project-form/project-details";
import TechStackStep from "./project-form/tech-stack";
import ProjectRolesStep from "./project-form/project-roles";
import { useMutation } from "@tanstack/react-query";
import { publishProject } from "@/lib/api";
import { useFormStore } from "@/store/useProjectStore";
import { useParams } from "react-router-dom";
import { navigate } from "@/lib/navigation";
import { useToast } from "@/hooks/use-toast"
const steps = [
  { id: "basic-info", title: "Basic Information" },
  { id: "project-details", title: "Project Details" },
  { id: "tech-stack", title: "Tech Stack" },
  { id: "project-roles", title: "Project Roles" },
];

export default function ProjectForm() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const { projectData, setFormData, clearForm } = useFormStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setFormData({ id: id });
    }
  }, [id, setFormData]);

  const { mutate: publish } = useMutation({
    mutationFn: publishProject,
    mutationKey: ["publish"],
    onError: () => {
      toast({
        title: "Cannot publish project",
        description: "Please fill required fields",
        type: "error",
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Project published successfully!",
        type: "success",
      });
      clearForm();
      navigate("/dashboard/projects/find");
    },
  });

  const { mutate: saveDraft } = useMutation({
    mutationFn: publishProject,
    mutationKey: ["save-draft"],
    onMutate: () => setIsSavingDraft(true),
    onError: (error) => {
      setIsSavingDraft(false);
      toast({
        title: "Failed to save draft",
        description: String(error.message),
        type: "error",
      });
    },
    onSuccess: () => {
      setIsSavingDraft(false);
      toast({
        title: "Draft Saved",
        description: "Your project has been saved as a draft.",
        type: "success",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSaveDraft = () => {
    if (!projectData?.id) {
      toast({
        title: "Missing Project ",
        description: "Please create the project first to save it.",
        type: "error",
      });
      return;
    }
    setFormData({ status: "draft" });
    saveDraft(projectData);
  };

  const handlePublish =async () => {
    if (!projectData?.id) {
      toast({
        title: "Missing Project ",
        description: "Cannot publish without a project ID.",
        type: "error",
      });
      return;
    }
   await setFormData({ status: "published" });
    publish(projectData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <ProjectDetailsStep />;
      case 2:
        return <TechStackStep />;
      case 3:
        return <ProjectRolesStep />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm",
                index <= currentStep
                  ? "border-blue-500 bg-blue-500 text-white"
                  : "border-slate-300 text-slate-500"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => index < currentStep && setCurrentStep(index)}
              style={{ cursor: index < currentStep ? "pointer" : "default" }}
            >
              {index + 1}
            </motion.div>
            <span className="ml-2 hidden sm:block text-sm font-medium text-slate-700">
              {step.title}
            </span>
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
          className={cn(
            "flex items-center gap-2",
            isFirstStep ? "opacity-50" : ""
          )}
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
              disabled={!projectData?.id}
              onClick={handlePublish}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Publish
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
