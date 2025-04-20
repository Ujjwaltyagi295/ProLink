"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ExperienceLevel,
  experienceLevelEnum,
  Role,
  roleEnum,
} from "@/lib/schema";
import { useFormStore } from "@/store/useProjectStore";
import { useState } from "react";
import { showAppToast } from "@/lib/toastUtils";

interface RoleFormData {
  id: string; // temporary ID for frontend only
  role: Role | "";
  description: string;
  count: number;
  isRemote: boolean;
  experienceLevel: ExperienceLevel | "";
}

export default function ProjectRolesStep() {
  const [newRoleData, setNewRoleData] = useState<Omit<RoleFormData, "id">>({
    role: "",
    description: "",
    count: 1,
    isRemote: true,
    experienceLevel: "",
  });

  const { projectData, setFormData } = useFormStore();

  const addRole = () => {
    if (!newRoleData.role || !newRoleData.experienceLevel) {
      return showAppToast({
        title: "Can't Add Role",
        description: "Role and Experience Level cannot be empty",
        type: "error",
      });
    }

    const newRoleWithId: RoleFormData = {
      ...newRoleData,
      id: crypto.randomUUID(),
    };

    setFormData({...projectData, roles: [...projectData.roles, newRoleWithId] });

    setNewRoleData({
      role: "",
      description: "",
      count: 1,
      isRemote: true,
      experienceLevel: "",
    });
  };

  const handleDelete = (id: string) => {
    const updatedRoles = projectData.roles.filter((r) => r.id !== id);
    setFormData({...projectData, roles: updatedRoles });
  };

  const formatData = (text: string) =>
    text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

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
            <CardTitle className="text-lg font-medium">Add New Role</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select
                  value={newRoleData.role}
                  onValueChange={(value) =>
                    setNewRoleData({ ...newRoleData, role: value as Role })
                  }
                >
                  <SelectTrigger>
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
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select
                  value={newRoleData.experienceLevel}
                  onValueChange={(value) =>
                    setNewRoleData({
                      ...newRoleData,
                      experienceLevel: value as ExperienceLevel,
                    })
                  }
                >
                  <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="count">Number of Positions *</Label>
                <Input
                  type="number"
                  min={1}
                  value={newRoleData.count}
                  onChange={(e) =>
                    setNewRoleData({
                      ...newRoleData,
                      count: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-2 pt-8">
                <Switch
                  id="isRemote"
                  checked={newRoleData.isRemote}
                  onCheckedChange={(checked) =>
                    setNewRoleData({ ...newRoleData, isRemote: checked })
                  }
                />
                <Label htmlFor="isRemote">Remote Position</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Role Description</Label>
              <Textarea
                value={newRoleData.description}
                onChange={(e) =>
                  setNewRoleData({
                    ...newRoleData,
                    description: e.target.value,
                  })
                }
                rows={3}
                placeholder="Describe responsibilities and requirements"
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button onClick={() => addRole()} className="bg-blue-600">
              <Plus size={16} className="mr-2" />
              Add Role
            </Button>
          </CardFooter>
        </Card>
        {projectData.roles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-slate-900">Added Roles</h3>
            <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {projectData.roles.map((role) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  key={role.id}
                  className="border rounded-lg p-4 bg-white shadow-sm border-slate-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {formatData(role.role)}
                        <span className="ml-2 text-sm bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                          {role.count}
                        </span>
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {formatData(role.experienceLevel)} •{" "}
                        {role.isRemote ? "Remote" : "On-site"}
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        {role.description}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleDelete(role.id)}
                        variant="ghost"
                        size="sm"
                        className="text-slate-500 hover:text-red-600 hover:bg-red-50"
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
  );
}