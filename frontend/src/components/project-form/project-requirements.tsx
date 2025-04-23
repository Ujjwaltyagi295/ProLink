
import { useFormContext } from "react-hook-form"
import { motion } from "framer-motion"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ecosystemEnum, projectStageEnum } from "@/lib/schema"
import { formatData } from "@/lib/utils"


const meetingFrequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "asNeeded", label: "As needed" },
]

const timezoneOptions = [
  { value: "any", label: "Any Timezone" },
  { value: "americas", label: "Americas (UTC-8 to UTC-3)" },
  { value: "europe", label: "Europe/Africa (UTC-1 to UTC+3)" },
  { value: "asia", label: "Asia/Pacific (UTC+5 to UTC+12)" },
]

export  function ProjectRequirementsForm() {
  const {control} = useFormContext()
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-medium">Project Details</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="ecosystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ecosystem</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                      <SelectValue placeholder="Select ecosystem" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ecosystemEnum.map((option) => (
                      <SelectItem key={option} value={option}>
                        {formatData(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Stage</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                      <SelectValue placeholder="Select project stage" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projectStageEnum.map((option) => (
                      <SelectItem key={option} value={option}>
                        {formatData(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live URL (if available)</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://your-project.com"
                  {...field}
                  value={field.value || ""}
                  className="focus-visible:ring-blue-500 transition-all duration-200"
                />
              </FormControl>
              <FormDescription>Link to your project if it's already live or has a demo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-lg font-medium">Team Requirements</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team Size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={2}
                    defaultValue={field.value || 2}
                    placeholder="e.g., 5"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 2)}
                    className="focus-visible:ring-blue-500 transition-all duration-200"
                  />
                </FormControl>
                <FormDescription>Total number of people you're looking for (including yourself).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="hoursPerWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours Per Week</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    placeholder="e.g., 10"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || undefined)}
                    className="focus-visible:ring-blue-500 transition-all duration-200"
                  />
                </FormControl>
                <FormDescription>Expected time commitment per week.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="timeCommitment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Commitment</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Part-time, Weekends only"
                  {...field}
                  value={field.value || ""}
                  className="focus-visible:ring-blue-500 transition-all duration-200"
                />
              </FormControl>
              <FormDescription>
                Describe the expected time commitment (e.g., "Part-time", "Evenings only").
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-slate-200">
        <h3 className="text-lg font-medium">Collaboration Details</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="meetingFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Frequency</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                      <SelectValue placeholder="Select meeting frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {meetingFrequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="timezonePreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timezone Preference</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                      <SelectValue placeholder="Select timezone preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timezoneOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="applicationProcess"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Process</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe how interested people should apply and what information you need from them"
                  value={field.value || ""}
                  onChange={field.onChange}
                  className="min-h-[100px] focus-visible:ring-blue-500 transition-all duration-200"
                />
              </FormControl>
              <FormDescription>
                This will help potential team members understand how to join your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </motion.div>
  )
}
