import { z } from "zod";
import { nameSchema } from "../auth/auth.schema";

export const projectSchema = z.object({
    name: nameSchema,
    description: z.string().nullable().optional(),
    banner: z.string().nullable().optional(),
    avatar: z.string().nullable().optional(),
    category: z.enum([
      "web_app", "mobile_app", "desktop_app", "api", "data_engineering",
      "machine_learning", "devops", "blockchain", "game_development", "other"
    ]),
    ecosystem: z.enum([
      "web", "mobile", "cloud", "data", "devops", "ai_ml", "blockchain", "iot", "gaming", "other"
    ]),
    status: z.enum(["draft", "published", "completed", "archived"]),
    stage: z.enum(["idea", "planning", "development", "testing", "deployment", "maintenance"]),
    repoUrl: z.string().url().nullable().optional(),
    liveUrl: z.string().url().nullable().optional(),
    prizeMoney: z.number().nonnegative(),
    inviteCode: z.string().length(32),
    updatedAt: z.date(),
  });
  export const projectTechStackSchema = z.object({
   techStack: z.enum([
      "react", "vue", "angular", "svelte", "next_js", "tailwind", "typescript",
      "node_js", "express", "django", "flask", "spring", "laravel", "ruby_rails",
      "react_native", "flutter", "swift", "kotlin",
      "postgresql", "mongodb", "mysql", "redis", "dynamodb",
      "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ci_cd",
      "graphql", "rest", "websockets", "blockchain", "ai_ml", "other"
    ]),
  });
  export const projectRolesSchema = z.object({
    role: z.enum([
      "frontend_developer", "backend_developer", "fullstack_developer", "mobile_developer",
      "ui_ux_designer", "devops_engineer", "cloud_engineer", "data_engineer", "data_scientist",
      "ml_engineer", "qa_engineer", "security_engineer", "blockchain_developer", "game_developer",
      "technical_product_manager", "technical_writer", "other"
    ]),
    description: z.string().nullable().optional(),
    count: z.number().min(1),
    isRemote: z.boolean(),
    experienceLevel: z.string().optional(),
  });
  export const projectMembersSchema = z.object({
    isOwner: z.boolean(),
  });
  export const projectApplicationsSchema = z.object({
  
    userId: z.string().uuid(),
    roleId: z.string().uuid().optional(),
    message: z.string().nullable().optional(),
    status: z.enum(["pending", "accepted", "rejected"]),

    updatedAt: z.date(),
  });
  export const userSkillsSchema = z.object({
   
    techStack: projectTechStackSchema.shape.techStack,
    experienceLevel: z.string().optional(),
  });
  const draftProjectSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().optional(),
    category: z.string().optional(),
    techStack: z.array(z.string()).optional(),
    status: z.enum(['draft', 'published']),
  });
  
  const publishProjectSchema = draftProjectSchema.refine(
    (data) => {
      if (data.status === 'published') {
        return !!data.description && !!data.category && data.techStack?.length;
      }
      return true;
    },
    {
      message: "To publish a project, description, category and tech stack are required.",
      path: ["status"],
    }
  );
          