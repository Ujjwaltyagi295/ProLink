import { TechStack } from "@/lib/schema";

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
  techStack: string[];
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
  role: {
    id: string;
    projectId: string;
    role: string;
    description: string;
    count: number;
    isRemote: boolean;
    experienceLevel: string;
  }[];
  techStack: TechStack;
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