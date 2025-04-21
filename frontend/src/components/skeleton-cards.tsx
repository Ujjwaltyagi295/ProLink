import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex w-full max-w-md flex-col justify-between rounded-xl border p-4 shadow-sm">
      <div className="flex gap-4">
        {/* Avatar */}
        <Skeleton className="h-12 w-12 rounded-md" />

        {/* Title and Description */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      {/* Tech tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>

      {/* Footer section */}
      <div className="mt-4 grid grid-cols-2 items-center justify-between border-t pt-4 text-sm">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex flex-col gap-1 items-end">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Bottom apply button */}
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  )
}
