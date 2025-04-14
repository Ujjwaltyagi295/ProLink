import { z } from "zod";
import { nameSchema } from "../auth/auth.schema";

// Role schema for project roles (existing)
export const projectRolesSchema = z.object({
  role: z.enum([
    "frontend_developer", "backend_developer", "fullstack_developer", "mobile_developer",
    "ui_ux_designer", "devops_engineer", "cloud_engineer", "data_engineer", "data_scientist",
    "ml_engineer", "qa_engineer", "security_engineer", "blockchain_developer", "game_developer",
    "technical_product_manager", "technical_writer", "other"
  ]),
  description: z.string(),
  count: z.number().min(1),
  isRemote: z.boolean(),
  experienceLevel: z.string()
});

// Tech stack schema (existing)
export const projectTechStackSchema = z.object({
  techStack: z.array(z.enum([
    "react", "vue", "angular", "svelte", "next_js", "tailwind", "typescript",
    "node_js", "express", "django", "flask", "spring", "laravel", "ruby_rails",
    "react_native", "flutter", "swift", "kotlin",
    "postgresql", "mongodb", "mysql", "redis", "dynamodb",
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci_cd",
    "graphql", "rest", "websockets", "blockchain", "ai_ml", "other"
  ])),
});

// Members schema for project members
export const projectMembersSchema = z.object({
  userId: z.string().uuid(),
  isOwner: z.boolean(),
});

// Main Project Schema with roles, tech stack, and members
export const projectSchema = z.object({
  name: nameSchema,
  description: z.string().optional(),
  banner: z.string().optional(),
  avatar: z.string().optional(),
  category: z.enum([
    "web_app", "mobile_app", "desktop_app", "api", "data_engineering",
    "machine_learning", "devops", "blockchain", "game_development", "other"
  ]).optional(),
 
  status: z.enum([ "draft", "published", "completed", "archived" ]).optional(),
  stage: z.enum([
    "Idea", "Planning", "Development", "Testing", "Deployment", "Maintenance"
  ]).optional(),
 
  liveUrl: z.string().optional().refine((val) => {
    if (val === undefined || val === "") return true;  
 
    return /^(http|https):\/\/[^\s$.?#].[^\s]*$/.test(val);
  }, {
    message: "Invalid URL",
  }),
  
  ecosystem: z.enum([
    'web', 'mobile', 'cloud', 'data', 'devops', 'ai_ml', 'blockchain', 'iot', 'gaming', 'other'
  ]).optional(),

  roles: z.array(projectRolesSchema).optional(),
  
  techStack: z.array(z.enum([
    "react", "vue", "angular", "svelte", "next_js", "tailwind", "typescript",
    "node_js", "express", "django", "flask", "spring", "laravel", "ruby_rails",
    "react_native", "flutter", "swift", "kotlin",
    "postgresql", "mongodb", "mysql", "redis", "dynamodb",
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci_cd",
    "graphql", "rest", "websockets", "blockchain", "ai_ml", "other"
  ])).optional(),

  members: z.array(projectMembersSchema).optional(),
});
