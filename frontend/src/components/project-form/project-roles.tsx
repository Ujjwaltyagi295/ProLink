"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Edit, Save, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ProjectFormData, roleEnum, experienceLevelEnum, type Role, type ExperienceLevel } from "@/lib/schema"
import { cn } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"

interface ProjectRolesStepProps {
  formData: ProjectFormData
  updateFormData: (data: Partial<ProjectFormData>) => void
}

interface RoleFormData {
  id: string
  role: Role | ""
  description: string
  count: number
  isRemote: boolean
  experienceLevel: ExperienceLevel | ""
}

const initialRoleForm: RoleFormData = {
  id: "",
  role: "",
  description: "",
  count: 1,
  isRemote: true,
  experienceLevel: "",
}

export default function ProjectRolesStep({ formData, updateFormData }: ProjectRolesStepProps) {
  const [roleForm, setRoleForm] = useState<RoleFormData>({ ...initialRoleForm })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const formatEnumValue = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleRoleFormChange = (field: keyof RoleFormData, value: string | number | boolean) => {
    setRoleForm((prev) => ({ ...prev, [field]: value }))
  }

  const addRole = () => {
    if (!roleForm.role || !roleForm.experienceLevel) {
      alert("Please fill in all required fields")
      return
    }

    const newRole = {
      ...roleForm,
      id: uuidv4(),
    }

    updateFormData({
      roles: [...formData.roles, newRole],
    })

    // Reset form
    setRoleForm({ ...initialRoleForm })
  }

  const startEditing = (role: RoleFormData) => {
    setRoleForm({ ...role })
    setIsEditing(true)
    setEditingId(role.id)
  }

  const cancelEditing = () => {
    setRoleForm({ ...initialRoleForm })
    setIsEditing(false)
    setEditingId(null)
  }

  const saveEditedRole = () => {
    if (!roleForm.role || !roleForm.experienceLevel) {
      alert("Please fill in all required fields")
      return
    }

    const updatedRoles = formData.roles.map((role) => (role.id === editingId ? { ...roleForm } : role))

    updateFormData({
      roles: updatedRoles,
    })

    // Reset form
    setRoleForm({ ...initialRoleForm })
    setIsEditing(false)
    setEditingId(null)
  }

  const deleteRole = (id: string) => {
    const updatedRoles = formData.roles.filter((role) => role.id !== id)
    updateFormData({
      roles: updatedRoles,
    })
  }

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-slate-900 mb-6"
      >
        Project Roles
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <Card className="border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">{isEditing ? "Edit Role" : "Add New Role"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-700">
                  Role <span className="text-red-500">*</span>
                </Label>
                <Select value={roleForm.role} onValueChange={(value) => handleRoleFormChange("role", value as Role)}>
                  <SelectTrigger className="border-slate-300 focus:ring-blue-500">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select_role">Select role</SelectItem>
                    {roleEnum.map((role) => (
                      <SelectItem key={role} value={role}>
                        {formatEnumValue(role)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel" className="text-slate-700">
                  Experience Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={roleForm.experienceLevel}
                  onValueChange={(value) => handleRoleFormChange("experienceLevel", value as ExperienceLevel)}
                >
                  <SelectTrigger className="border-slate-300 focus:ring-blue-500">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="select_experience">Select experience level</SelectItem>
                    {experienceLevelEnum.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="count" className="text-slate-700">
                  Number of Positions <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  value={roleForm.count}
                  onChange={(e) => handleRoleFormChange("count", Number.parseInt(e.target.value) || 1)}
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 flex items-center pt-8">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isRemote"
                    checked={roleForm.isRemote}
                    onCheckedChange={(checked) => handleRoleFormChange("isRemote", checked)}
                  />
                  <Label htmlFor="isRemote" className="text-slate-700">
                    Remote Position
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-700">
                Role Description
              </Label>
              <Textarea
                id="description"
                value={roleForm.description}
                onChange={(e) => handleRoleFormChange("description", e.target.value)}
                placeholder="Describe the responsibilities and requirements for this role"
                rows={3}
                className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            {isEditing ? (
              <div className="flex space-x-2">
                <Button onClick={saveEditedRole} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save size={16} className="mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={cancelEditing}>
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={addRole} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus size={16} className="mr-2" />
                Add Role
              </Button>
            )}
          </CardFooter>
        </Card>

        {formData.roles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-slate-900">Added Roles</h3>
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {formData.roles.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={cn(
                      "border rounded-lg p-4 bg-white shadow-sm",
                      editingId === role.id ? "border-blue-500 bg-blue-50" : "border-slate-200",
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {formatEnumValue(role.role)}
                          {role.count > 1 && (
                            <span className="ml-2 text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                              x{role.count}
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">
                          {role.experienceLevel.charAt(0).toUpperCase() + role.experienceLevel.slice(1)} •{" "}
                          {role.isRemote ? "Remote" : "On-site"}
                        </p>
                        {role.description && <p className="text-sm text-slate-600 mt-2">{role.description}</p>}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(role)}
                          className="text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                          disabled={isEditing}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteRole(role.id)}
                          className="text-slate-500 hover:text-red-600 hover:bg-red-50"
                          disabled={isEditing}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
