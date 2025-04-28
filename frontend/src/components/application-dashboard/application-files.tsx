import { ExternalLink, File } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
interface ApplicationAttachmentsProps {
  resumeUrl: string;
}

export function ApplicationAttachments({
  resumeUrl,
}: ApplicationAttachmentsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800">Attachments</h3>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-3  rounded-lg bg-neutral-100"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg ">
                <File className="h-6 w-6 text-blue-500 " />
              </div>
              <div>
                <p className="font-medium text-sm text-black">Resume pdf</p>
              </div>
            </div>
            <div className="flex gap-1">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full cursor-pointer p-2 inline-flex items-center justify-center bg-transparent"
              >
                <ExternalLink className="w-6 h-6 text-blue-400" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
