import { z } from "zod";

export const userProfileSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    coverImage: z.string().optional(),
    title: z.string().max(100).optional(),
    location: z.string().max(100).optional(),
    resume: z.string().optional(),
    portfolio: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    skills: z.array(z.string()).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });
  