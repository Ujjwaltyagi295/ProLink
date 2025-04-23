import {motion} from "motion/react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
  
import { projectCategoryEnum } from "@/lib/schema";
import { formatData } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";

export const ProjectDetailsForm = () => {
  const { control, setValue } = useFormContext()

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const handleFileChange = useCallback(
    (field: "avatar" | "banner") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        const preview = reader.result as string
        if (field === "avatar") {
          setAvatarPreview(preview)
          setValue("avatar", file)
        } else {
          setBannerPreview(preview)
          setValue("banner", file)
        }
      }
      reader.readAsDataURL(file)
    },
    [setValue]
  )

  const removeFile = useCallback(
    (field: "avatar" | "banner") => {
      if (field === "avatar") {
        setAvatarPreview(null)
        setValue("avatar", null)
      } else {
        setBannerPreview(null)
        setValue("banner", null)
      }
    },
    [setValue]
  )
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}}

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
      <motion.div variants={itemVariants}>
      <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="My Awesome Project"
                  {...field}
                  className="focus-visible:ring-blue-500 transition-all duration-200"
                />
              </FormControl>
              <FormDescription>Choose a clear and memorable name for your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
      <FormField
          control={control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief summary of your project (1-2 sentences)"
                 {...field}
                 value={field.value || ""}
                  className="resize-none focus-visible:ring-blue-500 transition-all duration-200"
                  rows={2}
                />
              </FormControl>
              <FormDescription>This will appear in project listings and search results.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
      <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detailed description of your project, its goals, and vision"
                  {...field}
                  value={field.value || ""}
                  className="min-h-[150px] focus-visible:ring-blue-500 transition-all duration-200"
                />
              </FormControl>
              <FormDescription>Markdown formatting is supported.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
      <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}  value={field.value || ""} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projectCategoryEnum.map((category) => (
                    <SelectItem key={category} value={category}>
                      {formatData(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose the category that best describes your project.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="pt-4">
    <h3 className="text-lg font-medium mb-4">Project Images</h3>
    <div className="grid md:grid-cols-2 gap-8">
      <FormField
        control={control}
        name="avatar"
        render={() => (
          <FormItem>
            <FormLabel>Project Avatar</FormLabel>
            <FormControl>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 transition-colors hover:border-blue-500">
                {avatarPreview ? (
                  <div className="relative flex justify-center">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("avatar")}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">Click to upload avatar image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange("avatar")}
                    />
                  </label>
                )}
              </div>
            </FormControl>
            <FormDescription className="text-center mt-2">
              Square image, 1:1 ratio
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="banner"
        render={() => (
          <FormItem>
            <FormLabel>Project Banner</FormLabel>
            <FormControl>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 transition-colors hover:border-blue-500">
                {bannerPreview ? (
                  <div className="relative flex justify-center">
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("banner")}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">Click to upload banner image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange("banner")}
                    />
                  </label>
                )}
              </div>
            </FormControl>
            <FormDescription className="text-center mt-2">
              Recommended size: 1200×630
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  </motion.div>
  
    </motion.div>
  );
};
