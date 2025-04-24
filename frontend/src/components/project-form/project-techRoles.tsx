
import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { X, Check } from "lucide-react"
import { techStackEnum } from "@/lib/schema"
import { formatData } from "@/lib/utils"

export function ProjectTechStackForm() {
  const { control, watch, setValue } = useFormContext<{ techStack: string[] }>()
  const techStack = watch("techStack") || []

  const handleTechSelect = (tech: string) => {
    const currentTech = techStack
    if (currentTech.includes(tech)) {
      setValue(
        "techStack",
        currentTech.filter((t: string) => t !== tech)
      )
    } else {
      setValue("techStack", [...currentTech, tech])
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <FormField
        control={control}
        name="techStack"
        render={() => (
          <FormItem>
            <FormLabel className="text-lg font-medium">Tech Stack</FormLabel>
            <FormDescription>Select the technologies that will be used in this project.</FormDescription>

            <FormControl>
              <div className="space-y-6">
                {techStack.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Selected Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech: string) => (
                        <Badge
                          key={tech}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1.5 flex items-center gap-1"
                          onClick={() => handleTechSelect(tech)}
                        >
                          {formatData(tech)}
                          <X className="h-3 w-3 cursor-pointer" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {techStackEnum.map((tech) => (
                    <div
                      key={tech}
                      className={`flex items-center border rounded-md px-4 py-3 cursor-pointer transition-all ${
                        techStack.includes(tech)
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                      onClick={() => handleTechSelect(tech)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          techStack.includes(tech) ? "border-blue-500 bg-blue-500" : "border-slate-300"
                        }`}
                      >
                        {techStack.includes(tech) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className="text-sm">{formatData(tech)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  )
}
