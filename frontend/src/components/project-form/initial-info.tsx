"use client";

import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useFormStore } from "@/store/useProjectStore";

export default function BasicInfoStep() {
  const { projectData, setFormData } = useFormStore();
  
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
            <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500">
                Click to upload banner image
              </span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="space-y-2">
          <Label className="text-slate-700">Project Avatar</Label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 transition-colors hover:border-blue-500">
            <label className="flex flex-col items-center justify-center h-40 cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500">
                Click to upload avatar image
              </span>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
