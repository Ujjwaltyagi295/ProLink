import { Command } from "cmdk"

interface Project {
  id: number
  name: string
  category: string
  tech: string[]
}

interface ProjectCardProps {
  project: Project
}

export function FilterProjectCard({ project }: ProjectCardProps) {

  const formatEnumValue = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <Command.Item
      value={project.name}
      className="flex flex-col gap-1 p-3 rounded-md hover:bg-neutral-800 transition-all duration-200 hover:scale-[1.01]"
    >
      <div className="font-medium text-gray-100">{project.name}</div>
      <div className="flex flex-wrap gap-1 mt-1">
        <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300 transition-colors duration-200">
          {formatEnumValue(project.category)}
        </span>
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300 transition-colors duration-200"
          >
            {formatEnumValue(tech)}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300 transition-colors duration-200">
            +{project.tech.length - 3} more
          </span>
        )}
      </div>
    </Command.Item>
  )
}
