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
  summary: z.string().min(10).max(200),
  banner: z.union([
    z.literal(""),
    z.null(),
    z.undefined(),
    z.string().url({ message: "Invalid URL" })
  ]),
  avatar: z.union([
    z.literal(""),
    z.null(),
    z.undefined(),
    z.string().url({ message: "Invalid URL" })
  ]),
  category: z.enum([
    "web_app", "mobile_app", "desktop_app", "api", "data_engineering",
    "machine_learning", "devops", "blockchain", "game_development", "other"
  ]).optional(),
  teamSize:z.number().min(2).optional(),
  status: z.enum([ "draft", "published", "completed", "archived" ]),
  stage: z.enum([
    "Idea", "Planning", "Development", "Testing", "Deployment", "Maintenance"
  ]).optional(),
  liveUrl: z.union([
    z.literal(""),
    z.null(),
    z.undefined(),
    z.string().url({ message: "Invalid URL" })
  ]),
  ecosystem: z.enum([
    'web', 'mobile', 'cloud', 'data', 'devops', 'ai_ml', 'blockchain', 'iot', 'gaming', 'other',
  ]).optional(),
  roles: z.array(projectRolesSchema).min(1, { message: "At least one role is required to publish" }).optional(),
  techStack: z.array(z.enum([
    "react", "vue", "angular", "svelte", "next_js", "tailwind", "typescript",
    "node_js", "express", "django", "flask", "spring", "laravel", "ruby_rails",
    "react_native", "flutter", "swift", "kotlin",
    "postgresql", "mongodb", "mysql", "redis", "dynamodb",
    "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci_cd",
    "graphql", "rest", "websockets", "blockchain", "ai_ml", "other"
  ])).min(1, { message: "At least one tech stack is required to publish" }).optional(),
  members: z.array(projectMembersSchema).optional(),
});
