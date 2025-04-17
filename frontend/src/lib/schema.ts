// Enums for filterable properties
export const projectStageEnum = [ "Idea",
  "Planning",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",] as const

export const projectCategoryEnum = [
  "web_app",
  "mobile_app",
  "desktop_app",
  "api",
  "data_engineering",
  "machine_learning",
  "devops",
  "blockchain",
  "game_development",
  "other",
] as const

export const projectStatusEnum = ["draft", "published", "completed", "archived"] as const

// Developer-centric roles
export const roleEnum = [
  "frontend_developer", "backend_developer", "fullstack_developer", "mobile_developer",
  "ui_ux_designer", "devops_engineer", "cloud_engineer", "data_engineer", "data_scientist",
  "ml_engineer", "qa_engineer", "security_engineer", "blockchain_developer", "game_developer",
  "technical_product_manager", "technical_writer", "other"
] as const

export const techStackEnum = [
  "react",
  "vue",
  "angular",
  "svelte",
  "next_js",
  "tailwind",
  "typescript",

  "node_js",
  "express",
  "django",
  "flask",
  "spring",
  "laravel",
  "ruby_rails",

  "react_native",
  "flutter",
  "swift",
  "kotlin",

  "postgresql",
  "mongodb",
  "mysql",
  "redis",
  "dynamodb",

  "aws",
  "azure",
  "gcp",
  "docker",
  "kubernetes",
  "terraform",
  "ci_cd",

  "graphql",
  "rest",
  "websockets",
  "blockchain",
  "ai_ml",
  "other",
] as const

export const ecosystemEnum = [
 'web', 'mobile', 'cloud', 'data', 'devops', 'ai_ml', 'blockchain', 'iot', 'gaming', 'other'
] as const

export const experienceLevelEnum = ["beginner", "intermediate", "advanced"] as const

// Types based on enums
export type ProjectStage = (typeof projectStageEnum)[number]
export type ProjectCategory = (typeof projectCategoryEnum)[number]
export type ProjectStatus = (typeof projectStatusEnum)[number]
export type Role = (typeof roleEnum)[number]
export type TechStack = (typeof techStackEnum)[number]
export type Ecosystem = (typeof ecosystemEnum)[number]
export type ExperienceLevel = (typeof experienceLevelEnum)[number]

// Project form type
export type ProjectFormData = {
  // Basic Info
  id:string
  name: string
  description: string
  banner: string
  avatar: string

  // Project Details
  teamSize:number,
  category: ProjectCategory | ""
  ecosystem: Ecosystem | ""
  status: ProjectStatus
  stage: ProjectStage | ""
  repoUrl: string
  liveUrl: string

 

  // Tech Stack
  techStack: TechStack[]

  // Project Roles
  roles: {
    id: string
    role: Role | ""
    description: string
    count: number
    isRemote: boolean
    experienceLevel: ExperienceLevel | ""
  }[]
}
