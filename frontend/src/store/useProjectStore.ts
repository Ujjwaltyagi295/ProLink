import {  Ecosystem, ExperienceLevel,  ProjectCategory, ProjectStage, ProjectStatus, Role, TechStack } from "@/lib/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RoleFormData {
  id: string;
  role: Role | null;
  description: string;
  count: number;
  isRemote: boolean;
  experienceLevel: ExperienceLevel | null;
}

export interface ProjectDataType {
  id: string | null;
  status: ProjectStatus | null;
  stage: ProjectStage | null;
  teamSize?: number ;
  name: string;
  summary: string;
  description?: string | null 
  banner?: string | null 
  avatar?: string | null 
  category?:ProjectCategory
    | null
    ;
  repoUrl?: string | null;
  liveUrl?: string | null;
  ecosystem?:Ecosystem
    | null
    ;
  updatedAt?: string | null;
  bannerFile?: File | null;
  avatarFile?: File | null;
  timeCommitment: string | null;
  applicationProcess: string | null;
  timezonePreference: string | null;
  meetingFrequency: string | null;
  hoursPerWeek: number | null;
  roles?: RoleFormData[] | null;
  techStack?: TechStack[] | null;
}
interface FormStore {
  projectData: ProjectDataType;
  setFormData: (newData: Partial<ProjectDataType>) => void;
  clearForm: () => void;
}
export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      projectData: {
        id: null,
        name: "",
        summary: "",
        description: null,
        bannerFile: null,
        avatarFile: null,
        banner: null,
        avatar: null,
        category: null,
        status: "draft",
        teamSize: 2,
        ecosystem: null,
        stage: null,
        repoUrl: null,
        liveUrl: null,
        timeCommitment: null,
        applicationProcess: null,
        timezonePreference: null,
        meetingFrequency: null,
        hoursPerWeek: null,
        updatedAt: null,
        roles: [], 
        techStack: [],
      },
      setFormData: (newData) =>
        set((state) => ({
          projectData: { ...state.projectData, ...newData },
        })),
      clearForm: () =>
        set(() => ({
          projectData: {
            id: null,
            name: "",
            summary: "",
            description: null,
            bannerFile: null,
            avatarFile: null,
            banner: null,
            avatar: null,
            category: null,
            status: "draft",
            teamSize: 2,
            ecosystem: null,
            stage: null,
            repoUrl: null,
            liveUrl: null,
            timeCommitment: null,
            applicationProcess: null,
            timezonePreference: null,
            meetingFrequency: null,
            hoursPerWeek: null,
            updatedAt: null,
            roles: [], // Initialize as an empty array!
            techStack: [],
          },
        })),
    }),
    {
      name: "project-form-storage",
    }
  )
);

type ProjectSidebarState = {
  isOpen: boolean
  projectId: string
  isEditing:boolean
  setIsOpen: (data: boolean) => void
  setProjectId: (id: string) => void
  onClose: () => void
  setIsEditing:(data:boolean)=>void
  openProject: (id: string) => void
}

export const useMyProjectStore = create<ProjectSidebarState>((set) => ({
  isOpen: false,
  projectId: "",
  isEditing:false,
  setIsEditing:(data:boolean)=>set({isEditing:data}),
  setIsOpen: (data) => set({ isOpen: data }),
  setProjectId: (id) => set({ projectId: id }),
  onClose: () => set({ isOpen: false }),
  // Combined action to ensure both state changes happen together
  openProject: (id) => set({ projectId: id, isOpen: true })
}))

