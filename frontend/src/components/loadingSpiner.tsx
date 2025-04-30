import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => setLoading(false), 800)
          return 100
        }
        return next
      })
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 bg-white/90 flex flex-col items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          role="status"
          aria-busy={loading}
        >
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.div
              className="mb-12 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="text-4xl md:text-6xl font-light tracking-wider text-gray-800">
                <motion.span
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  Pro
                </motion.span>
                <motion.span
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-blue-500"
                >
                  Link
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Loader */}
            <motion.div
              className="w-40 md:w-60 h-px bg-gray-200 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${progress}%`,
                  transition: { ease: "easeOut" },
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="mt-6 text-xs uppercase tracking-widest text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ letterSpacing: "0.2em" }}
            >
              {progress < 100 ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  Loading
                </motion.span>
              ) : (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  Ready
                </motion.span>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingSpinner
