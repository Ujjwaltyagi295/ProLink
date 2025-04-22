import { pgEnum } from "drizzle-orm/pg-core";

export const projectStageEnum = pgEnum("project_stage", [
  "Idea",
  "Planning",
  "Development",
  "Testing",
  "Deployment",
  "Maintenance",
]);

export const projectCategoryEnum = pgEnum("project_category", [
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
]);
export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "published",
  "completed",
  "archived",
]);
export const roleEnum = pgEnum("role_enum", [
  "frontend_developer", "backend_developer", "fullstack_developer", "mobile_developer",
  "ui_ux_designer", "devops_engineer", "cloud_engineer", "data_engineer", "data_scientist",
  "ml_engineer", "qa_engineer", "security_engineer", "blockchain_developer", "game_developer",
  "technical_product_manager", "technical_writer", "other"
]);
export const techStackEnum = pgEnum("tech_stack", [
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
]);
export const ecosystemEnum = pgEnum('ecosystem_enum', [
  'web', 'mobile', 'cloud', 'data', 'devops', 'ai_ml', 'blockchain', 'iot', 'gaming', 'other'
  ]);
  export const applicationStatusEnum = pgEnum('application_status_enum', [
    'pending', 'accepted', 'rejected'
  ]);
 
  export const experienceLevelEnum=pgEnum('experienceLevel_enum',[
    "beginner", "intermediate", "advanced"
  ])