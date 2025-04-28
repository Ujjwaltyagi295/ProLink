import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApplicationAttachments } from "./application-files";
import {
  useGetApplicationByIdQuery,
  useMyprojectQuery,
} from "@/services/myProjectQuery";
import { Project } from "@/types/project";
import { ProjectSkeleton } from "../skeleton-cards";
import { formatData, formatDate } from "@/lib/utils";
import { RoleFormData } from "@/store/useProjectStore";
import { useToast } from "@/hooks/use-toast";

interface applicationData {
  project: Project;
  application: {
    id: string;
    roleId: string;
    projectId: string;
    fullName: string;
    userId: string;
    email: string;
    joinReason: string;
    resumeUrl: string;
    status: string;
    createdAt: string;
  };
  role: RoleFormData;
}

export default function ApplicationPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const { data, isError, isLoading } = useGetApplicationByIdQuery(id);
  const res = data as applicationData;
  const applicationData = {
    id:res?.application.userId,
    userId: res?.application.userId,
    status: "",
    roleId: res?.application.roleId,
    projectId: res?.application.projectId,
  };
  const { manageApplication } = useMyprojectQuery();
  const handleAccept = async () => {
    await manageApplication({ ...applicationData, status: "accepted", });
    toast({ title: "Application accepted", type: "success" });
  };
  const handleReject = async () => {
    await manageApplication({ ...applicationData, status: "rejected" });
    toast({ title: "Application rejected", type: "success" });
  };

  if (isLoading) {
    return <ProjectSkeleton />;
  }
  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-6 max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link
              to="/dashboard/applications"
              className="flex items-center gap-1 text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Applications
            </Link>
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm">
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage
                    src={"/placeholder.svg"}
                    alt={res.application.fullName}
                  />
                  <AvatarFallback>
                    {res.application.fullName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {res.application.fullName}
                  </h1>
                  <p className="text-slate-500 break-all">
                    {res.application.email}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge variant="outline">{res.project.name}</Badge>
                    <Badge variant="outline">{formatData(res.role.role)}</Badge>
                    {res.application.status === "pending" && (
                      <Badge
                        variant="outline"
                        className="bg-slate-100 text-slate-700 border-slate-200"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                {res.application.status === "rejected" ? (
                  <Button
                    variant="outline"
                    className="gap-2 border border-red-500 "
                  >
                    <XCircle className="h-4 w-4 text-red-500" /> Rejected
                  </Button>
                ) : res.application.status === "accepted" ? (
                  <Button variant="outline" className="gap-2 border-emerald-400 ">
                    <CheckCircle className="h-4 w-4 text-emerald-500" /> Accepted
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleReject}
                      variant="outline"
                      className="gap-2"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </Button>
                    <Button
                      onClick={handleAccept}
                      variant="outline"
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" /> Accept
                    </Button>
                  </>
                )}

                <Button className="gap-2">
                  <Calendar className="h-4 w-4" /> Schedule Meeting
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                  Reason for Joining
                </h2>
                <p className="text-slate-600">{res.application.joinReason}</p>
              </div>

              <ApplicationAttachments resumeUrl={res.application.resumeUrl} />
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-4">
                <h2 className="text-sm font-medium mb-4 text-slate-700">
                  Application Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="font-medium capitalize text-slate-800">
                      {res.application.status}
                    </span>
                  </div>

                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Applied For</span>
                    <span className="font-medium text-slate-800">
                      {formatData(res.role.role)}
                    </span>
                  </div>

                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-medium text-slate-800">
                      {formatData(res.role.experienceLevel)}
                    </span>
                  </div>
                  <Separator />

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date Applied</span>
                    <span className="font-medium text-slate-800">
                      {formatDate(res.application.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h2 className="text-sm font-medium mb-4 text-slate-700">
                  Project Information
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Project</span>
                    <span className="font-medium text-slate-800">
                      {res.project.name}
                    </span>
                  </div>
                  <Separator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
