import { FilterDataType } from "@/types/project";
import { Command } from "cmdk";

interface ProjectCardProps {
  project: FilterDataType;
}

export function FilterProjectCard({ project }: ProjectCardProps) {
  const avatarColors = {
    yellow: "bg-amber-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
  };

  const avatarOptions = ["yellow", "blue", "indigo"] as const;
  const avatarColor =
    avatarOptions[project.id.charCodeAt(0) % avatarOptions.length];

  const avatarElement = (
    <div
      className={`flex-shrink-0 h-8 w-8 items-center justify-center rounded-md border border-gray-800 overflow-hidden flex ${
        project?.avatar ? "" : avatarColors[avatarColor]
      }`}
    >
      {project.avatar ? (
        <img
          src={project.avatar}
          alt={project.name}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <span className="m-auto text-lg font-semibold text-white">
          {project.name.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
  const formatEnumValue = (value: string) => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Command.Item
      value={project.name}
      className="flex flex-col gap-2 p-3 rounded-md hover:bg-neutral-800 transition-all duration-200 hover:scale-[1.01]"
    >
      <div className="flex-row gap-4 flex">
      <div className="mt-2">  {avatarElement}</div>
        <div className="flex flex-col">
          <div className="font-medium text-gray-100 flex-row gap-2 flex">
            {project.name}
          </div>
          <div className="text-gray-50/55 text-sm">{project.summary}</div>
        </div>{" "}
      </div>
      <div className="flex ml-10 flex-wrap gap-1 mt-1">
        <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300 transition-colors duration-200">
          {formatEnumValue(project.category)}
        </span>
        {project.techStacks.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300 transition-colors duration-200"
          >
            {formatEnumValue(tech)}
          </span>
        ))}
        {project.techStacks.length > 3 && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-neutral-800 text-neutral-300 transition-colors duration-200">
            +{project.techStacks.length - 3} more
          </span>
        )}
      </div>
    </Command.Item>
  );
}
