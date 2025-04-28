
import type React from "react"

import { useState } from "react"
import { Download, File, FileText, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface Attachment {
  id: string
  name: string
  size: string
  type: string
  icon: React.ReactNode
}

interface ApplicationAttachmentsProps {
  attachments?: Attachment[]
}

export function ApplicationAttachments({ attachments: initialAttachments = [] }: ApplicationAttachmentsProps) {
  const [attachments, setAttachments] = useState<Attachment[]>(
    initialAttachments.length > 0
      ? initialAttachments
      : [
          {
            id: "1",
            name: "List of requirements.doc",
            size: "1.3 Mb",
            type: "doc",
            icon: <File className="h-6 w-6 text-blue-500" />,
          },
          {
            id: "2",
            name: "Clients Brandbook.pdf",
            size: "5.7 Mb",
            type: "pdf",
            icon: <FileText className="h-6 w-6 text-yellow-500" />,
          },
        ],
  )

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Attachments</h3>
        <Button variant="outline" size="sm" className="gap-1">
          <Upload className="h-4 w-4" /> Add File
        </Button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {attachments.map((attachment) => (
            <motion.div
              key={attachment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800">
                  {attachment.icon}
                </div>
                <div>
                  <p className="font-medium text-sm text-white">{attachment.name}</p>
                  <p className="text-xs text-slate-400">{attachment.size}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-slate-800 hover:bg-slate-700">
                  <Trash2 className="h-4 w-4 text-slate-400" />
                  <span className="sr-only">Delete</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-slate-800 hover:bg-slate-700">
                  <Download className="h-4 w-4 text-slate-400" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {attachments.length === 0 && (
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-slate-300 bg-slate-50">
            <p className="text-sm text-slate-500">No attachments yet</p>
            <Button variant="ghost" size="sm" className="mt-2 gap-1">
              <Upload className="h-4 w-4" /> Upload Files
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
