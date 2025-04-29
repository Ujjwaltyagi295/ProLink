

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, CheckCircle, Clock, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useMyprojectQuery } from "@/services/myProjectQuery"
import { ProjectData } from "@/types/project"


export function StatisticsPanel() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
const {projects}=useMyprojectQuery()

const data= projects as ProjectData[]
const totalApplications = data.reduce(
  (sum, group) => sum + group.applications.length,
  0
);

const pendingApplications = (data.map((p)=>p.applications.filter((a)=>a.status==="pending"))).reduce((sum,group)=>sum+group.length,0)
const acceptedApplication = (data.map((p)=>p.applications.filter((a)=>a.status==="accepted"))).reduce((sum,group)=>sum+group.length,0)
const rejectApplication = (data.map((p)=>p.applications.filter((a)=>a.status==="rejected"))).reduce((sum,group)=>sum+group.length,0)

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div variants={item} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
            <CardTitle className="text-sm font-medium text-slate-700">Total Applications</CardTitle>
            <div className={`flex items-center text-xs ${totalApplications> 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {totalApplications> 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(totalApplications)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{totalApplications}</div>
            <Progress value={(totalApplications/ 200) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
            <CardTitle className="text-sm font-medium text-slate-700">Pending Review</CardTitle>
            <div
              className={`flex items-center text-xs ${pendingApplications > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {pendingApplications > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(pendingApplications)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{pendingApplications}</div>
            <div className="flex items-center mt-2 text-xs text-slate-500">
              <Clock className="h-3 w-3 mr-1" /> Awaiting review
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
            <CardTitle className="text-sm font-medium text-slate-700">Accepted</CardTitle>
            <div
              className={`flex items-center text-xs ${acceptedApplication > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {acceptedApplication> 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(acceptedApplication)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{acceptedApplication}</div>
            <div className="flex items-center mt-2 text-xs text-slate-500">
              <CheckCircle className="h-3 w-3 mr-1" /> Approved applications
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
            <CardTitle className="text-sm font-medium text-slate-700">Rejected</CardTitle>
            <div
              className={`flex items-center text-xs ${rejectApplication > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {rejectApplication > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(rejectApplication)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{rejectApplication}</div>
            <div className="flex items-center mt-2 text-xs text-slate-500">
              <XCircle className="h-3 w-3 mr-1" /> Declined applications
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  )
}
