"use client";

import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useFormStore } from "@/store/useProjectStore";
import { useState } from "react";

export default function BasicInfoStep() {
  const { projectData, setFormData } = useFormStore();
  const [bannerPreview, setBannerPreview] = useState<string | null>(projectData.banner || null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(projectData.avatar || null)

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setBannerPreview(result)
        setFormData({ bannerFile: file });
      
      }
      reader.readAsDataURL(file)
    }
  }
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setFormData({ avatarFile: file });
        setAvatarPreview(result)
        
      }
      reader.readAsDataURL(file)
    }
  }
   const removeBanner = () => {
    setBannerPreview(null)
    setFormData({ banner: "" })
  }

  const removeAvatar = () => {
    setAvatarPreview(null)
    setFormData({ avatar: "" })
  }
  
  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Basic Project Information
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700">
            Project Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            value={projectData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            placeholder="Enter project name"
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-slate-700">
            Summary <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={projectData.summary}
            placeholder="Describe your project"
            onChange={(e) => setFormData({ summary: e.target.value })}
            rows={4}
            maxLength={200 }
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
    
        <div className="space-y-2">
          <Label htmlFor="description" className="text-slate-700">
            Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={projectData.description}
            placeholder="Describe your project"
            onChange={(e) => setFormData({ description: e.target.value })}
            rows={4}
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Banner Upload */}
        <div className="space-y-2">
          <Label className="text-slate-700">Project Banner</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 transition-colors hover:border-blue-500">
            {bannerPreview ? (
              <div className="relative">
                <img
                  src={bannerPreview || "/placeholder.svg"}
                  alt="Banner preview"
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeBanner}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">Click to upload banner image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
              </label>
            )}
          </div>
        </div>


        {/* Avatar Upload */}
        <div className="space-y-2">
          <Label className="text-slate-700">Project Avatar</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 transition-colors hover:border-blue-500">
            {avatarPreview ? (
              <div className="relative flex justify-center">
                <img
                  src={avatarPreview || "/placeholder.svg"}
                  alt="Avatar preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
                <button
                  type="button"
                  onClick={removeAvatar}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-500">Click to upload avatar image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            )}
          </div>
          </div>
      </motion.div>
    </div>
  );
}
