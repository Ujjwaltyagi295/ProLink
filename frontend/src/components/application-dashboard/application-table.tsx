
import { Link } from "react-router-dom"
import { Calendar, CheckCircle, Clock, Download, Eye, MoreVertical, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ProjectData } from "@/types/project"
import { formatData, formatDate } from "@/lib/utils"


interface ApplicationsTableProps {
  filter: string
  status: string,
  projects:ProjectData[]
}

export function ApplicationsTable({ filter, status,projects }: ApplicationsTableProps) {

  const allApplicationsWithProject = projects.flatMap(project =>
    project.applications.map(app => ({
      ...app,
      project, 
    }))
  );
  const filteredApplications =allApplicationsWithProject?.filter((app) => {
    const matchesFilter = filter === "all" || app.project.name === filter
    const matchesStatus = status === "all" || app.status === status
    return matchesFilter && matchesStatus
  })
 

  return (
    <div className="rounded-md border border-slate-200 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Applicant</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date Applied</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                No applications found
              </TableCell>
            </TableRow>
          ) : (
            filteredApplications?.map((application) => (
              <TableRow key={application.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={ "/placeholder.svg"} alt={application.fullName} />
                      <AvatarFallback>{application.fullName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-800">{application.fullName}</div>
                      <div className="text-sm text-slate-500">{application.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-700">{application.project.name}</TableCell>
                <TableCell className="text-slate-700">{formatData(application.project.roles.find((r) => r.id === application.roleId)?.role) }</TableCell>
                <TableCell className="text-slate-700">{formatDate(application.createdAt)}</TableCell>
               
                <TableCell>
                  <StatusBadge status={application.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="ghost" size="icon" className="hover:bg-slate-100">
                      <Link to={`/dashboard/applications/${application.userId}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" /> Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download Resume
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 flex w-fit items-center gap-1">
          <Clock className="h-3 w-3" /> Pending
        </Badge>
      )
    case "accepted":
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 flex w-fit items-center gap-1">
          <CheckCircle className="h-3 w-3 text-emerald-600" /> Accepted
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 flex w-fit items-center gap-1">
          <XCircle className="h-3 w-3 text-rose-600" /> Rejected
        </Badge>
      )
    default:
      return null
  }
}
