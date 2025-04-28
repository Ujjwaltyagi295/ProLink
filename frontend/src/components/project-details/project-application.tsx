import { useState } from "react";
import { X, Upload, FileText, Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatData } from "@/lib/utils";
import { RoleFormData } from "@/store/useProjectStore";
import { useGetAllProjectQuery } from "@/services/projectQuery";
import { myprojects } from "@/lib/api";

interface ApplicationFormData {
  projectId: string | undefined;
  roleId: string;
  fullName: string;
  email: string;
  resumeUrl: File | null;
  joinReason: string;
  role: string;
}

export function ApplicationDialog({
  open,
  onOpenChange,
  roleData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleData: RoleFormData[];
}) {
  const projectId = roleData?.find((item) => item.role !== null)?.projectId;

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: "",
    email: "",
    resumeUrl: null,
    joinReason: "",
    role: "",
    projectId: projectId,
    roleId: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, resumeUrl: file }));
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteFile = () => {
    setFormData((prev) => ({ ...prev, resumeUrl: null }));
    setFileName("");
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
  };

  const handleRoleChange = (value: string) => {
    const roleId = roleData.find((r) => r.role === value)?.id as string;
    setFormData((prev) => ({ ...prev, role: value, roleId: roleId }));
  };
  const { submitApplication } = useGetAllProjectQuery();
  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (formData.resumeUrl) {
      const resumeUrl = await myprojects.uploadImage(formData.resumeUrl);
      console.log(resumeUrl, formData);
      submitApplication({ ...formData, resumeUrl: resumeUrl });
    }
    setFormData({
      fullName: "",
      email: "",
      resumeUrl: null,
      joinReason: "",
      role: "",
      projectId: "",
      roleId: "",
    });
    onOpenChange(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] bg-neutral-100 border-gray-200 text-gray-800 p-0 overflow-hidden rounded-lg w-[calc(100%-2rem)]">
        <DialogHeader className="border-b border-gray-100 pb-4 p-6">
          <div className="flex items-center">
            <div className="text-blue-600 text-sm mr-2">Application</div>
            <div className="text-gray-400 text-sm mx-1">&gt;</div>
            <div className="text-gray-600 text-sm">New Submission</div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold mt-4 text-gray-800">
            Join Our Team
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Fill out the form below to apply for a position
          </DialogDescription>
        </DialogHeader>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4 text-gray-400" />
          <span className="sr-only">Close</span>
        </button>
        <form onSubmit={handleSubmit} className="space-y-6 p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2 lg:col-span-1">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="bg-neutral-100 border-gray-200 focus:border-blue-500 text-gray-800"
                required
              />
            </div>

            <div className="space-y-2 lg:col-span-1">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-neutral-100 border-gray-200 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="role" className="text-gray-700 font-medium">
              Role
            </Label>
            <Select onValueChange={handleRoleChange} value={formData.role}>
              <SelectTrigger className="bg-neutral-100 border-gray-200 focus:border-blue-500 text-gray-800">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-100 border-gray-200 text-gray-800">
                {roleData &&
                  roleData.map((role) => (
                    <SelectItem value={role.role || ""}>
                      {role.role ? formatData(role.role) : ""}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="resume" className="text-gray-700 font-medium">
              Resume
            </Label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="resume-upload"
                className={`flex items-center justify-center w-full px-4 py-3 border ${
                  fileName
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-neutral-100"
                } rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer transition-colors`}
              >
                <Upload className="mr-2 h-4 w-4 text-blue-500" />
                <span>{fileName ? "Change Resume" : "Upload Resume"}</span>
                <input
                  id="resume-upload"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="sr-only"
                  required
                />
              </label>
            </div>
            {fileName && (
              <div className="mt-3 flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-100">
                <div className="flex items-center flex-grow">
                  <FileText className="mr-2 h-5 w-5 text-blue-500 flex-shrink-0" />
                  <span className="truncate text-sm text-gray-700 font-medium">
                    {fileName}
                  </span>
                  <Check className="ml-2 h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  {fileUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => window.open(fileUrl, "_blank")}
                    >
                      View
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleDeleteFile}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>

          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="joinReason" className="text-gray-700 font-medium">
              Why do you want to join?
            </Label>
            <Textarea
              id="joinReason"
              name="joinReason"
              value={formData.joinReason}
              onChange={handleChange}
              className="bg-neutral-100 border-gray-200 focus:border-blue-500 text-gray-800 min-h-[100px] sm:min-h-[150px]"
              required
            />
          </div>

          <div className="pt-4 flex justify-end lg:col-span-2">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Submitting
                </span>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
