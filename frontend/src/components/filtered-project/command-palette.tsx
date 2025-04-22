import { useState, useEffect, useRef } from "react"
import { Command } from "cmdk"
import { FilterSection } from "./filter-section"
import { FilterProjectCard } from "./filter-card"
import { projectCategoryEnum, roleEnum, techStackEnum, ecosystemEnum } from "../../lib/schema"
import { ProjectFilters } from "@/lib/api"

import { useProjectsQuery } from "@/services/projectQuery"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  
  const [selectedFilters, setSelectedFilters] = useState<ProjectFilters>({
    category: [],
    roles: [],
    techStacks: [],
    ecosystem: [],
  })
  
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearching, setIsSearching] = useState(false)

  
  const searchParams: ProjectFilters = {
    ...selectedFilters,
    search: search || undefined
  }
  
  const { data, isLoading } = useProjectsQuery(searchParams)

  const projects = data?.projects || []
  const totalProjects = data ? new Set(data.projects.map(p => p.id)).size : 0

  const filteredProjects = projects

  const toggleFilter = (type: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => {
      const current = [...(prev[type] || [])]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return {
        ...prev,
        [type]: current,
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      roles: [],
      techStacks: [],
      ecosystem: [],
    })
    setSearch("")
  }

  const formatEnumValue = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const totalSelectedFilters = Object.values(selectedFilters).reduce(
    (acc, filters) => acc + (filters?.length || 0), 
    0
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (search) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setIsSearching(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [search])

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(true)}
        className="flex items-center w-full gap-2 p-2 text-sm text-black rounded-lg bg-neutral-100 border hover:border-blue-500 transition duration-300 ease-in-out hover:shadow-md cursor-pointer"
      >
        <span>
          Search <kbd className="px-1.5 ml-24 py-0.5 text-md bg-neutral-100 rounded">⌘K</kbd> 
        </span>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        className="fixed inset-0 z-50 overflow-hidden mt-24 p-4 md:p-6 lg:p-8 flex items-start justify-center"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300"
          onClick={() => setOpen(false)}
        />
        <div className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-neutral-900 bg-neutral-950 shadow-xl animate-in fade-in zoom-in-95">
          <Command.Input
            ref={inputRef}
            value={search}
            onValueChange={setSearch}
            placeholder="What do you need?"
            className={`w-full px-4 py-3 text-gray-100 bg-transparent border-b transition-all duration-300 outline-none ${
              isSearching ? "border-blue-500" : "border-neutral-800"
            }`}
          />

          <Command.List className="max-h-[80vh] overflow-y-auto p-2">
            {isLoading && (
              <div className="py-6 text-center text-gray-500">Loading projects...</div>
            )}
            
            {!isLoading && totalSelectedFilters > 0 && (
              <div className="mb-2 flex flex-wrap gap-2 p-2 animate-in fade-in-50 duration-300">
                {Object.entries(selectedFilters).map(([type, values]) =>
                  values?.map((value:string) => (
                    <span
                      key={`${type}-${value}`}
                      className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-neutral-800 text-gray-200"
                    >
                      {formatEnumValue(value)}
                      <button
                        onClick={() => toggleFilter(type as keyof typeof selectedFilters, value)}
                        className="ml-1 text-gray-400 hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  )),
                )}
                <button onClick={clearFilters} className="px-2 py-1 text-xs text-neutral-400 hover:text-gray-200">
                  Clear all
                </button>
              </div>
            )}

            {!isLoading && search ? (
              <>
                <Command.Group heading="Projects">
                  {filteredProjects.length > 0 ? (
                    <>
                      {filteredProjects.slice(0, 3).map((project, index) => (
                        <div
                          key={project.id}
                          className="transition-all duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <FilterProjectCard project={project}/>
                        </div>
                      ))}
                      <Command.Item className="py-2 px-2 cursor-pointer text-sm text-gray-400 hover:bg-neutral-800 rounded-md transition-colors duration-200">
                        View all {totalProjects} projects
                      </Command.Item>
                    </>
                  ) : (
                    <div className="py-6 text-center text-gray-500">No projects found</div>
                  )}
                </Command.Group>
              </>
            ) : (
              <>
                <Command.Group heading="Filters">
                  <FilterSection
                    title="Project Category"
                    options={projectCategoryEnum}
                    selected={selectedFilters.category || []}
                    onToggle={(value) => toggleFilter("category", value)}
                    isOpen={activeSection === "category"}
                    onToggleOpen={() => setActiveSection(activeSection === "category" ? null : "category")}
                  />
                  <FilterSection
                    title="Roles"
                    options={roleEnum}
                    selected={selectedFilters.roles || []}
                    onToggle={(value) => toggleFilter("roles", value)}
                    isOpen={activeSection === "roles"}
                    onToggleOpen={() => setActiveSection(activeSection === "roles" ? null : "roles")}
                  />
                  <FilterSection
                    title="Tech Stack"
                    options={techStackEnum}
                    selected={selectedFilters.techStacks || []}
                    onToggle={(value) => toggleFilter("techStacks", value)}
                    isOpen={activeSection === "techStacks"}
                    onToggleOpen={() => setActiveSection(activeSection === "techStacks" ? null : "techStacks")}
                  />
                  <FilterSection
                    title="Ecosystem"
                    options={ecosystemEnum}
                    selected={selectedFilters.ecosystem || []}
                    onToggle={(value) => toggleFilter("ecosystem", value)}
                    isOpen={activeSection === "ecosystem"}
                    onToggleOpen={() => setActiveSection(activeSection === "ecosystem" ? null : "ecosystem")}
                  />
                </Command.Group>

                {!isLoading && totalSelectedFilters > 0 && (
                  <div className="mt-4 p-2">
                    <button
                      className="w-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 text-gray-100 rounded-md text-sm font-medium transition-all duration-300 hover:scale-[1.01]"
                      onClick={() => setSearch(" ")} 
                    >
                      Show {totalProjects} projects
                    </button>
                  </div>
                )}
              </>
            )}
          </Command.List>
        </div>
      </Command.Dialog>
    </div>
  )
}