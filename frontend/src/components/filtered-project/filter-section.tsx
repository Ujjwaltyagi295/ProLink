
import { ChevronDown, Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterSectionProps {
  title: string
  options: readonly string[]
  selected: string[]
  onToggle: (value: string) => void
  isOpen: boolean
  onToggleOpen: () => void
}

export function FilterSection({ title, options, selected, onToggle, isOpen, onToggleOpen }: FilterSectionProps) {

  const formatEnumValue = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="mb-1">
      <div
        className="flex o items-center justify-between p-2 text-sm text-gray-200 hover:bg-neutral-800 rounded-md cursor-pointer transition-colors duration-200"
        onClick={onToggleOpen}
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-4 h-4 transition-transform duration-200" />
          )}
          <span>{title}</span>
          {selected.length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-neutral-800 rounded-full transition-all duration-200">
              {selected.length}
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="pl-6 pr-2 py-1 mt-1 mb-2 max-h-60 overflow-y-auto hide-scrollbar   bg-neutral-900 rounded-md animate-in slide-in-from-top-2 duration-200">
          {options.map((option, index) => (
            <div
              key={option}
              className={cn(
                "flex items-center justify-between p-2 text-sm rounded-md cursor-pointer transition-all duration-200",
                selected.includes(option) ? "bg-neutral-800 text-gray-100" : "text-gray-300 hover:bg-neutral-800",
              )}
              onClick={() => onToggle(option)}
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <span>{formatEnumValue(option)}</span>
              {selected.includes(option) && <Check className="w-4 h-4 animate-in fade-in-50" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
