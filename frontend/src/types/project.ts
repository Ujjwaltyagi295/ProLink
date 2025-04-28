import { ExperienceLevel, Role, TechStack } from "@/lib/schema";

export interface ProjectData{
  id: string;
  ownerId: string;
  name: string;
  summary: string;
  description: string;
  banner: string;
  avatar: string;
  teamSize:number;
  category: string;
  status: string;
  ecosystem: string;
  stage: string;
  liveUrl: string;
  inviteCode: string;
  joinLink: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  roles: {
    id: string;
    projectId: string;
    role: string;
    description: string;
    count: number;
    isRemote: boolean;
    experienceLevel: string;
  }[];
  techStack: TechStack[];
  members: {
    id: string;
    projectId: string;
    userId: string;
    username: string;
    roleId: string | null;
    isOwner: boolean;
    joinedAt: string;
  }[];
}
export interface ProjectResData {
  project: {
    id: string;
    ownerId: string;
    name: string;
    summary: string;
    description: string;
    banner: string;
    avatar: string;
    category: string;
    status: string;
    ecosystem: string;
    teamSize: number;
    stage: string;
    liveUrl: string;
    inviteCode: string;
    joinLink: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  };
  roles: {
    id: string;
    projectId: string;
    role: Role;
    description: string;
    count: number;
    isRemote: boolean;
    experienceLevel: ExperienceLevel;
  }[];
  techStack: TechStack[];
  members: {
    id: string;
    name: string;
    projectId: string;
    userId: string;
    username: string;
    roleId: string | null;
    isOwner: boolean;
    joinedAt: string;
  }[];
}
export interface Project {
  id: string
  title: string
  description: string
  thumbnail?: string
  skills: string[]
  teamSize: string
  timeline: string
  openPositions: number
  status?: "New" | "Hot" | "Ending Soon"
  techStack?: string[]
  category?: string
  stage?: string
  ecosystem?: string
}


export interface FilterDataType {
  id: string;
  ownerId: string;
  name: string;
  summary: string;
  description: string;
  banner: string;
  avatar: string;
  teamSize:number;
  category: string;
  status: string;
  ecosystem: string;
  stage: string;
  liveUrl: string;
  inviteCode: string;
  joinLink: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  techStacks :TechStack[],
  roles: Role[]
  
}