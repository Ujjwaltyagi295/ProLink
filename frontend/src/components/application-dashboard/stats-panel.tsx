"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowDown, ArrowUp, CheckCircle, Clock, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

// Mock data for statistics
const stats = {
  total: 145,
  pending: 37,
  accepted: 89,
  rejected: 19,
  totalTrend: 12, // percentage increase
  pendingTrend: -5, // percentage decrease
  acceptedTrend: 8, // percentage increase
  rejectedTrend: -2, // percentage decrease
}

const weeklyData = [
  { name: "Jun 1", total: 12, accepted: 7 },
  { name: "Jun 3", total: 19, accepted: 11 },
  { name: "Jun 5", total: 15, accepted: 9 },
  { name: "Jun 7", total: 22, accepted: 14 },
  { name: "Jun 9", total: 18, accepted: 10 },
  { name: "Jun 12", total: 24, accepted: 16 },
  { name: "Jun 15", total: 20, accepted: 12 },
  { name: "Jun 18", total: 26, accepted: 18 },
  { name: "Jun 21", total: 28, accepted: 19 },
  { name: "Jun 24", total: 25, accepted: 17 },
  { name: "Jun 27", total: 22, accepted: 15 },
  { name: "Jun 30", total: 18, accepted: 12 },
]

export function StatisticsPanel() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

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
            <div className={`flex items-center text-xs ${stats.totalTrend > 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {stats.totalTrend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(stats.totalTrend)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
            <Progress value={(stats.total / 200) * 100} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50">
            <CardTitle className="text-sm font-medium text-slate-700">Pending Review</CardTitle>
            <div
              className={`flex items-center text-xs ${stats.pendingTrend > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {stats.pendingTrend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(stats.pendingTrend)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{stats.pending}</div>
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
              className={`flex items-center text-xs ${stats.acceptedTrend > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {stats.acceptedTrend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(stats.acceptedTrend)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{stats.accepted}</div>
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
              className={`flex items-center text-xs ${stats.rejectedTrend > 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              {stats.rejectedTrend > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(stats.rejectedTrend)}%
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-slate-800">{stats.rejected}</div>
            <div className="flex items-center mt-2 text-xs text-slate-500">
              <XCircle className="h-3 w-3 mr-1" /> Declined applications
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  )
}
