import { useFormContext, useFieldArray } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Trash2, Plus } from "lucide-react"
import { experienceLevelEnum, roleEnum } from "@/lib/schema"
import { formatData } from "@/lib/utils"
import { useState } from "react"


export const ProjectRolesForm = () => {
  const { control, } = useFormContext<{ roles: Array<{
    id: string
    role: string
    experienceLevel: string
    count: number
    isRemote: boolean
    description: string
  }>}>()
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roles"
  }) 

  const [newRole, setNewRole] = useState({
    role: "",
    experienceLevel: "",
    count: 1,
    isRemote: false,
    description: ""
  })

  const handleAddRole = () => {
    if (!newRole.role || !newRole.experienceLevel) return

    append({
      ...newRole,
      id: crypto.randomUUID()
    })
    
    setNewRole({
      role: "",
      experienceLevel: "",
      count: 1,
      isRemote: false,
      description: ""
    })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Project Roles</h3>

        <div className="border border-slate-200 rounded-lg p-6 bg-white">
          <h4 className="text-base font-medium mb-6">Add New Role</h4>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Role <span className="text-red-500">*</span>
              </label>
              <Select 
                value={newRole.role}
                onValueChange={(value) => setNewRole({...newRole, role: value})}
              >
                <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleEnum.map((role) => (
                    <SelectItem key={role} value={role}>
                      {formatData(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Experience Level <span className="text-red-500">*</span>
              </label>
              <Select
                value={newRole.experienceLevel}
                onValueChange={(value) => setNewRole({...newRole, experienceLevel: value})}
              >
                <SelectTrigger className="focus:ring-blue-500 transition-all duration-200">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevelEnum.map((level) => (
                    <SelectItem key={level} value={level}>
                      {formatData(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Number of Positions <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                min={1}
                value={newRole.count}
                onChange={(e) => setNewRole({...newRole, count: Number.parseInt(e.target.value) || 1})}
                className="focus-visible:ring-blue-500 transition-all duration-200"
              />
            </div>

            <div className="flex items-center space-x-3 h-full pt-8">
              <Switch
                checked={newRole.isRemote}
                onCheckedChange={(checked) => setNewRole({...newRole, isRemote: checked})}
                className="data-[state=checked]:bg-blue-600"
              />
              <label className="text-sm font-medium">Remote Position</label>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium">Role Description</label>
            <Textarea
              placeholder="Describe responsibilities and requirements"
              value={newRole.description}
              onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              className="min-h-[100px] focus-visible:ring-blue-500 transition-all duration-200"
            />
          </div>

          <Button
            type="button"
            onClick={handleAddRole}
            disabled={!newRole.role || !newRole.experienceLevel}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Role
          </Button>
        </div>
      </div>

      {fields.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-4">Added Roles</h4>

          <AnimatePresence>
            {fields.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="border border-slate-200 rounded-lg p-4 mb-3 bg-white relative"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h5 className="font-medium">
                        {formatData(role.role)}
                      </h5>
                      <span className="ml-2 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-xs">
                        {role.count}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">
                      {formatData(role.experienceLevel)}
                      {role.isRemote && " • Remote"}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                        {role.description}
                      </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => remove(index)}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
